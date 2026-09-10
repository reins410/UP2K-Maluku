import React, { useState, useEffect } from 'react';
import { SyncConfig, LocationProject } from '../types';
import {
  X,
  Sheet,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Link,
  Download,
  ExternalLink,
  FolderOpen,
  PlusCircle,
  LogOut,
  FileSpreadsheet,
} from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { ConfirmActionModal } from './ConfirmActionModal';
import {
  googleSignIn,
  logout,
  getAccessToken,
  initAuth,
} from '../services/googleAuth';
import {
  listDriveSpreadsheets,
  getSpreadsheetMetadata,
  getSpreadsheetValues,
  parseSheetRowsToLocations,
  exportToNewGoogleSheet,
  DriveSpreadsheetItem,
  SpreadsheetMetadata,
} from '../services/googleSheetsService';
import { User } from 'firebase/auth';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncConfig: SyncConfig;
  onSaveConfig: (newConfig: SyncConfig) => void;
  onApplyCSVData: (csvText: string) => void;
  onApplyLocationsData: (locations: LocationProject[], updateDate?: string) => void;
  onResetToDefault: () => void;
  existingLocations: LocationProject[];
  cutoffDate: string;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  syncConfig,
  onSaveConfig,
  onApplyCSVData,
  onApplyLocationsData,
  onResetToDefault,
  existingLocations,
  cutoffDate,
}) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'drive' | 'export' | 'url' | 'paste'>('drive');

  // Drive Picker state
  const [driveFiles, setDriveFiles] = useState<DriveSpreadsheetItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DriveSpreadsheetItem | null>(null);
  const [spreadsheetMeta, setSpreadsheetMeta] = useState<SpreadsheetMetadata | null>(null);
  const [selectedSheetTab, setSelectedSheetTab] = useState<string>('');
  const [isFetchingSheet, setIsFetchingSheet] = useState(false);

  // New Sheet Export state
  const [newSheetTitle, setNewSheetTitle] = useState(
    `Monitoring Lisdes UPPK Maluku - 25 Lokasi (${cutoffDate})`
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSheetUrl, setExportedSheetUrl] = useState<string | null>(null);
  const [showConfirmExportModal, setShowConfirmExportModal] = useState(false);

  // URL / CSV state
  const [url, setUrl] = useState(syncConfig.sourceUrl || '');
  const [autoRefresh, setAutoRefresh] = useState(syncConfig.autoRefresh);
  const [intervalSec, setIntervalSec] = useState(syncConfig.refreshIntervalSec || 60);
  const [pastedCSV, setPastedCSV] = useState('');
  const [isUrlLoading, setIsUrlLoading] = useState(false);

  // Feedback state
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Initialize Auth on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessTokenState(token);
      },
      () => {
        setCurrentUser(null);
        setAccessTokenState(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // When modal opens or token is obtained, load Drive spreadsheets
  useEffect(() => {
    if (isOpen && accessToken) {
      loadDriveFiles(accessToken);
    }
  }, [isOpen, accessToken]);

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    setFeedback(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessTokenState(result.accessToken);
        setFeedback({
          type: 'success',
          message: `Berhasil terhubung dengan akun Google: ${result.user.email}`,
        });
        loadDriveFiles(result.accessToken);
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Gagal masuk dengan Google. Silakan coba lagi.',
      });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessTokenState(null);
    setDriveFiles([]);
    setSelectedFile(null);
    setSpreadsheetMeta(null);
    setFeedback({
      type: 'success',
      message: 'Anda telah keluar dari akun Google.',
    });
  };

  const loadDriveFiles = async (token: string) => {
    setIsLoadingFiles(true);
    setFeedback(null);
    try {
      const files = await listDriveSpreadsheets(token);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Error loading drive files:', err);
      setFeedback({
        type: 'error',
        message: `Gagal membaca file dari Google Drive: ${err?.message || 'Akses ditolak'}`,
      });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSelectDriveFile = async (file: DriveSpreadsheetItem) => {
    setSelectedFile(file);
    setFeedback(null);
    if (!accessToken) return;

    setIsFetchingSheet(true);
    try {
      const meta = await getSpreadsheetMetadata(file.id, accessToken);
      setSpreadsheetMeta(meta);
      if (meta.sheets && meta.sheets.length > 0) {
        setSelectedSheetTab(meta.sheets[0].title);
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: `Gagal membaca informasi sheet: ${err?.message}`,
      });
    } finally {
      setIsFetchingSheet(false);
    }
  };

  const handleSyncFromDriveSheet = async () => {
    if (!selectedFile || !accessToken) {
      setFeedback({ type: 'error', message: 'Pilih file spreadsheet terlebih dahulu.' });
      return;
    }

    const tabName = selectedSheetTab || 'Sheet1';
    setIsFetchingSheet(true);
    setFeedback(null);

    try {
      // Read top 150 rows across columns A to Z
      const range = `${tabName}!A1:AZ150`;
      const rows = await getSpreadsheetValues(selectedFile.id, range, accessToken);

      if (!rows || rows.length === 0) {
        throw new Error('Spreadsheet kosong atau tidak ada data pada rentang tersebut.');
      }

      const parsed = parseSheetRowsToLocations(rows, existingLocations);
      onApplyLocationsData(parsed.locations, parsed.updateDate);

      onSaveConfig({
        ...syncConfig,
        sourceUrl: selectedFile.webViewLink || `https://docs.google.com/spreadsheets/d/${selectedFile.id}`,
        isLive: true,
        lastSyncTime: new Date().toLocaleTimeString('id-ID'),
        status: 'connected',
      });

      setFeedback({
        type: 'success',
        message: `Berhasil menyinkronkan data 25 lokasi dari Google Sheet "${selectedFile.name}" (Tab: ${tabName})!`,
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: `Sinkronisasi gagal: ${err?.message || 'Format tidak dikenali'}`,
      });
    } finally {
      setIsFetchingSheet(false);
    }
  };

  const handleExecuteExportNewSheet = async () => {
    if (!accessToken) {
      setFeedback({ type: 'error', message: 'Silakan sign-in dengan Google terlebih dahulu.' });
      return;
    }

    setIsExporting(true);
    setShowConfirmExportModal(false);
    setFeedback(null);

    try {
      const result = await exportToNewGoogleSheet(
        newSheetTitle,
        existingLocations,
        cutoffDate,
        accessToken
      );

      setExportedSheetUrl(result.spreadsheetUrl);
      setFeedback({
        type: 'success',
        message: `Google Spreadsheet berhasil dibuat di akun Google Drive Anda!`,
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: `Gagal membuat spreadsheet: ${err?.message}`,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleTestAndSaveUrl = async () => {
    if (!url.trim()) {
      setFeedback({ type: 'error', message: 'Masukkan URL Google Sheets atau link CSV yang valid.' });
      return;
    }

    setIsUrlLoading(true);
    setFeedback(null);

    try {
      let fetchUrl = url.trim();
      if (fetchUrl.includes('docs.google.com/spreadsheets/d/')) {
        if (!fetchUrl.includes('output=csv') && !fetchUrl.includes('format=csv')) {
          const match = fetchUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
          if (match && match[1]) {
            fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
          }
        }
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) {
        throw new Error(
          `Gagal mengambil data dari Google Sheets (Status: ${res.status}). Pastikan dokumen telah di-share publik atau 'Publish to Web'.`
        );
      }

      const csvText = await res.text();
      onApplyCSVData(csvText);

      onSaveConfig({
        ...syncConfig,
        sourceUrl: fetchUrl,
        isLive: true,
        autoRefresh,
        refreshIntervalSec: intervalSec,
        lastSyncTime: new Date().toLocaleTimeString('id-ID'),
        status: 'connected',
      });

      setFeedback({
        type: 'success',
        message: 'Koneksi Google Sheets berhasil! Data real-time telah disinkronkan ke dashboard.',
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Gagal tersambung ke URL Google Sheets.',
      });
    } finally {
      setIsUrlLoading(false);
    }
  };

  const handleApplyPasted = () => {
    if (!pastedCSV.trim()) {
      setFeedback({ type: 'error', message: 'Tempelkan data CSV terlebih dahulu.' });
      return;
    }

    try {
      onApplyCSVData(pastedCSV);
      setFeedback({
        type: 'success',
        message: 'Data CSV berhasil diterapkan ke dashboard!',
      });
    } catch {
      setFeedback({ type: 'error', message: 'Format CSV tidak sesuai.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Sheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Integrasi Google Sheets & Drive
              </h3>
              <p className="text-xs text-slate-400">
                Pilih file dari Google Drive, sinkronkan otomatis, atau buat spreadsheet baru.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Auth Banner */}
        <div className="px-5 py-3 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Google User'}
                  className="w-7 h-7 rounded-full border border-slate-600"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  {(currentUser.displayName || currentUser.email || 'G')[0].toUpperCase()}
                </div>
              )}
              <div className="text-xs">
                <span className="text-slate-300 font-semibold block leading-tight">
                  {currentUser.displayName || 'Akun Google'}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {currentUser.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Belum terhubung ke Akun Google.</span>
            </div>
          )}

          <div>
            {currentUser ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/30 text-[11px] text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Keluar</span>
              </button>
            ) : (
              <GoogleSignInButton
                onClick={handleSignIn}
                isLoading={isAuthLoading}
                size="sm"
                text="Hubungkan Google Drive"
              />
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 bg-slate-950/30 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('drive')}
            className={`pb-2.5 px-2 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'drive'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Pilih File Google Drive</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-2.5 px-2 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Buat Spreadsheet Baru</span>
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`pb-2.5 px-2 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>URL / Publikasi Web</span>
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-2.5 px-2 font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Paste CSV Manual</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {feedback && (
            <div
              className={`p-3 rounded-xl flex items-start gap-2.5 border ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{feedback.message}</span>
            </div>
          )}

          {/* TAB 1: GOOGLE DRIVE PICKER */}
          {activeTab === 'drive' && (
            <div className="space-y-4">
              {!currentUser ? (
                <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mx-auto flex items-center justify-center">
                    <Sheet className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Hubungkan Google Drive Anda</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Masuk dengan akun Google untuk langsung menjelajahi dan memilih file spreadsheet monitoring proyek dari Google Drive Anda.
                  </p>
                  <div className="pt-2">
                    <GoogleSignInButton
                      onClick={handleSignIn}
                      isLoading={isAuthLoading}
                      text="Sign in with Google"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <FolderOpen className="w-4 h-4 text-cyan-400" />
                      <span>Pilih File Google Sheets dari Drive:</span>
                    </label>
                    <button
                      onClick={() => accessToken && loadDriveFiles(accessToken)}
                      disabled={isLoadingFiles}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                      <span>Muat Ulang</span>
                    </button>
                  </div>

                  {isLoadingFiles ? (
                    <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
                      <p className="text-xs text-slate-400">Mengambil daftar spreadsheet dari Google Drive...</p>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400">
                      Tidak ditemukan file Google Sheets di akun Drive ini, atau coba gunakan tab <em>Buat Spreadsheet Baru</em> di samping.
                    </div>
                  ) : (
                    <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 border border-slate-800 rounded-xl p-2 bg-slate-950/60">
                      {driveFiles.map((file) => {
                        const isSelected = selectedFile?.id === file.id;
                        return (
                          <div
                            key={file.id}
                            onClick={() => handleSelectDriveFile(file)}
                            className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                                : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Sheet className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-emerald-400'}`} />
                              <div className="min-w-0">
                                <span className="font-semibold block truncate text-xs">{file.name}</span>
                                {file.modifiedTime && (
                                  <span className="text-[10px] text-slate-500">
                                    Diubah: {new Date(file.modifiedTime).toLocaleDateString('id-ID')}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  title="Buka di Google Sheets"
                                  className="p-1 rounded text-slate-400 hover:text-cyan-300"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                  isSelected
                                    ? 'bg-cyan-500 text-slate-950 font-bold'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {isSelected ? 'Terpilih' : 'Pilih'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Tab Selector if file selected */}
                  {selectedFile && spreadsheetMeta && (
                    <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">
                          Pilih Tab Lembar Kerja (Sheet):
                        </span>
                        <span className="text-[11px] text-cyan-400 font-mono">{selectedFile.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedSheetTab}
                          onChange={(e) => setSelectedSheetTab(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 w-full"
                        >
                          {spreadsheetMeta.sheets.map((sheet) => (
                            <option key={sheet.sheetId} value={sheet.title}>
                              {sheet.title} {sheet.rowCount ? `(${sheet.rowCount} baris)` : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={handleSyncFromDriveSheet}
                        disabled={isFetchingSheet}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-emerald-950"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isFetchingSheet ? 'animate-spin' : ''}`} />
                        <span>{isFetchingSheet ? 'Membaca Data Sel...' : 'Sinkronkan Data ke Dashboard'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXPORT TO NEW GOOGLE SHEET */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              {!currentUser ? (
                <div className="p-6 text-center bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Hubungkan Google Drive untuk Ekspor</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Masuk dengan akun Google untuk langsung membuat file spreadsheet baru berisi seluruh data 25 lokasi proyek Lisdes Maluku di Google Drive Anda.
                  </p>
                  <div className="pt-2">
                    <GoogleSignInButton
                      onClick={handleSignIn}
                      isLoading={isAuthLoading}
                      text="Sign in with Google"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Judul Spreadsheet Baru di Google Drive:
                    </label>
                    <input
                      type="text"
                      value={newSheetTitle}
                      onChange={(e) => setNewSheetTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      File akan otomatis dibuat di folder utama Google Drive akun <strong className="text-slate-200">{currentUser.email}</strong>.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <span className="font-semibold text-white block">Struktur Data yang Akan Ditulis:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                      <li>25 Dusun / Desa Proyek Lisdes UPPK Maluku</li>
                      <li>Informasi Kontraktor, UP3 (Masohi, Tual, Saumlaki, Ambon), dan Tahap</li>
                      <li>Volume Tiang (TM/TR), Jaringan JTM & JTR, Gardu Distribusi</li>
                      <li>Realisasi (%) vs Target Rencana Baseline (%) dan Deviasi</li>
                    </ul>
                  </div>

                  {exportedSheetUrl && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-emerald-300 block">File Berhasil Dibuat!</span>
                        <span className="text-[11px] text-slate-400">Klik tautan untuk melihat langsung di browser:</span>
                      </div>
                      <a
                        href={exportedSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka Spreadsheet</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => setShowConfirmExportModal(true)}
                    disabled={isExporting}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-cyan-950"
                  >
                    <PlusCircle className={`w-3.5 h-3.5 ${isExporting ? 'animate-spin' : ''}`} />
                    <span>{isExporting ? 'Membuat Spreadsheet di Google Drive...' : 'Buat Spreadsheet di Google Drive'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: URL / PUBLIKASI WEB */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Link Google Sheets (Publikasi ke Web / CSV Export):
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Masukkan tautan share Google Sheets dengan izin akses <em>"Anyone with the link can view"</em> atau link Publish to Web (CSV).
                </p>
              </div>

              {/* Auto Refresh Setting */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Auto-Refresh Berkala</span>
                  <span className="text-[11px] text-slate-400">
                    Otomatis mengambil data terbaru dari link Google Sheets di latar belakang
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={intervalSec}
                    disabled={!autoRefresh}
                    onChange={(e) => setIntervalSec(Number(e.target.value))}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white disabled:opacity-50"
                  >
                    <option value={30}>Setiap 30 detik</option>
                    <option value={60}>Setiap 1 menit</option>
                    <option value={300}>Setiap 5 menit</option>
                  </select>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PASTE CSV */}
          {activeTab === 'paste' && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Tempelkan Isi CSV atau Salinan Tabel Google Sheets:
                </label>
                <textarea
                  rows={8}
                  value={pastedCSV}
                  onChange={(e) => setPastedCSV(e.target.value)}
                  placeholder="No,Pekerjaan,Uraian,Gabungan Total,Lokasi...&#10;1,Pematokan,Rencana,751,77,102...&#10;..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                />
              </div>
              <button
                onClick={handleApplyPasted}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors cursor-pointer"
              >
                Terapkan Data yang Ditempel
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onResetToDefault();
              setFeedback({
                type: 'success',
                message: 'Data dikembalikan ke dataset default UPPK Maluku (10 Sep 2026).',
              });
            }}
            className="text-slate-400 hover:text-slate-200 text-xs underline cursor-pointer"
          >
            Reset ke Data Awal UPPK
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
            {activeTab === 'url' && (
              <button
                onClick={handleTestAndSaveUrl}
                disabled={isUrlLoading}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUrlLoading ? 'animate-spin' : ''}`} />
                <span>{isUrlLoading ? 'Menghubungkan...' : 'Simpan & Sinkronkan'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Writing to Google Drive */}
      <ConfirmActionModal
        isOpen={showConfirmExportModal}
        title="Buat Spreadsheet di Google Drive?"
        description={`Aplikasi akan membuat file Google Spreadsheet baru berjudul "${newSheetTitle}" di akun Google Drive Anda (${currentUser?.email}). File ini akan berisi tabel data 25 lokasi proyek kelistrikan desa UPPK Maluku.`}
        confirmLabel="Ya, Buat di Google Drive"
        cancelLabel="Batal"
        isProcessing={isExporting}
        onConfirm={handleExecuteExportNewSheet}
        onCancel={() => setShowConfirmExportModal(false)}
      />
    </div>
  );
};

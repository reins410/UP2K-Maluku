import React from 'react';
import { RefreshCw, Sheet, Download, Calendar, MapPin, Zap, ExternalLink } from 'lucide-react';
import { SyncConfig } from '../types';
import { User } from 'firebase/auth';

interface HeaderProps {
  syncConfig: SyncConfig;
  onOpenSyncModal: () => void;
  onManualSync: () => void;
  onExportCSV: () => void;
  startDate: string;
  cutoffDate: string;
  currentUser?: User | null;
  onSignIn?: () => void;
  locationsCount?: number;
  up3Count?: number;
}

export const Header: React.FC<HeaderProps> = ({
  syncConfig,
  onOpenSyncModal,
  onManualSync,
  onExportCSV,
  startDate,
  cutoffDate,
  currentUser,
  onSignIn,
  locationsCount = 25,
  up3Count = 4,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Brand & Project Identity */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white shrink-0 border border-cyan-400/30">
              <Zap className="w-6 h-6 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                  PLN UIW MALUKU DAN MALUKU UTARA
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  UPPK MALUKU • LISDES
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Real-Time Sync Ready
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                Dashboard Monitoring Progres & S-Curve Pekerjaan
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Mulai: <strong className="text-white">{startDate}</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Data Cut-Off: <strong className="text-amber-300">{cutoffDate}</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Target Selesai: <strong className="text-emerald-300">31 Des 2026 (M-27)</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  Cakupan: <strong className="text-white">{locationsCount} Dusun / Desa ({up3Count} UP3)</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Tools & Sync State */}
          <div className="flex items-center gap-2.5 flex-wrap self-end lg:self-center">
            {/* Google Account Profile or Connect Button */}
            {currentUser ? (
              <button
                onClick={onOpenSyncModal}
                title={`Terhubung dengan Google: ${currentUser.email}`}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Google'}
                    className="w-5 h-5 rounded-full border border-slate-600"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'G')[0].toUpperCase()}
                  </div>
                )}
                <span className="font-semibold text-[11px] max-w-[110px] truncate hidden sm:inline">
                  {currentUser.displayName || currentUser.email}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              </button>
            ) : (
              onSignIn && (
                <button
                  onClick={onSignIn}
                  title="Masuk dengan Google untuk akses Google Sheets & Drive"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-3.5 h-3.5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  <span>Google Sheets</span>
                </button>
              )
            )}

            {/* Google Sheets Status Badge / Button */}
            <button
              onClick={onOpenSyncModal}
              title="Buka Menu Integrasi Google Sheets & Drive"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Sheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kelola Sheets</span>
              {syncConfig.autoRefresh && (
                <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                  {syncConfig.refreshIntervalSec}s
                </span>
              )}
            </button>

            {/* Quick Refresh Button */}
            <button
              onClick={onManualSync}
              disabled={syncConfig.status === 'syncing'}
              title="Sinkronkan data sekarang"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncConfig.status === 'syncing' ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{syncConfig.status === 'syncing' ? 'Sinkron...' : 'Sync'}</span>
            </button>

            {/* Export Report CSV */}
            <button
              onClick={onExportCSV}
              title="Export Laporan Lengkap ke CSV"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

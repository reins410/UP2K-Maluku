import React, { useState } from 'react';
import {
  RefreshCw,
  Sheet,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Link,
  Settings2,
  Clock,
  Zap,
} from 'lucide-react';
import { SyncConfig } from '../types';

interface LiveSyncBannerProps {
  syncConfig: SyncConfig;
  onManualSync: () => void;
  onUpdateConfig: (newConfig: Partial<SyncConfig>) => void;
  onOpenModal: () => void;
  locationsCount: number;
  lastUpdatedMessage?: string | null;
}

export const LiveSyncBanner: React.FC<LiveSyncBannerProps> = ({
  syncConfig,
  onManualSync,
  onUpdateConfig,
  onOpenModal,
  locationsCount,
  lastUpdatedMessage,
}) => {
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [inputUrl, setInputUrl] = useState(syncConfig.sourceUrl || '');

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    let cleanUrl = inputUrl.trim();
    if (cleanUrl.includes('docs.google.com/spreadsheets/d/')) {
      if (!cleanUrl.includes('output=csv') && !cleanUrl.includes('format=csv')) {
        const match = cleanUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
          const gidMatch = cleanUrl.match(/gid=([0-9]+)/);
          const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
          cleanUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv${gidParam}`;
        }
      }
    }

    onUpdateConfig({
      sourceUrl: cleanUrl,
      isLive: true,
      status: 'connected',
    });
    setIsEditingUrl(false);
    onManualSync();
  };

  const isSyncing = syncConfig.status === 'syncing';
  const hasUrl = Boolean(syncConfig.sourceUrl);

  return (
    <div
      id="live-sync-banner"
      className="bg-slate-900/95 border-b border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-2.5 transition-all text-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Connection Status & Identity */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  syncConfig.status === 'error'
                    ? 'bg-rose-500'
                    : isSyncing
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-emerald-400'
                }`}
              />
              <span
                className={`w-2 h-2 rounded-full absolute ${
                  syncConfig.status === 'error'
                    ? 'bg-rose-500'
                    : isSyncing
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Sheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {hasUrl
                  ? 'Terhubung ke Google Sheets Live'
                  : 'Koneksi Google Sheets Aktif (Penyimpanan Lokal)'}
              </span>
            </div>
          </div>

          <div className="hidden sm:inline-block h-3.5 w-px bg-slate-700" />

          {/* Locations synced badge */}
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
            {locationsCount} Lokasi Tersinkron
          </span>

          {/* Auto-Refresh Status */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>
              {syncConfig.autoRefresh ? (
                <>
                  Auto-Sync:{' '}
                  <span className="text-cyan-300 font-medium">
                    Aktif (Tiap {syncConfig.refreshIntervalSec}s)
                  </span>
                </>
              ) : (
                <span className="text-slate-400">Auto-Sync Nonaktif</span>
              )}
            </span>
          </div>

          {/* Last Sync Timestamp */}
          {syncConfig.lastSyncTime && (
            <span className="text-slate-500 hidden lg:inline">
              (Update: {syncConfig.lastSyncTime})
            </span>
          )}

          {lastUpdatedMessage && (
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium text-[11px] animate-fade-in flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-400" />
              {lastUpdatedMessage}
            </span>
          )}
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
          {/* Quick URL Edit or View */}
          {isEditingUrl ? (
            <form onSubmit={handleSaveUrl} className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Tempel link Google Sheets di sini..."
                className="px-2 py-1 bg-slate-950 border border-cyan-500/40 rounded text-slate-200 text-xs w-64 focus:outline-none focus:border-cyan-400"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium cursor-pointer transition-colors"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setIsEditingUrl(false)}
                className="px-2 py-1 bg-slate-800 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                Batal
              </button>
            </form>
          ) : (
            <>
              {syncConfig.sourceUrl && (
                <a
                  href={syncConfig.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Buka Dokumen Google Sheets Sumber"
                >
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                  <span className="hidden xl:inline">Buka Dokumen</span>
                </a>
              )}

              {/* Toggle Auto-Refresh */}
              <button
                onClick={() => onUpdateConfig({ autoRefresh: !syncConfig.autoRefresh })}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
                  syncConfig.autoRefresh
                    ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Aktifkan/Nonaktifkan Pembaruan Otomatis"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    syncConfig.autoRefresh ? 'bg-cyan-400' : 'bg-slate-500'
                  }`}
                />
                <span>Auto-Refresh {syncConfig.autoRefresh ? 'ON' : 'OFF'}</span>
              </button>

              {/* Refresh Now Button */}
              <button
                onClick={onManualSync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold transition-all shadow-sm shadow-emerald-900/30 cursor-pointer"
                title="Perbarui data sekarang dari link Google Sheets"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
              </button>

              {/* More settings / modal */}
              <button
                onClick={onOpenModal}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="Pengaturan Google Sheets & Drive"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

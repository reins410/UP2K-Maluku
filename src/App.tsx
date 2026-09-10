import React, { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_LOCATIONS,
  INITIAL_WORK_PACKAGES,
  PROJECT_METADATA,
} from './data/initialData';
import {
  LocationProject,
  WorkPackageOverall,
  SyncConfig,
} from './types';
import { Header } from './components/Header';
import { KpiMetrics } from './components/KpiMetrics';
import { SCurveChart } from './components/SCurveChart';
import { WorkPackagesTable } from './components/WorkPackagesTable';
import { LocationTable } from './components/LocationTable';
import { ReportsView } from './components/ReportsView';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { LocationDetailModal } from './components/LocationDetailModal';
import { parseMalukuSheetCSV, exportLocationsToCSV } from './utils/csvParser';
import { computeWorkPackagesFromLocations } from './utils/workPackages';
import { LiveSyncBanner } from './components/LiveSyncBanner';
import { LayoutDashboard, MapPin, FileText } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken } from './services/googleAuth';
import { getSpreadsheetValues, parseSheetRowsToLocations } from './services/googleSheetsService';
import { User } from 'firebase/auth';

export default function App() {
  const [locations, setLocations] = useState<LocationProject[]>(() => {
    try {
      const saved = localStorage.getItem('lisdes_locations_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 25) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_LOCATIONS;
  });

  const [packages, setPackages] = useState<WorkPackageOverall[]>(() => {
    return computeWorkPackagesFromLocations(locations);
  });

  const [selectedLocation, setSelectedLocation] = useState<LocationProject | null>(null);
  const [detailModalLoc, setDetailModalLoc] = useState<LocationProject | null>(null);

  const [startDate, setStartDate] = useState<string>(() => {
    return localStorage.getItem('lisdes_start_date') || PROJECT_METADATA.startDate;
  });
  const [cutoffDate, setCutoffDate] = useState<string>(() => {
    return localStorage.getItem('lisdes_cutoff_date') || PROJECT_METADATA.cutoffDate;
  });

  // Modals state
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [lastSyncNotification, setLastSyncNotification] = useState<string | null>(null);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'overview' | 'locations' | 'reports'>('overview');

  // Google Sheets real-time sync config (persisted across sessions)
  const [syncConfig, setSyncConfig] = useState<SyncConfig>(() => {
    try {
      const saved = localStorage.getItem('lisdes_sync_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          isLive: true,
          autoRefresh: parsed.autoRefresh ?? true,
          refreshIntervalSec: parsed.refreshIntervalSec || 30,
          status: 'connected',
        };
      }
    } catch {}
    return {
      sourceUrl: '',
      isLive: true,
      autoRefresh: true,
      refreshIntervalSec: 30,
      lastSyncTime: '10 Sep 2026',
      status: 'connected',
    };
  });

  // Keep work packages and localStorage in sync whenever locations update
  useEffect(() => {
    const updatedPackages = computeWorkPackagesFromLocations(locations);
    setPackages(updatedPackages);
    try {
      localStorage.setItem('lisdes_locations_cache', JSON.stringify(locations));
    } catch {}
  }, [locations]);

  // Persist sync config
  useEffect(() => {
    try {
      localStorage.setItem('lisdes_sync_config', JSON.stringify(syncConfig));
    } catch {}
  }, [syncConfig]);

  // Persist dates
  useEffect(() => {
    try {
      localStorage.setItem('lisdes_start_date', startDate);
      localStorage.setItem('lisdes_cutoff_date', cutoffDate);
    } catch {}
  }, [startDate, cutoffDate]);

  // Listen to Google Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignInGoogle = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setIsSyncModalOpen(true);
      }
    } catch (err) {
      console.error('Sign in failed:', err);
    }
  };

  // Apply parsed CSV data
  const handleApplyCSVData = useCallback((csvText: string) => {
    try {
      const result = parseMalukuSheetCSV(csvText, locations);
      setLocations(result.locations);
      if (result.startDate) setStartDate(result.startDate);
      if (result.updateDate) setCutoffDate(result.updateDate);
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setSyncConfig((prev) => ({
        ...prev,
        lastSyncTime: nowStr,
        status: 'connected',
        errorMessage: undefined,
      }));
      setLastSyncNotification(`Tersinkronisasi (${result.locations.length} lokasi)`);
      setTimeout(() => setLastSyncNotification(null), 4000);
    } catch (err) {
      console.error('Failed to parse sheet data', err);
    }
  }, [locations]);

  // Apply parsed LocationProjects directly from Google Sheets API
  const handleApplyLocationsData = useCallback((newLocations: LocationProject[], updateDate?: string) => {
    setLocations(newLocations);
    if (updateDate) setCutoffDate(updateDate);
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    setSyncConfig((prev) => ({
      ...prev,
      lastSyncTime: nowStr,
      status: 'connected',
      errorMessage: undefined,
    }));
    setLastSyncNotification(`Tersinkronisasi (${newLocations.length} lokasi)`);
    setTimeout(() => setLastSyncNotification(null), 4000);
  }, []);

  // Reset to initial UPPK Maluku data
  const handleResetToDefault = () => {
    setLocations(INITIAL_LOCATIONS);
    setPackages(computeWorkPackagesFromLocations(INITIAL_LOCATIONS));
    setStartDate(PROJECT_METADATA.startDate);
    setCutoffDate(PROJECT_METADATA.cutoffDate);
    setSelectedLocation(null);
    setSyncConfig({
      sourceUrl: '',
      isLive: true,
      autoRefresh: true,
      refreshIntervalSec: 30,
      lastSyncTime: '10 Sep 2026',
      status: 'connected',
    });
    localStorage.removeItem('lisdes_locations_cache');
    localStorage.removeItem('lisdes_sync_config');
  };

  // Manual & Automated sync trigger
  const handleManualSync = useCallback(async () => {
    if (!syncConfig.sourceUrl) {
      setIsSyncModalOpen(true);
      return;
    }

    setSyncConfig((prev) => ({ ...prev, status: 'syncing' }));

    let fetchUrl = syncConfig.sourceUrl.trim();
    if (fetchUrl.includes('docs.google.com/spreadsheets/d/')) {
      if (!fetchUrl.includes('output=csv') && !fetchUrl.includes('format=csv')) {
        const match = fetchUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) {
          const gidMatch = fetchUrl.match(/gid=([0-9]+)/);
          const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
          fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv${gidParam}`;
        }
      }
    }

    // Add cache buster query parameter to bypass CDN caching
    const cacheBuster = `_t=${Date.now()}`;
    const finalUrl = fetchUrl.includes('?') ? `${fetchUrl}&${cacheBuster}` : `${fetchUrl}?${cacheBuster}`;

    try {
      const res = await fetch(finalUrl);
      if (res.ok) {
        const text = await res.text();

        // Check if response is HTML error page
        if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
          if (currentUser) {
            const match = syncConfig.sourceUrl.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
            if (match && match[1]) {
              const token = await getAccessToken();
              if (token) {
                const rows = await getSpreadsheetValues(match[1], 'A1:AZ150', token);
                const parsed = parseSheetRowsToLocations(rows, locations);
                setLocations(parsed.locations);
                if (parsed.updateDate) setCutoffDate(parsed.updateDate);
                const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                setSyncConfig((prev) => ({
                  ...prev,
                  status: 'connected',
                  lastSyncTime: nowStr,
                  errorMessage: undefined,
                }));
                setLastSyncNotification(`Otomatis diperbarui (${parsed.locations.length} lokasi)`);
                setTimeout(() => setLastSyncNotification(null), 4000);
                return;
              }
            }
          }
          throw new Error('Link Google Sheets memerlukan akses publik ("Publish to Web") atau login Google.');
        }

        handleApplyCSVData(text);
      } else {
        setSyncConfig((prev) => ({
          ...prev,
          status: 'error',
          errorMessage: `Gagal refresh data (Status: ${res.status})`,
        }));
      }
    } catch (err: any) {
      setSyncConfig((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: err.message || 'Gagal tersambung ke spreadsheet',
      }));
    }
  }, [syncConfig.sourceUrl, locations, currentUser, handleApplyCSVData]);

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = exportLocationsToCSV(locations, cutoffDate);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Progres_Kelistrikan_UPPK_Maluku_${cutoffDate.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto-refresh interval (polling for changes)
  useEffect(() => {
    if (!syncConfig.autoRefresh || !syncConfig.sourceUrl) return;

    const interval = setInterval(() => {
      handleManualSync();
    }, (syncConfig.refreshIntervalSec || 30) * 1000);

    return () => clearInterval(interval);
  }, [syncConfig.autoRefresh, syncConfig.sourceUrl, syncConfig.refreshIntervalSec, handleManualSync]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        syncConfig={syncConfig}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onManualSync={handleManualSync}
        onExportCSV={handleExportCSV}
        startDate={startDate}
        cutoffDate={cutoffDate}
        currentUser={currentUser}
        onSignIn={handleSignInGoogle}
        locationsCount={locations.length}
        up3Count={new Set(locations.map((l) => l.up3)).size}
      />

      {/* Persistent Live Google Sheets Sync Bar */}
      <LiveSyncBanner
        syncConfig={syncConfig}
        onManualSync={handleManualSync}
        onUpdateConfig={(partial) => setSyncConfig((prev) => ({ ...prev, ...partial }))}
        onOpenModal={() => setIsSyncModalOpen(true)}
        locationsCount={locations.length}
        lastUpdatedMessage={lastSyncNotification}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard & Kurva-S</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'locations'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Daftar {locations.length} Lokasi Proyek</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Laporan Harian & Mingguan</span>
            </button>
          </div>

          {selectedLocation && (
            <div className="hidden sm:flex items-center gap-2 text-xs bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 px-3 py-1.5 rounded-xl">
              <span>Fokus: <strong>{selectedLocation.namaDusun}</strong></span>
              <button
                onClick={() => setSelectedLocation(null)}
                className="hover:text-white text-cyan-400 cursor-pointer ml-1"
                title="Hapus filter fokus lokasi"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* KPI Cards Row (Always visible for fast situational awareness) */}
        <KpiMetrics
          locations={locations}
          selectedLocation={selectedLocation}
        />

        {/* Tab 1: Overview (Main S-Curve + Work Packages + Locations Matrix Table) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Primary S-Curve Component */}
            <SCurveChart
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              cutoffDate={cutoffDate}
            />

            {/* Work Item Quantities & Visual Meters */}
            <WorkPackagesTable
              packages={packages}
              selectedLocation={selectedLocation}
              locationsCount={locations.length}
            />

            {/* 25 Locations Matrix Table */}
            <LocationTable
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              onOpenDetailModal={(loc) => setDetailModalLoc(loc)}
            />
          </div>
        )}

        {/* Tab 2: Full Locations Focus */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <SCurveChart
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              cutoffDate={cutoffDate}
            />

            <LocationTable
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
              onOpenDetailModal={(loc) => setDetailModalLoc(loc)}
            />
          </div>
        )}

        {/* Tab 3: Laporan Harian & Mingguan (Kumulatif Uraian & Rincian Lokasi) */}
        {activeTab === 'reports' && (
          <ReportsView
            locations={locations}
            cutoffDate={cutoffDate}
            onOpenDetailModal={(loc) => setDetailModalLoc(loc)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-500 py-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">PT PLN (PERSERO) UIW MALUKU DAN MALUKU UTARA</span>
            <span>•</span>
            <span>UPPK MALUKU</span>
          </div>
          <div className="text-center sm:text-right text-slate-500">
            Sistem Monitoring Progres & Analisis Kurva-S Konstruksi Jaringan Listrik Desa (LISDES)
          </div>
        </div>
      </footer>

      {/* Google Sheets Sync Modal */}
      <GoogleSheetsModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        syncConfig={syncConfig}
        onSaveConfig={(cfg) => setSyncConfig(cfg)}
        onApplyCSVData={handleApplyCSVData}
        onApplyLocationsData={handleApplyLocationsData}
        onResetToDefault={handleResetToDefault}
        existingLocations={locations}
        cutoffDate={cutoffDate}
      />

      {/* Location Detail Modal */}
      <LocationDetailModal
        location={detailModalLoc}
        onClose={() => setDetailModalLoc(null)}
        onSetAsActiveSCurve={(loc) => setSelectedLocation(loc)}
      />
    </div>
  );
}

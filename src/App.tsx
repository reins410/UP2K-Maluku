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
import { LayoutDashboard, MapPin, FileText } from 'lucide-react';
import { initAuth, googleSignIn } from './services/googleAuth';
import { User } from 'firebase/auth';

export default function App() {
  const [locations, setLocations] = useState<LocationProject[]>(INITIAL_LOCATIONS);
  const [packages, setPackages] = useState<WorkPackageOverall[]>(INITIAL_WORK_PACKAGES);
  const [selectedLocation, setSelectedLocation] = useState<LocationProject | null>(null);
  const [detailModalLoc, setDetailModalLoc] = useState<LocationProject | null>(null);

  const [startDate, setStartDate] = useState<string>(PROJECT_METADATA.startDate);
  const [cutoffDate, setCutoffDate] = useState<string>(PROJECT_METADATA.cutoffDate);

  // Modals state
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'overview' | 'locations' | 'reports'>('overview');

  // Google Sheets real-time sync config
  const [syncConfig, setSyncConfig] = useState<SyncConfig>({
    sourceUrl: '',
    isLive: false,
    autoRefresh: false,
    refreshIntervalSec: 60,
    lastSyncTime: '10 Sep 2026 (Built-in)',
    status: 'idle',
  });

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
      setSyncConfig((prev) => ({
        ...prev,
        lastSyncTime: new Date().toLocaleTimeString('id-ID'),
        status: 'connected',
      }));
    } catch (err) {
      console.error('Failed to parse sheet data', err);
    }
  }, [locations]);

  // Apply parsed LocationProjects directly from Google Sheets API
  const handleApplyLocationsData = useCallback((newLocations: LocationProject[], updateDate?: string) => {
    setLocations(newLocations);
    if (updateDate) setCutoffDate(updateDate);
    setSyncConfig((prev) => ({
      ...prev,
      lastSyncTime: new Date().toLocaleTimeString('id-ID'),
      status: 'connected',
    }));
  }, []);

  // Reset to initial UPPK Maluku data
  const handleResetToDefault = () => {
    setLocations(INITIAL_LOCATIONS);
    setPackages(INITIAL_WORK_PACKAGES);
    setStartDate(PROJECT_METADATA.startDate);
    setCutoffDate(PROJECT_METADATA.cutoffDate);
    setSelectedLocation(null);
    setSyncConfig({
      sourceUrl: '',
      isLive: false,
      autoRefresh: false,
      refreshIntervalSec: 60,
      lastSyncTime: '10 Sep 2026 (Built-in)',
      status: 'idle',
    });
  };

  // Manual sync trigger
  const handleManualSync = async () => {
    if (!syncConfig.sourceUrl) {
      setIsSyncModalOpen(true);
      return;
    }

    setSyncConfig((prev) => ({ ...prev, status: 'syncing' }));
    try {
      const res = await fetch(syncConfig.sourceUrl);
      if (res.ok) {
        const text = await res.text();
        handleApplyCSVData(text);
      } else {
        setSyncConfig((prev) => ({ ...prev, status: 'error', errorMessage: 'Gagal refresh data' }));
      }
    } catch (err: any) {
      setSyncConfig((prev) => ({ ...prev, status: 'error', errorMessage: err.message }));
    }
  };

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

  // Auto-refresh interval
  useEffect(() => {
    if (!syncConfig.autoRefresh || !syncConfig.sourceUrl) return;

    const interval = setInterval(() => {
      handleManualSync();
    }, syncConfig.refreshIntervalSec * 1000);

    return () => clearInterval(interval);
  }, [syncConfig.autoRefresh, syncConfig.sourceUrl, syncConfig.refreshIntervalSec]);

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
              <span>Daftar 25 Lokasi Proyek</span>
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

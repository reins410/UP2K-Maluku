import React, { useState, useMemo } from 'react';
import { LocationProject, DailyLogEntry, UP3Name, TahapName } from '../types';
import {
  FileText,
  Calendar,
  Layers,
  MapPin,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Zap,
  ChevronRight,
  Plus,
  CloudSun,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  CumulativeWorkItemSummary,
  calculateCumulativeWorkItems,
  getWeeklyPeriods,
  AVAILABLE_DAILY_DATES,
  generateCumulativeReportCSV,
  generateLocationDetailsReportCSV,
} from '../utils/reportUtils';
import { INITIAL_DAILY_LOGS } from '../data/initialData';

interface ReportsViewProps {
  locations: LocationProject[];
  cutoffDate: string;
  onOpenDetailModal: (loc: LocationProject) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  locations,
  cutoffDate,
  onOpenDetailModal,
}) => {
  // Report Frequency: Daily or Weekly
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('weekly');

  // Report View Type: Cumulative by Work Scope or Breakdown by Location
  const [viewType, setViewType] = useState<'cumulative_items' | 'location_details'>('cumulative_items');

  // Time Period state
  const [selectedDailyDate, setSelectedDailyDate] = useState<string>(cutoffDate || '10 Sep 2026');
  const [selectedWeek, setSelectedWeek] = useState<number>(11); // Default to week 11 (Cutoff Week)

  // Filters
  const [selectedUP3, setSelectedUP3] = useState<string>('ALL');
  const [selectedTahap, setSelectedTahap] = useState<string>('ALL');
  const [searchLocation, setSearchLocation] = useState<string>('');

  // Daily / Weekly Logs state
  const [dailyLogs, setDailyLogs] = useState<DailyLogEntry[]>(INITIAL_DAILY_LOGS);
  const [isAddingLog, setIsAddingLog] = useState<boolean>(false);
  const [newLogPekerjaan, setNewLogPekerjaan] = useState('');
  const [newLogDetail, setNewLogDetail] = useState('');
  const [newLogLokasiId, setNewLogLokasiId] = useState(locations[0]?.id || '');
  const [newLogCuaca, setNewLogCuaca] = useState<'Cerah' | 'Hujan Ringan' | 'Hujan Deras / Gelombang Laut'>('Cerah');
  const [newLogCatatan, setNewLogCatatan] = useState('');

  // Weekly periods definition
  const weeklyPeriods = useMemo(() => getWeeklyPeriods(27), []);
  const activeWeekInfo = useMemo(() => {
    return weeklyPeriods.find((w) => w.week === selectedWeek) || weeklyPeriods[10];
  }, [weeklyPeriods, selectedWeek]);

  // Current period label
  const periodLabel = useMemo(() => {
    if (frequency === 'daily') {
      return `Harian: ${selectedDailyDate}`;
    }
    return `Mingguan: ${activeWeekInfo.fullLabel}`;
  }, [frequency, selectedDailyDate, activeWeekInfo]);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (selectedUP3 !== 'ALL' && loc.up3 !== selectedUP3) return false;
      if (selectedTahap !== 'ALL' && loc.tahap !== selectedTahap) return false;
      if (searchLocation.trim()) {
        const q = searchLocation.toLowerCase();
        const match =
          loc.namaDusun.toLowerCase().includes(q) ||
          loc.namaDesa.toLowerCase().includes(q) ||
          loc.kecamatan.toLowerCase().includes(q) ||
          loc.kabupaten.toLowerCase().includes(q) ||
          loc.pelaksana.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [locations, selectedUP3, selectedTahap, searchLocation]);

  // Cumulative Work Items aggregated from filtered locations
  const cumulativeItems = useMemo<CumulativeWorkItemSummary[]>(() => {
    return calculateCumulativeWorkItems(filteredLocations, frequency, selectedWeek);
  }, [filteredLocations, frequency, selectedWeek]);

  // Summary Metrics
  const summaryMetrics = useMemo(() => {
    const totalTiangItem = cumulativeItems.find((i) => i.no === 5);
    const jtmItem = cumulativeItems.find((i) => i.no === 8);
    const jtrItem = cumulativeItems.find((i) => i.no === 9);
    const garduItem = cumulativeItems.find((i) => i.no === 10);

    const avgProgress =
      filteredLocations.length > 0
        ? filteredLocations.reduce((acc, l) => acc + l.progresKeseluruhan, 0) / filteredLocations.length
        : 0;

    const avgPlan =
      filteredLocations.length > 0
        ? filteredLocations.reduce((acc, l) => acc + l.rencanaProgres, 0) / filteredLocations.length
        : 0;

    return {
      tiangRealisasi: totalTiangItem?.realisasiKumulatif || 0,
      tiangRencana: totalTiangItem?.rencanaTotal || 0,
      tiangPersen: totalTiangItem?.persen || 0,
      jtmRealisasi: jtmItem?.realisasiKumulatif || 0,
      jtmRencana: jtmItem?.rencanaTotal || 0,
      jtrRealisasi: jtrItem?.realisasiKumulatif || 0,
      jtrRencana: jtrItem?.rencanaTotal || 0,
      garduRealisasi: garduItem?.realisasiKumulatif || 0,
      garduRencana: garduItem?.rencanaTotal || 0,
      avgProgress: Number(avgProgress.toFixed(2)),
      avgPlan: Number(avgPlan.toFixed(2)),
      deviasi: Number((avgProgress - avgPlan).toFixed(2)),
    };
  }, [cumulativeItems, filteredLocations]);

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = '';
    let filename = '';

    if (viewType === 'cumulative_items') {
      const title = `Laporan ${frequency === 'daily' ? 'Harian' : 'Mingguan'} Kumulatif Uraian Pekerjaan LISDES UPPK Maluku`;
      csvContent = generateCumulativeReportCSV(
        cumulativeItems,
        title,
        periodLabel,
        selectedUP3 === 'ALL' ? `Semua UP3 (${locations.length} Lokasi)` : selectedUP3
      );
      filename = `Laporan_${frequency === 'daily' ? 'Harian' : 'Mingguan'}_Kumulatif_Uraian_Pekerjaan_${selectedDailyDate.replace(/\s+/g, '_')}.csv`;
    } else {
      const title = `Laporan ${frequency === 'daily' ? 'Harian' : 'Mingguan'} Rincian Per Lokasi LISDES UPPK Maluku`;
      csvContent = generateLocationDetailsReportCSV(
        filteredLocations,
        title,
        periodLabel,
        selectedUP3 === 'ALL' ? `Semua UP3 (${locations.length} Lokasi)` : selectedUP3
      );
      filename = `Laporan_${frequency === 'daily' ? 'Harian' : 'Mingguan'}_Rincian_Per_Lokasi_${selectedDailyDate.replace(/\s+/g, '_')}.csv`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  // Add new daily log
  const handleSaveNewLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogPekerjaan.trim()) return;

    const loc = locations.find((l) => l.id === newLogLokasiId) || locations[0];
    const newEntry: DailyLogEntry = {
      id: `log-${Date.now()}`,
      tanggal: frequency === 'daily' ? selectedDailyDate : `${activeWeekInfo.endDate} 2026`,
      lokasiId: loc.id,
      lokasiNama: `${loc.namaDusun} (${loc.namaDesa})`,
      up3: loc.up3,
      pekerjaan: newLogPekerjaan,
      itemDetail: newLogDetail || 'Pekerjaan fisik dan pengawasan lapangan.',
      volume: 'Sesuai checklist',
      kontraktor: loc.pelaksana,
      status: 'Dalam Proses',
      cuaca: newLogCuaca,
      catatan: newLogCatatan || 'Pekerjaan berjalan aman dan mematuhi K3 ketenagalistrikan.',
    };

    setDailyLogs([newEntry, ...dailyLogs]);
    setIsAddingLog(false);
    setNewLogPekerjaan('');
    setNewLogDetail('');
    setNewLogCatatan('');
  };

  return (
    <div className="space-y-6">
      {/* Control & Customization Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                Modul Laporan Kemajuan Proyek LISDES
              </span>
              <span className="text-xs text-slate-400">
                Format Standar Pengawasan Lapangan UPPK Maluku
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
              Laporan Harian & Mingguan Kemajuan Fisik
            </h2>
          </div>

          {/* Action Buttons: Export CSV & Print */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer shadow-sm"
              title="Export data laporan yang sedang aktif ke CSV"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20"
              title="Cetak formulir laporan resmi dengan kop surat PLN"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* Filters & Configuration Row */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {/* Pilihan 1: Frekuensi Laporan (Harian vs Mingguan) */}
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" />
              1. Frekuensi Laporan:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  frequency === 'daily'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Laporan Harian
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  frequency === 'weekly'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                Laporan Mingguan
              </button>
            </div>
          </div>

          {/* Pilihan 2: Format Tampilan (Kumulatif Uraian vs Rincian Lokasi) */}
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-400" />
              2. Format Agregasi Tampilan:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setViewType('cumulative_items')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center truncate ${
                  viewType === 'cumulative_items'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title="Kumulatif per Uraian Pekerjaan"
              >
                Kumulatif Uraian
              </button>
              <button
                type="button"
                onClick={() => setViewType('location_details')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center truncate ${
                  viewType === 'location_details'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title={`Rincian per ${locations.length} Lokasi`}
              >
                Rincian Lokasi
              </button>
            </div>
          </div>

          {/* Pilihan 3: Periode Waktu (Tanggal Harian / Minggu ke-n) */}
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              3. Periode Waktu:
            </span>
            {frequency === 'daily' ? (
              <select
                value={selectedDailyDate}
                onChange={(e) => setSelectedDailyDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                {AVAILABLE_DAILY_DATES.map((d) => (
                  <option key={d} value={d}>
                    {d} {d === cutoffDate ? '(Data Cut-off)' : ''}
                  </option>
                ))}
              </select>
            ) : (
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                {weeklyPeriods.map((wp) => (
                  <option key={wp.week} value={wp.week}>
                    {wp.fullLabel} {wp.isCutoff ? '★ Cut-off' : ''}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Pilihan 4: Filter Lingkup UP3 & Tahap */}
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5 flex items-center gap-1">
              <Filter className="w-3 h-3 text-emerald-400" />
              4. Lingkup Unit & Tahap:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={selectedUP3}
                onChange={(e) => setSelectedUP3(e.target.value)}
                className="bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg px-2 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="ALL">Semua UP3 (4)</option>
                <option value="UP3 MASOHI">UP3 Masohi</option>
                <option value="UP3 TUAL">UP3 Tual</option>
                <option value="UP3 SAUMLAKI">UP3 Saumlaki</option>
                <option value="UP3 AMBON">UP3 Ambon</option>
              </select>

              <select
                value={selectedTahap}
                onChange={(e) => setSelectedTahap(e.target.value)}
                className="bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg px-2 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="ALL">Semua Tahap</option>
                <option value="TAHAP 1">Tahap 1</option>
                <option value="TAHAP 2">Tahap 2</option>
                <option value="TAHAP 3">Tahap 3</option>
                <option value="TAHAP 4">Tahap 4</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Official PLN Document Card (Printable Layout) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur overflow-hidden printable-area">
        {/* Kop Surat Dokumen Resmi */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shrink-0 border border-cyan-400/40 shadow-lg shadow-cyan-500/20">
                <Zap className="w-7 h-7 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <div className="text-[12px] font-extrabold tracking-wider text-blue-400 uppercase">
                  PT PLN (PERSERO) UIW MALUKU DAN MALUKU UTARA
                </div>
                <div className="text-sm font-bold text-white">
                  UNIT PELAKSANA PROYEK KETENAGALISTRIKAN (UPPK) MALUKU
                </div>
                <div className="text-xs text-slate-400">
                  Program Listrik Perdesaan (LISDES) Provinsi Maluku • Tahun Anggaran 2026
                </div>
              </div>
            </div>

            <div className="text-left md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase tracking-wider mb-1">
                {frequency === 'daily' ? 'LAPORAN HARIAN RESMI' : 'LAPORAN MINGGUAN RESMI'}
              </span>
              <div className="text-xs font-semibold text-white">
                Periode: <span className="text-amber-300">{periodLabel}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Nomor Register: <span className="font-mono text-slate-300">LISDES/MALUKU/2026/{frequency === 'daily' ? 'LH' : 'LM'}-{selectedWeek}</span>
              </div>
            </div>
          </div>

          {/* Document Title Banner */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              {frequency === 'daily' ? 'LAPORAN HARIAN' : 'LAPORAN MINGGUAN'}{' '}
              {viewType === 'cumulative_items'
                ? 'KUMULATIF PER URAIAN PEKERJAAN FISIK'
                : 'RINCIAN KEMAJUAN PEKERJAAN PER LOKASI DESA/DUSUN'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cakupan Wilayah: <strong className="text-slate-200">{selectedUP3 === 'ALL' ? 'Seluruh Unit Pelaksana Pelayanan Pelanggan (4 UP3)' : selectedUP3}</strong> • Total:{' '}
              <strong className="text-cyan-300">{filteredLocations.length} Dusun/Desa</strong>
            </p>
          </div>
        </div>

        {/* KPI Volume Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-slate-800/80 border-b border-slate-800">
          <div className="bg-slate-900/90 p-3.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tiang Total Tertanam</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-black text-white">{summaryMetrics.tiangRealisasi}</span>
              <span className="text-xs text-slate-400">/ {summaryMetrics.tiangRencana} btg</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, summaryMetrics.tiangPersen)}%` }}
              />
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold mt-1 inline-block">
              {summaryMetrics.tiangPersen.toFixed(1)}% Terpasang
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">JTM (Tegangan Menengah)</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-black text-white">{summaryMetrics.jtmRealisasi}</span>
              <span className="text-xs text-slate-400">/ {summaryMetrics.jtmRencana} kms</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              Konduktor AAAC-S 70/150 mm²
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">JTR (Tegangan Rendah)</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-black text-emerald-400">{summaryMetrics.jtrRealisasi}</span>
              <span className="text-xs text-slate-400">/ {summaryMetrics.jtrRencana} kms</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-2 block">
              {(summaryMetrics.jtrRencana > 0 ? (summaryMetrics.jtrRealisasi / summaryMetrics.jtrRencana) * 100 : 0).toFixed(1)}% Ditarik
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Gardu Distribusi</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-black text-white">{summaryMetrics.garduRealisasi}</span>
              <span className="text-xs text-slate-400">/ {summaryMetrics.garduRencana} unit</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              Trafo 25 & 50 kVA
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Progres Fisik Kumulatif</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-black text-emerald-400">{summaryMetrics.avgProgress.toFixed(2)}%</span>
              <span className="text-xs text-slate-400">vs {summaryMetrics.avgPlan.toFixed(2)}%</span>
            </div>
            <span
              className={`text-[10px] font-bold mt-2 inline-block px-1.5 py-0.5 rounded ${
                summaryMetrics.deviasi >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              Deviasi: {summaryMetrics.deviasi >= 0 ? '+' : ''}{summaryMetrics.deviasi.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* View Mode 1: Kumulatif per Uraian Pekerjaan */}
        {viewType === 'cumulative_items' && (
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Matriks Kumulatif 10 Uraian Pekerjaan Standar LISDES</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Perbandingan volume baseline kontrak, realisasi periode lalu, penambahan periode ini, dan sisa volume.
                </p>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 hidden sm:inline-block">
                Satuan: Batang (btg), Titik, Kilometer-Sirkuit (kms), Unit
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3 text-center w-10">No</th>
                    <th className="py-3 px-4">Uraian Pekerjaan Fisik</th>
                    <th className="py-3 px-3 text-center">Satuan</th>
                    <th className="py-3 px-3 text-right">Rencana Total</th>
                    <th className="py-3 px-3 text-right">Realisasi Lalu</th>
                    <th className="py-3 px-3 text-right text-cyan-300 bg-cyan-950/20">
                      {frequency === 'daily' ? 'Hari Ini' : 'Minggu Ini'}
                    </th>
                    <th className="py-3 px-3 text-right text-emerald-400 font-bold bg-emerald-950/10">
                      Realisasi Kumulatif
                    </th>
                    <th className="py-3 px-4 text-center min-w-[140px]">Persentase Capaian</th>
                    <th className="py-3 px-3 text-right">Sisa Pekerjaan</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-300">
                  {cumulativeItems.map((item) => (
                    <tr key={item.no} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 text-center font-mono text-slate-500 font-semibold">{item.no}</td>
                      <td className="py-3 px-4 font-semibold text-white">
                        <div>{item.nama}</div>
                        {(item.rencanaTM !== undefined || item.rencanaTR !== undefined) && (
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5 flex gap-2">
                            {item.rencanaTM !== undefined && (
                              <span>TM: <strong className="text-slate-300">{item.realisasiTM || 0}/{item.rencanaTM}</strong></span>
                            )}
                            {item.rencanaTR !== undefined && (
                              <span>TR: <strong className="text-slate-300">{item.realisasiTR || 0}/{item.rencanaTR}</strong></span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-400">{item.satuan}</td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-200">
                        {typeof item.rencanaTotal === 'number' ? item.rencanaTotal.toLocaleString('id-ID') : item.rencanaTotal}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">
                        {typeof item.realisasiLalu === 'number' ? item.realisasiLalu.toLocaleString('id-ID') : item.realisasiLalu}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-semibold text-cyan-300 bg-cyan-950/10">
                        +{typeof item.realisasiPeriodeIni === 'number' ? item.realisasiPeriodeIni.toLocaleString('id-ID') : item.realisasiPeriodeIni}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400 bg-emerald-950/10">
                        {typeof item.realisasiKumulatif === 'number' ? item.realisasiKumulatif.toLocaleString('id-ID') : item.realisasiKumulatif}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.persen >= 100
                                  ? 'bg-emerald-400'
                                  : item.persen > 0
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                                  : 'bg-slate-700'
                              }`}
                              style={{ width: `${Math.min(100, item.persen)}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-[11px] text-white shrink-0 w-12 text-right">
                            {item.persen.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-400">
                        {typeof item.sisaVolume === 'number' ? item.sisaVolume.toLocaleString('id-ID') : item.sisaVolume}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Selesai'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : item.status === 'On Progress'
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode 2: Rincian per Lokasi */}
        {viewType === 'location_details' && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Rincian Kemajuan Fisik {locations.length} Dusun / Desa</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Daftar rinci progres bobot kontrak, penambahan periode ini, serta volume tiang & jaringan per lokasi desa.
                </p>
              </div>

              {/* Quick Search inside Location View */}
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari dusun, desa, kontraktor..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3 text-center w-10">No</th>
                    <th className="py-3 px-4">Dusun & Desa</th>
                    <th className="py-3 px-3">UP3 & Tahap</th>
                    <th className="py-3 px-3">Kontraktor Pelaksana</th>
                    <th className="py-3 px-3 text-right">Rencana</th>
                    <th className="py-3 px-3 text-right text-cyan-300 bg-cyan-950/20">
                      {frequency === 'daily' ? 'Hari Ini' : 'Minggu Ini'}
                    </th>
                    <th className="py-3 px-3 text-right text-emerald-400 font-bold bg-emerald-950/10">
                      Realisasi Kumulatif
                    </th>
                    <th className="py-3 px-3 text-right">Deviasi</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Tiang TM/TR</th>
                    <th className="py-3 px-3 text-center">Jaringan TR</th>
                    <th className="py-3 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 text-slate-300">
                  {filteredLocations.map((loc, idx) => {
                    // Estimated incremental factor
                    const incrementalPct =
                      loc.progresKeseluruhan > 0
                        ? frequency === 'daily'
                          ? Number((loc.progresKeseluruhan * 0.08).toFixed(2))
                          : Number((loc.progresKeseluruhan * 0.28).toFixed(2))
                        : 0;

                    return (
                      <tr key={loc.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 text-center font-mono text-slate-500 font-semibold">{idx + 1}</td>
                        <td className="py-3 px-4 font-semibold text-white">
                          <div className="flex items-center gap-1.5">
                            <span>{loc.namaDusun}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {loc.namaDesa}, {loc.kecamatan}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-cyan-300 block">{loc.up3.replace('UP3 ', '')}</span>
                          <span className="text-[10px] text-slate-400">{loc.tahap}</span>
                        </td>
                        <td className="py-3 px-3 text-[11px] text-slate-300 max-w-[150px] truncate" title={loc.pelaksana}>
                          {loc.pelaksana}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-400">
                          {loc.rencanaProgres.toFixed(2)}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-cyan-300 bg-cyan-950/10">
                          +{incrementalPct.toFixed(2)}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400 bg-emerald-950/10">
                          {loc.progresKeseluruhan.toFixed(2)}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold">
                          <span
                            className={
                              loc.deviasi >= 0
                                ? 'text-emerald-400'
                                : loc.deviasi < -10
                                ? 'text-rose-400'
                                : 'text-amber-400'
                            }
                          >
                            {loc.deviasi >= 0 ? '+' : ''}{loc.deviasi.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              loc.status === 'Selesai'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : loc.status === 'On Progress'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {loc.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-300">
                          {loc.penanamanTiangTM.realisasiTotal + loc.penanamanTiangTR.realisasiTotal} /{' '}
                          {loc.penanamanTiangTM.rencanaTotal + loc.penanamanTiangTR.rencanaTotal}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-[11px] text-slate-300">
                          {loc.penarikanKonduktorTR.realisasiTotal} / {loc.penarikanKonduktorTR.rencanaTotal} kms
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => onOpenDetailModal(loc)}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-semibold transition-colors cursor-pointer border border-slate-700"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Daily & Weekly Field Activity Logs Strip */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-amber-400" />
                <span>Catatan Kegiatan & Log Pengawasan Lapangan Terkini</span>
              </h4>
              <p className="text-xs text-slate-400">
                Laporan kondisi lapangan, hambatan transportasi laut, pengiriman material, dan personil kerja.
              </p>
            </div>

            <button
              onClick={() => setIsAddingLog(!isAddingLog)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingLog ? 'Tutup Form' : 'Tambah Catatan Lapangan'}</span>
            </button>
          </div>

          {/* New Log Input Form */}
          {isAddingLog && (
            <form
              onSubmit={handleSaveNewLog}
              className="mb-4 p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Lokasi Proyek:
                  </label>
                  <select
                    value={newLogLokasiId}
                    onChange={(e) => setNewLogLokasiId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.namaDusun} - {l.up3}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Jenis Pekerjaan:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Erection Tiang TR & Stringing"
                    value={newLogPekerjaan}
                    onChange={(e) => setNewLogPekerjaan(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Kondisi Cuaca & Laut:
                  </label>
                  <select
                    value={newLogCuaca}
                    onChange={(e) => setNewLogCuaca(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="Cerah">Cerah / Normal</option>
                    <option value="Hujan Ringan">Hujan Ringan</option>
                    <option value="Hujan Deras / Gelombang Laut">Hujan Deras / Gelombang Laut Maluku</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Detail Realisasi & Catatan Lapangan:
                </label>
                <textarea
                  rows={2}
                  placeholder="Deskripsikan volume yang terselesaikan hari ini, personil yang bekerja, atau kendala logistik..."
                  value={newLogCatatan}
                  onChange={(e) => setNewLogCatatan(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingLog(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          )}

          {/* Logs List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-white">{log.lokasiNama}</span>
                  <span className="font-mono text-cyan-400">{log.tanggal}</span>
                </div>
                <div className="text-xs font-bold text-slate-200">{log.pekerjaan}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {log.catatan || log.itemDetail}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px]">
                  <span className="text-slate-400">{log.up3}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-medium ${
                      log.status === 'Selesai'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : log.status === 'Tertunda'
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}
                  >
                    {log.cuaca || log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Sign-off / Lembar Pengesahan */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/70">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center sm:text-left flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Lembar Pengesahan Laporan Kemajuan Pekerjaan Fisik</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            {/* Sign-off 1 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Dibuat Oleh:</span>
              <span className="font-bold text-white mt-1 block">Pengawas Lapangan / Vendor</span>
              <div className="h-16 flex items-center justify-center text-slate-600 text-[11px] italic">
                (Tanda Tangan & Cap Digital)
              </div>
              <div className="border-t border-slate-700/80 pt-1.5">
                <span className="font-semibold text-slate-200 block">Koordinator Pelaksana</span>
                <span className="text-[10px] text-slate-500">PT Pelaksana Pekerjaan</span>
              </div>
            </div>

            {/* Sign-off 2 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Diperiksa Oleh:</span>
              <span className="font-bold text-white mt-1 block">Direksi Pekerjaan / Pengawas K3</span>
              <div className="h-16 flex items-center justify-center text-slate-600 text-[11px] italic">
                (Tanda Tangan & Cap Digital)
              </div>
              <div className="border-t border-slate-700/80 pt-1.5">
                <span className="font-semibold text-slate-200 block">Team Leader Pengawas</span>
                <span className="text-[10px] text-slate-500">UPPK MALUKU</span>
              </div>
            </div>

            {/* Sign-off 3 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Disetujui Oleh:</span>
              <span className="font-bold text-cyan-300 mt-1 block">Manager UPPK Maluku</span>
              <div className="h-16 flex items-center justify-center text-slate-600 text-[11px] italic">
                (Tanda Tangan & Cap Digital)
              </div>
              <div className="border-t border-slate-700/80 pt-1.5">
                <span className="font-semibold text-slate-200 block">Manager UPPK Maluku</span>
                <span className="text-[10px] text-slate-500">PLN UIW MALUKU DAN MALUKU UTARA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

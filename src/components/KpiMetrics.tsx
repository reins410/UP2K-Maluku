import React from 'react';
import { CheckCircle2, AlertTriangle, Zap, Cable } from 'lucide-react';
import { LocationProject } from '../types';

interface KpiMetricsProps {
  locations: LocationProject[];
  selectedLocation: LocationProject | null;
}

export const KpiMetrics: React.FC<KpiMetricsProps> = ({ locations, selectedLocation }) => {
  // Aggregate calculations
  const totalLocations = locations.length;
  const completedLocations = locations.filter((l) => l.progresKeseluruhan >= 100).length;
  const onProgressLocations = locations.filter((l) => l.progresKeseluruhan > 0 && l.progresKeseluruhan < 100).length;
  const pendingLocations = locations.filter((l) => l.progresKeseluruhan === 0).length;

  // Active target calculations
  let actualPercent = 0;
  let plannedPercent = 0;
  let deviasiPercent = 0;

  let tiangTotalRencana = 0;
  let tiangTotalRealisasi = 0;
  let tiangTMRencana = 0;
  let tiangTMRealisasi = 0;
  let tiangTRRencana = 0;
  let tiangTRRealisasi = 0;

  let jtmRencana = 0;
  let jtmRealisasi = 0;
  let jtrRencana = 0;
  let jtrRealisasi = 0;

  let garduRencana = 0;
  let garduRealisasi = 0;

  if (selectedLocation) {
    actualPercent = selectedLocation.progresKeseluruhan;
    plannedPercent = selectedLocation.rencanaProgres;
    deviasiPercent = selectedLocation.deviasi;

    tiangTotalRencana = selectedLocation.penanamanTiang.rencanaTotal;
    tiangTotalRealisasi = selectedLocation.penanamanTiang.realisasiTotal;
    tiangTMRencana = selectedLocation.penanamanTiangTM.rencanaTotal;
    tiangTMRealisasi = selectedLocation.penanamanTiangTM.realisasiTotal;
    tiangTRRencana = selectedLocation.penanamanTiangTR.rencanaTotal;
    tiangTRRealisasi = selectedLocation.penanamanTiangTR.realisasiTotal;

    jtmRencana = selectedLocation.penarikanKonduktorTM.rencanaTotal;
    jtmRealisasi = selectedLocation.penarikanKonduktorTM.realisasiTotal;
    jtrRencana = selectedLocation.penarikanKonduktorTR.rencanaTotal;
    jtrRealisasi = selectedLocation.penarikanKonduktorTR.realisasiTotal;

    garduRencana = selectedLocation.garduDistribusi.rencanaTotal;
    garduRealisasi = selectedLocation.garduDistribusi.realisasiTotal;
  } else {
    // Total aggregate
    actualPercent = locations.reduce((sum, l) => sum + l.progresKeseluruhan, 0) / (locations.length || 1);
    plannedPercent = locations.reduce((sum, l) => sum + l.rencanaProgres, 0) / (locations.length || 1);
    deviasiPercent = actualPercent - plannedPercent;

    tiangTotalRencana = locations.reduce((sum, l) => sum + l.penanamanTiang.rencanaTotal, 0);
    tiangTotalRealisasi = locations.reduce((sum, l) => sum + l.penanamanTiang.realisasiTotal, 0);
    tiangTMRencana = locations.reduce((sum, l) => sum + l.penanamanTiangTM.rencanaTotal, 0);
    tiangTMRealisasi = locations.reduce((sum, l) => sum + l.penanamanTiangTM.realisasiTotal, 0);
    tiangTRRencana = locations.reduce((sum, l) => sum + l.penanamanTiangTR.rencanaTotal, 0);
    tiangTRRealisasi = locations.reduce((sum, l) => sum + l.penanamanTiangTR.realisasiTotal, 0);

    jtmRencana = locations.reduce((sum, l) => sum + l.penarikanKonduktorTM.rencanaTotal, 0);
    jtmRealisasi = locations.reduce((sum, l) => sum + l.penarikanKonduktorTM.realisasiTotal, 0);
    jtrRencana = locations.reduce((sum, l) => sum + l.penarikanKonduktorTR.rencanaTotal, 0);
    jtrRealisasi = locations.reduce((sum, l) => sum + l.penarikanKonduktorTR.realisasiTotal, 0);

    garduRencana = locations.reduce((sum, l) => sum + l.garduDistribusi.rencanaTotal, 0);
    garduRealisasi = locations.reduce((sum, l) => sum + l.garduDistribusi.realisasiTotal, 0);
  }

  const tiangTMPercent = tiangTMRencana > 0 ? (tiangTMRealisasi / tiangTMRencana) * 100 : 0;
  const tiangTRPercent = tiangTRRencana > 0 ? (tiangTRRealisasi / tiangTRRencana) * 100 : 0;
  const jtmPercent = jtmRencana > 0 ? (jtmRealisasi / jtmRencana) * 100 : 0;
  const jtrPercent = jtrRencana > 0 ? (jtrRealisasi / jtrRencana) * 100 : 0;
  const garduPercent = garduRencana > 0 ? (garduRealisasi / garduRencana) * 100 : 0;

  const isDeviationCritical = deviasiPercent <= -10;
  const isAhead = deviasiPercent >= 0;

  return (
    <section className="space-y-2">
      {/* 6 KPI Cards Grid: Status Lokasi paling awal, tanpa progres kumulatif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* 1. Sebaran Status Lokasi (Paling Atas / Pertama) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                {selectedLocation ? 'Status Lokasi' : 'Status 25 Lokasi'}
              </span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              {selectedLocation ? (
                <>
                  <span className="text-xl font-bold text-white tracking-tight truncate">
                    {selectedLocation.status}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {totalLocations}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Desa / Dusun</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-2.5">
            {selectedLocation ? (
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                  <span className="text-[10px] truncate">{selectedLocation.kecamatan}, {selectedLocation.up3}</span>
                  <span className="font-mono font-bold text-emerald-400 text-[11px] shrink-0">
                    {selectedLocation.progresKeseluruhan.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, selectedLocation.progresKeseluruhan)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-center mb-1.5">
                  <div className="bg-emerald-950/40 border border-emerald-500/20 py-0.5 rounded text-emerald-300 font-medium truncate" title={`${completedLocations} Selesai`}>
                    {completedLocations} Selesai
                  </div>
                  <div className="bg-cyan-950/40 border border-cyan-500/20 py-0.5 rounded text-cyan-300 font-medium truncate" title={`${onProgressLocations} Aktif`}>
                    {onProgressLocations} Aktif
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/40 py-0.5 rounded text-slate-300 font-medium truncate" title={`${pendingLocations} Antrean`}>
                    {pendingLocations} Antrean
                  </div>
                </div>

                <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-800">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${(completedLocations / totalLocations) * 100}%` }}
                  />
                  <div
                    className="bg-cyan-400 transition-all"
                    style={{ width: `${(onProgressLocations / totalLocations) * 100}%` }}
                  />
                  <div
                    className="bg-slate-700 transition-all"
                    style={{ width: `${(pendingLocations / totalLocations) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Penanaman Tiang TM (Tegangan Menengah) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 truncate">
                  Tiang TM (20 kV)
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-amber-400 tracking-tight">
                {tiangTMRealisasi}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                / {tiangTMRencana} <span className="text-[10px]">btg</span>
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
              <span className="text-[10px]">Sisa: <strong className="text-slate-300">{Math.max(0, tiangTMRencana - tiangTMRealisasi)}</strong> btg</span>
              <span className="font-mono font-bold text-amber-400 text-[11px]">{tiangTMPercent.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, tiangTMPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Penanaman Tiang TR (Tegangan Rendah) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 truncate">
                  Tiang TR (220 V)
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-cyan-400 tracking-tight">
                {tiangTRRealisasi}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                / {tiangTRRencana} <span className="text-[10px]">btg</span>
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
              <span className="text-[10px]">Sisa: <strong className="text-slate-300">{Math.max(0, tiangTRRencana - tiangTRRealisasi)}</strong> btg</span>
              <span className="font-mono font-bold text-cyan-400 text-[11px]">{tiangTRPercent.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, tiangTRPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4. Penarikan Konduktor JTM */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 truncate">
                  Konduktor JTM
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Cable className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-blue-400 tracking-tight">
                {jtmRealisasi.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                / {jtmRencana.toFixed(2)} <span className="text-[10px]">kms</span>
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
              <span className="text-[10px]">Sisa: <strong className="text-slate-300">{Math.max(0, jtmRencana - jtmRealisasi).toFixed(2)}</strong> kms</span>
              <span className="font-mono font-bold text-blue-400 text-[11px]">{jtmPercent.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-blue-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, jtmPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5. Penarikan Konduktor JTR */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 truncate">
                  Konduktor JTR
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                <Cable className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-teal-400 tracking-tight">
                {jtrRealisasi.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                / {jtrRencana.toFixed(2)} <span className="text-[10px]">kms</span>
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
              <span className="text-[10px]">Sisa: <strong className="text-slate-300">{Math.max(0, jtrRencana - jtrRealisasi).toFixed(2)}</strong> kms</span>
              <span className="font-mono font-bold text-teal-400 text-[11px]">{jtrPercent.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, jtrPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6. Gardu Distribusi */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 relative overflow-hidden backdrop-blur shadow-sm hover:border-slate-700 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                Gardu Distribusi
              </span>
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono text-purple-400 tracking-tight">
                {garduRealisasi}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                / {garduRencana} <span className="text-[10px]">unit</span>
              </span>
            </div>
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
              <span className="text-[10px]">Sisa: <strong className="text-slate-300">{Math.max(0, garduRencana - garduRealisasi)}</strong> unit</span>
              <span className="font-mono text-purple-300 font-bold text-[11px]">
                {garduPercent.toFixed(0)}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-purple-400 transition-all duration-500 rounded-full"
                style={{ width: `${garduRencana > 0 ? (garduRealisasi / garduRencana) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Pill for Total Tiang & Total Jaringan */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Akumulasi Tiang (TM + TR):</span>
            <span className="font-mono font-bold text-slate-200">
              {tiangTotalRealisasi} / {tiangTotalRencana} btg
            </span>
            <span className="text-cyan-400 font-mono text-[11px]">
              ({(tiangTotalRencana > 0 ? (tiangTotalRealisasi / tiangTotalRencana) * 100 : 0).toFixed(1)}%)
            </span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Akumulasi Konduktor (JTM + JTR):</span>
            <span className="font-mono font-bold text-slate-200">
              {(jtmRealisasi + jtrRealisasi).toFixed(2)} / {(jtmRencana + jtrRencana).toFixed(2)} kms
            </span>
            <span className="text-blue-400 font-mono text-[11px]">
              ({((jtmRencana + jtrRencana) > 0 ? ((jtmRealisasi + jtrRealisasi) / (jtmRencana + jtrRencana)) * 100 : 0).toFixed(1)}%)
            </span>
          </div>
        </div>

        {selectedLocation ? (
          <div className="text-[11px] text-cyan-300 font-medium">
            Fokus: <span className="font-bold">{selectedLocation.namaDusun}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500">
            Total Gabungan 25 Lokasi
          </div>
        )}
      </div>
    </section>
  );
};

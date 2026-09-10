import React from 'react';
import { WorkPackageOverall, LocationProject } from '../types';
import { Layers, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface WorkPackagesTableProps {
  packages: WorkPackageOverall[];
  selectedLocation: LocationProject | null;
  locationsCount?: number;
}

export const WorkPackagesTable: React.FC<WorkPackagesTableProps> = ({
  packages,
  selectedLocation,
  locationsCount = 25,
}) => {
  // If a location is selected, synthesize its specific work items
  const displayItems = React.useMemo(() => {
    if (!selectedLocation) return packages;

    const loc = selectedLocation;
    return [
      {
        no: 1,
        nama: 'Pematokan Jalur & Titik Tiang',
        satuan: 'btg/titik',
        rencana: loc.pematokan.rencanaTotal,
        realisasi: loc.pematokan.realisasiTotal,
        persen: loc.pematokan.rencanaTotal > 0 ? (loc.pematokan.realisasiTotal / loc.pematokan.rencanaTotal) * 100 : 0,
        rencanaTM: loc.pematokan.rencanaTM,
        realisasiTM: loc.pematokan.realisasiTM,
        rencanaTR: loc.pematokan.rencanaTR,
        realisasiTR: loc.pematokan.realisasiTR,
      },
      {
        no: 2,
        nama: 'Penggalian Tanah',
        satuan: 'titik',
        rencana: loc.penggalian.rencanaTotal,
        realisasi: loc.penggalian.realisasiTotal,
        persen: loc.penggalian.rencanaTotal > 0 ? (loc.penggalian.realisasiTotal / loc.penggalian.rencanaTotal) * 100 : 0,
        rencanaTM: loc.penggalian.rencanaTM,
        realisasiTM: loc.penggalian.realisasiTM,
        rencanaTR: loc.penggalian.rencanaTR,
        realisasiTR: loc.penggalian.realisasiTR,
      },
      {
        no: 3,
        nama: 'Pengeceran Tiang',
        satuan: 'btg',
        rencana: loc.pengeceran.rencanaTotal,
        realisasi: loc.pengeceran.realisasiTotal,
        persen: loc.pengeceran.rencanaTotal > 0 ? (loc.pengeceran.realisasiTotal / loc.pengeceran.rencanaTotal) * 100 : 0,
        rencanaTM: loc.pengeceran.rencanaTM,
        realisasiTM: loc.pengeceran.realisasiTM,
        rencanaTR: loc.pengeceran.rencanaTR,
        realisasiTR: loc.pengeceran.realisasiTR,
      },
      {
        no: 4,
        nama: 'Perambasan Pohon (ROW)',
        satuan: 'kms',
        rencana: loc.perambasan.rencanaTotal,
        realisasi: loc.perambasan.realisasiTotal,
        persen: loc.perambasan.rencanaTotal > 0 ? (loc.perambasan.realisasiTotal / loc.perambasan.rencanaTotal) * 100 : 0,
      },
      {
        no: 5,
        nama: 'Penanaman Tiang Total',
        satuan: 'btg',
        rencana: loc.penanamanTiang.rencanaTotal,
        realisasi: loc.penanamanTiang.realisasiTotal,
        persen: loc.penanamanTiang.rencanaTotal > 0 ? (loc.penanamanTiang.realisasiTotal / loc.penanamanTiang.rencanaTotal) * 100 : 0,
        rencanaTM: loc.penanamanTiangTM.rencanaTotal,
        realisasiTM: loc.penanamanTiangTM.realisasiTotal,
        rencanaTR: loc.penanamanTiangTR.rencanaTotal,
        realisasiTR: loc.penanamanTiangTR.realisasiTotal,
      },
      {
        no: 6,
        nama: 'Penanaman Tiang TM',
        satuan: 'btg',
        rencana: loc.penanamanTiangTM.rencanaTotal,
        realisasi: loc.penanamanTiangTM.realisasiTotal,
        persen: loc.penanamanTiangTM.rencanaTotal > 0 ? (loc.penanamanTiangTM.realisasiTotal / loc.penanamanTiangTM.rencanaTotal) * 100 : 0,
      },
      {
        no: 7,
        nama: 'Penarikan Konduktor TM',
        satuan: 'kms',
        rencana: loc.penarikanKonduktorTM.rencanaTotal,
        realisasi: loc.penarikanKonduktorTM.realisasiTotal,
        persen: loc.penarikanKonduktorTM.rencanaTotal > 0 ? (loc.penarikanKonduktorTM.realisasiTotal / loc.penarikanKonduktorTM.rencanaTotal) * 100 : 0,
      },
      {
        no: 8,
        nama: 'Penanaman Tiang TR',
        satuan: 'btg',
        rencana: loc.penanamanTiangTR.rencanaTotal,
        realisasi: loc.penanamanTiangTR.realisasiTotal,
        persen: loc.penanamanTiangTR.rencanaTotal > 0 ? (loc.penanamanTiangTR.realisasiTotal / loc.penanamanTiangTR.rencanaTotal) * 100 : 0,
      },
      {
        no: 9,
        nama: 'Penarikan Konduktor TR',
        satuan: 'kms',
        rencana: loc.penarikanKonduktorTR.rencanaTotal,
        realisasi: loc.penarikanKonduktorTR.realisasiTotal,
        persen: loc.penarikanKonduktorTR.rencanaTotal > 0 ? (loc.penarikanKonduktorTR.realisasiTotal / loc.penarikanKonduktorTR.rencanaTotal) * 100 : 0,
      },
      {
        no: 10,
        nama: 'Pekerjaan Gardu Distribusi',
        satuan: 'unit',
        rencana: loc.garduDistribusi.rencanaTotal,
        realisasi: loc.garduDistribusi.realisasiTotal,
        persen: loc.garduDistribusi.rencanaTotal > 0 ? (loc.garduDistribusi.realisasiTotal / loc.garduDistribusi.rencanaTotal) * 100 : 0,
      },
    ];
  }, [packages, selectedLocation]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Breakdown Progres per Uraian Pekerjaan
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedLocation
              ? `Spesifikasi Pekerjaan di: ${selectedLocation.namaDusun} (${selectedLocation.pelaksana})`
              : `Akumulasi Seluruh Item Pekerjaan dari Gabungan ${locationsCount} Lokasi`}
          </p>
        </div>

        {selectedLocation && (
          <div className="text-xs bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 px-3 py-1 rounded-lg">
            Lokasi: <span className="font-semibold">{selectedLocation.namaDusun}</span>
          </div>
        )}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3 w-10">No</th>
              <th className="py-2.5 px-3">Uraian Pekerjaan</th>
              <th className="py-2.5 px-3">Satuan</th>
              <th className="py-2.5 px-3 text-right">Rencana</th>
              <th className="py-2.5 px-3 text-right">Realisasi</th>
              <th className="py-2.5 px-3 w-44">Visual Progres</th>
              <th className="py-2.5 px-3 text-right">Capaian (%)</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {displayItems.map((item) => {
              const isFinished = item.persen >= 100;
              const isStarted = item.persen > 0;

              return (
                <tr key={item.no} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-500">{item.no}</td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-200">{item.nama}</div>
                    {(item.rencanaTM !== undefined || item.rencanaTR !== undefined) && (
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        {item.rencanaTM !== undefined && (
                          <span>TM: {item.realisasiTM ?? 0}/{item.rencanaTM}</span>
                        )}
                        {item.rencanaTR !== undefined && (
                          <span>TR: {item.realisasiTR ?? 0}/{item.rencanaTR}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">{item.satuan}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-300">
                    {typeof item.rencana === 'number' && item.satuan === 'kms'
                      ? item.rencana.toFixed(3)
                      : item.rencana.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white">
                    {typeof item.realisasi === 'number' && item.satuan === 'kms'
                      ? item.realisasi.toFixed(3)
                      : item.realisasi.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isFinished
                            ? 'bg-emerald-400'
                            : isStarted
                            ? 'bg-cyan-400'
                            : 'bg-slate-700'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, item.persen))}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    <span
                      className={`${
                        isFinished
                          ? 'text-emerald-400'
                          : isStarted
                          ? 'text-cyan-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.persen.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {isFinished ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Selesai
                      </span>
                    ) : isStarted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Clock className="w-3 h-3" />
                        Proses
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        Belum Mulai
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

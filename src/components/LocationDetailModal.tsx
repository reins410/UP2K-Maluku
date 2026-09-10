import React from 'react';
import { LocationProject } from '../types';
import { X, MapPin, Building2, Calendar, TrendingUp, TrendingDown, CheckCircle2, Zap, Cable, HardHat, Compass } from 'lucide-react';
import { getStatusBadgeInfo } from '../utils/scurveGenerator';

interface LocationDetailModalProps {
  location: LocationProject | null;
  onClose: () => void;
  onSetAsActiveSCurve: (loc: LocationProject) => void;
}

export const LocationDetailModal: React.FC<LocationDetailModalProps> = ({
  location,
  onClose,
  onSetAsActiveSCurve,
}) => {
  if (!location) return null;

  const badge = getStatusBadgeInfo(location.status);
  const isAhead = location.deviasi >= 0;

  const workItems = [
    { label: 'Pematokan Jalur Tiang', data: location.pematokan },
    { label: 'Penggalian Tanah', data: location.penggalian },
    { label: 'Pengeceran Tiang', data: location.pengeceran },
    { label: 'Perambasan Pohon (ROW)', data: location.perambasan },
    { label: 'Penanaman Tiang Total', data: location.penanamanTiang },
    { label: 'Penanaman Tiang TM', data: location.penanamanTiangTM },
    { label: 'Penanaman Tiang TR', data: location.penanamanTiangTR },
    { label: 'Penarikan Konduktor TM', data: location.penarikanKonduktorTM },
    { label: 'Penarikan Konduktor TR', data: location.penarikanKonduktorTR },
    { label: 'Pekerjaan Gardu Distribusi', data: location.garduDistribusi },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                {location.status}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {location.up3}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {location.tahap}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {location.namaDusun}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {location.namaDesa}, {location.kecamatan}, {location.kabupaten}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Realisasi</span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                {location.progresKeseluruhan.toFixed(2)}%
              </span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Rencana Target</span>
              <span className="text-lg font-bold font-mono text-blue-400">
                {location.rencanaProgres.toFixed(2)}%
              </span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Deviasi S-Curve</span>
              <span
                className={`text-lg font-bold font-mono ${
                  isAhead ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {location.deviasi >= 0 ? `+${location.deviasi.toFixed(2)}%` : `${location.deviasi.toFixed(2)}%`}
              </span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Tiang Tertanam</span>
              <span className="text-lg font-bold font-mono text-white">
                {location.penanamanTiang.realisasiTotal} / {location.penanamanTiang.rencanaTotal}
              </span>
            </div>
          </div>

          {/* Contractor Card */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
              <HardHat className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Kontraktor Pelaksana</span>
              <span className="font-bold text-white text-xs sm:text-sm">{location.pelaksana}</span>
            </div>
          </div>

          {/* Detailed Work Breakdown */}
          <div>
            <h4 className="font-bold text-white mb-2.5 flex items-center justify-between">
              <span>Detail Capaian Item Pekerjaan:</span>
              <span className="text-slate-400 text-[11px] font-normal">Realisasi vs Rencana</span>
            </h4>
            <div className="space-y-2">
              {workItems.map((item, idx) => {
                const percent = item.data.rencanaTotal > 0
                  ? (item.data.realisasiTotal / item.data.rencanaTotal) * 100
                  : 0;

                return (
                  <div
                    key={idx}
                    className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between gap-3"
                  >
                    <div className="w-1/3 min-w-[130px]">
                      <span className="font-semibold text-slate-200">{item.label}</span>
                      <span className="text-[10px] text-slate-400 block">Satuan: {item.data.unit}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1 font-mono">
                        <span className="text-slate-400">
                          {typeof item.data.realisasiTotal === 'number' && item.data.unit === 'kms'
                            ? item.data.realisasiTotal.toFixed(3)
                            : item.data.realisasiTotal}{' '}
                          /{' '}
                          {typeof item.data.rencanaTotal === 'number' && item.data.unit === 'kms'
                            ? item.data.rencanaTotal.toFixed(3)
                            : item.data.rencanaTotal}{' '}
                          {item.data.unit}
                        </span>
                        <span className="font-bold text-white">{percent.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percent >= 100 ? 'bg-emerald-400' : percent > 0 ? 'bg-cyan-400' : 'bg-slate-700'
                          }`}
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onSetAsActiveSCurve(location);
              onClose();
            }}
            className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Fokuskan Kurva-S ke Lokasi Ini</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

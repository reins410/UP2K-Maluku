import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { Calendar, Filter, ChevronDown, RotateCcw } from 'lucide-react';
import { LocationProject, UP3Name } from '../types';
import { generateSCurveData } from '../utils/scurveGenerator';

interface SCurveChartProps {
  locations: LocationProject[];
  selectedLocation: LocationProject | null;
  onSelectLocation: (loc: LocationProject | null) => void;
  cutoffDate: string;
}

export const SCurveChart: React.FC<SCurveChartProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  cutoffDate,
}) => {
  const [selectedUP3Filter, setSelectedUP3Filter] = useState<string>('ALL');
  // Week range filter state (Week 0 to Week 27)
  const [startWeek, setStartWeek] = useState<number>(0);
  const [endWeek, setEndWeek] = useState<number>(27);

  // Filter locations for dropdown
  const filteredDropdownLocations = useMemo(() => {
    if (selectedUP3Filter === 'ALL') return locations;
    return locations.filter((l) => l.up3 === selectedUP3Filter);
  }, [locations, selectedUP3Filter]);

  // Full 28-week S-Curve dataset (Week 0 s/d Week 27)
  const allWeeksData = useMemo(() => {
    return generateSCurveData({
      totalWeeks: 27, // Week 0 (27 Jun 2026) s/d Week 27 (31 Des 2026)
      cutoffWeek: 11,
      location: selectedLocation,
      locations: selectedLocation ? undefined : filteredDropdownLocations,
    });
  }, [selectedLocation, filteredDropdownLocations]);

  // Filtered dataset according to selected week range
  const sCurveData = useMemo(() => {
    return allWeeksData.filter((d) => d.week >= startWeek && d.week <= endWeek);
  }, [allWeeksData, startWeek, endWeek]);

  // Week options for dropdowns
  const weekOptions = useMemo(() => {
    return allWeeksData.map((d) => ({
      week: d.week,
      label: `M-${d.week}`,
      dateLabel: d.dateLabel,
      fullLabel: `M-${d.week} (${d.dateLabel})`,
    }));
  }, [allWeeksData]);

  const handleStartWeekChange = (val: number) => {
    setStartWeek(val);
    if (val > endWeek) {
      setEndWeek(val);
    }
  };

  const handleEndWeekChange = (val: number) => {
    setEndWeek(val);
    if (val < startWeek) {
      setStartWeek(val);
    }
  };

  const handleResetWeekRange = () => {
    setStartWeek(0);
    setEndWeek(27);
  };

  const isRangeModified = startWeek !== 0 || endWeek !== 27;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur">
      {/* Top Header & Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wide">
              Automated S-Curve Engine
            </span>
            <span className="text-xs text-slate-400">
              Pemantauan Rencana Kumulatif (Baseline) vs Realisasi Aktual
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            Kurva-S Pemantauan Progres Proyek
            {selectedLocation ? (
              <span className="text-sm font-semibold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-800/60">
                {selectedLocation.namaDusun}
              </span>
            ) : (
              <span className="text-sm font-semibold text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-lg border border-blue-800/60">
                {selectedUP3Filter === 'ALL' ? 'Gabungan Total (25 Lokasi)' : `Agregat ${selectedUP3Filter}`}
              </span>
            )}
          </h2>
        </div>

        {/* Location Selector & UP3 Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* UP3 Filter Chip */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700 text-xs">
            <button
              onClick={() => {
                setSelectedUP3Filter('ALL');
                if (selectedLocation) onSelectLocation(null);
              }}
              className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedUP3Filter === 'ALL' && !selectedLocation
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua UP3
            </button>
            {(['UP3 MASOHI', 'UP3 TUAL', 'UP3 SAUMLAKI', 'UP3 AMBON'] as UP3Name[]).map((up3) => (
              <button
                key={up3}
                onClick={() => {
                  setSelectedUP3Filter(up3);
                  onSelectLocation(null);
                }}
                className={`px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  selectedUP3Filter === up3 && !selectedLocation
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {up3.replace('UP3 ', '')}
              </button>
            ))}
          </div>

          {/* Location Dropdown */}
          <div className="relative min-w-[240px]">
            <select
              value={selectedLocation ? selectedLocation.id : 'all'}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'all') {
                  onSelectLocation(null);
                } else {
                  const found = locations.find((l) => l.id === val) || null;
                  onSelectLocation(found);
                }
              }}
              className="w-full appearance-none bg-slate-800 hover:bg-slate-750 border border-slate-700 text-white text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="all">📊 Gabungan Portofolio (Semua Lokasi)</option>
              <optgroup label="Pilih Lokasi Spesifik:">
                {filteredDropdownLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    [{loc.up3.replace('UP3 ', '')}] {loc.namaDusun} - {loc.namaDesa} ({loc.progresKeseluruhan.toFixed(1)}%)
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset / All Button */}
          {selectedLocation && (
            <button
              onClick={() => onSelectLocation(null)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Reset ke Total
            </button>
          )}
        </div>
      </div>

      {/* Week Range Filter Bar & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-3 border-b border-slate-800/60 text-xs">
        {/* Legend & Key Milestone Indicators */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-400 inline-block border-b border-dashed border-blue-300" />
            <span className="text-slate-300 font-medium">Rencana Kumulatif (Baseline)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-400 inline-block rounded-full shadow-sm shadow-emerald-400/50" />
            <span className="text-slate-300 font-medium">Realisasi Aktual</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Cut-Off: {cutoffDate} (M-11)</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Selesai: 31 Des 2026 (M-27)</span>
          </div>
        </div>

        {/* Week Range Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs shadow-inner">
            <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-400 font-medium">Rentang:</span>

            {/* Dari Minggu Dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400">Dari</span>
              <select
                value={startWeek}
                onChange={(e) => handleStartWeekChange(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-md px-2 py-0.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                {weekOptions.map((opt) => (
                  <option key={`start-${opt.week}`} value={opt.week}>
                    {opt.fullLabel}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-slate-500 text-xs">s/d</span>

            {/* Sampai Minggu Dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400">Sampai</span>
              <select
                value={endWeek}
                onChange={(e) => handleEndWeekChange(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-md px-2 py-0.5 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                {weekOptions.map((opt) => (
                  <option key={`end-${opt.week}`} value={opt.week}>
                    {opt.fullLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Week Range Button */}
            {isRangeModified && (
              <button
                onClick={handleResetWeekRange}
                title="Reset rentang minggu ke penuh (M-0 s/d M-27)"
                className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Preset Range Buttons */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => {
                setStartWeek(0);
                setEndWeek(27);
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                startWeek === 0 && endWeek === 27
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua (27 Mgg)
            </button>
            <button
              onClick={() => {
                setStartWeek(0);
                setEndWeek(11);
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                startWeek === 0 && endWeek === 11
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              M-0 s/d M-11
            </button>
            <button
              onClick={() => {
                setStartWeek(11);
                setEndWeek(27);
              }}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                startWeek === 11 && endWeek === 27
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              M-11 s/d M-27
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive S-Curve Chart */}
      <div className="h-[360px] sm:h-[400px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={sCurveData}
            margin={{ top: 15, right: 20, bottom: 20, left: -10 }}
          >
            <defs>
              <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              tickFormatter={(w) => `M-${w}`}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload;
                return (
                  <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur text-xs min-w-[210px]">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <span className="font-bold text-white">{point.dateLabel} (M-{point.week})</span>
                      {point.isCutoff && (
                        <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold text-[10px]">
                          CUT-OFF DATA
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-400" /> Rencana Kumulatif:
                        </span>
                        <span className="font-mono font-bold text-blue-300">
                          {point.rencanaKumulatif.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Realisasi Kumulatif:
                        </span>
                        <span className="font-mono font-bold text-emerald-300">
                          {point.realisasiKumulatif !== null ? `${point.realisasiKumulatif.toFixed(2)}%` : 'Belum Mulai'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            {/* Cut-off reference line at week 11 (only shown if within selected week range) */}
            {startWeek <= 11 && endWeek >= 11 && (
              <ReferenceLine
                x={11}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{
                  value: `Data Cut-Off: ${cutoffDate}`,
                  position: 'top',
                  fill: '#f59e0b',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            )}

            {/* Target End of Year reference line at week 27 (only shown if within selected week range) */}
            {startWeek <= 27 && endWeek >= 27 && (
              <ReferenceLine
                x={27}
                stroke="#38bdf8"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: 'Target Akhir Des 2026 (100%)',
                  position: 'insideTopLeft',
                  fill: '#38bdf8',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            )}

            {/* Target Baseline S-Curve Area & Line */}
            <Area
              type="monotone"
              dataKey="rencanaKumulatif"
              stroke="#38bdf8"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="url(#plannedGradient)"
              name="Rencana Kumulatif"
            />

            {/* Actual Progress S-Curve Area & Line */}
            <Area
              type="monotone"
              dataKey="realisasiKumulatif"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#actualGradient)"
              name="Realisasi Kumulatif"
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.realisasiKumulatif === null) return null;
                if (payload.week === 11) {
                  return (
                    <g key={`dot-${payload.week}`}>
                      <circle cx={cx} cy={cy} r={6} fill="#10b981" stroke="#ffffff" strokeWidth={2} />
                      <circle cx={cx} cy={cy} r={10} fill="none" stroke="#10b981" strokeWidth={1} className="animate-ping" />
                    </g>
                  );
                }
                return <circle key={`dot-${payload.week}`} cx={cx} cy={cy} r={3} fill="#10b981" />;
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

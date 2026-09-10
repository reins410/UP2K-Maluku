import React, { useState, useMemo } from 'react';
import { LocationProject, UP3Name, TahapName, ProjectStatus } from '../types';
import { Search, ArrowUpDown, ExternalLink, LineChart, Plus, Edit3, Trash2, RotateCcw, MapPin, Building2 } from 'lucide-react';
import { getStatusBadgeInfo } from '../utils/scurveGenerator';

interface LocationTableProps {
  locations: LocationProject[];
  selectedLocation: LocationProject | null;
  onSelectLocation: (loc: LocationProject | null) => void;
  onOpenDetailModal: (loc: LocationProject) => void;
  onAddLocation?: () => void;
  onEditLocation?: (loc: LocationProject) => void;
  onDeleteLocation?: (loc: LocationProject) => void;
  onResetLocations?: () => void;
}

export const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  onOpenDetailModal,
  onAddLocation,
  onEditLocation,
  onDeleteLocation,
  onResetLocations,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUP3, setSelectedUP3] = useState<string>('ALL');
  const [selectedTahap, setSelectedTahap] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'no' | 'progres' | 'nama'>('no');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Compute breakdown counts
  const up3Counts = useMemo(() => {
    return {
      'UP3 MASOHI': locations.filter((l) => l.up3 === 'UP3 MASOHI').length,
      'UP3 TUAL': locations.filter((l) => l.up3 === 'UP3 TUAL').length,
      'UP3 SAUMLAKI': locations.filter((l) => l.up3 === 'UP3 SAUMLAKI').length,
      'UP3 AMBON': locations.filter((l) => l.up3 === 'UP3 AMBON').length,
    };
  }, [locations]);

  const tahapCounts = useMemo(() => {
    return {
      'TAHAP 2': locations.filter((l) => l.tahap === 'TAHAP 2').length,
      'TAHAP 3': locations.filter((l) => l.tahap === 'TAHAP 3').length,
      'TAHAP 4': locations.filter((l) => l.tahap === 'TAHAP 4').length,
    };
  }, [locations]);

  const statusCounts = useMemo(() => {
    return {
      'Belum Mulai': locations.filter((l) => l.progresKeseluruhan === 0).length,
      'On Progress': locations.filter((l) => l.progresKeseluruhan > 0 && l.progresKeseluruhan < 100).length,
      'Selesai': locations.filter((l) => l.progresKeseluruhan >= 100).length,
    };
  }, [locations]);

  // Filtered & Sorted locations
  const filteredLocations = useMemo(() => {
    return locations
      .filter((loc) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchSearch =
            loc.namaDusun.toLowerCase().includes(q) ||
            loc.namaDesa.toLowerCase().includes(q) ||
            loc.kecamatan.toLowerCase().includes(q) ||
            loc.kabupaten.toLowerCase().includes(q) ||
            loc.pelaksana.toLowerCase().includes(q);
          if (!matchSearch) return false;
        }

        // UP3 filter
        if (selectedUP3 !== 'ALL' && loc.up3 !== selectedUP3) return false;

        // Tahap filter
        if (selectedTahap !== 'ALL' && loc.tahap !== selectedTahap) return false;

        // Status filter (Belum Mulai, On Progress, Selesai)
        if (selectedStatus !== 'ALL') {
          const locStatus =
            loc.progresKeseluruhan >= 100
              ? 'Selesai'
              : loc.progresKeseluruhan > 0
              ? 'On Progress'
              : 'Belum Mulai';

          if (selectedStatus === 'On Progress' || selectedStatus === 'On Progres') {
            if (locStatus !== 'On Progress') return false;
          } else if (locStatus !== selectedStatus) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'no') diff = a.no - b.no;
        else if (sortBy === 'progres') diff = a.progresKeseluruhan - b.progresKeseluruhan;
        else if (sortBy === 'nama') diff = a.namaDusun.localeCompare(b.namaDusun);

        return sortOrder === 'asc' ? diff : -diff;
      });
  }, [locations, searchQuery, selectedUP3, selectedTahap, selectedStatus, sortBy, sortOrder]);

  const toggleSort = (column: 'no' | 'progres' | 'nama') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder(column === 'no' || column === 'nama' ? 'asc' : 'desc');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur">
      {/* Header and Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Matriks Progres per Lokasi Proyek
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
              {filteredLocations.length} dari {locations.length} Lokasi Terdaftar
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Kelola dan pantau seluruh daftar cakupan lokasi desa/dusun, volume tiang, konduktor, dan progres fisik.
          </p>
        </div>

        {/* Action Buttons & Search */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {onAddLocation && (
            <button
              onClick={onAddLocation}
              className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-900/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Lokasi Baru</span>
            </button>
          )}

          {onResetLocations && (
            <button
              onClick={onResetLocations}
              title="Kembalikan daftar lokasi ke 25 data awal"
              className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Awal</span>
            </button>
          )}

          {/* Search Bar */}
          <div className="relative min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari dusun, desa, kab, kontraktor..."
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Coverage Breakdown Quick Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-b border-slate-800/60 text-xs">
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            UP3 MASOHI
          </span>
          <span className="font-bold text-white font-mono">{up3Counts['UP3 MASOHI']} Lokasi</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            UP3 TUAL
          </span>
          <span className="font-bold text-white font-mono">{up3Counts['UP3 TUAL']} Lokasi</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            UP3 SAUMLAKI
          </span>
          <span className="font-bold text-white font-mono">{up3Counts['UP3 SAUMLAKI']} Lokasi</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            UP3 AMBON
          </span>
          <span className="font-bold text-white font-mono">{up3Counts['UP3 AMBON']} Lokasi</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-800/60 text-xs">
        {/* UP3 Filter */}
        <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[11px] px-1.5 font-medium">UP3:</span>
          {['ALL', 'UP3 MASOHI', 'UP3 TUAL', 'UP3 SAUMLAKI', 'UP3 AMBON'].map((up) => {
            const count = up === 'ALL' ? locations.length : up3Counts[up as keyof typeof up3Counts] || 0;
            return (
              <button
                key={up}
                onClick={() => setSelectedUP3(up)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedUP3 === up
                    ? 'bg-cyan-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {up === 'ALL' ? `Semua (${count})` : `${up.replace('UP3 ', '')} (${count})`}
              </button>
            );
          })}
        </div>

        {/* Tahap Filter */}
        <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[11px] px-1.5 font-medium">Tahap:</span>
          {['ALL', 'TAHAP 2', 'TAHAP 3', 'TAHAP 4'].map((tahap) => {
            const count = tahap === 'ALL' ? locations.length : tahapCounts[tahap as keyof typeof tahapCounts] || 0;
            return (
              <button
                key={tahap}
                onClick={() => setSelectedTahap(tahap)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedTahap === tahap
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tahap === 'ALL' ? `Semua (${count})` : `${tahap} (${count})`}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[11px] px-1.5 font-medium">Status:</span>
          {['ALL', 'Belum Mulai', 'On Progress', 'Selesai'].map((st) => {
            const count = st === 'ALL' ? locations.length : statusCounts[st as keyof typeof statusCounts] || 0;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'ALL' ? `Semua (${count})` : `${st} (${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Locations Table */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th
                onClick={() => toggleSort('no')}
                className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>No</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('nama')}
                className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Lokasi (Dusun / Desa)</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2.5 px-3">UP3 & Tahap</th>
              <th className="py-2.5 px-3">Kontraktor Pelaksana</th>
              <th
                onClick={() => toggleSort('progres')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Realisasi</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              const displayStatus: ProjectStatus =
                loc.progresKeseluruhan >= 100
                  ? 'Selesai'
                  : loc.progresKeseluruhan > 0
                  ? 'On Progress'
                  : 'Belum Mulai';
              const badge = getStatusBadgeInfo(displayStatus);

              return (
                <tr
                  key={loc.id}
                  className={`transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/40 border-l-4 border-l-cyan-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-3 font-mono text-slate-500 font-semibold">{loc.no}</td>

                  {/* Location Info */}
                  <td className="py-3 px-3 max-w-[220px]">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{loc.namaDusun}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {loc.namaDesa} • {loc.kecamatan}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">
                      {loc.kabupaten}
                    </div>
                  </td>

                  {/* UP3 & Tahap */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-cyan-300 border border-slate-700">
                      {loc.up3.replace('UP3 ', '')}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{loc.tahap}</div>
                  </td>

                  {/* Contractor */}
                  <td className="py-3 px-3 max-w-[190px]">
                    <span className="font-medium text-slate-200 line-clamp-2 text-[11px]" title={loc.pelaksana}>
                      {loc.pelaksana}
                    </span>
                  </td>

                  {/* Realisasi % */}
                  <td className="py-3 px-3 text-right font-mono">
                    <div className="font-bold text-sm text-white">
                      {loc.progresKeseluruhan.toFixed(2)}%
                    </div>
                    <div className="w-20 ml-auto bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div
                        className={`h-full ${
                          loc.progresKeseluruhan === 100
                            ? 'bg-emerald-400'
                            : loc.progresKeseluruhan > 0
                            ? 'bg-cyan-400'
                            : 'bg-slate-700'
                        }`}
                        style={{ width: `${loc.progresKeseluruhan}%` }}
                      />
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {displayStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectLocation(isSelected ? null : loc)}
                        title={isSelected ? 'Hapus filter lokasi' : 'Tampilkan Kurva-S lokasi ini'}
                        className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-white shadow-sm'
                            : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'
                        }`}
                      >
                        <LineChart className="w-3 h-3" />
                        <span>{isSelected ? 'Aktif' : 'Kurva S'}</span>
                      </button>

                      <button
                        onClick={() => onOpenDetailModal(loc)}
                        title="Lihat rincian lengkap pekerjaan lokasi ini"
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      {onEditLocation && (
                        <button
                          onClick={() => onEditLocation(loc)}
                          title="Edit parameter & data lokasi ini"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {onDeleteLocation && (
                        <button
                          onClick={() => onDeleteLocation(loc)}
                          title="Hapus lokasi dari daftar cakupan proyek"
                          className="p-1 rounded bg-slate-800 hover:bg-rose-950/70 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
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

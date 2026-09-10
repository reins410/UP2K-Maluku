import React, { useState, useEffect } from 'react';
import { LocationProject, UP3Name, TahapName, ProjectStatus } from '../types';
import { X, MapPin, Building2, Save, Plus, AlertCircle } from 'lucide-react';

interface AddEditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: LocationProject) => void;
  initialData?: LocationProject | null;
  totalLocationsCount: number;
}

export const AddEditLocationModal: React.FC<AddEditLocationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  totalLocationsCount,
}) => {
  const isEditing = !!initialData;

  const [namaDusun, setNamaDusun] = useState('');
  const [namaDesa, setNamaDesa] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [up3, setUp3] = useState<UP3Name>('UP3 MASOHI');
  const [tahap, setTahap] = useState<TahapName>('TAHAP 3');
  const [pelaksana, setPelaksana] = useState('');

  // Quantities
  const [rencanaTiangTM, setRencanaTiangTM] = useState<number>(0);
  const [realisasiTiangTM, setRealisasiTiangTM] = useState<number>(0);
  const [rencanaTiangTR, setRencanaTiangTR] = useState<number>(0);
  const [realisasiTiangTR, setRealisasiTiangTR] = useState<number>(0);

  const [rencanaJTM, setRencanaJTM] = useState<number>(0);
  const [realisasiJTM, setRealisasiJTM] = useState<number>(0);
  const [rencanaJTR, setRencanaJTR] = useState<number>(0);
  const [realisasiJTR, setRealisasiJTR] = useState<number>(0);

  const [rencanaGardu, setRencanaGardu] = useState<number>(0);
  const [realisasiGardu, setRealisasiGardu] = useState<number>(0);

  // Progress
  const [progresKeseluruhan, setProgresKeseluruhan] = useState<number>(0);
  const [rencanaProgres, setRencanaProgres] = useState<number>(0);
  const [status, setStatus] = useState<ProjectStatus>('Belum Mulai');

  useEffect(() => {
    if (initialData) {
      setNamaDusun(initialData.namaDusun);
      setNamaDesa(initialData.namaDesa);
      setKecamatan(initialData.kecamatan);
      setKabupaten(initialData.kabupaten);
      setUp3(initialData.up3);
      setTahap(initialData.tahap);
      setPelaksana(initialData.pelaksana);

      setRencanaTiangTM(initialData.penanamanTiangTM?.rencanaTotal || 0);
      setRealisasiTiangTM(initialData.penanamanTiangTM?.realisasiTotal || 0);
      setRencanaTiangTR(initialData.penanamanTiangTR?.rencanaTotal || 0);
      setRealisasiTiangTR(initialData.penanamanTiangTR?.realisasiTotal || 0);

      setRencanaJTM(initialData.penarikanKonduktorTM?.rencanaTotal || 0);
      setRealisasiJTM(initialData.penarikanKonduktorTM?.realisasiTotal || 0);
      setRencanaJTR(initialData.penarikanKonduktorTR?.rencanaTotal || 0);
      setRealisasiJTR(initialData.penarikanKonduktorTR?.realisasiTotal || 0);

      setRencanaGardu(initialData.garduDistribusi?.rencanaTotal || 0);
      setRealisasiGardu(initialData.garduDistribusi?.realisasiTotal || 0);

      setProgresKeseluruhan(initialData.progresKeseluruhan);
      setRencanaProgres(initialData.rencanaProgres);
      setStatus(initialData.status);
    } else {
      // Defaults for new entry
      setNamaDusun(`Dusun Baru (${totalLocationsCount + 1})`);
      setNamaDesa('Desa ');
      setKecamatan('Kec. ');
      setKabupaten('Kab. Maluku Tengah');
      setUp3('UP3 MASOHI');
      setTahap('TAHAP 3');
      setPelaksana('PT KONTRAKTOR PELAKSANA');

      setRencanaTiangTM(50);
      setRealisasiTiangTM(0);
      setRencanaTiangTR(20);
      setRealisasiTiangTR(0);

      setRencanaJTM(2.5);
      setRealisasiJTM(0);
      setRencanaJTR(1.0);
      setRealisasiJTR(0);

      setRencanaGardu(1);
      setRealisasiGardu(0);

      setProgresKeseluruhan(0);
      setRencanaProgres(25);
      setStatus('Belum Mulai');
    }
  }, [initialData, isOpen, totalLocationsCount]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deviasi = parseFloat((progresKeseluruhan - rencanaProgres).toFixed(2));
    const totalTiangRencana = rencanaTiangTM + rencanaTiangTR;
    const totalTiangRealisasi = realisasiTiangTM + realisasiTiangTR;

    const computedStatus: ProjectStatus =
      progresKeseluruhan >= 100
        ? 'Selesai'
        : progresKeseluruhan > 0
        ? 'On Progress'
        : 'Belum Mulai';

    const locationObj: LocationProject = {
      id: initialData?.id || `loc-${Date.now()}`,
      no: initialData?.no || totalLocationsCount + 1,
      namaDusun: namaDusun.trim() || `Lokasi ${totalLocationsCount + 1}`,
      namaDesa: namaDesa.trim() || 'Desa',
      kecamatan: kecamatan.trim() || 'Kecamatan',
      kabupaten: kabupaten.trim() || 'Kabupaten',
      tahap,
      up3,
      pelaksana: pelaksana.trim() || 'PT PELAKSANA',
      pematokan: {
        rencanaTotal: totalTiangRencana,
        rencanaTM: rencanaTiangTM,
        rencanaTR: rencanaTiangTR,
        realisasiTotal: Math.min(totalTiangRencana, totalTiangRealisasi),
        realisasiTM: realisasiTiangTM,
        realisasiTR: realisasiTiangTR,
        unit: 'btg',
        persen: totalTiangRencana > 0 ? (totalTiangRealisasi / totalTiangRencana) * 100 : 0,
      },
      penggalian: {
        rencanaTotal: totalTiangRencana,
        rencanaTM: rencanaTiangTM,
        rencanaTR: rencanaTiangTR,
        realisasiTotal: Math.min(totalTiangRencana, totalTiangRealisasi),
        realisasiTM: realisasiTiangTM,
        realisasiTR: realisasiTiangTR,
        unit: 'titik',
        persen: totalTiangRencana > 0 ? (totalTiangRealisasi / totalTiangRencana) * 100 : 0,
      },
      pengeceran: {
        rencanaTotal: totalTiangRencana,
        rencanaTM: rencanaTiangTM,
        rencanaTR: rencanaTiangTR,
        realisasiTotal: Math.min(totalTiangRencana, totalTiangRealisasi),
        realisasiTM: realisasiTiangTM,
        realisasiTR: realisasiTiangTR,
        unit: 'btg',
        persen: totalTiangRencana > 0 ? (totalTiangRealisasi / totalTiangRencana) * 100 : 0,
      },
      perambasan: {
        rencanaTotal: rencanaJTM,
        realisasiTotal: realisasiJTM,
        unit: 'kms',
        persen: rencanaJTM > 0 ? (realisasiJTM / rencanaJTM) * 100 : 0,
      },
      penanamanTiang: {
        rencanaTotal: totalTiangRencana,
        rencanaTM: rencanaTiangTM,
        rencanaTR: rencanaTiangTR,
        realisasiTotal: totalTiangRealisasi,
        realisasiTM: realisasiTiangTM,
        realisasiTR: realisasiTiangTR,
        unit: 'btg',
        persen: totalTiangRencana > 0 ? (totalTiangRealisasi / totalTiangRencana) * 100 : 0,
      },
      penanamanTiangTM: {
        rencanaTotal: rencanaTiangTM,
        realisasiTotal: realisasiTiangTM,
        unit: 'btg',
        persen: rencanaTiangTM > 0 ? (realisasiTiangTM / rencanaTiangTM) * 100 : 0,
      },
      penanamanTiangTR: {
        rencanaTotal: rencanaTiangTR,
        realisasiTotal: realisasiTiangTR,
        unit: 'btg',
        persen: rencanaTiangTR > 0 ? (realisasiTiangTR / rencanaTiangTR) * 100 : 0,
      },
      penarikanKonduktorTM: {
        rencanaTotal: rencanaJTM,
        realisasiTotal: realisasiJTM,
        unit: 'kms',
        persen: rencanaJTM > 0 ? (realisasiJTM / rencanaJTM) * 100 : 0,
      },
      penarikanKonduktorTR: {
        rencanaTotal: rencanaJTR,
        realisasiTotal: realisasiJTR,
        unit: 'kms',
        persen: rencanaJTR > 0 ? (realisasiJTR / rencanaJTR) * 100 : 0,
      },
      garduDistribusi: {
        rencanaTotal: rencanaGardu,
        realisasiTotal: realisasiGardu,
        unit: 'unit',
        persen: rencanaGardu > 0 ? (realisasiGardu / rencanaGardu) * 100 : 0,
      },
      progresKeseluruhan,
      rencanaProgres,
      deviasi,
      status: computedStatus,
      lastUpdated: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    onSave(locationObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              {isEditing ? <MapPin className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {isEditing ? `Edit Data Lokasi Proyek #${initialData.no}` : 'Tambah Lokasi Proyek Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEditing
                  ? `Memperbarui rincian cakupan proyek untuk ${initialData.namaDusun}`
                  : `Menambahkan titik desa ke dalam cakupan portofolio LISDES (${totalLocationsCount + 1} Lokasi)`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Section 1: Identitas Lokasi */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-cyan-400">
              <MapPin className="w-3.5 h-3.5" />
              Identitas Dusun & Wilayah Administratif
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Dusun *</label>
                <input
                  type="text"
                  required
                  value={namaDusun}
                  onChange={(e) => setNamaDusun(e.target.value)}
                  placeholder="e.g. Dusun Rumah 10"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nama Desa *</label>
                <input
                  type="text"
                  required
                  value={namaDesa}
                  onChange={(e) => setNamaDesa(e.target.value)}
                  placeholder="e.g. Desa Aketernate"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={kecamatan}
                  onChange={(e) => setKecamatan(e.target.value)}
                  placeholder="e.g. Kec. Seram Utara Timur Seti"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kabupaten</label>
                <input
                  type="text"
                  value={kabupaten}
                  onChange={(e) => setKabupaten(e.target.value)}
                  placeholder="e.g. Kab. Maluku Tengah"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Penugasan UP3 & Kontraktor */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-blue-400">
              <Building2 className="w-3.5 h-3.5" />
              Wilayah Kerja UP3 & Kontraktor
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">UP3 Pengawas *</label>
                <select
                  value={up3}
                  onChange={(e) => setUp3(e.target.value as UP3Name)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="UP3 MASOHI">UP3 MASOHI</option>
                  <option value="UP3 TUAL">UP3 TUAL</option>
                  <option value="UP3 SAUMLAKI">UP3 SAUMLAKI</option>
                  <option value="UP3 AMBON">UP3 AMBON</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tahap Anggaran *</label>
                <select
                  value={tahap}
                  onChange={(e) => setTahap(e.target.value as TahapName)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="TAHAP 2">TAHAP 2</option>
                  <option value="TAHAP 3">TAHAP 3</option>
                  <option value="TAHAP 4">TAHAP 4</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kontraktor Pelaksana</label>
                <input
                  type="text"
                  value={pelaksana}
                  onChange={(e) => setPelaksana(e.target.value)}
                  placeholder="e.g. PT SINAR GLORI DATIER"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Rencana & Realisasi Tiang Listrik */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-amber-400">
              ⚡ Volume Tiang Listrik (Batang)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Tiang TM Rencana</label>
                <input
                  type="number"
                  min="0"
                  value={rencanaTiangTM}
                  onChange={(e) => setRencanaTiangTM(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tiang TM Realisasi</label>
                <input
                  type="number"
                  min="0"
                  value={realisasiTiangTM}
                  onChange={(e) => setRealisasiTiangTM(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-400 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tiang TR Rencana</label>
                <input
                  type="number"
                  min="0"
                  value={rencanaTiangTR}
                  onChange={(e) => setRencanaTiangTR(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Tiang TR Realisasi</label>
                <input
                  type="number"
                  min="0"
                  value={realisasiTiangTR}
                  onChange={(e) => setRealisasiTiangTR(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-cyan-400 font-bold focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Jaringan & Gardu */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-teal-400">
              🔌 Jaringan Konduktor & Gardu Distribusi
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">JTM Rencana / Real (kms)</label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Rencana"
                    value={rencanaJTM}
                    onChange={(e) => setRencanaJTM(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono text-xs"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Realisasi"
                    value={realisasiJTM}
                    onChange={(e) => setRealisasiJTM(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-blue-400 font-bold font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">JTR Rencana / Real (kms)</label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Rencana"
                    value={rencanaJTR}
                    onChange={(e) => setRencanaJTR(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono text-xs"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Realisasi"
                    value={realisasiJTR}
                    onChange={(e) => setRealisasiJTR(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-teal-400 font-bold font-mono text-xs"
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="text-slate-400 block mb-1">Gardu Rencana / Real (unit)</label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="0"
                    placeholder="Rencana"
                    value={rencanaGardu}
                    onChange={(e) => setRencanaGardu(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white font-mono text-xs"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Realisasi"
                    value={realisasiGardu}
                    onChange={(e) => setRealisasiGardu(Number(e.target.value))}
                    className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-purple-400 font-bold font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Capaian Progres (%) */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5 text-emerald-400">
              📈 Capaian Progres & Deviasi (%)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Progres Realisasi Aktual (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  value={progresKeseluruhan}
                  onChange={(e) => setProgresKeseluruhan(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Rencana (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  value={rencanaProgres}
                  onChange={(e) => setRencanaProgres(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-blue-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deviasi Terhitung</label>
                <div className={`px-3 py-2 rounded-lg font-mono font-bold text-sm border ${
                  progresKeseluruhan - rencanaProgres >= 0
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-800 text-rose-300'
                }`}>
                  {(progresKeseluruhan - rencanaProgres >= 0 ? '+' : '') + (progresKeseluruhan - rencanaProgres).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg shadow-cyan-900/30"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan Lokasi' : 'Tambahkan ke Daftar Proyek'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

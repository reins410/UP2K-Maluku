export type UP3Name = 'UP3 MASOHI' | 'UP3 TUAL' | 'UP3 SAUMLAKI' | 'UP3 AMBON';
export type TahapName = 'TAHAP 1' | 'TAHAP 2' | 'TAHAP 3' | 'TAHAP 4' | 'TAHAP 5';
export type ProjectStatus = 'Selesai' | 'On Progress' | 'Belum Mulai';

export interface WorkItemBreakdown {
  rencanaTotal: number;
  rencanaTM?: number;
  rencanaTR?: number;
  realisasiTotal: number;
  realisasiTM?: number;
  realisasiTR?: number;
  unit: string;
  persen: number;
}

export interface LocationProject {
  id: string;
  no: number;
  namaDusun: string;
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  kodeDesa?: string;
  ulp?: string;
  tahap: TahapName;
  up3: UP3Name;
  pelaksana: string;
  nilaiKontrak?: string;
  nilaiRealisasi?: string;
  capel?: number;
  noSpbj?: string;
  tglAwalKontrak?: string;
  tglAkhirKontrak?: string;
  targetSelesai?: string;
  pematokan: WorkItemBreakdown;
  penggalian: WorkItemBreakdown;
  pengeceran: WorkItemBreakdown;
  perambasan: WorkItemBreakdown;
  penanamanTiang: WorkItemBreakdown;
  penanamanTiangTM: WorkItemBreakdown;
  penanamanTiangTR: WorkItemBreakdown;
  penarikanKonduktorTM: WorkItemBreakdown;
  penarikanKonduktorTR: WorkItemBreakdown;
  garduDistribusi: WorkItemBreakdown;
  personilVendor?: number;
  personilWarga?: number;
  progresKeseluruhan: number; // percentage
  rencanaProgres: number; // planned progress at cutoff
  deviasi: number; // realisasi - rencana
  status: ProjectStatus;
  lastUpdated: string;
}

export interface SCurveDataPoint {
  week: number;
  dateLabel: string;
  rencanaMingguan: number;
  rencanaKumulatif: number;
  realisasiMingguan: number | null;
  realisasiKumulatif: number | null;
  deviasi: number | null;
  isCutoff?: boolean;
}

export interface WorkPackageOverall {
  no: number;
  nama: string;
  satuan: string;
  rencana: number;
  realisasi: number;
  persen: number;
  rencanaTM?: number;
  realisasiTM?: number;
  rencanaTR?: number;
  realisasiTR?: number;
}

export interface DailyLogEntry {
  id: string;
  tanggal: string;
  lokasiId: string;
  lokasiNama: string;
  up3: UP3Name;
  pekerjaan: string;
  itemDetail: string;
  volume: string;
  kontraktor: string;
  status: 'Selesai' | 'Dalam Proses' | 'Tertunda';
  catatan?: string;
  cuaca?: 'Cerah' | 'Hujan Ringan' | 'Hujan Deras / Gelombang Laut';
}

export interface SyncConfig {
  sourceUrl: string;
  isLive: boolean;
  autoRefresh: boolean;
  refreshIntervalSec: number;
  lastSyncTime: string | null;
  status: 'connected' | 'syncing' | 'error' | 'idle';
  errorMessage?: string;
}

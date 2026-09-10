import { LocationProject, DailyLogEntry, UP3Name } from '../types';

export interface CumulativeWorkItemSummary {
  no: number;
  nama: string;
  satuan: string;
  rencanaTotal: number;
  rencanaTM?: number;
  rencanaTR?: number;
  realisasiLalu: number;
  realisasiPeriodeIni: number;
  realisasiKumulatif: number;
  realisasiTM?: number;
  realisasiTR?: number;
  persen: number;
  sisaVolume: number;
  status: 'Selesai' | 'On Progress' | 'Belum Mulai';
}

export interface WeekPeriodInfo {
  week: number;
  startDate: string;
  endDate: string;
  label: string;
  fullLabel: string;
  isCutoff?: boolean;
}

// Generate weekly calendar ranges for Lisdes UPPK Maluku (M-1 to M-27)
export function getWeeklyPeriods(totalWeeks: number = 27): WeekPeriodInfo[] {
  const periods: WeekPeriodInfo[] = [];
  const startMilestone = new Date(2026, 5, 27); // 27 Juni 2026

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  for (let w = 1; w <= totalWeeks; w++) {
    const wStart = new Date(startMilestone.getTime() + (w - 1) * 7 * 24 * 60 * 60 * 1000);
    const wEnd = new Date(startMilestone.getTime() + (w * 7 - 1) * 24 * 60 * 60 * 1000);

    const startStr = `${wStart.getDate().toString().padStart(2, '0')} ${monthNames[wStart.getMonth()]}`;
    const endStr = `${wEnd.getDate().toString().padStart(2, '0')} ${monthNames[wEnd.getMonth()]}`;

    periods.push({
      week: w,
      startDate: startStr,
      endDate: endStr,
      label: `M-${w}`,
      fullLabel: `Minggu ke-${w} (${startStr} - ${endStr} 2026)`,
      isCutoff: w === 11,
    });
  }

  return periods;
}

// Predefined available daily dates for UPPK Maluku project logging
export const AVAILABLE_DAILY_DATES = [
  '10 Sep 2026',
  '09 Sep 2026',
  '08 Sep 2026',
  '07 Sep 2026',
  '06 Sep 2026',
  '05 Sep 2026',
  '04 Sep 2026',
  '03 Sep 2026',
  '02 Sep 2026',
  '01 Sep 2026',
  '31 Agu 2026',
  '30 Agu 2026',
  '29 Agu 2026',
];

// Calculate cumulative work item progress from filtered locations
export function calculateCumulativeWorkItems(
  locations: LocationProject[],
  frequency: 'daily' | 'weekly',
  periodIndex: number = 11 // default week 11 or cut-off
): CumulativeWorkItemSummary[] {
  // Aggregate baseline plans and current realisasi totals from locations
  const totals = {
    pematokanRencana: 0,
    pematokanRencanaTM: 0,
    pematokanRencanaTR: 0,
    pematokanRealisasi: 0,
    pematokanRealisasiTM: 0,
    pematokanRealisasiTR: 0,

    penggalianRencana: 0,
    penggalianRencanaTM: 0,
    penggalianRencanaTR: 0,
    penggalianRealisasi: 0,
    penggalianRealisasiTM: 0,
    penggalianRealisasiTR: 0,

    pengeceranRencana: 0,
    pengeceranRencanaTM: 0,
    pengeceranRencanaTR: 0,
    pengeceranRealisasi: 0,
    pengeceranRealisasiTM: 0,
    pengeceranRealisasiTR: 0,

    perambasanRencana: 0,
    perambasanRealisasi: 0,

    tiangTMRencana: 0,
    tiangTMRealisasi: 0,

    tiangTRRencana: 0,
    tiangTRRealisasi: 0,

    tarikTMRencana: 0,
    tarikTMRealisasi: 0,

    tarikTRRencana: 0,
    tarikTRRealisasi: 0,

    garduRencana: 0,
    garduRealisasi: 0,
  };

  locations.forEach((loc) => {
    totals.pematokanRencana += loc.pematokan.rencanaTotal || 0;
    totals.pematokanRencanaTM += loc.pematokan.rencanaTM || 0;
    totals.pematokanRencanaTR += loc.pematokan.rencanaTR || 0;
    totals.pematokanRealisasi += loc.pematokan.realisasiTotal || 0;
    totals.pematokanRealisasiTM += loc.pematokan.realisasiTM || 0;
    totals.pematokanRealisasiTR += loc.pematokan.realisasiTR || 0;

    totals.penggalianRencana += loc.penggalian.rencanaTotal || 0;
    totals.penggalianRencanaTM += loc.penggalian.rencanaTM || 0;
    totals.penggalianRencanaTR += loc.penggalian.rencanaTR || 0;
    totals.penggalianRealisasi += loc.penggalian.realisasiTotal || 0;
    totals.penggalianRealisasiTM += loc.penggalian.realisasiTM || 0;
    totals.penggalianRealisasiTR += loc.penggalian.realisasiTR || 0;

    totals.pengeceranRencana += loc.pengeceran.rencanaTotal || 0;
    totals.pengeceranRencanaTM += loc.pengeceran.rencanaTM || 0;
    totals.pengeceranRencanaTR += loc.pengeceran.rencanaTR || 0;
    totals.pengeceranRealisasi += loc.pengeceran.realisasiTotal || 0;
    totals.pengeceranRealisasiTM += loc.pengeceran.realisasiTM || 0;
    totals.pengeceranRealisasiTR += loc.pengeceran.realisasiTR || 0;

    totals.perambasanRencana += loc.perambasan.rencanaTotal || 0;
    totals.perambasanRealisasi += loc.perambasan.realisasiTotal || 0;

    totals.tiangTMRencana += loc.penanamanTiangTM.rencanaTotal || 0;
    totals.tiangTMRealisasi += loc.penanamanTiangTM.realisasiTotal || 0;

    totals.tiangTRRencana += loc.penanamanTiangTR.rencanaTotal || 0;
    totals.tiangTRRealisasi += loc.penanamanTiangTR.realisasiTotal || 0;

    totals.tarikTMRencana += loc.penarikanKonduktorTM.rencanaTotal || 0;
    totals.tarikTMRealisasi += loc.penarikanKonduktorTM.realisasiTotal || 0;

    totals.tarikTRRencana += loc.penarikanKonduktorTR.rencanaTotal || 0;
    totals.tarikTRRealisasi += loc.penarikanKonduktorTR.realisasiTotal || 0;

    totals.garduRencana += loc.garduDistribusi.rencanaTotal || 0;
    totals.garduRealisasi += loc.garduDistribusi.realisasiTotal || 0;
  });

  const tiangTotalRencana = totals.tiangTMRencana + totals.tiangTRRencana;
  const tiangTotalRealisasi = totals.tiangTMRealisasi + totals.tiangTRRealisasi;

  // Incremental ratio calculation:
  // For daily: approx 8-15% of current progress occurred on the current day
  // For weekly: approx 25-35% of current progress occurred during the current week
  const factor = frequency === 'daily' ? 0.08 : 0.28;

  function buildItem(
    no: number,
    nama: string,
    satuan: string,
    rencana: number,
    realisasiKum: number,
    rencanaTM?: number,
    realisasiTM?: number,
    rencanaTR?: number,
    realisasiTR?: number
  ): CumulativeWorkItemSummary {
    const isFloat = satuan === 'kms';
    const realisasiPeriode = isFloat
      ? Number((realisasiKum * factor).toFixed(3))
      : Math.round(realisasiKum * factor);
    const realisasiLalu = isFloat
      ? Number(Math.max(0, realisasiKum - realisasiPeriode).toFixed(3))
      : Math.max(0, realisasiKum - realisasiPeriode);
    const sisa = isFloat
      ? Number(Math.max(0, rencana - realisasiKum).toFixed(3))
      : Math.max(0, rencana - realisasiKum);
    const pct = rencana > 0 ? Number(((realisasiKum / rencana) * 100).toFixed(2)) : 0;

    let status: 'Selesai' | 'On Progress' | 'Belum Mulai' = 'Belum Mulai';
    if (pct >= 100) status = 'Selesai';
    else if (pct > 0) status = 'On Progress';
    else status = 'Belum Mulai';

    return {
      no,
      nama,
      satuan,
      rencanaTotal: isFloat ? Number(rencana.toFixed(3)) : rencana,
      rencanaTM,
      rencanaTR,
      realisasiLalu,
      realisasiPeriodeIni: realisasiPeriode,
      realisasiKumulatif: isFloat ? Number(realisasiKum.toFixed(3)) : realisasiKum,
      realisasiTM,
      realisasiTR,
      persen: pct,
      sisaVolume: sisa,
      status,
    };
  }

  return [
    buildItem(
      1,
      'Pematokan Jalur & Titik Tiang (Survey)',
      'btg/titik',
      totals.pematokanRencana,
      totals.pematokanRealisasi,
      totals.pematokanRencanaTM,
      totals.pematokanRealisasiTM,
      totals.pematokanRencanaTR,
      totals.pematokanRealisasiTR
    ),
    buildItem(
      2,
      'Penggalian Tanah Titik Tiang',
      'titik',
      totals.penggalianRencana,
      totals.penggalianRealisasi,
      totals.penggalianRencanaTM,
      totals.penggalianRealisasiTM,
      totals.penggalianRencanaTR,
      totals.penggalianRealisasiTR
    ),
    buildItem(
      3,
      'Pengeceran Tiang (Transportasi ke Titik)',
      'btg',
      totals.pengeceranRencana,
      totals.pengeceranRealisasi,
      totals.pengeceranRencanaTM,
      totals.pengeceranRealisasiTM,
      totals.pengeceranRencanaTR,
      totals.pengeceranRealisasiTR
    ),
    buildItem(
      4,
      'Perambasan Pohon (Right of Way / ROW)',
      'kms',
      totals.perambasanRencana,
      totals.perambasanRealisasi
    ),
    buildItem(
      5,
      'Penanaman Tiang Total (TM + TR)',
      'btg',
      tiangTotalRencana,
      tiangTotalRealisasi,
      totals.tiangTMRencana,
      totals.tiangTMRealisasi,
      totals.tiangTRRencana,
      totals.tiangTRRealisasi
    ),
    buildItem(
      6,
      'Penanaman Tiang TM (Tegangan Menengah)',
      'btg',
      totals.tiangTMRencana,
      totals.tiangTMRealisasi
    ),
    buildItem(
      7,
      'Penanaman Tiang TR (Tegangan Rendah)',
      'btg',
      totals.tiangTRRencana,
      totals.tiangTRRealisasi
    ),
    buildItem(
      8,
      'Penarikan Konduktor TM (JTM AAAC-S)',
      'kms',
      totals.tarikTMRencana,
      totals.tarikTMRealisasi
    ),
    buildItem(
      9,
      'Penarikan Konduktor TR (JTR LVTC)',
      'kms',
      totals.tarikTRRencana,
      totals.tarikTRRealisasi
    ),
    buildItem(
      10,
      'Pekerjaan Gardu Distribusi (Trafo & Aksesoris)',
      'unit',
      totals.garduRencana,
      totals.garduRealisasi
    ),
  ];
}

// Generate CSV string for cumulative work item report
export function generateCumulativeReportCSV(
  items: CumulativeWorkItemSummary[],
  title: string,
  periodLabel: string,
  up3Filter: string
): string {
  const headerLines = [
    `"PT PLN (PERSERO) UIW MALUKU DAN MALUKU UTARA"`,
    `"UPPK MALUKU - PROGRAM LISTRIK DESA (LISDES)"`,
    `"${title.toUpperCase()}"`,
    `"Periode: ${periodLabel} | Filter UP3: ${up3Filter}"`,
    `"Tanggal Ekspor: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}"`,
    '',
    `"No","Uraian Pekerjaan","Satuan","Target Rencana (Kontrak)","Realisasi Periode Lalu","Realisasi Periode Ini","Realisasi Kumulatif","Capaian Kumulatif (%)","Sisa Volume","Status"`,
  ];

  const dataLines = items.map((item) => {
    return [
      item.no,
      `"${item.nama}"`,
      `"${item.satuan}"`,
      item.rencanaTotal,
      item.realisasiLalu,
      item.realisasiPeriodeIni,
      item.realisasiKumulatif,
      `${item.persen}%`,
      item.sisaVolume,
      `"${item.status}"`,
    ].join(',');
  });

  return [...headerLines, ...dataLines].join('\n');
}

// Generate CSV string for location details report
export function generateLocationDetailsReportCSV(
  locations: LocationProject[],
  title: string,
  periodLabel: string,
  up3Filter: string
): string {
  const headerLines = [
    `"PT PLN (PERSERO) UIW MALUKU DAN MALUKU UTARA"`,
    `"UPPK MALUKU - PROGRAM LISTRIK DESA (LISDES)"`,
    `"${title.toUpperCase()}"`,
    `"Periode: ${periodLabel} | Filter UP3: ${up3Filter}"`,
    `"Tanggal Ekspor: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}"`,
    '',
    `"No","Nama Dusun","Nama Desa","Kecamatan","Kabupaten","UP3","Tahap","Kontraktor Pelaksana","Rencana Kumulatif (%)","Realisasi Kumulatif (%)","Deviasi (%)","Status","Tanam Tiang TM (Btg)","Tanam Tiang TR (Btg)","Tarik JTM (kms)","Tarik JTR (kms)","Gardu (unit)"`,
  ];

  const dataLines = locations.map((loc, idx) => {
    return [
      idx + 1,
      `"${loc.namaDusun}"`,
      `"${loc.namaDesa}"`,
      `"${loc.kecamatan}"`,
      `"${loc.kabupaten}"`,
      `"${loc.up3}"`,
      `"${loc.tahap}"`,
      `"${loc.pelaksana}"`,
      `${loc.rencanaProgres.toFixed(2)}%`,
      `${loc.progresKeseluruhan.toFixed(2)}%`,
      `${loc.deviasi >= 0 ? '+' : ''}${loc.deviasi.toFixed(2)}%`,
      `"${loc.status}"`,
      `"${loc.penanamanTiangTM.realisasiTotal} / ${loc.penanamanTiangTM.rencanaTotal}"`,
      `"${loc.penanamanTiangTR.realisasiTotal} / ${loc.penanamanTiangTR.rencanaTotal}"`,
      `"${loc.penarikanKonduktorTM.realisasiTotal} / ${loc.penarikanKonduktorTM.rencanaTotal}"`,
      `"${loc.penarikanKonduktorTR.realisasiTotal} / ${loc.penarikanKonduktorTR.rencanaTotal}"`,
      `"${loc.garduDistribusi.realisasiTotal} / ${loc.garduDistribusi.rencanaTotal}"`,
    ].join(',');
  });

  return [...headerLines, ...dataLines].join('\n');
}

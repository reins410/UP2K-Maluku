import { LocationProject, WorkPackageOverall } from '../types';

/**
 * Dynamically computes overall work packages directly from the current list of locations
 * Whenever the Google Sheet is updated or re-synced, this ensures all work items reflect
 * the true aggregated volume and completion percentage.
 */
export function computeWorkPackagesFromLocations(locations: LocationProject[]): WorkPackageOverall[] {
  let rencPematokan = 0;
  let realPematokan = 0;
  let rencTM_pem = 0;
  let realTM_pem = 0;
  let rencTR_pem = 0;
  let realTR_pem = 0;

  let rencPenggalian = 0;
  let realPenggalian = 0;
  let rencTM_gali = 0;
  let realTM_gali = 0;
  let rencTR_gali = 0;
  let realTR_gali = 0;

  let rencPengeceran = 0;
  let realPengeceran = 0;
  let rencTM_ecer = 0;
  let realTM_ecer = 0;
  let rencTR_ecer = 0;
  let realTR_ecer = 0;

  let rencPerambasan = 0;
  let realPerambasan = 0;

  let rencTiang = 0;
  let realTiang = 0;
  let rencTiangTM = 0;
  let realTiangTM = 0;
  let rencTiangTR = 0;
  let realTiangTR = 0;

  let rencKondTM = 0;
  let realKondTM = 0;

  let rencKondTR = 0;
  let realKondTR = 0;

  let rencGardu = 0;
  let realGardu = 0;

  for (const loc of locations) {
    rencPematokan += loc.pematokan?.rencanaTotal || 0;
    realPematokan += loc.pematokan?.realisasiTotal || 0;
    rencTM_pem += loc.pematokan?.rencanaTM || 0;
    realTM_pem += loc.pematokan?.realisasiTM || 0;
    rencTR_pem += loc.pematokan?.rencanaTR || 0;
    realTR_pem += loc.pematokan?.realisasiTR || 0;

    rencPenggalian += loc.penggalian?.rencanaTotal || 0;
    realPenggalian += loc.penggalian?.realisasiTotal || 0;
    rencTM_gali += loc.penggalian?.rencanaTM || 0;
    realTM_gali += loc.penggalian?.realisasiTM || 0;
    rencTR_gali += loc.penggalian?.rencanaTR || 0;
    realTR_gali += loc.penggalian?.realisasiTR || 0;

    rencPengeceran += loc.pengeceran?.rencanaTotal || 0;
    realPengeceran += loc.pengeceran?.realisasiTotal || 0;
    rencTM_ecer += loc.pengeceran?.rencanaTM || 0;
    realTM_ecer += loc.pengeceran?.realisasiTM || 0;
    rencTR_ecer += loc.pengeceran?.rencanaTR || 0;
    realTR_ecer += loc.pengeceran?.realisasiTR || 0;

    rencPerambasan += loc.perambasan?.rencanaTotal || 0;
    realPerambasan += loc.perambasan?.realisasiTotal || 0;

    rencTiang += loc.penanamanTiang?.rencanaTotal || 0;
    realTiang += loc.penanamanTiang?.realisasiTotal || 0;

    rencTiangTM += loc.penanamanTiangTM?.rencanaTotal || 0;
    realTiangTM += loc.penanamanTiangTM?.realisasiTotal || 0;

    rencTiangTR += loc.penanamanTiangTR?.rencanaTotal || 0;
    realTiangTR += loc.penanamanTiangTR?.realisasiTotal || 0;

    rencKondTM += loc.penarikanKonduktorTM?.rencanaTotal || 0;
    realKondTM += loc.penarikanKonduktorTM?.realisasiTotal || 0;

    rencKondTR += loc.penarikanKonduktorTR?.rencanaTotal || 0;
    realKondTR += loc.penarikanKonduktorTR?.realisasiTotal || 0;

    rencGardu += loc.garduDistribusi?.rencanaTotal || 0;
    realGardu += loc.garduDistribusi?.realisasiTotal || 0;
  }

  const calcPct = (real: number, renc: number): number =>
    renc > 0 ? parseFloat(((real / renc) * 100).toFixed(2)) : 0;

  return [
    {
      no: 1,
      nama: 'Pematokan Jalur & Titik Tiang',
      satuan: 'btg/titik',
      rencana: rencPematokan,
      realisasi: realPematokan,
      persen: calcPct(realPematokan, rencPematokan),
      rencanaTM: rencTM_pem,
      realisasiTM: realTM_pem,
      rencanaTR: rencTR_pem,
      realisasiTR: realTR_pem,
    },
    {
      no: 2,
      nama: 'Penggalian Tanah',
      satuan: 'titik',
      rencana: rencPenggalian,
      realisasi: realPenggalian,
      persen: calcPct(realPenggalian, rencPenggalian),
      rencanaTM: rencTM_gali,
      realisasiTM: realTM_gali,
      rencanaTR: rencTR_gali,
      realisasiTR: realTR_gali,
    },
    {
      no: 3,
      nama: 'Pengeceran Tiang',
      satuan: 'btg',
      rencana: rencPengeceran,
      realisasi: realPengeceran,
      persen: calcPct(realPengeceran, rencPengeceran),
      rencanaTM: rencTM_ecer,
      realisasiTM: realTM_ecer,
      rencanaTR: rencTR_ecer,
      realisasiTR: realTR_ecer,
    },
    {
      no: 4,
      nama: 'Perambasan Pohon (Right of Way / ROW)',
      satuan: 'kms',
      rencana: parseFloat(rencPerambasan.toFixed(2)),
      realisasi: parseFloat(realPerambasan.toFixed(2)),
      persen: calcPct(realPerambasan, rencPerambasan),
    },
    {
      no: 5,
      nama: 'Penanaman Tiang Total',
      satuan: 'btg',
      rencana: rencTiang,
      realisasi: realTiang,
      persen: calcPct(realTiang, rencTiang),
      rencanaTM: rencTiangTM,
      realisasiTM: realTiangTM,
      rencanaTR: rencTiangTR,
      realisasiTR: realTiangTR,
    },
    {
      no: 6,
      nama: 'Penanaman Tiang TM (Tegangan Menengah)',
      satuan: 'btg',
      rencana: rencTiangTM,
      realisasi: realTiangTM,
      persen: calcPct(realTiangTM, rencTiangTM),
    },
    {
      no: 7,
      nama: 'Penarikan Konduktor TM',
      satuan: 'kms',
      rencana: parseFloat(rencKondTM.toFixed(3)),
      realisasi: parseFloat(realKondTM.toFixed(3)),
      persen: calcPct(realKondTM, rencKondTM),
    },
    {
      no: 8,
      nama: 'Penanaman Tiang TR (Tegangan Rendah)',
      satuan: 'btg',
      rencana: rencTiangTR,
      realisasi: realTiangTR,
      persen: calcPct(realTiangTR, rencTiangTR),
    },
    {
      no: 9,
      nama: 'Penarikan Konduktor TR',
      satuan: 'kms',
      rencana: parseFloat(rencKondTR.toFixed(3)),
      realisasi: parseFloat(realKondTR.toFixed(3)),
      persen: calcPct(realKondTR, rencKondTR),
    },
    {
      no: 10,
      nama: 'Pekerjaan Gardu Distribusi',
      satuan: 'unit',
      rencana: rencGardu,
      realisasi: realGardu,
      persen: calcPct(realGardu, rencGardu),
    },
  ];
}

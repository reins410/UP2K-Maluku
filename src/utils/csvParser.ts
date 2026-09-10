import { LocationProject, TahapName, UP3Name, ProjectStatus } from '../types';

// Convert Indonesian formatted numbers (e.g., "21,62%", "1.230", "0,3951923077", "-") to float
export function parseIdNumber(val: string | number | undefined | null): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.trim().replace(/%/g, '').replace(/#N\/A/gi, '0').replace(/-/g, '0');
  if (!cleaned) return 0;
  // If format is like "21,62", replace comma with dot
  const normalized = cleaned.replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(normalized);
  return isNaN(num) ? 0 : num;
}

// Split CSV lines taking quotes into account
export function parseCSVToRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  return rows;
}

// Parse row-based official "MONITORING PEKERJAAN LISDES APBN 2026" Google Sheet
function parseRowBasedApbnSheet(
  rows: string[][],
  existingLocations: LocationProject[],
  cutoffDate: string
): LocationProject[] {
  const parsedLocations: LocationProject[] = [];

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    // Find row where first or second column is a valid sequence number (1..200)
    let numIdx = 1;
    let num = parseInt(r[numIdx], 10);
    if (isNaN(num) || num <= 0) {
      numIdx = 0;
      num = parseInt(r[0], 10);
    }
    if (isNaN(num) || num <= 0 || num > 500) continue;

    // Offset based on whether col 0 is empty padding or not
    const offset = numIdx === 1 ? 0 : -1;
    const tahapVal = r[2 + offset] ? r[2 + offset].trim() : '1';
    let tahap: TahapName = 'TAHAP 1';
    if (tahapVal.toUpperCase().includes('2')) tahap = 'TAHAP 2';
    else if (tahapVal.toUpperCase().includes('3')) tahap = 'TAHAP 3';
    else if (tahapVal.toUpperCase().includes('4')) tahap = 'TAHAP 4';
    else if (tahapVal.toUpperCase().includes('5')) tahap = 'TAHAP 5';

    const kodeDesa = r[5 + offset] || '';
    const kabupaten = r[6 + offset] || '';
    const kecamatan = r[7 + offset] || '';
    const desa = r[8 + offset] || '';
    let dusun = r[9 + offset] || `Lokasi ${num}`;
    if (!dusun.toLowerCase().startsWith('dusun') && dusun.trim() !== '') {
      dusun = `Dusun ${dusun}`;
    }

    const up3Raw = (r[11 + offset] || '').toUpperCase().trim();
    let up3: UP3Name = 'UP3 MASOHI';
    if (up3Raw.includes('AMBON')) up3 = 'UP3 AMBON';
    else if (up3Raw.includes('SAUMLAKI')) up3 = 'UP3 SAUMLAKI';
    else if (up3Raw.includes('TUAL')) up3 = 'UP3 TUAL';
    else if (up3Raw.includes('MASOHI')) up3 = 'UP3 MASOHI';

    const ulp = r[12 + offset] || '';
    const pelaksana = r[15 + offset] || 'Belum Ditunjuk (Tahap Perencanaan)';
    const nilaiKontrak = r[16 + offset] ? r[16 + offset].trim() : 'Rp -';
    const nilaiRealisasi = r[23 + offset] ? r[23 + offset].trim() : 'Rp -';

    const jtmPlan = parseIdNumber(r[30 + offset]);
    const jtrPlan = parseIdNumber(r[31 + offset]);
    const gdKvaPlan = parseIdNumber(r[32 + offset]);
    const gdUnitPlan = parseIdNumber(r[33 + offset]);
    const tiang12Plan = parseIdNumber(r[34 + offset]);
    const tiang9Plan = parseIdNumber(r[35 + offset]);
    const tiangTotalPlan = tiang12Plan + tiang9Plan;

    const jtmReal = parseIdNumber(r[36 + offset]);
    const jtrReal = parseIdNumber(r[37 + offset]);
    const gdKvaReal = parseIdNumber(r[38 + offset]);
    const gdUnitReal = parseIdNumber(r[39 + offset]);
    const tiang12Real = parseIdNumber(r[40 + offset]);
    const tiang9Real = parseIdNumber(r[41 + offset]);
    const tiangTotalReal = tiang12Real + tiang9Real;

    const capel = parseIdNumber(r[42 + offset]);
    const noSpbj = r[43 + offset] ? r[43 + offset].trim() : '';
    const tglAwalKontrak = r[44 + offset] ? r[44 + offset].trim() : '';
    const tglAkhirKontrak = r[45 + offset] ? r[45 + offset].trim() : '';
    const targetSelesai = r[46 + offset] ? r[46 + offset].trim() : '';

    // Match with existing location if available to preserve progress
    const existing = existingLocations.find(
      (l) => l.no === num || l.namaDusun.toLowerCase() === dusun.toLowerCase()
    );

    let progres = 0;
    const kontrakVal = parseIdNumber(nilaiKontrak);
    const realisasiVal = parseIdNumber(nilaiRealisasi);
    if (kontrakVal > 0 && realisasiVal > 0) {
      progres = Math.min(100, parseFloat(((realisasiVal / kontrakVal) * 100).toFixed(2)));
    } else if (tiangTotalPlan > 0 && tiangTotalReal > 0) {
      const tiangRatio = tiangTotalReal / tiangTotalPlan;
      const jtmRatio = jtmPlan > 0 ? jtmReal / jtmPlan : tiangRatio > 0 ? tiangRatio * 0.8 : 0;
      const jtrRatio = jtrPlan > 0 ? jtrReal / jtrPlan : tiangRatio > 0 ? tiangRatio * 0.8 : 0;
      const gdRatio = gdUnitPlan > 0 ? gdUnitReal / gdUnitPlan : tiangRatio > 0 ? tiangRatio * 0.5 : 0;
      const weighted = tiangRatio * 0.4 + jtmRatio * 0.3 + jtrRatio * 0.2 + gdRatio * 0.1;
      progres = Math.min(100, parseFloat((weighted * 100).toFixed(2)));
    } else if (existing) {
      progres = existing.progresKeseluruhan;
    }

    let rencanaProgres = existing ? existing.rencanaProgres : 0;
    if (rencanaProgres === 0) {
      if (tahap === 'TAHAP 2') rencanaProgres = 38.5;
      else if (tahap === 'TAHAP 3') rencanaProgres = 25.0;
      else if (tahap === 'TAHAP 4') rencanaProgres = 10.0;
    }

    const deviasi = parseFloat((progres - rencanaProgres).toFixed(2));
    const status = progres >= 100 ? 'Selesai' : progres > 0 ? 'On Progress' : 'Belum Mulai';

    const ratio = progres / 100;
    const tiang12R = tiang12Real > 0 ? tiang12Real : Math.round(tiang12Plan * ratio);
    const tiang9R = tiang9Real > 0 ? tiang9Real : Math.round(tiang9Plan * ratio);
    const tiangTotR = tiang12R + tiang9R;

    parsedLocations.push({
      id: `loc-${num}`,
      no: num,
      namaDusun: dusun,
      namaDesa: desa ? `Desa ${desa}` : existing?.namaDesa || '',
      kecamatan: kecamatan ? `Kec. ${kecamatan}` : existing?.kecamatan || '',
      kabupaten: kabupaten ? `Kab. ${kabupaten}` : existing?.kabupaten || '',
      kodeDesa,
      ulp,
      tahap,
      up3,
      pelaksana,
      nilaiKontrak,
      nilaiRealisasi,
      capel,
      noSpbj,
      tglAwalKontrak,
      tglAkhirKontrak,
      targetSelesai,
      pematokan: {
        rencanaTotal: tiangTotalPlan,
        rencanaTM: tiang12Plan,
        rencanaTR: tiang9Plan,
        realisasiTotal: Math.round(tiangTotalPlan * Math.min(1, ratio * 1.4)),
        realisasiTM: Math.round(tiang12Plan * Math.min(1, ratio * 1.4)),
        realisasiTR: Math.round(tiang9Plan * Math.min(1, ratio * 1.4)),
        unit: 'btg',
        persen: tiangTotalPlan > 0 ? Math.min(100, Math.round((Math.round(tiangTotalPlan * Math.min(1, ratio * 1.4)) / tiangTotalPlan) * 100)) : 0,
      },
      penggalian: {
        rencanaTotal: tiangTotalPlan,
        rencanaTM: tiang12Plan,
        rencanaTR: tiang9Plan,
        realisasiTotal: Math.round(tiangTotalPlan * Math.min(1, ratio * 1.25)),
        realisasiTM: Math.round(tiang12Plan * Math.min(1, ratio * 1.25)),
        realisasiTR: Math.round(tiang9Plan * Math.min(1, ratio * 1.25)),
        unit: 'titik',
        persen: tiangTotalPlan > 0 ? Math.min(100, Math.round((Math.round(tiangTotalPlan * Math.min(1, ratio * 1.25)) / tiangTotalPlan) * 100)) : 0,
      },
      pengeceran: {
        rencanaTotal: tiangTotalPlan,
        rencanaTM: tiang12Plan,
        rencanaTR: tiang9Plan,
        realisasiTotal: Math.round(tiangTotalPlan * Math.min(1, ratio * 1.2)),
        realisasiTM: Math.round(tiang12Plan * Math.min(1, ratio * 1.2)),
        realisasiTR: Math.round(tiang9Plan * Math.min(1, ratio * 1.2)),
        unit: 'btg',
        persen: tiangTotalPlan > 0 ? Math.min(100, Math.round((Math.round(tiangTotalPlan * Math.min(1, ratio * 1.2)) / tiangTotalPlan) * 100)) : 0,
      },
      perambasan: {
        rencanaTotal: parseFloat((jtmPlan + jtrPlan).toFixed(2)),
        realisasiTotal: parseFloat(((jtmPlan + jtrPlan) * Math.min(1, ratio * 1.3)).toFixed(2)),
        unit: 'kms',
        persen: jtmPlan + jtrPlan > 0 ? Math.min(100, Math.round(ratio * 130)) : 0,
      },
      penanamanTiang: {
        rencanaTotal: tiangTotalPlan,
        rencanaTM: tiang12Plan,
        rencanaTR: tiang9Plan,
        realisasiTotal: tiangTotR,
        realisasiTM: tiang12R,
        realisasiTR: tiang9R,
        unit: 'btg',
        persen: tiangTotalPlan > 0 ? Math.round((tiangTotR / tiangTotalPlan) * 100) : 0,
      },
      penanamanTiangTM: {
        rencanaTotal: tiang12Plan,
        realisasiTotal: tiang12R,
        unit: 'btg',
        persen: tiang12Plan > 0 ? Math.round((tiang12R / tiang12Plan) * 100) : 0,
      },
      penanamanTiangTR: {
        rencanaTotal: tiang9Plan,
        realisasiTotal: tiang9R,
        unit: 'btg',
        persen: tiang9Plan > 0 ? Math.round((tiang9R / tiang9Plan) * 100) : 0,
      },
      penarikanKonduktorTM: {
        rencanaTotal: jtmPlan,
        realisasiTotal: jtmReal > 0 ? jtmReal : parseFloat((jtmPlan * ratio).toFixed(3)),
        unit: 'kms',
        persen: jtmPlan > 0 ? Math.round(ratio * 100) : 0,
      },
      penarikanKonduktorTR: {
        rencanaTotal: jtrPlan,
        realisasiTotal: jtrReal > 0 ? jtrReal : parseFloat((jtrPlan * ratio).toFixed(3)),
        unit: 'kms',
        persen: jtrPlan > 0 ? Math.round(ratio * 100) : 0,
      },
      garduDistribusi: {
        rencanaTotal: gdUnitPlan,
        realisasiTotal: gdUnitReal > 0 ? gdUnitReal : ratio >= 0.8 ? gdUnitPlan : 0,
        unit: 'unit',
        persen: gdUnitPlan > 0 ? (ratio >= 0.8 ? 100 : 0) : 0,
      },
      progresKeseluruhan: progres,
      rencanaProgres,
      deviasi,
      status,
      lastUpdated: cutoffDate,
    });
  }

  return parsedLocations;
}

// Parse standard CSV export format (e.g. from exportLocationsToCSV)
function parseStandardExportCSV(
  rows: string[][],
  cutoffDate: string
): LocationProject[] {
  const header = rows[0].map((c) => c.toLowerCase());
  const noIdx = header.findIndex((c) => c === 'no');
  const up3Idx = header.findIndex((c) => c.includes('up3'));
  const tahapIdx = header.findIndex((c) => c.includes('tahap'));
  const dusunIdx = header.findIndex((c) => c.includes('dusun'));
  const desaIdx = header.findIndex((c) => c.includes('desa'));
  const kecIdx = header.findIndex((c) => c.includes('kecamatan'));
  const kabIdx = header.findIndex((c) => c.includes('kabupaten'));
  const pelaksanaIdx = header.findIndex((c) => c.includes('kontraktor') || c.includes('pelaksana'));
  const progIdx = header.findIndex((c) => c.includes('progres realisasi') || c.includes('realisasi (%)'));
  const rencIdx = header.findIndex((c) => c.includes('target rencana') || c.includes('rencana (%)'));
  const tiangRencIdx = header.findIndex((c) => c.includes('tiang rencana'));
  const tiangRealIdx = header.findIndex((c) => c.includes('tiang realisasi'));
  const jtmRencIdx = header.findIndex((c) => c.includes('jtm rencana'));
  const jtrRencIdx = header.findIndex((c) => c.includes('jtr rencana'));
  const garduIdx = header.findIndex((c) => c.includes('gardu'));

  const parsed: LocationProject[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const no = parseInt(r[noIdx] || `${i}`, 10);
    if (isNaN(no) || !r[dusunIdx]) continue;

    const prog = parseIdNumber(r[progIdx]);
    const renc = parseIdNumber(r[rencIdx]);
    const tiangRenc = parseIdNumber(r[tiangRencIdx]);
    const tiangReal = parseIdNumber(r[tiangRealIdx]);
    const jtmRenc = parseIdNumber(r[jtmRencIdx]);
    const jtrRenc = parseIdNumber(r[jtrRencIdx]);
    const gardu = parseIdNumber(r[garduIdx]);

    let tahap: TahapName = 'TAHAP 2';
    const tStr = (r[tahapIdx] || '').toUpperCase();
    if (tStr.includes('1')) tahap = 'TAHAP 1';
    else if (tStr.includes('3')) tahap = 'TAHAP 3';
    else if (tStr.includes('4')) tahap = 'TAHAP 4';
    else if (tStr.includes('5')) tahap = 'TAHAP 5';

    let up3: UP3Name = 'UP3 MASOHI';
    const uStr = (r[up3Idx] || '').toUpperCase();
    if (uStr.includes('AMBON')) up3 = 'UP3 AMBON';
    else if (uStr.includes('SAUMLAKI')) up3 = 'UP3 SAUMLAKI';
    else if (uStr.includes('TUAL')) up3 = 'UP3 TUAL';

    const status = prog >= 100 ? 'Selesai' : prog > 0 ? 'On Progress' : 'Belum Mulai';

    parsed.push({
      id: `loc-${no}`,
      no,
      namaDusun: r[dusunIdx] || `Lokasi ${no}`,
      namaDesa: r[desaIdx] || '',
      kecamatan: r[kecIdx] || '',
      kabupaten: r[kabIdx] || '',
      tahap,
      up3,
      pelaksana: r[pelaksanaIdx] || 'Belum Ditunjuk',
      pematokan: { rencanaTotal: tiangRenc, realisasiTotal: tiangReal, unit: 'btg', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      penggalian: { rencanaTotal: tiangRenc, realisasiTotal: tiangReal, unit: 'titik', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      pengeceran: { rencanaTotal: tiangRenc, realisasiTotal: tiangReal, unit: 'btg', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      perambasan: { rencanaTotal: jtmRenc + jtrRenc, realisasiTotal: 0, unit: 'kms', persen: 0 },
      penanamanTiang: { rencanaTotal: tiangRenc, realisasiTotal: tiangReal, unit: 'btg', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      penanamanTiangTM: { rencanaTotal: Math.round(tiangRenc * 0.7), realisasiTotal: Math.round(tiangReal * 0.7), unit: 'btg', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      penanamanTiangTR: { rencanaTotal: Math.round(tiangRenc * 0.3), realisasiTotal: Math.round(tiangReal * 0.3), unit: 'btg', persen: tiangRenc > 0 ? Math.round((tiangReal / tiangRenc) * 100) : 0 },
      penarikanKonduktorTM: { rencanaTotal: jtmRenc, realisasiTotal: 0, unit: 'kms', persen: 0 },
      penarikanKonduktorTR: { rencanaTotal: jtrRenc, realisasiTotal: 0, unit: 'kms', persen: 0 },
      garduDistribusi: { rencanaTotal: gardu, realisasiTotal: 0, unit: 'unit', persen: 0 },
      progresKeseluruhan: prog,
      rencanaProgres: renc,
      deviasi: parseFloat((prog - renc).toFixed(2)),
      status,
      lastUpdated: cutoffDate,
    });
  }

  return parsed;
}

// Parse Google Sheet or exported CSV containing UPPK Maluku format
export function parseMalukuSheetCSV(csvText: string, existingLocations: LocationProject[]): {
  locations: LocationProject[];
  startDate?: string;
  updateDate?: string;
} {
  const rows = parseCSVToRows(csvText);
  let startDate = '27 Jun 2026';
  let updateDate = '10 Sep 2026';

  // Search for metadata
  for (const r of rows) {
    const r0 = (r[1] || '').toLowerCase();
    if (r0.includes('tanggal mulai')) {
      startDate = r[3] || r[2] || startDate;
    } else if (r0.includes('data update') || r0.includes('cut-off')) {
      updateDate = r[3] || r[2] || updateDate;
    }
  }

  // Check Format 1: Official APBN Monitoring Row-Based Sheet
  const isRowBasedApbn = rows.some((r) =>
    r.some((c) => {
      const s = c.toLowerCase();
      return (
        s.includes('monitoring pekerjaan lisdes') ||
        s.includes('gabungan nama') ||
        s.includes('nilai kontrak') ||
        s.includes('rencana volume pekerjaan')
      );
    })
  );

  if (isRowBasedApbn) {
    const apbnLocations = parseRowBasedApbnSheet(rows, existingLocations, updateDate);
    if (apbnLocations.length > 0) {
      return { locations: apbnLocations, startDate, updateDate };
    }
  }

  // Check Format 2: Standard CSV export with header
  if (rows.length > 1 && rows[0].some((c) => c.toLowerCase().includes('progres realisasi') || c.toLowerCase().includes('kontraktor'))) {
    const stdLocations = parseStandardExportCSV(rows, updateDate);
    if (stdLocations.length > 0) {
      return { locations: stdLocations, startDate, updateDate };
    }
  }

  // Check Format 3: Legacy Column-Based Layout
  let tahapRowIdx = -1;
  let up3RowIdx = -1;
  let dusunRowIdx = -1;
  let pelaksanaRowIdx = -1;

  for (let i = 0; i < rows.length; i++) {
    const rowJoined = rows[i].join(' ').toUpperCase();
    if (rowJoined.includes('TAHAP 2') || rowJoined.includes('TAHAP 3') || rowJoined.includes('TAHAP 4')) {
      tahapRowIdx = i;
    }
    if (rowJoined.includes('UP3 MASOHI') || rowJoined.includes('UP3 TUAL') || rowJoined.includes('UP3 AMBON')) {
      up3RowIdx = i;
    }
    if (rowJoined.includes('DUSUN RUMAH 10') || rowJoined.includes('DUSUN WAIKUDAL')) {
      dusunRowIdx = i;
    }
    if (rowJoined.includes('PT SINAR GLORI') || rowJoined.includes('PT SAMUDRA JAYA')) {
      pelaksanaRowIdx = i;
    }
  }

  if (dusunRowIdx === -1 || tahapRowIdx === -1) {
    // If format doesn't match raw layout, return existing with notice
    return { locations: existingLocations, startDate, updateDate };
  }

  // Location columns start typically at index 5
  const startCol = 5;
  const dusunRow = rows[dusunRowIdx];
  const tahapRow = rows[tahapRowIdx];
  const up3Row = rows[up3RowIdx];
  const pelaksanaRow = pelaksanaRowIdx !== -1 ? rows[pelaksanaRowIdx] : [];

  const parsedLocations: LocationProject[] = [];

  for (let c = startCol; c < dusunRow.length; c++) {
    const fullDesc = dusunRow[c];
    if (!fullDesc || fullDesc.trim() === '') continue;

    // e.g. "Dusun Rumah 10, Desa Aketernate. Kec. Seram Utara Timur Seti, Kab. Maluku Tengah"
    let namaDusun = `Lokasi ${c - startCol + 1}`;
    let namaDesa = '';
    let kecamatan = '';
    let kabupaten = '';

    const parts = fullDesc.split('.');
    if (parts.length >= 1) {
      const dusunDesa = parts[0].split(',');
      namaDusun = dusunDesa[0]?.trim() || namaDusun;
      namaDesa = dusunDesa[1]?.trim() || '';
    }
    if (parts.length >= 2) {
      kecamatan = parts[1]?.trim() || '';
    }
    if (parts.length >= 3) {
      kabupaten = parts[2]?.trim() || '';
    }

    const tahapStr = (tahapRow[c] || 'TAHAP 3').toUpperCase() as TahapName;
    const up3Str = (up3Row[c] || 'UP3 MASOHI').toUpperCase() as UP3Name;
    const pelaksanaStr = pelaksanaRow[c] || 'KONTRAKTOR PELAKSANA';

    // Match with existing or generate default
    const existing = existingLocations.find((l) => l.namaDusun.toLowerCase() === namaDusun.toLowerCase());

    parsedLocations.push(
      existing || {
        id: `loc-${c}`,
        no: c - startCol + 1,
        namaDusun,
        namaDesa,
        kecamatan,
        kabupaten,
        tahap: tahapStr,
        up3: up3Str,
        pelaksana: pelaksanaStr,
        pematokan: { rencanaTotal: 0, realisasiTotal: 0, unit: 'btg', persen: 0 },
        penggalian: { rencanaTotal: 0, realisasiTotal: 0, unit: 'titik', persen: 0 },
        pengeceran: { rencanaTotal: 0, realisasiTotal: 0, unit: 'btg', persen: 0 },
        perambasan: { rencanaTotal: 0, realisasiTotal: 0, unit: 'kms', persen: 0 },
        penanamanTiang: { rencanaTotal: 0, realisasiTotal: 0, unit: 'btg', persen: 0 },
        penanamanTiangTM: { rencanaTotal: 0, realisasiTotal: 0, unit: 'btg', persen: 0 },
        penanamanTiangTR: { rencanaTotal: 0, realisasiTotal: 0, unit: 'btg', persen: 0 },
        penarikanKonduktorTM: { rencanaTotal: 0, realisasiTotal: 0, unit: 'kms', persen: 0 },
        penarikanKonduktorTR: { rencanaTotal: 0, realisasiTotal: 0, unit: 'kms', persen: 0 },
        garduDistribusi: { rencanaTotal: 0, realisasiTotal: 0, unit: 'unit', persen: 0 },
        progresKeseluruhan: 0,
        rencanaProgres: 25,
        deviasi: -25,
        status: 'Belum Mulai',
        lastUpdated: updateDate,
      }
    );
  }

  return {
    locations: parsedLocations.length > 0 ? parsedLocations : existingLocations,
    startDate,
    updateDate,
  };
}

// Convert current locations data to downloadable CSV
export function exportLocationsToCSV(locations: LocationProject[], cutoffDate: string): string {
  const headers = [
    'No',
    'UP3',
    'Tahap',
    'Dusun',
    'Desa',
    'Kecamatan',
    'Kabupaten',
    'Kontraktor',
    'Progres Realisasi (%)',
    'Target Rencana (%)',
    'Deviasi (%)',
    'Status',
    'Tiang Rencana (btg)',
    'Tiang Realisasi (btg)',
    'JTM Rencana (kms)',
    'JTR Rencana (kms)',
    'Gardu (unit)',
    'Last Updated',
  ];

  const lines = [headers.join(',')];

  locations.forEach((loc) => {
    const row = [
      loc.no,
      `"${loc.up3}"`,
      `"${loc.tahap}"`,
      `"${loc.namaDusun}"`,
      `"${loc.namaDesa}"`,
      `"${loc.kecamatan}"`,
      `"${loc.kabupaten}"`,
      `"${loc.pelaksana}"`,
      loc.progresKeseluruhan.toFixed(2),
      loc.rencanaProgres.toFixed(2),
      loc.deviasi.toFixed(2),
      `"${loc.status}"`,
      loc.penanamanTiang.rencanaTotal,
      loc.penanamanTiang.realisasiTotal,
      loc.penarikanKonduktorTM.rencanaTotal,
      loc.penarikanKonduktorTR.rencanaTotal,
      loc.garduDistribusi.rencanaTotal,
      `"${cutoffDate}"`,
    ];
    lines.push(row.join(','));
  });

  return lines.join('\n');
}

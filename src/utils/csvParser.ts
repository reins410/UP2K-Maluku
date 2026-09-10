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
    } else if (r0.includes('data update')) {
      updateDate = r[3] || r[2] || updateDate;
    }
  }

  // Find header rows: Lokasi, Tahap, UP3, Dusun/Desa, Pelaksana
  let tahapRowIdx = -1;
  let up3RowIdx = -1;
  let dusunRowIdx = -1;
  let pelaksanaRowIdx = -1;

  for (let i = 0; i < rows.length; i++) {
    const rowJoined = rows[i].join(' ').toUpperCase();
    if (rowJoined.includes('TAHAP 2') || rowJoined.includes('TAHAP 3')) {
      tahapRowIdx = i;
    }
    if (rowJoined.includes('UP3 MASOHI') || rowJoined.includes('UP3 TUAL')) {
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

import { LocationProject } from '../types';
import { parseMalukuSheetCSV } from '../utils/csvParser';

export interface DriveSpreadsheetItem {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
}

export interface SheetTabInfo {
  sheetId: number;
  title: string;
  rowCount?: number;
  columnCount?: number;
}

export interface SpreadsheetMetadata {
  id: string;
  title: string;
  sheets: SheetTabInfo[];
}

/**
 * List spreadsheets from user's Google Drive
 */
export async function listDriveSpreadsheets(accessToken: string): Promise<DriveSpreadsheetItem[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const fields = encodeURIComponent('files(id,name,modifiedTime,webViewLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=modifiedTime%20desc&pageSize=30&fields=${fields}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gagal mengambil daftar file dari Google Drive (${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Get spreadsheet details and list of tabs
 */
export async function getSpreadsheetMetadata(
  spreadsheetId: string,
  accessToken: string
): Promise<SpreadsheetMetadata> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=properties.title,sheets.properties(sheetId,title,gridProperties)`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gagal mengakses Google Sheet ${spreadsheetId} (${res.status})`);
  }

  const data = await res.json();
  return {
    id: spreadsheetId,
    title: data.properties?.title || 'Spreadsheet Tanpa Judul',
    sheets: (data.sheets || []).map((s: any) => ({
      sheetId: s.properties?.sheetId || 0,
      title: s.properties?.title || 'Sheet1',
      rowCount: s.properties?.gridProperties?.rowCount,
      columnCount: s.properties?.gridProperties?.columnCount,
    })),
  };
}

/**
 * Fetch cell values from a specific sheet range
 */
export async function getSpreadsheetValues(
  spreadsheetId: string,
  range: string,
  accessToken: string
): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gagal membaca isi sel Google Sheet (${res.status})`);
  }

  const data = await res.json();
  const rawValues: any[][] = data.values || [];
  // Stringify all cells
  return rawValues.map((row) => row.map((cell) => (cell === null || cell === undefined ? '' : String(cell))));
}

/**
 * Convert 2D values array from Google Sheets into LocationProject array
 */
export function parseSheetRowsToLocations(
  rows: string[][],
  existingLocations: LocationProject[]
): { locations: LocationProject[]; startDate?: string; updateDate?: string } {
  // Convert 2D array back to CSV string to reuse parseMalukuSheetCSV logic safely
  const csvString = rows
    .map((r) =>
      r
        .map((cell) => {
          const escaped = cell.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    )
    .join('\n');

  return parseMalukuSheetCSV(csvString, existingLocations);
}

/**
 * Export current project data to a brand new Google Spreadsheet in the user's Google Drive
 */
export async function exportToNewGoogleSheet(
  title: string,
  locations: LocationProject[],
  cutoffDate: string,
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  // 1. Create new spreadsheet
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title || `Monitoring Proyek Lisdes UPPK Maluku - ${cutoffDate}`,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gagal membuat Google Sheet baru (${createRes.status})`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

  // 2. Prepare rows
  const headers = [
    'No',
    'UP3',
    'Tahap',
    'Nama Dusun',
    'Nama Desa',
    'Kecamatan',
    'Kabupaten',
    'Kontraktor Pelaksana',
    'Realisasi (%)',
    'Target Rencana (%)',
    'Deviasi (%)',
    'Status Proyek',
    'Tiang Rencana (btg)',
    'Tiang Realisasi (btg)',
    'JTM Rencana (kms)',
    'JTR Rencana (kms)',
    'Gardu Rencana (unit)',
    'Tanggal Update',
  ];

  const rows: any[][] = [
    [`MONITORING PROGRES ${locations.length} LOKASI LISDES MALUKU`],
    [`Tanggal Cut-Off: ${cutoffDate}`, `Diekspor pada: ${new Date().toLocaleString('id-ID')}`],
    [],
    headers,
  ];

  locations.forEach((loc) => {
    rows.push([
      loc.no,
      loc.up3,
      loc.tahap,
      loc.namaDusun,
      loc.namaDesa,
      loc.kecamatan,
      loc.kabupaten,
      loc.pelaksana,
      `${loc.progresKeseluruhan.toFixed(2)}%`,
      `${loc.rencanaProgres.toFixed(2)}%`,
      `${loc.deviasi.toFixed(2)}%`,
      loc.status,
      loc.penanamanTiang.rencanaTotal,
      loc.penanamanTiang.realisasiTotal,
      loc.penarikanKonduktorTM.rencanaTotal,
      loc.penarikanKonduktorTR.rencanaTotal,
      loc.garduDistribusi.rencanaTotal,
      cutoffDate,
    ]);
  });

  // 3. Write data to sheet
  const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1?valueInputOption=USER_ENTERED`;
  const writeRes = await fetch(writeUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: 'Sheet1!A1',
      majorDimension: 'ROWS',
      values: rows,
    }),
  });

  if (!writeRes.ok) {
    const err = await writeRes.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gagal mengisi data ke Google Sheet (${writeRes.status})`);
  }

  return { spreadsheetId, spreadsheetUrl };
}

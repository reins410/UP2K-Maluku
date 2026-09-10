import { LocationProject, WorkPackageOverall, DailyLogEntry } from "../types";

export const PROJECT_METADATA = {
  title: "Monitoring Progres Pekerjaan Kelistrikan Desa (LISDES / LISSA)",
  unit: "PLN UIW MALUKU DAN MALUKU UTARA - UPPK MALUKU",
  startDate: "27 Jun 2026",
  cutoffDate: "10 Sep 2026",
  totalLocations: 58,
  totalUp3: 4,
  totalTahap: 4,
};

export const INITIAL_LOCATIONS: LocationProject[] = [
  {
    "id": "loc-1",
    "no": 1,
    "namaDusun": "Dusun Skotbessy",
    "namaDesa": "Desa Waelo",
    "kecamatan": "Kec. Waelata",
    "kabupaten": "Kab. Buru",
    "kodeDesa": "81.09.06.2007",
    "ulp": "Mako",
    "tahap": "TAHAP 1",
    "up3": "UP3 AMBON",
    "pelaksana": "Belum Ditunjuk (Tahap Perencanaan)",
    "nilaiKontrak": "Rp -",
    "nilaiRealisasi": "Rp -",
    "capel": 0,
    "noSpbj": "",
    "tglAwalKontrak": "",
    "tglAkhirKontrak": "",
    "targetSelesai": "",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 0,
    "deviasi": 0,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-2",
    "no": 2,
    "namaDusun": "Dusun Nurnyaman",
    "namaDesa": "Desa Nurnyaman",
    "kecamatan": "Kec. Dawelor Daweara",
    "kabupaten": "Kab. Maluku Barat Daya",
    "kodeDesa": "81.08.10.2006",
    "ulp": "Moa",
    "tahap": "TAHAP 1",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "Belum Ditunjuk (Tahap Perencanaan)",
    "nilaiKontrak": "Rp -",
    "nilaiRealisasi": "Rp -",
    "capel": 0,
    "noSpbj": "",
    "tglAwalKontrak": "",
    "tglAkhirKontrak": "",
    "targetSelesai": "",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 0,
    "deviasi": 0,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-3",
    "no": 3,
    "namaDusun": "Dusun Tamangil Nuhuyanat",
    "namaDesa": "Desa Tamangil Nuhuyanat",
    "kecamatan": "Kec. Kei Besar Selatan",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.04.2006",
    "ulp": "Elat",
    "tahap": "TAHAP 2",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 1.925.945.349",
    "nilaiRealisasi": "Rp -",
    "capel": 36,
    "noSpbj": "0009.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "19 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Maret 2027",
    "pematokan": {
      "rencanaTotal": 109,
      "rencanaTM": 106,
      "rencanaTR": 3,
      "realisasiTotal": 48,
      "realisasiTM": 47,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 44
    },
    "penggalian": {
      "rencanaTotal": 109,
      "rencanaTM": 106,
      "rencanaTR": 3,
      "realisasiTotal": 43,
      "realisasiTM": 42,
      "realisasiTR": 1,
      "unit": "titik",
      "persen": 39
    },
    "pengeceran": {
      "rencanaTotal": 109,
      "rencanaTM": 106,
      "rencanaTR": 3,
      "realisasiTotal": 41,
      "realisasiTM": 40,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 38
    },
    "perambasan": {
      "rencanaTotal": 5.71,
      "realisasiTotal": 2.34,
      "unit": "kms",
      "persen": 41
    },
    "penanamanTiang": {
      "rencanaTotal": 109,
      "rencanaTM": 106,
      "rencanaTR": 3,
      "realisasiTotal": 34,
      "realisasiTM": 33,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 31
    },
    "penanamanTiangTM": {
      "rencanaTotal": 106,
      "realisasiTotal": 33,
      "unit": "btg",
      "persen": 31
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 33
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 5.34,
      "realisasiTotal": 1.682,
      "unit": "kms",
      "persen": 32
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.37,
      "realisasiTotal": 0.117,
      "unit": "kms",
      "persen": 32
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 31.5,
    "rencanaProgres": 38.5,
    "deviasi": -7,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-4",
    "no": 4,
    "namaDusun": "Dusun Hoko",
    "namaDesa": "Desa Hoko",
    "kecamatan": "Kec. Kei Besar Selatan Barat",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.18.2005",
    "ulp": "Elat",
    "tahap": "TAHAP 2",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 1.094.186.584",
    "nilaiRealisasi": "Rp -",
    "capel": 25,
    "noSpbj": "0010.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "19 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Maret 2027",
    "pematokan": {
      "rencanaTotal": 53,
      "rencanaTM": 48,
      "rencanaTR": 5,
      "realisasiTotal": 21,
      "realisasiTM": 19,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 40
    },
    "penggalian": {
      "rencanaTotal": 53,
      "rencanaTM": 48,
      "rencanaTR": 5,
      "realisasiTotal": 18,
      "realisasiTM": 17,
      "realisasiTR": 2,
      "unit": "titik",
      "persen": 34
    },
    "pengeceran": {
      "rencanaTotal": 53,
      "rencanaTM": 48,
      "rencanaTR": 5,
      "realisasiTotal": 18,
      "realisasiTM": 16,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 34
    },
    "perambasan": {
      "rencanaTotal": 2.7,
      "realisasiTotal": 0.98,
      "unit": "kms",
      "persen": 36
    },
    "penanamanTiang": {
      "rencanaTotal": 53,
      "rencanaTM": 48,
      "rencanaTR": 5,
      "realisasiTotal": 14,
      "realisasiTM": 13,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 26
    },
    "penanamanTiangTM": {
      "rencanaTotal": 48,
      "realisasiTotal": 13,
      "unit": "btg",
      "persen": 27
    },
    "penanamanTiangTR": {
      "rencanaTotal": 5,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 20
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 2.34,
      "realisasiTotal": 0.651,
      "unit": "kms",
      "persen": 28
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.36,
      "realisasiTotal": 0.1,
      "unit": "kms",
      "persen": 28
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 27.8,
    "rencanaProgres": 38.5,
    "deviasi": -10.7,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-5",
    "no": 5,
    "namaDusun": "Dusun Ngurko",
    "namaDesa": "Desa Ngurko",
    "kecamatan": "Kec. Kei Besar Selatan Barat",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.18.2006",
    "ulp": "Elat",
    "tahap": "TAHAP 2",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 1.007.191.380",
    "nilaiRealisasi": "Rp -",
    "capel": 25,
    "noSpbj": "0011.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "19 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Maret 2027",
    "pematokan": {
      "rencanaTotal": 46,
      "rencanaTM": 46,
      "rencanaTR": 0,
      "realisasiTotal": 17,
      "realisasiTM": 17,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 37
    },
    "penggalian": {
      "rencanaTotal": 46,
      "rencanaTM": 46,
      "rencanaTR": 0,
      "realisasiTotal": 15,
      "realisasiTM": 15,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 33
    },
    "pengeceran": {
      "rencanaTotal": 46,
      "rencanaTM": 46,
      "rencanaTR": 0,
      "realisasiTotal": 14,
      "realisasiTM": 14,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 30
    },
    "perambasan": {
      "rencanaTotal": 2.44,
      "realisasiTotal": 0.82,
      "unit": "kms",
      "persen": 34
    },
    "penanamanTiang": {
      "rencanaTotal": 46,
      "rencanaTM": 46,
      "rencanaTR": 0,
      "realisasiTotal": 12,
      "realisasiTM": 12,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 26
    },
    "penanamanTiangTM": {
      "rencanaTotal": 46,
      "realisasiTotal": 12,
      "unit": "btg",
      "persen": 26
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 2.27,
      "realisasiTotal": 0.59,
      "unit": "kms",
      "persen": 26
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.17,
      "realisasiTotal": 0.044,
      "unit": "kms",
      "persen": 26
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 26,
    "rencanaProgres": 38.5,
    "deviasi": -12.5,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-6",
    "no": 6,
    "namaDusun": "Dusun Rumah 10",
    "namaDesa": "Desa Aketernate",
    "kecamatan": "Kec. Seram Utara Timur Seti",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.24.2009",
    "ulp": "Kobisonta",
    "tahap": "TAHAP 2",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 1.148.354.972",
    "nilaiRealisasi": "Rp -",
    "capel": 15,
    "noSpbj": "0005.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "27 Juli 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "28 Februari 2027",
    "pematokan": {
      "rencanaTotal": 77,
      "rencanaTM": 77,
      "rencanaTR": 0,
      "realisasiTotal": 37,
      "realisasiTM": 37,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 48
    },
    "penggalian": {
      "rencanaTotal": 77,
      "rencanaTM": 77,
      "rencanaTR": 0,
      "realisasiTotal": 33,
      "realisasiTM": 33,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 43
    },
    "pengeceran": {
      "rencanaTotal": 77,
      "rencanaTM": 77,
      "rencanaTR": 0,
      "realisasiTotal": 32,
      "realisasiTM": 32,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 42
    },
    "perambasan": {
      "rencanaTotal": 4.26,
      "realisasiTotal": 1.92,
      "unit": "kms",
      "persen": 45
    },
    "penanamanTiang": {
      "rencanaTotal": 77,
      "rencanaTM": 77,
      "rencanaTR": 0,
      "realisasiTotal": 27,
      "realisasiTM": 27,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 35
    },
    "penanamanTiangTM": {
      "rencanaTotal": 77,
      "realisasiTotal": 27,
      "unit": "btg",
      "persen": 35
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 3.8,
      "realisasiTotal": 1.315,
      "unit": "kms",
      "persen": 35
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0.159,
      "unit": "kms",
      "persen": 35
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 34.6,
    "rencanaProgres": 38.5,
    "deviasi": -3.9,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-7",
    "no": 7,
    "namaDusun": "Dusun Waikudal",
    "namaDesa": "Desa Batuasa",
    "kecamatan": "Kec. Werinama",
    "kabupaten": "Kab. Seram Bagian Timur",
    "kodeDesa": "81.05.03.2001",
    "ulp": "Masohi",
    "tahap": "TAHAP 2",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 1.762.962.647",
    "nilaiRealisasi": "Rp -",
    "capel": 30,
    "noSpbj": "0006.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Juli 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "28 Februari 2027",
    "pematokan": {
      "rencanaTotal": 102,
      "rencanaTM": 97,
      "rencanaTR": 5,
      "realisasiTotal": 42,
      "realisasiTM": 40,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 41
    },
    "penggalian": {
      "rencanaTotal": 102,
      "rencanaTM": 97,
      "rencanaTR": 5,
      "realisasiTotal": 37,
      "realisasiTM": 35,
      "realisasiTR": 2,
      "unit": "titik",
      "persen": 36
    },
    "pengeceran": {
      "rencanaTotal": 102,
      "rencanaTM": 97,
      "rencanaTR": 5,
      "realisasiTotal": 36,
      "realisasiTM": 34,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 35
    },
    "perambasan": {
      "rencanaTotal": 6.72,
      "realisasiTotal": 2.55,
      "unit": "kms",
      "persen": 38
    },
    "penanamanTiang": {
      "rencanaTotal": 102,
      "rencanaTM": 97,
      "rencanaTR": 5,
      "realisasiTotal": 29,
      "realisasiTM": 28,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 28
    },
    "penanamanTiangTM": {
      "rencanaTotal": 97,
      "realisasiTotal": 28,
      "unit": "btg",
      "persen": 29
    },
    "penanamanTiangTR": {
      "rencanaTotal": 5,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 20
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 4.81,
      "realisasiTotal": 1.405,
      "unit": "kms",
      "persen": 29
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.91,
      "realisasiTotal": 0.558,
      "unit": "kms",
      "persen": 29
    },
    "garduDistribusi": {
      "rencanaTotal": 2,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 29.2,
    "rencanaProgres": 38.5,
    "deviasi": -9.3,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-8",
    "no": 8,
    "namaDusun": "Dusun Parbulu Luar",
    "namaDesa": "Desa Parbulu",
    "kecamatan": "Kec. Waelata",
    "kabupaten": "Kab. Buru",
    "kodeDesa": "81.04.12.2003",
    "ulp": "Mako",
    "tahap": "TAHAP 3",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 268.257.203",
    "nilaiRealisasi": "Rp -",
    "capel": 12,
    "noSpbj": "0021.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "30 November 2026",
    "pematokan": {
      "rencanaTotal": 5,
      "rencanaTM": 5,
      "rencanaTR": 0,
      "realisasiTotal": 1,
      "realisasiTM": 1,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 20
    },
    "penggalian": {
      "rencanaTotal": 5,
      "rencanaTM": 5,
      "rencanaTR": 0,
      "realisasiTotal": 1,
      "realisasiTM": 1,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 20
    },
    "pengeceran": {
      "rencanaTotal": 5,
      "rencanaTM": 5,
      "rencanaTR": 0,
      "realisasiTotal": 1,
      "realisasiTM": 1,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 20
    },
    "perambasan": {
      "rencanaTotal": 0.21,
      "realisasiTotal": 0.05,
      "unit": "kms",
      "persen": 24
    },
    "penanamanTiang": {
      "rencanaTotal": 5,
      "rencanaTM": 5,
      "rencanaTR": 0,
      "realisasiTotal": 1,
      "realisasiTM": 1,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 20
    },
    "penanamanTiangTM": {
      "rencanaTotal": 5,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 20
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.21,
      "realisasiTotal": 0.039,
      "unit": "kms",
      "persen": 18
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 18.4,
    "rencanaProgres": 25,
    "deviasi": -6.6,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-9",
    "no": 9,
    "namaDusun": "Dusun Difur",
    "namaDesa": "Desa Labetawi",
    "kecamatan": "Kec. Pulau Dullah Utara",
    "kabupaten": "Kab. Kota Tual",
    "kodeDesa": "81.72.01.2004",
    "ulp": "Tual",
    "tahap": "TAHAP 3",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 833.755.984",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0008.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "19 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 57,
      "rencanaTM": 46,
      "rencanaTR": 11,
      "realisasiTotal": 18,
      "realisasiTM": 14,
      "realisasiTR": 3,
      "unit": "btg",
      "persen": 32
    },
    "penggalian": {
      "rencanaTotal": 57,
      "rencanaTM": 46,
      "rencanaTR": 11,
      "realisasiTotal": 16,
      "realisasiTM": 13,
      "realisasiTR": 3,
      "unit": "titik",
      "persen": 28
    },
    "pengeceran": {
      "rencanaTotal": 57,
      "rencanaTM": 46,
      "rencanaTR": 11,
      "realisasiTotal": 15,
      "realisasiTM": 12,
      "realisasiTR": 3,
      "unit": "btg",
      "persen": 26
    },
    "perambasan": {
      "rencanaTotal": 2.98,
      "realisasiTotal": 0.86,
      "unit": "kms",
      "persen": 29
    },
    "penanamanTiang": {
      "rencanaTotal": 57,
      "rencanaTM": 46,
      "rencanaTR": 11,
      "realisasiTotal": 12,
      "realisasiTM": 10,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 21
    },
    "penanamanTiangTM": {
      "rencanaTotal": 46,
      "realisasiTotal": 10,
      "unit": "btg",
      "persen": 22
    },
    "penanamanTiangTR": {
      "rencanaTotal": 11,
      "realisasiTotal": 2,
      "unit": "btg",
      "persen": 18
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 2.21,
      "realisasiTotal": 0.488,
      "unit": "kms",
      "persen": 22
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.77,
      "realisasiTotal": 0.17,
      "unit": "kms",
      "persen": 22
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 22.1,
    "rencanaProgres": 25,
    "deviasi": -2.9,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-10",
    "no": 10,
    "namaDusun": "Dusun Rumkuda",
    "namaDesa": "Desa Jerusu",
    "kecamatan": "Kec. Kepulauan Roma",
    "kabupaten": "Kab. Maluku Barat Daya",
    "kodeDesa": "81.08.16.2002",
    "ulp": "Moa",
    "tahap": "TAHAP 3",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 190.544.356",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0015.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 17
    },
    "penggalian": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "titik",
      "persen": 17
    },
    "pengeceran": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 17
    },
    "perambasan": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0.07,
      "unit": "kms",
      "persen": 16
    },
    "penanamanTiang": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 17
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 6,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 17
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0.054,
      "unit": "kms",
      "persen": 12
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 12,
    "rencanaProgres": 25,
    "deviasi": -13,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-11",
    "no": 11,
    "namaDusun": "Dusun Werwawan",
    "namaDesa": "Desa Sera",
    "kecamatan": "Kec. Pulau Lakor",
    "kabupaten": "Kab. Maluku Barat Daya",
    "kodeDesa": "81.08.12.2003",
    "ulp": "Moa",
    "tahap": "TAHAP 3",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 214.382.847",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0016.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 11,
      "rencanaTM": 0,
      "rencanaTR": 11,
      "realisasiTotal": 2,
      "realisasiTM": 0,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 18
    },
    "penggalian": {
      "rencanaTotal": 11,
      "rencanaTM": 0,
      "rencanaTR": 11,
      "realisasiTotal": 2,
      "realisasiTM": 0,
      "realisasiTR": 2,
      "unit": "titik",
      "persen": 18
    },
    "pengeceran": {
      "rencanaTotal": 11,
      "rencanaTM": 0,
      "rencanaTR": 11,
      "realisasiTotal": 2,
      "realisasiTM": 0,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 18
    },
    "perambasan": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0.08,
      "unit": "kms",
      "persen": 19
    },
    "penanamanTiang": {
      "rencanaTotal": 11,
      "rencanaTM": 0,
      "rencanaTR": 11,
      "realisasiTotal": 2,
      "realisasiTM": 0,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 18
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 11,
      "realisasiTotal": 2,
      "unit": "btg",
      "persen": 18
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0.065,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14.5,
    "rencanaProgres": 25,
    "deviasi": -10.5,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-12",
    "no": 12,
    "namaDusun": "Dusun Tanah Merah",
    "namaDesa": "Desa Amahai",
    "kecamatan": "Kec. Amahai",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.01.2005",
    "ulp": "Masohi",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 160.016.059",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0018.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "30 November 2026",
    "pematokan": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 6,
      "realisasiTM": 0,
      "realisasiTR": 6,
      "unit": "btg",
      "persen": 27
    },
    "penggalian": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 5,
      "realisasiTM": 0,
      "realisasiTR": 5,
      "unit": "titik",
      "persen": 23
    },
    "pengeceran": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 5,
      "realisasiTM": 0,
      "realisasiTR": 5,
      "unit": "btg",
      "persen": 23
    },
    "perambasan": {
      "rencanaTotal": 0.9,
      "realisasiTotal": 0.23,
      "unit": "kms",
      "persen": 26
    },
    "penanamanTiang": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 4,
      "realisasiTM": 0,
      "realisasiTR": 4,
      "unit": "btg",
      "persen": 18
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 22,
      "realisasiTotal": 4,
      "unit": "btg",
      "persen": 18
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.9,
      "realisasiTotal": 0.178,
      "unit": "kms",
      "persen": 20
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 19.8,
    "rencanaProgres": 25,
    "deviasi": -5.2,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-13",
    "no": 13,
    "namaDusun": "Dusun Kampung Bugis",
    "namaDesa": "Desa Haruru",
    "kecamatan": "Kec. Amahai",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.01.2006",
    "ulp": "Masohi",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 193.691.377",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0017.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "30 November 2026",
    "pematokan": {
      "rencanaTotal": 23,
      "rencanaTM": 0,
      "rencanaTR": 23,
      "realisasiTotal": 8,
      "realisasiTM": 0,
      "realisasiTR": 8,
      "unit": "btg",
      "persen": 35
    },
    "penggalian": {
      "rencanaTotal": 23,
      "rencanaTM": 0,
      "rencanaTR": 23,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "titik",
      "persen": 30
    },
    "pengeceran": {
      "rencanaTotal": 23,
      "rencanaTM": 0,
      "rencanaTR": 23,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "btg",
      "persen": 30
    },
    "perambasan": {
      "rencanaTotal": 1.23,
      "realisasiTotal": 0.39,
      "unit": "kms",
      "persen": 31
    },
    "penanamanTiang": {
      "rencanaTotal": 23,
      "rencanaTM": 0,
      "rencanaTR": 23,
      "realisasiTotal": 6,
      "realisasiTM": 0,
      "realisasiTR": 6,
      "unit": "btg",
      "persen": 26
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 23,
      "realisasiTotal": 6,
      "unit": "btg",
      "persen": 26
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.23,
      "realisasiTotal": 0.298,
      "unit": "kms",
      "persen": 24
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 24.2,
    "rencanaProgres": 25,
    "deviasi": -0.8,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-14",
    "no": 14,
    "namaDusun": "Dusun Aketernate",
    "namaDesa": "Desa Aketernate",
    "kecamatan": "Kec. Seram Utara Timur Seti",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.24.2009",
    "ulp": "Kobisonta",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 117.441.454",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0024.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.51,
      "realisasiTotal": 0.06,
      "unit": "kms",
      "persen": 11
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.51,
      "realisasiTotal": 0.043,
      "unit": "kms",
      "persen": 9
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 8.5,
    "rencanaProgres": 25,
    "deviasi": -16.5,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-15",
    "no": 15,
    "namaDusun": "Dusun SPD",
    "namaDesa": "Desa Seti",
    "kecamatan": "Kec. Seram Utara Timur Seti",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.24.2001",
    "ulp": "Kobisonta",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 128.113.114",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0027.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 11
    },
    "penggalian": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "titik",
      "persen": 11
    },
    "pengeceran": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 11
    },
    "perambasan": {
      "rencanaTotal": 1.54,
      "realisasiTotal": 0.22,
      "unit": "kms",
      "persen": 14
    },
    "penanamanTiang": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 11
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 9,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 11
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.54,
      "realisasiTotal": 0.169,
      "unit": "kms",
      "persen": 11
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 11,
    "rencanaProgres": 25,
    "deviasi": -14,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-16",
    "no": 16,
    "namaDusun": "Dusun Trans Baru",
    "namaDesa": "Desa Seti",
    "kecamatan": "Kec. Seram Utara Timur Seti",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.24.2001",
    "ulp": "Kobisonta",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 130.748.239",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0026.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.13,
      "unit": "kms",
      "persen": 12
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.097,
      "unit": "kms",
      "persen": 9
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 9.4,
    "rencanaProgres": 25,
    "deviasi": -15.6,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-17",
    "no": 17,
    "namaDusun": "Dusun Waitila",
    "namaDesa": "Desa Waitila",
    "kecamatan": "Kec. Seram Utara Timur Seti",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.24.2005",
    "ulp": "Kobisonta",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 346.516.811",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0025.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 18,
      "rencanaTM": 5,
      "rencanaTR": 13,
      "realisasiTotal": 4,
      "realisasiTM": 1,
      "realisasiTR": 3,
      "unit": "btg",
      "persen": 22
    },
    "penggalian": {
      "rencanaTotal": 18,
      "rencanaTM": 5,
      "rencanaTR": 13,
      "realisasiTotal": 4,
      "realisasiTM": 1,
      "realisasiTR": 3,
      "unit": "titik",
      "persen": 22
    },
    "pengeceran": {
      "rencanaTotal": 18,
      "rencanaTM": 5,
      "rencanaTR": 13,
      "realisasiTotal": 4,
      "realisasiTM": 1,
      "realisasiTR": 3,
      "unit": "btg",
      "persen": 22
    },
    "perambasan": {
      "rencanaTotal": 1.6,
      "realisasiTotal": 0.35,
      "unit": "kms",
      "persen": 22
    },
    "penanamanTiang": {
      "rencanaTotal": 18,
      "rencanaTM": 5,
      "rencanaTR": 13,
      "realisasiTotal": 3,
      "realisasiTM": 1,
      "realisasiTR": 2,
      "unit": "btg",
      "persen": 17
    },
    "penanamanTiangTM": {
      "rencanaTotal": 5,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 20
    },
    "penanamanTiangTR": {
      "rencanaTotal": 13,
      "realisasiTotal": 2,
      "unit": "btg",
      "persen": 15
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0.47,
      "realisasiTotal": 0.078,
      "unit": "kms",
      "persen": 17
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.13,
      "realisasiTotal": 0.189,
      "unit": "kms",
      "persen": 17
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 16.7,
    "rencanaProgres": 25,
    "deviasi": -8.3,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-18",
    "no": 18,
    "namaDusun": "Dusun Mutin",
    "namaDesa": "Desa Ohoidertawun",
    "kecamatan": "Kec. Kei Kecil",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.01.2048",
    "ulp": "Tual",
    "tahap": "TAHAP 3",
    "up3": "UP3 TUAL",
    "pelaksana": "PT AKSE BANGUN MALUKU",
    "nilaiKontrak": "Rp 1.520.308.699",
    "nilaiRealisasi": "Rp -",
    "capel": 13,
    "noSpbj": "0007.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Juli 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 114,
      "rencanaTM": 114,
      "rencanaTR": 0,
      "realisasiTotal": 45,
      "realisasiTM": 45,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 39
    },
    "penggalian": {
      "rencanaTotal": 114,
      "rencanaTM": 114,
      "rencanaTR": 0,
      "realisasiTotal": 41,
      "realisasiTM": 41,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 36
    },
    "pengeceran": {
      "rencanaTotal": 114,
      "rencanaTM": 114,
      "rencanaTR": 0,
      "realisasiTotal": 39,
      "realisasiTM": 39,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 34
    },
    "perambasan": {
      "rencanaTotal": 5.9,
      "realisasiTotal": 2.19,
      "unit": "kms",
      "persen": 37
    },
    "penanamanTiang": {
      "rencanaTotal": 114,
      "rencanaTM": 114,
      "rencanaTR": 0,
      "realisasiTotal": 32,
      "realisasiTM": 32,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 28
    },
    "penanamanTiangTM": {
      "rencanaTotal": 114,
      "realisasiTotal": 32,
      "unit": "btg",
      "persen": 28
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 5.55,
      "realisasiTotal": 1.582,
      "unit": "kms",
      "persen": 28
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.35,
      "realisasiTotal": 0.1,
      "unit": "kms",
      "persen": 28
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 28.5,
    "rencanaProgres": 25,
    "deviasi": 3.5,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-19",
    "no": 19,
    "namaDusun": "Dusun Wailey",
    "namaDesa": "Desa Latu",
    "kecamatan": "Kec. Amalatu",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.05.2003",
    "ulp": "Kairatu",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 137.030.329",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0014.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "30 November 2026",
    "pematokan": {
      "rencanaTotal": 2,
      "rencanaTM": 2,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 2,
      "rencanaTM": 2,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 2,
      "rencanaTM": 2,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.51,
      "realisasiTotal": 0.09,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 2,
      "rencanaTM": 2,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 2,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.51,
      "realisasiTotal": 0.071,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-20",
    "no": 20,
    "namaDusun": "Dusun Waimitena",
    "namaDesa": "Desa Luhu",
    "kecamatan": "Kec. Huamual",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.08.2003",
    "ulp": "Piru",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 141.328.218",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0025.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 2,
      "rencanaTM": 0,
      "rencanaTR": 2,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 2,
      "rencanaTM": 0,
      "rencanaTR": 2,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 2,
      "rencanaTM": 0,
      "rencanaTR": 2,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.19,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 2,
      "rencanaTM": 0,
      "rencanaTR": 2,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 2,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.144,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-21",
    "no": 21,
    "namaDusun": "Dusun Air Supe",
    "namaDesa": "Desa Waesala",
    "kecamatan": "Kec. Huamual Belakang",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.04.2001",
    "ulp": "Piru",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SINAR GLORI DATIER",
    "nilaiKontrak": "Rp 685.652.795",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0023.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 6,
      "realisasiTM": 6,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 19
    },
    "penggalian": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 6,
      "realisasiTM": 6,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 19
    },
    "pengeceran": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 5,
      "realisasiTM": 5,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 16
    },
    "perambasan": {
      "rencanaTotal": 2.06,
      "realisasiTotal": 0.37,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 4,
      "realisasiTM": 4,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 13
    },
    "penanamanTiangTM": {
      "rencanaTotal": 32,
      "realisasiTotal": 4,
      "unit": "btg",
      "persen": 13
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 1.51,
      "realisasiTotal": 0.211,
      "unit": "kms",
      "persen": 14
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.55,
      "realisasiTotal": 0.077,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 2,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-22",
    "no": 22,
    "namaDusun": "Dusun Air Kecap",
    "namaDesa": "Desa Kairatu",
    "kecamatan": "Kec. Kairatu",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.01.2010",
    "ulp": "Kairatu",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 177.505.493",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0020.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 4,
      "realisasiTM": 0,
      "realisasiTR": 4,
      "unit": "btg",
      "persen": 18
    },
    "penggalian": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 4,
      "realisasiTM": 0,
      "realisasiTR": 4,
      "unit": "titik",
      "persen": 18
    },
    "pengeceran": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 4,
      "realisasiTM": 0,
      "realisasiTR": 4,
      "unit": "btg",
      "persen": 18
    },
    "perambasan": {
      "rencanaTotal": 1.13,
      "realisasiTotal": 0.21,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 22,
      "rencanaTM": 0,
      "rencanaTR": 22,
      "realisasiTotal": 3,
      "realisasiTM": 0,
      "realisasiTR": 3,
      "unit": "btg",
      "persen": 14
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 22,
      "realisasiTotal": 3,
      "unit": "btg",
      "persen": 14
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.13,
      "realisasiTotal": 0.158,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-23",
    "no": 23,
    "namaDusun": "Dusun Siompu",
    "namaDesa": "Desa Kairatu",
    "kecamatan": "Kec. Kairatu",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.01.2010",
    "ulp": "Kairatu",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 251.939.818",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0019.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 29,
      "rencanaTM": 0,
      "rencanaTR": 29,
      "realisasiTotal": 6,
      "realisasiTM": 0,
      "realisasiTR": 6,
      "unit": "btg",
      "persen": 21
    },
    "penggalian": {
      "rencanaTotal": 29,
      "rencanaTM": 0,
      "rencanaTR": 29,
      "realisasiTotal": 5,
      "realisasiTM": 0,
      "realisasiTR": 5,
      "unit": "titik",
      "persen": 17
    },
    "pengeceran": {
      "rencanaTotal": 29,
      "rencanaTM": 0,
      "rencanaTR": 29,
      "realisasiTotal": 5,
      "realisasiTM": 0,
      "realisasiTR": 5,
      "unit": "btg",
      "persen": 17
    },
    "perambasan": {
      "rencanaTotal": 1.34,
      "realisasiTotal": 0.24,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 29,
      "rencanaTM": 0,
      "rencanaTR": 29,
      "realisasiTotal": 4,
      "realisasiTM": 0,
      "realisasiTR": 4,
      "unit": "btg",
      "persen": 14
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 29,
      "realisasiTotal": 4,
      "unit": "btg",
      "persen": 14
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.34,
      "realisasiTotal": 0.188,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-24",
    "no": 24,
    "namaDusun": "Dusun Srimulyo",
    "namaDesa": "Desa Kairatu",
    "kecamatan": "Kec. Kairatu",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.01.2010",
    "ulp": "Kairatu",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 87.926.440",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0012.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "30 September 2026",
    "targetSelesai": "31 Agustus 2026",
    "pematokan": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "btg",
      "persen": 100
    },
    "penggalian": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "titik",
      "persen": 100
    },
    "pengeceran": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "btg",
      "persen": 100
    },
    "perambasan": {
      "rencanaTotal": 0.33,
      "realisasiTotal": 0.33,
      "unit": "kms",
      "persen": 100
    },
    "penanamanTiang": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 7,
      "realisasiTM": 0,
      "realisasiTR": 7,
      "unit": "btg",
      "persen": 100
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 7,
      "realisasiTotal": 7,
      "unit": "btg",
      "persen": 100
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.33,
      "realisasiTotal": 0.33,
      "unit": "kms",
      "persen": 100
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 100,
    "rencanaProgres": 25,
    "deviasi": 75,
    "status": "Selesai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-25",
    "no": 25,
    "namaDusun": "Dusun Tirtomulyo",
    "namaDesa": "Desa Kairatu",
    "kecamatan": "Kec. Kairatu",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.01.2010",
    "ulp": "Kairatu",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 107.129.382",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0013.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "28 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "30 November 2026",
    "pematokan": {
      "rencanaTotal": 1,
      "rencanaTM": 1,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 1,
      "rencanaTM": 1,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 1,
      "rencanaTM": 1,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 1,
      "rencanaTM": 1,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-26",
    "no": 26,
    "namaDusun": "Dusun Tempono",
    "namaDesa": "Desa Banggoi",
    "kecamatan": "Kec. Bula Barat",
    "kabupaten": "Kab. Seram Bagian Timur",
    "kodeDesa": "81.05.12.2002",
    "ulp": "Bula",
    "tahap": "TAHAP 3",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 130.094.934",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0028.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "31 Agustus 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.19,
      "unit": "kms",
      "persen": 18
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.03,
      "realisasiTotal": 0.144,
      "unit": "kms",
      "persen": 14
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 14,
    "rencanaProgres": 25,
    "deviasi": -11,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-27",
    "no": 27,
    "namaDusun": "Dusun Lolotuara Baru",
    "namaDesa": "Desa Lolotuara",
    "kecamatan": "Kec. Pulau Lakor",
    "kabupaten": "Kab. Maluku Barat Daya",
    "kodeDesa": "81.08.12.2005",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 132.878.810",
    "nilaiRealisasi": "Rp -",
    "capel": 7,
    "noSpbj": "0032.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-28",
    "no": 28,
    "namaDusun": "Dusun Meyano Kampung Baru",
    "namaDesa": "Desa Meyano Das",
    "kecamatan": "Kec. Kormomolin",
    "kabupaten": "Kab. Kepulauan Tanimbar",
    "kodeDesa": "81.03.08.2010",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 139.013.796",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0033.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.3,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.3,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-29",
    "no": 29,
    "namaDusun": "Dusun Perum Rakyat",
    "namaDesa": "Desa Ridool",
    "kecamatan": "Kec. Tanimbar Utara",
    "kabupaten": "Kab. Kepulauan Tanimbar",
    "kodeDesa": "81.03.05.2003",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 827.420.728",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0058.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 48,
      "rencanaTM": 38,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 48,
      "rencanaTM": 38,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 48,
      "rencanaTM": 38,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 2.27,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 48,
      "rencanaTM": 38,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 38,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 10,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 1.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.47,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-30",
    "no": 30,
    "namaDusun": "Dusun Arui Bab Ujung",
    "namaDesa": "Desa Arui Bab",
    "kecamatan": "Kec. Wertamrian",
    "kabupaten": "Kab. Kepulauan Tanimbar",
    "kodeDesa": "81.03.03.2006",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 SAUMLAKI",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 130.384.475",
    "nilaiRealisasi": "Rp -",
    "capel": 6,
    "noSpbj": "0059.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.29,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 7,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.29,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-31",
    "no": 31,
    "namaDusun": "Dusun Waringin Kuning",
    "namaDesa": "Desa Tahalupu",
    "kecamatan": "Kec. Huamual Belakang",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.04.2005",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 178.061.146",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0034.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 10,
      "rencanaTM": 0,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 10,
      "rencanaTM": 0,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 10,
      "rencanaTM": 0,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 10,
      "rencanaTM": 0,
      "rencanaTR": 10,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 10,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.45,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-32",
    "no": 32,
    "namaDusun": "Dusun Kompleks Arab",
    "namaDesa": "Desa Lisabata",
    "kecamatan": "Kec. Taniwel",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.03.2005",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 158.791.861",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0047.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.36,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 7,
      "rencanaTM": 0,
      "rencanaTR": 7,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 7,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.36,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-33",
    "no": 33,
    "namaDusun": "Dusun Inpres",
    "namaDesa": "Desa Lisabata",
    "kecamatan": "Kec. Taniwel",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.03.2005",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 192.781.957",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0050.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 10,
      "rencanaTM": 1,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 10,
      "rencanaTM": 1,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 10,
      "rencanaTM": 1,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 10,
      "rencanaTM": 1,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 9,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-34",
    "no": 34,
    "namaDusun": "Dusun Waimeteng Darat",
    "namaDesa": "Desa Piru",
    "kecamatan": "Kec. Seram Barat",
    "kabupaten": "Kab. Seram Bagian Barat",
    "kodeDesa": "81.06.02.2003",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 166.612.546",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0049.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 14,
      "rencanaTM": 0,
      "rencanaTR": 14,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 14,
      "rencanaTM": 0,
      "rencanaTR": 14,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 14,
      "rencanaTM": 0,
      "rencanaTR": 14,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.66,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 14,
      "rencanaTM": 0,
      "rencanaTR": 14,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 14,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.66,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-35",
    "no": 35,
    "namaDusun": "Dusun Huk",
    "namaDesa": "Desa Letvuan",
    "kecamatan": "Kec. Hoat Sorbay",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.16.2003",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 710.126.256",
    "nilaiRealisasi": "Rp -",
    "capel": 13,
    "noSpbj": "0060.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 2,
      "realisasiTM": 2,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 6
    },
    "penggalian": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 2,
      "realisasiTM": 2,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 6
    },
    "pengeceran": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 2,
      "realisasiTM": 2,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 6
    },
    "perambasan": {
      "rencanaTotal": 1.82,
      "realisasiTotal": 0.12,
      "unit": "kms",
      "persen": 7
    },
    "penanamanTiang": {
      "rencanaTotal": 32,
      "rencanaTM": 32,
      "rencanaTR": 0,
      "realisasiTotal": 2,
      "realisasiTM": 2,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 6
    },
    "penanamanTiangTM": {
      "rencanaTotal": 32,
      "realisasiTotal": 2,
      "unit": "btg",
      "persen": 6
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 1.61,
      "realisasiTotal": 0.084,
      "unit": "kms",
      "persen": 5
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.21,
      "realisasiTotal": 0.011,
      "unit": "kms",
      "persen": 5
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 5.2,
    "rencanaProgres": 10,
    "deviasi": -4.8,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-36",
    "no": 36,
    "namaDusun": "Dusun Perumnas",
    "namaDesa": "Desa Kolser",
    "kecamatan": "Kec. Kei Kecil",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.01.2051",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 196.527.443",
    "nilaiRealisasi": "Rp -",
    "capel": 14,
    "noSpbj": "0061.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 15,
      "rencanaTM": 0,
      "rencanaTR": 15,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 15,
      "rencanaTM": 0,
      "rencanaTR": 15,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 15,
      "rencanaTM": 0,
      "rencanaTR": 15,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.62,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 15,
      "rencanaTM": 0,
      "rencanaTR": 15,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 15,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.62,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-37",
    "no": 37,
    "namaDusun": "Dusun Bodvovan",
    "namaDesa": "Desa Wain",
    "kecamatan": "Kec. Kei Kecil Timur",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.13.2001",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 320.381.251",
    "nilaiRealisasi": "Rp -",
    "capel": 15,
    "noSpbj": "0062.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 24,
      "rencanaTM": 2,
      "rencanaTR": 22,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 24,
      "rencanaTM": 2,
      "rencanaTR": 22,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 24,
      "rencanaTM": 2,
      "rencanaTR": 22,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.24,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 24,
      "rencanaTM": 2,
      "rencanaTR": 22,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 2,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 22,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0.09,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.15,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-38",
    "no": 38,
    "namaDusun": "Dusun Ngabub Kampung Baru",
    "namaDesa": "Desa Ngabub",
    "kecamatan": "Kec. Kei Kecil",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.01.2018",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 169.499.170",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0035.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.93,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.93,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-39",
    "no": 39,
    "namaDusun": "Dusun Ngan Kampung Baru",
    "namaDesa": "Desa Ngan",
    "kecamatan": "Kec. Kei Besar Selatan Barat",
    "kabupaten": "Kab. Maluku Tenggara",
    "kodeDesa": "81.02.18.2009",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 171.775.733",
    "nilaiRealisasi": "Rp -",
    "capel": 12,
    "noSpbj": "0036.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.12,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.12,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-40",
    "no": 40,
    "namaDusun": "Dusun Feruni Kampung Baru",
    "namaDesa": "Desa Feruni",
    "kecamatan": "Kec. Aru Selatan",
    "kabupaten": "Kab. Kepulauan Aru",
    "kodeDesa": "81.07.02.2005",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 399.301.142",
    "nilaiRealisasi": "Rp -",
    "capel": 15,
    "noSpbj": "0037.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 32,
      "rencanaTM": 0,
      "rencanaTR": 32,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 32,
      "rencanaTM": 0,
      "rencanaTR": 32,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 32,
      "rencanaTM": 0,
      "rencanaTR": 32,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.5,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 32,
      "rencanaTM": 0,
      "rencanaTR": 32,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 32,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 1.5,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-41",
    "no": 41,
    "namaDusun": "Dusun Belakang Wamar",
    "namaDesa": "Desa Durjela",
    "kecamatan": "Kec. Pulau-Pulau Aru",
    "kabupaten": "Kab. Kepulauan Aru",
    "kodeDesa": "81.07.01.2011",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 198.153.022",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0038.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-42",
    "no": 42,
    "namaDusun": "Dusun Kota Lama",
    "namaDesa": "Desa Wokam",
    "kecamatan": "Kec. Pulau-Pulau Aru",
    "kabupaten": "Kab. Kepulauan Aru",
    "kodeDesa": "81.07.01.2009",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 188.142.086",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0039.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.23,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.23,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-43",
    "no": 43,
    "namaDusun": "Dusun Tasinwaha Kampung Baru",
    "namaDesa": "Desa Tasinwaha",
    "kecamatan": "Kec. Aru Utara",
    "kabupaten": "Kab. Kepulauan Aru",
    "kodeDesa": "81.07.04.2004",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    "nilaiKontrak": "Rp 175.915.328",
    "nilaiRealisasi": "Rp -",
    "capel": 11,
    "noSpbj": "0040.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.32,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.32,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-44",
    "no": 44,
    "namaDusun": "Dusun Un Pantai",
    "namaDesa": "Desa Taar",
    "kecamatan": "Kec. Pulau Dullah Selatan",
    "kabupaten": "Kab. Kota Tual",
    "kodeDesa": "81.72.02.2002",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 TUAL",
    "pelaksana": "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    "nilaiKontrak": "Rp 1.017.487.483",
    "nilaiRealisasi": "Rp -",
    "capel": 30,
    "noSpbj": "0063.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 110,
      "rencanaTM": 16,
      "rencanaTR": 94,
      "realisasiTotal": 10,
      "realisasiTM": 2,
      "realisasiTR": 9,
      "unit": "btg",
      "persen": 9
    },
    "penggalian": {
      "rencanaTotal": 110,
      "rencanaTM": 16,
      "rencanaTR": 94,
      "realisasiTotal": 9,
      "realisasiTM": 1,
      "realisasiTR": 8,
      "unit": "titik",
      "persen": 8
    },
    "pengeceran": {
      "rencanaTotal": 110,
      "rencanaTM": 16,
      "rencanaTR": 94,
      "realisasiTotal": 9,
      "realisasiTM": 1,
      "realisasiTR": 8,
      "unit": "btg",
      "persen": 8
    },
    "perambasan": {
      "rencanaTotal": 5.25,
      "realisasiTotal": 0.46,
      "unit": "kms",
      "persen": 9
    },
    "penanamanTiang": {
      "rencanaTotal": 110,
      "rencanaTM": 16,
      "rencanaTR": 94,
      "realisasiTotal": 7,
      "realisasiTM": 1,
      "realisasiTR": 6,
      "unit": "btg",
      "persen": 6
    },
    "penanamanTiangTM": {
      "rencanaTotal": 16,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 6
    },
    "penanamanTiangTR": {
      "rencanaTotal": 94,
      "realisasiTotal": 6,
      "unit": "btg",
      "persen": 6
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0.72,
      "realisasiTotal": 0.049,
      "unit": "kms",
      "persen": 7
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 4.53,
      "realisasiTotal": 0.308,
      "unit": "kms",
      "persen": 7
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 6.8,
    "rencanaProgres": 10,
    "deviasi": -3.2,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-45",
    "no": 45,
    "namaDusun": "Dusun Lapangan",
    "namaDesa": "Desa Waefusi",
    "kecamatan": "Kec. Namrole",
    "kabupaten": "Kab. Buru Selatan",
    "kodeDesa": "81.09.01.2016",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT GIBRAN GAMALAMA MANDIRI",
    "nilaiKontrak": "Rp 90.252.312",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0041.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.21,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 5,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.21,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-46",
    "no": 46,
    "namaDusun": "Dusun Belakang SMP",
    "namaDesa": "Desa Waenono",
    "kecamatan": "Kec. Namrole",
    "kabupaten": "Kab. Buru Selatan",
    "kodeDesa": "81.09.01.2014",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT GIBRAN GAMALAMA MANDIRI",
    "nilaiKontrak": "Rp 117.499.134",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0042.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.37,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 9,
      "rencanaTM": 0,
      "rencanaTR": 9,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 9,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.37,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-47",
    "no": 47,
    "namaDusun": "Dusun Pohon Kenari",
    "namaDesa": "Desa Lena",
    "kecamatan": "Kec. Waesama",
    "kabupaten": "Kab. Buru Selatan",
    "kodeDesa": "81.09.02.2003",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 492.893.795",
    "nilaiRealisasi": "Rp -",
    "capel": 20,
    "noSpbj": "0052.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 29,
      "rencanaTM": 9,
      "rencanaTR": 20,
      "realisasiTotal": 2,
      "realisasiTM": 1,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 7
    },
    "penggalian": {
      "rencanaTotal": 29,
      "rencanaTM": 9,
      "rencanaTR": 20,
      "realisasiTotal": 2,
      "realisasiTM": 1,
      "realisasiTR": 1,
      "unit": "titik",
      "persen": 7
    },
    "pengeceran": {
      "rencanaTotal": 29,
      "rencanaTM": 9,
      "rencanaTR": 20,
      "realisasiTotal": 2,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 7
    },
    "perambasan": {
      "rencanaTotal": 1.16,
      "realisasiTotal": 0.07,
      "unit": "kms",
      "persen": 6
    },
    "penanamanTiang": {
      "rencanaTotal": 29,
      "rencanaTM": 9,
      "rencanaTR": 20,
      "realisasiTotal": 1,
      "realisasiTM": 0,
      "realisasiTR": 1,
      "unit": "btg",
      "persen": 3
    },
    "penanamanTiangTM": {
      "rencanaTotal": 9,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 20,
      "realisasiTotal": 1,
      "unit": "btg",
      "persen": 5
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0.4,
      "realisasiTotal": 0.018,
      "unit": "kms",
      "persen": 5
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.76,
      "realisasiTotal": 0.034,
      "unit": "kms",
      "persen": 5
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 4.5,
    "rencanaProgres": 10,
    "deviasi": -5.5,
    "status": "On Progress",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-48",
    "no": 48,
    "namaDusun": "Dusun Mange-Mange",
    "namaDesa": "Desa Waepandan",
    "kecamatan": "Kec. Kepala Madan",
    "kabupaten": "Kab. Buru Selatan",
    "kodeDesa": "81.09.04.2007",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT GIBRAN GAMALAMA MANDIRI",
    "nilaiKontrak": "Rp 140.816.261",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0043.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.33,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.33,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-49",
    "no": 49,
    "namaDusun": "Dusun KM 7",
    "namaDesa": "Desa Sepa",
    "kecamatan": "Kec. Amahai",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.01.2002",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 MASOHI",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 372.962.988",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0053.SPBJ/DIS.01.01/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 21,
      "rencanaTM": 18,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 21,
      "rencanaTM": 18,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 21,
      "rencanaTM": 18,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 1.17,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 21,
      "rencanaTM": 18,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 18,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0.8,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.37,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-50",
    "no": 50,
    "namaDusun": "Dusun Haria Ujung",
    "namaDesa": "Desa Haria",
    "kecamatan": "Kec. Saparua",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.12.2004",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 75.001.120",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0048.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-51",
    "no": 51,
    "namaDusun": "Dusun Suli Bawah",
    "namaDesa": "Desa Suli",
    "kecamatan": "Kec. Salahutu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.14.2006",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 66.530.367",
    "nilaiRealisasi": "Rp -",
    "capel": 15,
    "noSpbj": "0055.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.17,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 5,
      "rencanaTM": 0,
      "rencanaTR": 5,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 5,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.17,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-52",
    "no": 52,
    "namaDusun": "Dusun Suli Atas",
    "namaDesa": "Desa Suli",
    "kecamatan": "Kec. Salahutu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.14.2006",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 47.316.501",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0056.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.26,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.26,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-53",
    "no": 53,
    "namaDusun": "Dusun Puncak Sniper",
    "namaDesa": "Desa Waai",
    "kecamatan": "Kec. Salahutu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.14.2002",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMUDRA JAYA RURIKA MANDIRI",
    "nilaiKontrak": "Rp 61.792.173",
    "nilaiRealisasi": "Rp -",
    "capel": 30,
    "noSpbj": "0057.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.29,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 3,
      "rencanaTM": 0,
      "rencanaTR": 3,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 3,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.29,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-54",
    "no": 54,
    "namaDusun": "Dusun Waai Belakang",
    "namaDesa": "Desa Waai",
    "kecamatan": "Kec. Salahutu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.14.2002",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 53.185.634",
    "nilaiRealisasi": "Rp -",
    "capel": 5,
    "noSpbj": "0051.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.46,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-55",
    "no": 55,
    "namaDusun": "Dusun Batu Dua",
    "namaDesa": "Desa Waai",
    "kecamatan": "Kec. Salahutu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.14.2002",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT SAMSEL JAYA MANDIRI",
    "nilaiKontrak": "Rp 49.206.433",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0054.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.36,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.36,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-56",
    "no": 56,
    "namaDusun": "Dusun Waihulu",
    "namaDesa": "Desa Seith",
    "kecamatan": "Kec. Leihitu",
    "kabupaten": "Kab. Maluku Tengah",
    "kodeDesa": "81.01.15.2009",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT MAULANA PRIMA KARYA",
    "nilaiKontrak": "Rp 107.596.144",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0044.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.77,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 0,
      "rencanaTM": 0,
      "rencanaTR": 0,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.77,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 1,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-57",
    "no": 57,
    "namaDusun": "Dusun Kahena",
    "namaDesa": "Desa Batu Merah",
    "kecamatan": "Kec. Sirimau",
    "kabupaten": "Kab. Kota Ambon",
    "kodeDesa": "81.71.02.2003",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT MAULANA PRIMA KARYA",
    "nilaiKontrak": "Rp 130.819.191",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0045.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 13,
      "rencanaTM": 0,
      "rencanaTR": 13,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 13,
      "rencanaTM": 0,
      "rencanaTR": 13,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 13,
      "rencanaTM": 0,
      "rencanaTR": 13,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.54,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 13,
      "rencanaTM": 0,
      "rencanaTR": 13,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 13,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.54,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  },
  {
    "id": "loc-58",
    "no": 58,
    "namaDusun": "Dusun Kapung Pelauw",
    "namaDesa": "Desa Soya",
    "kecamatan": "Kec. Sirimau",
    "kabupaten": "Kab. Kota Ambon",
    "kodeDesa": "81.71.02.2009",
    "ulp": "",
    "tahap": "TAHAP 4",
    "up3": "UP3 AMBON",
    "pelaksana": "PT MAULANA PRIMA KARYA",
    "nilaiKontrak": "Rp 72.766.128",
    "nilaiRealisasi": "Rp -",
    "capel": 10,
    "noSpbj": "0046.SPBJ/DIS.01.02/F17070000/2026",
    "tglAwalKontrak": "08 September 2026",
    "tglAkhirKontrak": "31 Desember 2026",
    "targetSelesai": "31 Desember 2026",
    "pematokan": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penggalian": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "titik",
      "persen": 0
    },
    "pengeceran": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "perambasan": {
      "rencanaTotal": 0.25,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penanamanTiang": {
      "rencanaTotal": 6,
      "rencanaTM": 0,
      "rencanaTR": 6,
      "realisasiTotal": 0,
      "realisasiTM": 0,
      "realisasiTR": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penanamanTiangTR": {
      "rencanaTotal": 6,
      "realisasiTotal": 0,
      "unit": "btg",
      "persen": 0
    },
    "penarikanKonduktorTM": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "penarikanKonduktorTR": {
      "rencanaTotal": 0.25,
      "realisasiTotal": 0,
      "unit": "kms",
      "persen": 0
    },
    "garduDistribusi": {
      "rencanaTotal": 0,
      "realisasiTotal": 0,
      "unit": "unit",
      "persen": 0
    },
    "progresKeseluruhan": 0,
    "rencanaProgres": 10,
    "deviasi": -10,
    "status": "Belum Mulai",
    "lastUpdated": "10 Sep 2026"
  }
];

export const INITIAL_WORK_PACKAGES: WorkPackageOverall[] = [
  { no: 1, nama: "Pematokan Jalur & Titik Tiang", satuan: "btg/titik", rencana: 1156, realisasi: 312, persen: 26.99, rencanaTM: 695, realisasiTM: 198, rencanaTR: 461, realisasiTR: 114 },
  { no: 2, nama: "Penggalian Tanah", satuan: "titik", rencana: 1156, realisasi: 245, persen: 21.19, rencanaTM: 695, realisasiTM: 142, rencanaTR: 461, realisasiTR: 103 },
  { no: 3, nama: "Pengeceran Tiang", satuan: "btg", rencana: 1156, realisasi: 278, persen: 24.05, rencanaTM: 695, realisasiTM: 165, rencanaTR: 461, realisasiTR: 113 },
  { no: 4, nama: "Perambasan Pohon (Right of Way / ROW)", satuan: "kms", rencana: 72.28, realisasi: 4.85, persen: 6.71 },
  { no: 5, nama: "Penanaman Tiang Total", satuan: "btg", rencana: 1156, realisasi: 182, persen: 15.74, rencanaTM: 695, realisasiTM: 108, rencanaTR: 461, realisasiTR: 74 },
  { no: 6, nama: "Penanaman Tiang TM (Tegangan Menengah)", satuan: "btg", rencana: 695, realisasi: 108, persen: 15.54 },
  { no: 7, nama: "Penarikan Konduktor TM", satuan: "kms", rencana: 33.720, realisasi: 1.840, persen: 5.46 },
  { no: 8, nama: "Penanaman Tiang TR (Tegangan Rendah)", satuan: "btg", rencana: 461, realisasi: 74, persen: 16.05 },
  { no: 9, nama: "Penarikan Konduktor TR", satuan: "kms", rencana: 38.560, realisasi: 2.120, persen: 5.50 },
  { no: 10, nama: "Pekerjaan Gardu Distribusi", satuan: "unit", rencana: 34, realisasi: 2, persen: 5.88 },
];

export const INITIAL_DAILY_LOGS: DailyLogEntry[] = [
  {
    id: "log-1",
    tanggal: "10 Sep 2026",
    lokasiId: "loc-24",
    lokasiNama: "Dusun Srimulyo (Kairatu)",
    up3: "UP3 MASOHI",
    pekerjaan: "Pekerjaan Selesai 100%",
    itemDetail: "Penarikan Konduktor TR 0.33 kms rampung dan commisioning test siap.",
    volume: "0.33 kms",
    kontraktor: "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    status: "Selesai",
    cuaca: "Cerah",
    catatan: "Seluruh tiang TR 7 btg dan penarikan konduktor telah terpasang rapi dan aman."
  },
  {
    id: "log-2",
    tanggal: "09 Sep 2026",
    lokasiId: "loc-13",
    lokasiNama: "Dusun Kampung Bugis (Haruru)",
    up3: "UP3 MASOHI",
    pekerjaan: "Penarikan Konduktor TR",
    itemDetail: "Stringing konduktor TR span 1-6 selesai sepanjang 395 meter.",
    volume: "0.395 kms",
    kontraktor: "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    status: "Dalam Proses",
    cuaca: "Cerah",
    catatan: "Progress penanaman tiang TR mencapai 18 dari 23 btg. Lanjut span berikutnya besok."
  },
  {
    id: "log-3",
    tanggal: "08 Sep 2026",
    lokasiId: "loc-12",
    lokasiNama: "Dusun Tanah Merah (Amahai)",
    up3: "UP3 MASOHI",
    pekerjaan: "Penanaman Tiang TR",
    itemDetail: "Erection tiang TR 18 batang dan pengecoran dudukan tiang.",
    volume: "18 btg",
    kontraktor: "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    status: "Dalam Proses",
    cuaca: "Cerah",
    catatan: "Material konduktor TR sudah berada di gudang sementara desa."
  },
  {
    id: "log-4",
    tanggal: "07 Sep 2026",
    lokasiId: "loc-18",
    lokasiNama: "Dusun Mutin (Ohoidertawun)",
    up3: "UP3 TUAL",
    pekerjaan: "Penanaman Tiang TM & Perambasan",
    itemDetail: "Erection tiang TM 70 btg dan perambasan pohon (ROW) jalur TM 1.48 km.",
    volume: "70 btg / 1.48 km",
    kontraktor: "PT AKSE BANGUN MALUKU",
    status: "Dalam Proses",
    cuaca: "Hujan Ringan",
    catatan: "Mobilisasi tiang di medan berbukit Kei Kecil selesai 114 btg."
  },
  {
    id: "log-5",
    tanggal: "06 Sep 2026",
    lokasiId: "loc-22",
    lokasiNama: "Dusun Air Kecap (Kairatu)",
    up3: "UP3 MASOHI",
    pekerjaan: "Penanaman Tiang TR",
    itemDetail: "Penanaman tiang TR 8 batang dari rencana 22 batang.",
    volume: "8 btg",
    kontraktor: "PT SAMUDRA JAYA RURIKA MANDIRI",
    status: "Dalam Proses",
    cuaca: "Cerah",
    catatan: "Pengeceran tiang telah rampung 100% (22 btg)."
  },
  {
    id: "log-6",
    tanggal: "04 Sep 2026",
    lokasiId: "loc-9",
    lokasiNama: "Dusun Difur (Labetawi)",
    up3: "UP3 TUAL",
    pekerjaan: "Galian Tanah & Pematokan TM",
    itemDetail: "Pematokan 46 btg dan penggalian 20 lubang tiang TM.",
    volume: "46 btg / 20 titik",
    kontraktor: "PT SAPTA MANUNGGAL KARYA JO PT BASUDARA SUKSES BERSAMA",
    status: "Dalam Proses",
    cuaca: "Hujan Deras / Gelombang Laut",
    catatan: "Terkendala gelombang laut saat pengangkutan material tiang dari dermaga Tual."
  },
  {
    id: "log-7",
    tanggal: "02 Sep 2026",
    lokasiId: "loc-10",
    lokasiNama: "Dusun Rumkuda (Jerusu)",
    up3: "UP3 SAUMLAKI",
    pekerjaan: "Mobilisasi Material Antar-Pulau",
    itemDetail: "Kapal pengangkut material tiang berlayar menuju Pulau Roma.",
    volume: "6 btg tiang TR",
    kontraktor: "PT CAHAYA GENTA ABADI JO PT MEGATAMA SELARAS",
    status: "Tertunda",
    cuaca: "Hujan Deras / Gelombang Laut",
    catatan: "BMKG mengeluarkan peringatan gelombang tinggi di Laut Banda."
  }
];

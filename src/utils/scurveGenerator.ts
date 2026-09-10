import { SCurveDataPoint, LocationProject } from '../types';

interface GenerateOptions {
  totalWeeks?: number;
  cutoffWeek?: number;
  startDate?: string;
  location?: LocationProject | null;
  locations?: LocationProject[];
}

// Generate weekly dates from start date (27 Jun 2026) to end of Dec 2026 (31 Des 2026)
function formatWeekDate(weekIndex: number, totalWeeks: number = 27): string {
  if (weekIndex === 0) return '27 Jun';
  if (weekIndex === 11) return '10 Sep';
  if (weekIndex === totalWeeks) return '31 Des';

  // Start 27 Jun 2026
  const start = new Date(2026, 5, 27); // Jun is month 5 (0-indexed)
  const targetDate = new Date(start.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000);
  const day = targetDate.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${day} ${monthNames[targetDate.getMonth()]}`;
}

export function generateSCurveData(options: GenerateOptions = {}): SCurveDataPoint[] {
  const totalWeeks = options.totalWeeks || 27; // Default: Week 0 (27 Jun 2026) to Week 27 (Akhir Des 2026)
  const cutoffWeek = options.cutoffWeek || 11; // 10 Sep 2026 is week 11
  const loc = options.location;
  const locations = options.locations || [];

  // Determine target planned and actual at cutoff
  let actualAtCutoff = 0;
  let plannedAtCutoff = 38.5; // default portfolio planned at week 11

  if (loc) {
    actualAtCutoff = loc.progresKeseluruhan;
    plannedAtCutoff = loc.rencanaProgres;
  } else if (locations.length > 0) {
    // Average across filtered locations
    actualAtCutoff = locations.reduce((acc, l) => acc + l.progresKeseluruhan, 0) / locations.length;
    plannedAtCutoff = locations.reduce((acc, l) => acc + l.rencanaProgres, 0) / locations.length;
  } else {
    actualAtCutoff = 11.2; // overall portfolio actual
    plannedAtCutoff = 38.5;
  }

  const data: SCurveDataPoint[] = [];

  // C1 Continuous Monotonic Spline for Baseline Plan (0% at w=0 -> plannedAtCutoff at w=cutoffWeek -> 100% at w=totalWeeks)
  const C = cutoffWeek;
  const N = totalWeeks;
  const y0 = 0;
  const yc = plannedAtCutoff;
  const yN = 100;

  // Intermediate slope at cutoff (Fritsch-Carlson monotonic tangent)
  const slope1 = C > 0 ? (yc - y0) / C : 0;
  const slope2 = N > C ? (yN - yc) / (N - C) : 0;
  let mc = (slope1 + slope2) / 2;
  // Bound mc to preserve monotonicity
  if (slope1 > 0 && slope2 > 0) {
    mc = Math.min(mc, 2.5 * slope1, 2.5 * slope2);
  }

  for (let w = 0; w <= totalWeeks; w++) {
    let plannedCumulative = 0;

    if (w === 0) {
      plannedCumulative = 0;
    } else if (w === C) {
      plannedCumulative = yc;
    } else if (w === N) {
      plannedCumulative = 100;
    } else if (w < C) {
      // Hermite spline on [0, C]
      const t = w / C;
      const h01 = -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2);
      const h11 = Math.pow(t, 3) - Math.pow(t, 2);
      plannedCumulative = h01 * yc + h11 * (C * mc);
    } else {
      // Hermite spline on [C, N]
      const L = N - C;
      const t = (w - C) / L;
      const h00 = 2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1;
      const h10 = Math.pow(t, 3) - 2 * Math.pow(t, 2) + t;
      const h01 = -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2);
      plannedCumulative = h00 * yc + h10 * (L * mc) + h01 * yN;
    }

    // Clamp to [0, 100] and ensure precision
    plannedCumulative = Math.max(0, Math.min(100, Number(plannedCumulative.toFixed(2))));

    // Weekly plan is delta from previous
    const prevPlanned = w === 0 ? 0 : data[w - 1].rencanaKumulatif;
    const plannedWeekly = Number(Math.max(0, plannedCumulative - prevPlanned).toFixed(2));

    const dateLabel = formatWeekDate(w, totalWeeks);
    const isCutoff = w === cutoffWeek;

    let actualCumulative: number | null = null;
    let actualWeekly: number | null = null;
    let deviasi: number | null = null;

    if (w <= cutoffWeek) {
      if (actualAtCutoff === 0) {
        actualCumulative = 0;
        actualWeekly = 0;
      } else {
        // Build progressive actual trajectory leading up to actualAtCutoff
        if (loc && loc.progresKeseluruhan === 100) {
          // Completed ahead of schedule at week 9-11
          const progressFactor = Math.min(1, Math.pow(w / (cutoffWeek - 1), 2.2));
          actualCumulative = Number((progressFactor * 100).toFixed(2));
        } else {
          // Accelerating curve to actualAtCutoff
          const progressFactor = Math.pow(w / cutoffWeek, 2.0);
          actualCumulative = Number((progressFactor * actualAtCutoff).toFixed(2));
        }
        
        const prevActual = w === 0 ? 0 : (data[w - 1].realisasiKumulatif || 0);
        actualWeekly = Number(((actualCumulative || 0) - prevActual).toFixed(2));
      }

      deviasi = Number(((actualCumulative || 0) - plannedCumulative).toFixed(2));
    }

    const fullDateLabel = w === totalWeeks
      ? `M-${w} (${dateLabel} - Target 100%)`
      : w === cutoffWeek
      ? `M-${w} (${dateLabel} - Cut-Off)`
      : `M-${w} (${dateLabel})`;

    data.push({
      week: w,
      dateLabel: fullDateLabel,
      rencanaMingguan: plannedWeekly,
      rencanaKumulatif: plannedCumulative,
      realisasiMingguan: actualWeekly,
      realisasiKumulatif: actualCumulative,
      deviasi,
      isCutoff,
    });
  }

  return data;
}

export function getStatusBadgeInfo(status: string) {
  switch (status) {
    case 'Selesai':
      return {
        bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-400',
        text: 'Selesai',
      };
    case 'On Progress':
    case 'On Progres':
      return {
        bg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
        dot: 'bg-cyan-400',
        text: 'On Progress',
      };
    case 'Belum Mulai':
    default:
      return {
        bg: 'bg-slate-700/30 text-slate-400 border-slate-700/50',
        dot: 'bg-slate-400',
        text: 'Belum Mulai',
      };
  }
}

// Dakika cinsinden bekleme süreleri
// 1. seviye: 1 dk
// 2. seviye: 10 dk
// 3. seviye: 1 saat
// 4. seviye: 1 gün
// 5. seviye: 3 gün
const SRS_INTERVALS = [1, 10, 60, 1440, 4320]; // dk
export function getNextReview(level) {
  const lvl = level || 0;
  const mins = SRS_INTERVALS[lvl] || SRS_INTERVALS[SRS_INTERVALS.length-1];
  const nextTime = Date.now() + (mins * 60000);
  let label = mins + " m";
  if(mins >= 60) label = Math.floor(mins/60) + " h";
  if(mins >= 1440) label = Math.floor(mins/1440) + " d";
  return { time: nextTime, level: lvl + 1, label };
}
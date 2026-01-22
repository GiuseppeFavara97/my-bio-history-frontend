export function startWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);

  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function timeSlots(start = 9, end = 13, stepMinutes = 30) {
  const slots: { label: string; index: number }[] = [];
  let index = 0;

  for (let h = start; h <= end; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");

      slots.push({
        label: `${hh}:${mm}`,
        index,
      });
      index++;
    }
  }
  return slots;
}

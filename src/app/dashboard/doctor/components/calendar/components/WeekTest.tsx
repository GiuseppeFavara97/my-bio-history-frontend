"use client";

import { addDays, getWeekDays, startWeek } from "@/lib/calendar";
import { useState } from "react";


export default function WeekDebug() {
  const [anchorDate, setAnchorDate] = useState(new Date());

  const weekStart = startWeek(anchorDate);
  const days = getWeekDays(weekStart);

  return (
    <div className="p-4 space-y-3">
      <div>
        <button onClick={() => setAnchorDate(d => addDays(d, -7))}>
          ← settimana prima
        </button>

        <button onClick={() => setAnchorDate(d => addDays(d, 7))} className="ml-3">
          settimana dopo →
        </button>
      </div>

      <div>
        <strong>Anchor date:</strong> {anchorDate.toDateString()}
      </div>

      <div>
        <strong>Lunedì:</strong> {weekStart.toDateString()}
      </div>

      <ul>
        {days.map(d => (
          <li key={d.toISOString()}>{d.toDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

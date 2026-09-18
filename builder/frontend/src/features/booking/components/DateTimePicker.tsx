import { useEffect, useState } from "react";

interface DateTimePickerProps {
  label: string;
  value: string; // ISO string, or "" if unset
  onChange: (isoString: string) => void;
  required?: boolean;
  minDate?: string; // YYYY-MM-DD
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const MINUTES = [0, 15, 30, 45];

/**
 * Native <input type="datetime-local"> renders very differently across
 * browsers/OSes — especially the time portion, which is a fiddly little
 * spinner that's easy to misread or mis-set. This picker splits date and
 * time into a native date input (which IS consistent and fine) plus a
 * plain, always-the-same hour / minute / AM-PM selector, so what the
 * admin sets is unambiguous no matter what browser they're on.
 */
export default function DateTimePicker({
  label,
  value,
  onChange,
  required,
  minDate,
}: DateTimePickerProps) {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  // Populate the picker if an initial value is passed in (e.g. editing).
  useEffect(() => {
    if (!value) return;

    const d = new Date(value);
    if (isNaN(d.getTime())) return;

    setDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate(),
      ).padStart(2, "0")}`,
    );

    let h = d.getHours();
    const p: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;

    setHour(h);
    setMinute(d.getMinutes());
    setPeriod(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = (
    nextDate: string,
    nextHour: number,
    nextMinute: number,
    nextPeriod: "AM" | "PM",
  ) => {
    if (!nextDate) {
      onChange("");
      return;
    }

    let hour24 = nextHour % 12;
    if (nextPeriod === "PM") hour24 += 12;

    const [y, m, d] = nextDate.split("-").map(Number);
    const combined = new Date(y, m - 1, d, hour24, nextMinute, 0, 0);

    onChange(combined.toISOString());
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-dark">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={date}
          min={minDate}
          onChange={(e) => {
            setDate(e.target.value);
            emit(e.target.value, hour, minute, period);
          }}
          required={required}
          className="rounded-xl border border-primary/15 bg-background px-3 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />

        <select
          value={hour}
          onChange={(e) => {
            const h = Number(e.target.value);
            setHour(h);
            emit(date, h, minute, period);
          }}
          className="rounded-xl border border-primary/15 bg-background px-2 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {HOURS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span className="text-primary/50">:</span>

        <select
          value={minute}
          onChange={(e) => {
            const min = Number(e.target.value);
            setMinute(min);
            emit(date, hour, min, period);
          }}
          className="rounded-xl border border-primary/15 bg-background px-2 py-2 text-sm text-dark focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {MINUTES.map((m) => (
            <option key={m} value={m}>
              {String(m).padStart(2, "0")}
            </option>
          ))}
        </select>

        <div className="flex overflow-hidden rounded-xl border border-primary/15">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p);
                emit(date, hour, minute, p);
              }}
              className={`px-3 py-2 text-sm font-semibold transition ${
                period === p
                  ? "bg-accent text-white"
                  : "bg-background text-primary/70 hover:bg-primary/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {date && (
        <p className="mt-1.5 text-xs text-primary/50">
          Setting: {date} at {hour}:{String(minute).padStart(2, "0")} {period}{" "}
          (your local time)
        </p>
      )}
    </div>
  );
}

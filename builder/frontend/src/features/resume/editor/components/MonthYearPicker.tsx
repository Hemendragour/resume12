import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface Props {
  value: string; // "YYYY-MM" or ""
  onChange: (value: string) => void;
  disabled?: boolean;
  maxYear?: number;
  placeholder?: string;
}

export default function MonthYearPicker({
  value,
  onChange,
  disabled,
  maxYear,
  placeholder = "Select month",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedYear, selectedMonth] = value
    ? value.split("-").map(Number)
    : [undefined, undefined];

  const currentYear = new Date().getFullYear();
  const yearCap = maxYear ?? currentYear;
  const [viewYear, setViewYear] = useState(selectedYear || currentYear);

  useEffect(() => {
    if (isOpen) setViewYear(selectedYear || currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label = value
    ? `${MONTHS[selectedMonth! - 1]} ${selectedYear}`
    : placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        className="mt-1.5 flex h-11 w-full items-center justify-between rounded-lg border border-primary/15 bg-card px-4 text-left text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={value ? "text-dark" : "text-dark/40"}>{label}</span>
        <Calendar size={16} className="text-dark/40" />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-20 mt-2 w-64 rounded-xl border border-primary/15 bg-modal p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewYear((y) => y - 1)}
              className="rounded-lg p-1.5 text-dark/60 hover:bg-card"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-dark">{viewYear}</span>
            <button
              type="button"
              onClick={() => setViewYear((y) => Math.min(y + 1, yearCap))}
              disabled={viewYear >= yearCap}
              className="rounded-lg p-1.5 text-dark/60 hover:bg-card disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {MONTHS.map((m, i) => {
              const monthNum = i + 1;
              const isFuture =
                viewYear === currentYear &&
                monthNum > new Date().getMonth() + 1;
              const isSelected =
                selectedYear === viewYear && selectedMonth === monthNum;
              return (
                <button
                  key={m}
                  type="button"
                  disabled={isFuture}
                  onClick={() => {
                    const mm = String(monthNum).padStart(2, "0");
                    onChange(`${viewYear}-${mm}`);
                    setIsOpen(false);
                  }}
                  className={`rounded-lg px-2 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-30 ${
                    isSelected
                      ? "bg-accent text-dark"
                      : "text-dark/70 hover:bg-card"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>

          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className="mt-2 w-full rounded-lg py-1.5 text-xs font-medium text-dark/50 hover:bg-card"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

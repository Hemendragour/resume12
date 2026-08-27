const MONTH_NAMES = [
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

/**
 * Converts "YYYY-MM" (the format the calendar pickers store) into
 * "Mon YYYY" for display, e.g. "2026-06" -> "Jun 2026".
 * Passes through anything that isn't in that exact shape untouched,
 * so free-typed or legacy dates ("2024", "June 2024") still render fine.
 */
export function formatMonthYear(value?: string): string {
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const [, year, month] = match;
  const monthIndex = Number(month) - 1;
  if (monthIndex < 0 || monthIndex > 11) return value;
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

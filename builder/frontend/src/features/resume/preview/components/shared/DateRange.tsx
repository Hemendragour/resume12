interface Props {
  start?: string;
  end?: string;
  current?: boolean;
}

function formatMonth(date?: string) {
  if (!date) return "";

  const [year, month] = date.split("-");

  const months = [
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

  return `${months[Number(month) - 1]} ${year}`;
}

export default function DateRange({ start, end, current }: Props) {
  if (!start) return null;

  return (
    <span className="text-[11px] font-medium text-slate-500">
      {formatMonth(start)}
      {current ? " – Present" : end ? ` – ${formatMonth(end)}` : ""}
    </span>
  );
}

import { useTheme } from "../../themes/ThemeProvider";

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  const theme = useTheme();

  return (
    <div
      className="mb-3"
      style={{
        marginTop: theme.section.spacing,
      }}
    >
      <h2
        className={`font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        }`}
      >
        {title}
      </h2>

      {theme.section.divider && <div className="mt-1 h-px bg-slate-500" />}
    </div>
  );
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-dark">
          Job Description
        </label>
        <span className="rounded-lg bg-accent/15 px-2 py-1 text-xs font-medium text-dark/70">
          Optional
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="min-h-40 w-full resize-y rounded-xl border border-card bg-background p-4 text-sm leading-6 text-dark outline-none focus:border-accent focus:bg-modal focus:ring-2 focus:ring-accent/20"
      />

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-dark/40">
          {value.length.toLocaleString()} characters
        </p>
        {value.trim() && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-dark/60 hover:text-danger"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-heading">
          Job Description
        </label>
        <span className="rounded-lg bg-btn-hover-bg px-2 py-1 text-xs font-medium text-heading/70">
          Optional
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the complete job description here..."
        className="min-h-40 w-full resize-y rounded-xl border border-border-popup bg-navbar-hover p-4 text-sm leading-6 text-heading outline-none focus:border-border-strong focus:bg-popup focus:ring-2 focus:ring-ring"
      />

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-heading/40">
          {value.length.toLocaleString()} characters
        </p>
        {value.trim() && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-heading/60 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

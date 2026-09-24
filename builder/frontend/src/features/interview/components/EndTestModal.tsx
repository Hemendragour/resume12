interface EndTestModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  ending: boolean;
}

export default function EndTestModal({
  open,
  onCancel,
  onConfirm,
  ending,
}: EndTestModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-xl sm:p-6">
        <h3 className="mb-2 text-base font-semibold text-dark sm:text-lg">
          End this interview?
        </h3>

        <p className="mb-6 text-sm text-primary/70">
          You'll get a summary based on the questions you've answered so far.
          You won't be able to resume this session afterwards.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onCancel}
            disabled={ending}
            className="flex-1 rounded-xl border border-primary/15 px-4 py-2.5 text-sm font-semibold text-primary/70 transition hover:bg-primary/5 disabled:opacity-50"
          >
            Keep going
          </button>

          <button
            onClick={onConfirm}
            disabled={ending}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            {ending ? "Ending..." : "End Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

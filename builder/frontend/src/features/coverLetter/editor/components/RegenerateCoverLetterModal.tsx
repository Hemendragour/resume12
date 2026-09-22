import { useState } from "react";

import Modal from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";

import { useCoverLetterStore } from "../../../../store/coverLetter.store";
import { regenerateCoverLetterSection } from "../../services/coverLetterAi.service";
import type { RegenerateCoverLetterTarget } from "../../types/coverLetter.types";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegenerateCoverLetterModal({ open, onClose }: Props) {
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);
  const updateBodyField = useCoverLetterStore((state) => state.updateBodyField);
  const updateParagraph = useCoverLetterStore((state) => state.updateParagraph);

  const [target, setTarget] = useState<RegenerateCoverLetterTarget>("full");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!coverLetter) return null;

  const paragraphOptions = coverLetter.body.paragraphs.map((_, index) => ({
    value: `paragraph:${index}` as RegenerateCoverLetterTarget,
    label: `Body Paragraph ${index + 1}`,
  }));

  const handleRegenerate = async () => {
    if (!reason.trim()) {
      setError("Please describe what you'd like changed.");
      return;
    }

    if (
      target === "full" &&
      !window.confirm(
        "This will replace your entire letter body. Any manual edits you made will be lost. Continue?",
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await regenerateCoverLetterSection({
        currentLetter: coverLetter,
        target,
        reason: reason.trim(),
      });

      if (target === "full") {
        updateBodyField({
          opening: result.opening as string,
          closing: result.closing as string,
        });

        // Replace all middle paragraphs.
        const newParagraphs = (result.paragraphs as string[]) ?? [];
        newParagraphs.forEach((paragraph, index) => {
          updateParagraph(index, paragraph);
        });
      } else if (target === "opening") {
        updateBodyField({ opening: result.opening as string });
      } else if (target === "closing") {
        updateBodyField({ closing: result.closing as string });
      } else {
        const index = Number(target.split(":")[1]);
        updateParagraph(index, result.paragraph as string);
      }

      setReason("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to regenerate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Regenerate with AI"
      description="Tell the AI what you'd like changed — it's required so the rewrite actually matches what you want."
      size="md"
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            What should be regenerated?
          </label>
          <select
            value={target}
            onChange={(e) =>
              setTarget(e.target.value as RegenerateCoverLetterTarget)
            }
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          >
            <option value="full">Whole Letter</option>
            <option value="opening">Opening Paragraph</option>
            {paragraphOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            <option value="closing">Closing Paragraph</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            What would you like different? (required)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Make it shorter, sound less formal, focus more on leadership experience..."
            className="w-full min-h-[100px] rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-600 resize-y"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleRegenerate} disabled={loading}>
            {loading ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";

export default function AwardsSection() {
  const awards = useResumeStore((state) => state.resume?.awards ?? []);

  const addAward = useResumeStore((state) => state.addAward);
  const removeAward = useResumeStore((state) => state.removeAward);

  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const award = value.trim();

    if (!award) return;

    addAward(award);
    setValue("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Awards</h2>
        <p className="text-gray-500">Press Enter to add an award.</p>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Winner - Smart India Hackathon"
        className="h-12 w-full rounded-xl border px-4"
      />

      <div className="flex flex-wrap gap-3">
        {awards.map((award) => (
          <button
            key={award}
            type="button"
            onClick={() => removeAward(award)}
            className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            {award}
            <X size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
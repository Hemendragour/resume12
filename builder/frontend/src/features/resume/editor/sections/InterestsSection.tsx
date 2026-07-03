import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Heart, X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";

export default function InterestsSection() {
  const interests = useResumeStore((state) => state.resume?.interests ?? []);

  const addInterest = useResumeStore((state) => state.addInterest);

  const removeInterest = useResumeStore((state) => state.removeInterest);

  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const interest = value.trim();

    if (!interest) return;

    addInterest(interest);

    setValue("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Interests</h2>

        <p className="text-gray-500">Press Enter to add your interests.</p>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Open Source"
        className="h-12 w-full rounded-xl border px-4"
      />

      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => removeInterest(interest)}
            className="flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-pink-700 hover:bg-pink-200 transition"
          >
            <Heart size={16} />

            {interest}

            <X size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Heart, Plus, X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import Button from "../../../../components/ui/Button";

export default function InterestsSection() {
  const interests = useResumeStore((state) => state.resume?.interests ?? []);

  const addInterest = useResumeStore((state) => state.addInterest);

  const removeInterest = useResumeStore((state) => state.removeInterest);

  const [value, setValue] = useState("");

  // Add interest
  const handleAddInterest = () => {
    const interest = value.trim();

    if (!interest) return;

    addInterest(interest);

    setValue("");
  };

  // Add interest when pressing Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    handleAddInterest();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Interests</h2>

        <p className="text-gray-500">
          Press Enter or click Add to add your interests.
        </p>
      </div>

      {/* Interest Input + Add Button */}
      <div className="flex gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Open Source"
          className="h-12 flex-1 rounded-xl border px-4 outline-none focus:border-blue-600"
        />

        <Button
          type="button"
          leftIcon={<Plus size={18} />}
          onClick={handleAddInterest}
        >
          Add
        </Button>
      </div>

      {/* Interests List */}
      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => (
          <button
            key={interest}
            type="button"
            onClick={() => removeInterest(interest)}
            className="flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-pink-700 transition hover:bg-pink-200"
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

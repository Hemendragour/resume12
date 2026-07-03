import { useState } from "react";
import type { KeyboardEvent } from "react";
import { X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";

export default function LanguagesSection() {
  const languages = useResumeStore((state) => state.resume?.languages ?? []);

  const addLanguage = useResumeStore((state) => state.addLanguage);

  const removeLanguage = useResumeStore((state) => state.removeLanguage);

  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const language = value.trim();

    if (!language) return;

    addLanguage(language);

    setValue("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Languages</h2>

        <p className="text-gray-500">Press Enter to add a language.</p>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="English"
        className="h-12 w-full rounded-xl border px-4"
      />

      <div className="flex flex-wrap gap-3">
        {languages.map((language) => (
          <button
            key={language}
            type="button"
            onClick={() => removeLanguage(language)}
            className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            {language}

            <X size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

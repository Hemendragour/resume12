import { useState } from "react";
import type { KeyboardEvent } from "react";
import { X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";

const PROFICIENCY_LEVELS = [
  "Native",
  "Fluent",
  "Conversational",
  "Basic",
];

export default function LanguagesSection() {
  const languages = useResumeStore((state) => state.resume?.languages ?? []);

  const addLanguage = useResumeStore((state) => state.addLanguage);
  const removeLanguage = useResumeStore((state) => state.removeLanguage);
  const updateLanguageLevel = useResumeStore(
    (state) => state.updateLanguageLevel
  );

  const [name, setName] = useState("");
  const [level, setLevel] = useState(PROFICIENCY_LEVELS[0]);

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    addLanguage({ name: trimmed, level });
    setName("");
    setLevel(PROFICIENCY_LEVELS[0]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleAdd();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Languages</h2>
        <p className="text-gray-500">
          Add a language name and proficiency level, then press Enter or click Add.
        </p>
      </div>

      <div className="flex gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="English"
          className="h-12 flex-1 rounded-xl border px-4"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="h-12 rounded-xl border px-4"
        >
          {PROFICIENCY_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAdd}
          className="h-12 rounded-xl bg-green-600 px-6 font-medium text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {languages.map((language) => (
          <div
            key={language.name}
            className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700"
          >
            <span>
              {language.name}
              {language.level && (
                <span className="text-green-600"> ({language.level})</span>
              )}
            </span>

            <select
              value={language.level}
              onChange={(e) =>
                updateLanguageLevel(language.name, e.target.value)
              }
              className="rounded-full border-none bg-transparent text-xs text-green-700 focus:outline-none"
            >
              {PROFICIENCY_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => removeLanguage(language.name)}
              className="ml-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
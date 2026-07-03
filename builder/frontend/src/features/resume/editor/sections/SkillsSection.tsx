import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { X, Sparkles } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import { skillSuggestions } from "../data/skillSuggestions";
import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

export default function SkillsSection() {
  const skills = useResumeStore(
    (state) => state.resume?.skills ?? []
  );

  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const resume = useResumeStore((state) => state.resume);
  const updateSkills = useResumeStore((state) => state.updateSkills);

  const { mutate, isPending } = useSuggestSkills();

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus after adding skill
  useEffect(() => {
    inputRef.current?.focus();
  }, [skills.length]);

  // Check if skill already exists (case insensitive)
  const skillExists = (skill: string) => {
    return skills.some(
      (s) => s.toLowerCase() === skill.toLowerCase()
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const skill = value.trim();
    if (!skill) return;
    if (skillExists(skill)) {
      setValue("");
      return;
    }

    addSkill(skill);
    setValue("");
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skillExists(trimmed)) return;

    addSkill(trimmed);
  };

  const handleSuggestSkills = () => {
    if (!resume?._id) return;

    mutate(resume._id, {
      onSuccess(aiSkills) {
        // Merge existing + AI skills + remove duplicates
        const merged = [
  ...skills,
  ...aiSkills,
].filter(
  (skill, index, arr) =>
    index ===
    arr.findIndex(
      (s) =>
        s.toLowerCase() ===
        skill.toLowerCase()
    )
);

updateSkills(merged);
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="text-gray-500">Press Enter to add skills.</p>
      </div>

      {/* Add Skill Input */}
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        className="h-12 w-full rounded-xl border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />

      {/* Added Skills */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => removeSkill(skill)}
            className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200 transition-all"
          >
            {skill}
            <X size={14} strokeWidth={3} />
          </button>
        ))}
      </div>

      {/* AI Suggest Button */}
      <button
        type="button"
        onClick={handleSuggestSkills}
        disabled={isPending || !resume?._id}
        className="mb-4 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles size={18} />
        {isPending ? "AI is suggesting..." : "✨ AI Suggest Skills"}
      </button>

      {/* Static Suggested Skills */}
      <div>
        <h3 className="mb-3 font-semibold">Popular Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skillSuggestions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleAddSkill(skill)}
              className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
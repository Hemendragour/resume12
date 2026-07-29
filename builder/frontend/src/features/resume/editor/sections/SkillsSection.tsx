// // // // // // import { useState, useRef, useEffect } from "react";
// // // // // // import type { KeyboardEvent } from "react";
// // // // // // import { X, Sparkles } from "lucide-react";
// // // // // // import { useResumeStore } from "../../../../store/resume.store";
// // // // // // import { skillSuggestions } from "../data/skillSuggestions";
// // // // // // import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

// // // // // // export default function SkillsSection() {
// // // // // //   const skills = useResumeStore((state) => state.resume?.skills ?? []);
// // // // // //   const categories =
// // // // // //   skills.length > 0
// // // // // //     ? skills
// // // // // //     : [
// // // // // //         { title: "Languages", skills: [] },
// // // // // //         { title: "Frameworks", skills: [] },
// // // // // //         { title: "Databases", skills: [] },
// // // // // //         { title: "Tools", skills: [] },
// // // // // //       ];
// // // // // //   const addSkill = useResumeStore((state) => state.addSkill);
// // // // // //   const removeSkill = useResumeStore((state) => state.removeSkill);
// // // // // //   const updateSkills = useResumeStore((state) => state.updateSkills);
// // // // // //   const addCategory = useResumeStore((state) => state.addCategory);
// // // // // //   const removeCategory = useResumeStore((state) => state.removeCategory);
// // // // // //   const resume = useResumeStore((state) => state.resume);

// // // // // //   const { mutate, isPending } = useSuggestSkills();

// // // // // //   // States as per your requirement
// // // // // //   const [selectedCategory, setSelectedCategory] = useState("Languages");
// // // // // //   const [skillInput, setSkillInput] = useState("");
// // // // // //   const [categoryInput, setCategoryInput] = useState(""); // Kept as per Step 1

// // // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // // //   // Auto focus after adding skill
// // // // // //   useEffect(() => {
// // // // // //     inputRef.current?.focus();
// // // // // //   }, [skills.length]);

// // // // // //   // Check if skill already exists (case insensitive)
// // // // // //   const skillExists = (categoryTitle: string, skill: string) => {
// // // // // //     const category = skills.find((item) => item.title === categoryTitle);
// // // // // //     if (!category) return false;
// // // // // //     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
// // // // // //   };

// // // // // //   const handleAddSkill = () => {
// // // // // //     const value = skillInput.trim();
// // // // // //     if (!value) return;
// // // // // //     if (skillExists(selectedCategory, value)) {
// // // // // //       setSkillInput("");
// // // // // //       return;
// // // // // //     }
// // // // // //     addSkill(selectedCategory, value);
// // // // // //     setSkillInput("");
// // // // // //   };

// // // // // //   const handleAddCategory = () => {
// // // // // //     const title = categoryInput.trim();
// // // // // //     if (!title) return;
// // // // // //     // Prevent duplicate category
// // // // // //     if (skills.some((cat) => cat.title.toLowerCase() === title.toLowerCase())) {
// // // // // //       setCategoryInput("");
// // // // // //       return;
// // // // // //     }
// // // // // //     addCategory(title);
// // // // // //     setCategoryInput("");
// // // // // //     setSelectedCategory(title);
// // // // // //   };

// // // // // //   const handleSuggestSkills = () => {
// // // // // //     if (!resume?._id) return;
// // // // // //     mutate(resume._id, {
// // // // // //       onSuccess: (aiSkills: string[]) => {
// // // // // //         const updated = skills.map((category) => {
// // // // // //           if (category.title !== selectedCategory) {
// // // // // //             return category;
// // // // // //           }
// // // // // //           const merged = [...category.skills, ...aiSkills].filter(
// // // // // //             (skill, index, arr) =>
// // // // // //               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
// // // // // //           );
// // // // // //           return { ...category, skills: merged };
// // // // // //         });
// // // // // //         updateSkills(updated);
// // // // // //       },
// // // // // //     });
// // // // // //   };

// // // // // //   const currentCategory = skills.find((c) => c.title === selectedCategory);

// // // // // //   return (
// // // // // //     <div className="space-y-8">
// // // // // //       <div>
// // // // // //         <h2 className="text-2xl font-bold">Skills</h2>
// // // // // //       </div>

// // // // // //       {/* Category Selector - Dropdown (Step 3) */}
// // // // // //       {skills.length > 0 && (
// // // // // //         <div className="space-y-2">
// // // // // //           <label className="block text-sm font-medium text-gray-700">
// // // // // //             Select Category
// // // // // //           </label>
// // // // // //           <select
// // // // // //             value={selectedCategory}
// // // // // //             onChange={(e) => setSelectedCategory(e.target.value)}
// // // // // //             className="h-11 w-full rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // // //           >
// // // // // //             {skills.map((category) => (
// // // // // //               <option
// // // // // //                 key={category.title}
// // // // // //                 value={category.title}
// // // // // //               >
// // // // // //                 {category.title}
// // // // // //               </option>
// // // // // //             ))}
// // // // // //           </select>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Add Skill Input (Step 4 + Step 5) */}
// // // // // //       <div className="space-y-2">
// // // // // //         <label className="block text-sm font-medium text-gray-700">
// // // // // //           Add Skill to: <span className="font-semibold">{selectedCategory}</span>
// // // // // //         </label>
// // // // // //         <div className="mt-4 flex gap-3">
// // // // // //           <input
// // // // // //             ref={inputRef}
// // // // // //             value={skillInput}
// // // // // //             onChange={(e) => setSkillInput(e.target.value)}
// // // // // //             placeholder="Type a skill"
// // // // // //             className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // // //             onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
// // // // // //               if (e.key === "Enter") {
// // // // // //                 e.preventDefault();
// // // // // //                 handleAddSkill();
// // // // // //               }
// // // // // //             }}
// // // // // //           />
// // // // // //           <button
// // // // // //             onClick={handleAddSkill}
// // // // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // // // //           >
// // // // // //             Add Skill
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Add New Category */}
// // // // // //       <div className="rounded-xl border p-5">
// // // // // //         <h3 className="mb-4 text-lg font-semibold">Add New Category</h3>
// // // // // //         <div className="flex gap-3">
// // // // // //           <input
// // // // // //             value={categoryInput}
// // // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // // //             placeholder="e.g. Frameworks, Tools, Soft Skills"
// // // // // //             className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // // //             onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
// // // // // //           />
// // // // // //           <button
// // // // // //             type="button"
// // // // // //             onClick={handleAddCategory}
// // // // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // // // //           >
// // // // // //             Add Category
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Selected Category Skills - Only Chips (Step 6 + Step 9) */}
// // // // // //       {currentCategory && (
// // // // // //         <div className="rounded-xl border p-5">
// // // // // //           <div className="flex flex-wrap gap-2">
// // // // // //             {currentCategory.skills.map((skill) => (
// // // // // //               <button
// // // // // //                 key={skill}
// // // // // //                 type="button"
// // // // // //                 onClick={() => removeSkill(selectedCategory, skill)}
// // // // // //                 className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 hover:bg-red-100 hover:text-red-700 transition"
// // // // // //               >
// // // // // //                 {skill}
// // // // // //                 <X size={14} />
// // // // // //               </button>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* AI Suggest Button */}
// // // // // //       <button
// // // // // //         type="button"
// // // // // //         onClick={handleSuggestSkills}
// // // // // //         disabled={isPending || !resume?._id}
// // // // // //         className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// // // // // //       >
// // // // // //         <Sparkles size={18} />
// // // // // //         {isPending ? "AI is suggesting..." : "✨ AI Suggest Skills"}
// // // // // //       </button>

// // // // // //       {/* Popular Skills */}
// // // // // //       <div>
// // // // // //         <h3 className="mb-3 font-semibold">Popular Skills</h3>
// // // // // //         <div className="flex flex-wrap gap-2">
// // // // // //           {skillSuggestions.map((skill) => (
// // // // // //             <button
// // // // // //               key={skill}
// // // // // //               type="button"
// // // // // //               onClick={() => {
// // // // // //                 const trimmed = skill.trim();
// // // // // //                 if (!trimmed || skillExists(selectedCategory, trimmed)) return;
// // // // // //                 addSkill(selectedCategory, trimmed);
// // // // // //               }}
// // // // // //               className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
// // // // // //             >
// // // // // //               + {skill}
// // // // // //             </button>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // import { useState, useRef, useEffect } from "react";
// // // // // import type { KeyboardEvent } from "react";
// // // // // import { X, Sparkles } from "lucide-react";
// // // // // import { useResumeStore } from "../../../../store/resume.store";
// // // // // import { skillSuggestions } from "../data/skillSuggestions";
// // // // // import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

// // // // // export default function SkillsSection() {
// // // // //   const skills = useResumeStore((state) => state.resume?.skills ?? []);
// // // // //   const addSkill = useResumeStore((state) => state.addSkill);
// // // // //   const removeSkill = useResumeStore((state) => state.removeSkill);
// // // // //   const updateSkills = useResumeStore((state) => state.updateSkills);
// // // // //   const addCategory = useResumeStore((state) => state.addCategory);
// // // // //   const removeCategory = useResumeStore((state) => state.removeCategory);
// // // // //   const resume = useResumeStore((state) => state.resume);

// // // // //   const { mutate, isPending } = useSuggestSkills();

// // // // //   // Step 1: Default categories as string array
// // // // //   const defaultCategories = [
// // // // //     "Languages",
// // // // //     "Frameworks",
// // // // //     "Databases",
// // // // //     "Tools",
// // // // //   ];

// // // // //   const categories =
// // // // //     skills.length > 0
// // // // //       ? skills.map((c) => c.title)
// // // // //       : defaultCategories;

// // // // //   const [selectedCategory, setSelectedCategory] = useState("Languages");
// // // // //   const [skillInput, setSkillInput] = useState("");
// // // // //   const [categoryInput, setCategoryInput] = useState("");

// // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // //   // Auto focus after adding skill
// // // // //   useEffect(() => {
// // // // //     inputRef.current?.focus();
// // // // //   }, [skills.length]);

// // // // //   // Check if skill already exists (case insensitive)
// // // // //   const skillExists = (categoryTitle: string, skill: string) => {
// // // // //     const category = skills.find((item) => item.title === categoryTitle);
// // // // //     if (!category) return false;
// // // // //     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
// // // // //   };

// // // // //   // Step 5: Updated handleAddSkill
// // // // //   const handleAddSkill = () => {
// // // // //     const value = skillInput.trim();
// // // // //     if (!value) return;

// // // // //     if (skillExists(selectedCategory, value)) {
// // // // //       setSkillInput("");
// // // // //       return;
// // // // //     }

// // // // //     // Auto-create category if it doesn't exist
// // // // //     if (!skills.find((c) => c.title === selectedCategory)) {
// // // // //       addCategory(selectedCategory);
// // // // //     }

// // // // //     addSkill(selectedCategory, value);
// // // // //     setSkillInput("");
// // // // //   };

// // // // //   const handleAddCategory = () => {
// // // // //     const title = categoryInput.trim();
// // // // //     if (!title) return;

// // // // //     // Prevent duplicate category
// // // // //     if (skills.some((cat) => cat.title.toLowerCase() === title.toLowerCase())) {
// // // // //       setCategoryInput("");
// // // // //       return;
// // // // //     }

// // // // //     addCategory(title);
// // // // //     setCategoryInput("");
// // // // //     setSelectedCategory(title);
// // // // //   };

// // // // //   const handleSuggestSkills = () => {
// // // // //     if (!resume?._id) return;
// // // // //     mutate(resume._id, {
// // // // //       onSuccess: (aiSkills: string[]) => {
// // // // //         const updated = skills.map((category) => {
// // // // //           if (category.title !== selectedCategory) {
// // // // //             return category;
// // // // //           }
// // // // //           const merged = [...category.skills, ...aiSkills].filter(
// // // // //             (skill, index, arr) =>
// // // // //               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
// // // // //           );
// // // // //           return { ...category, skills: merged };
// // // // //         });
// // // // //         updateSkills(updated);
// // // // //       },
// // // // //     });
// // // // //   };

// // // // //   // Step 4: Current category with fallback
// // // // //   const currentCategory =
// // // // //     skills.find((c) => c.title === selectedCategory) ?? {
// // // // //       title: selectedCategory,
// // // // //       skills: [],
// // // // //     };

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       <div>
// // // // //         <h2 className="text-2xl font-bold">Skills</h2>
// // // // //       </div>

// // // // //       {/* Category Selector - Dropdown (Step 2 & 3) */}
// // // // //       {categories.length > 0 && (
// // // // //         <div className="space-y-2">
// // // // //           <label className="block text-sm font-medium text-gray-700">
// // // // //             Select Category
// // // // //           </label>
// // // // //           <select
// // // // //             value={selectedCategory}
// // // // //             onChange={(e) => setSelectedCategory(e.target.value)}
// // // // //             className="h-11 w-full rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // //           >
// // // // //             {categories.map((category) => (
// // // // //               <option key={category} value={category}>
// // // // //                 {category}
// // // // //               </option>
// // // // //             ))}
// // // // //           </select>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Add Skill Input */}
// // // // //       <div className="space-y-2">
// // // // //         <label className="block text-sm font-medium text-gray-700">
// // // // //           Add Skill to: <span className="font-semibold">{selectedCategory}</span>
// // // // //         </label>
// // // // //         <div className="mt-4 flex gap-3">
// // // // //           <input
// // // // //             ref={inputRef}
// // // // //             value={skillInput}
// // // // //             onChange={(e) => setSkillInput(e.target.value)}
// // // // //             placeholder="Type a skill"
// // // // //             className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // //             onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
// // // // //               if (e.key === "Enter") {
// // // // //                 e.preventDefault();
// // // // //                 handleAddSkill();
// // // // //               }
// // // // //             }}
// // // // //           />
// // // // //           <button
// // // // //             onClick={handleAddSkill}
// // // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // // //           >
// // // // //             Add Skill
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Add New Category */}
// // // // //       <div className="rounded-xl border p-5">
// // // // //         <h3 className="mb-4 text-lg font-semibold">Add New Category</h3>
// // // // //         <div className="flex gap-3">
// // // // //           <input
// // // // //             value={categoryInput}
// // // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // // //             placeholder="e.g. Frameworks, Tools, Soft Skills"
// // // // //             className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // // //             onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
// // // // //           />
// // // // //           <button
// // // // //             type="button"
// // // // //             onClick={handleAddCategory}
// // // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // // //           >
// // // // //             Add Category
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Selected Category Skills */}
// // // // //       {currentCategory && (
// // // // //         <div className="rounded-xl border p-5">
// // // // //           <div className="flex flex-wrap gap-2">
// // // // //             {currentCategory.skills.map((skill) => (
// // // // //               <button
// // // // //                 key={skill}
// // // // //                 type="button"
// // // // //                 onClick={() => removeSkill(selectedCategory, skill)}
// // // // //                 className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 hover:bg-red-100 hover:text-red-700 transition"
// // // // //               >
// // // // //                 {skill}
// // // // //                 <X size={14} />
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* AI Suggest Button */}
// // // // //       <button
// // // // //         type="button"
// // // // //         onClick={handleSuggestSkills}
// // // // //         disabled={isPending || !resume?._id}
// // // // //         className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// // // // //       >
// // // // //         <Sparkles size={18} />
// // // // //         {isPending ? "AI is suggesting..." : "✨ AI Suggest Skills"}
// // // // //       </button>

// // // // //       {/* Popular Skills */}
// // // // //       <div>
// // // // //         <h3 className="mb-3 font-semibold">Popular Skills</h3>
// // // // //         <div className="flex flex-wrap gap-2">
// // // // //           {skillSuggestions.map((skill) => (
// // // // //             <button
// // // // //               key={skill}
// // // // //               type="button"
// // // // //               onClick={() => {
// // // // //                 const trimmed = skill.trim();
// // // // //                 if (!trimmed || skillExists(selectedCategory, trimmed)) return;
// // // // //                 // Auto-create category if needed when using popular skills
// // // // //                 if (!skills.find((c) => c.title === selectedCategory)) {
// // // // //                   addCategory(selectedCategory);
// // // // //                 }
// // // // //                 addSkill(selectedCategory, trimmed);
// // // // //               }}
// // // // //               className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
// // // // //             >
// // // // //               + {skill}
// // // // //             </button>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useState, useRef, useEffect } from "react";
// // // // import type { KeyboardEvent } from "react";
// // // // import { X, Sparkles } from "lucide-react";
// // // // import { useResumeStore } from "../../../../store/resume.store";
// // // // import { skillSuggestions } from "../data/skillSuggestions";
// // // // import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

// // // // export default function SkillsSection() {
// // // //   const skills = useResumeStore((state) => state.resume?.skills ?? []);
// // // //   const addSkill = useResumeStore((state) => state.addSkill);
// // // //   const removeSkill = useResumeStore((state) => state.removeSkill);
// // // //   const updateSkills = useResumeStore((state) => state.updateSkills);
// // // //   const addCategory = useResumeStore((state) => state.addCategory);
// // // //   const resume = useResumeStore((state) => state.resume);

// // // //   const { mutate, isPending } = useSuggestSkills();

// // // //   // Updated default categories
// // // //   const defaultCategories = [
// // // //     "Languages",
// // // //     "Frameworks",
// // // //     "Databases",
// // // //     "Tools",
// // // //     "Others",
// // // //   ];

// // // //   const categories =
// // // //     skills.length > 0
// // // //       ? skills.map((c) => c.title)
// // // //       : defaultCategories;

// // // //   const [selectedCategory, setSelectedCategory] = useState("Languages");
// // // //   const [skillInput, setSkillInput] = useState("");
// // // //   const [categoryInput, setCategoryInput] = useState("");

// // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // //   // Auto focus after adding skill
// // // //   useEffect(() => {
// // // //     inputRef.current?.focus();
// // // //   }, [skills.length]);

// // // //   // Check if skill already exists (case insensitive)
// // // //   const skillExists = (categoryTitle: string, skill: string) => {
// // // //     const category = skills.find((item) => item.title === categoryTitle);
// // // //     if (!category) return false;
// // // //     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
// // // //   };

// // // //   // Updated handleAddSkill with validation for "Others"
// // // //   const handleAddSkill = () => {
// // // //     const value = skillInput.trim();
// // // //     if (!value) return;

// // // //     // Prevent adding skills directly to "Others" category
// // // //     if (selectedCategory === "Others") {
// // // //       document.getElementById("category-input")?.focus();
// // // //       return;
// // // //     }

// // // //     if (skillExists(selectedCategory, value)) {
// // // //       setSkillInput("");
// // // //       return;
// // // //     }

// // // //     // Auto-create category if it doesn't exist
// // // //     if (!skills.find((c) => c.title === selectedCategory)) {
// // // //       addCategory(selectedCategory);
// // // //     }

// // // //     addSkill(selectedCategory, value);
// // // //     setSkillInput("");
// // // //   };

// // // //   // Updated handleAddCategory
// // // //   const handleAddCategory = () => {
// // // //     const title = categoryInput.trim();
// // // //     if (!title) return;

// // // //     // Prevent duplicate category
// // // //     if (skills.some((cat) => cat.title.toLowerCase() === title.toLowerCase())) {
// // // //       setCategoryInput("");
// // // //       return;
// // // //     }

// // // //     addCategory(title);
// // // //     setSelectedCategory(title);
// // // //     setCategoryInput("");
// // // //   };

// // // //   const handleSuggestSkills = () => {
// // // //     if (!resume?._id) return;
// // // //     mutate(resume._id, {
// // // //       onSuccess: (aiSkills: string[]) => {
// // // //         const updated = skills.map((category) => {
// // // //           if (category.title !== selectedCategory) {
// // // //             return category;
// // // //           }
// // // //           const merged = [...category.skills, ...aiSkills].filter(
// // // //             (skill, index, arr) =>
// // // //               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
// // // //           );
// // // //           return { ...category, skills: merged };
// // // //         });
// // // //         updateSkills(updated);
// // // //       },
// // // //     });
// // // //   };

// // // //   // Current category with fallback
// // // //   const currentCategory =
// // // //     skills.find((c) => c.title === selectedCategory) ?? {
// // // //       title: selectedCategory,
// // // //       skills: [],
// // // //     };

// // // //   return (
// // // //     <div className="space-y-8">
// // // //       <div>
// // // //         <h2 className="text-2xl font-bold">Skills</h2>
// // // //       </div>

// // // //       {/* Category Selector */}
// // // //       {categories.length > 0 && (
// // // //         <div className="space-y-2">
// // // //           <label className="block text-sm font-medium text-gray-700">
// // // //             Select Category
// // // //           </label>
// // // //           <select
// // // //             value={selectedCategory}
// // // //             onChange={(e) => setSelectedCategory(e.target.value)}
// // // //             className="h-11 w-full rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // //           >
// // // //             {categories.map((category) => (
// // // //               <option key={category} value={category}>
// // // //                 {category}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //       )}

// // // //       {/* Add Skill Input */}
// // // //       <div className="space-y-2">
// // // //         <label className="block text-sm font-medium text-gray-700">
// // // //           Add Skill to: <span className="font-semibold">{selectedCategory}</span>
// // // //         </label>
// // // //         <div className="mt-4 flex gap-3">
// // // //           <input
// // // //             ref={inputRef}
// // // //             value={skillInput}
// // // //             onChange={(e) => setSkillInput(e.target.value)}
// // // //             placeholder="Type a skill"
// // // //             className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // //             onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
// // // //               if (e.key === "Enter") {
// // // //                 e.preventDefault();
// // // //                 handleAddSkill();
// // // //               }
// // // //             }}
// // // //           />
// // // //           <button
// // // //             onClick={handleAddSkill}
// // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // //           >
// // // //             Add Skill
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Add New Category */}
// // // //       <div className="rounded-xl border p-5">
// // // //         <h3 className="mb-4 text-lg font-semibold">Add New Category</h3>
// // // //         <div className="flex gap-3">
// // // //           <input
// // // //             id="category-input"
// // // //             value={categoryInput}
// // // //             onChange={(e) => setCategoryInput(e.target.value)}
// // // //             placeholder="e.g. Soft Skills, Cloud, Version Control"
// // // //             className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // // //             onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
// // // //           />
// // // //           <button
// // // //             type="button"
// // // //             onClick={handleAddCategory}
// // // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // // //           >
// // // //             Add Category
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Selected Category Skills */}
// // // //       {currentCategory && (
// // // //         <div className="rounded-xl border p-5">
// // // //           <div className="flex flex-wrap gap-2">
// // // //             {currentCategory.skills.map((skill) => (
// // // //               <button
// // // //                 key={skill}
// // // //                 type="button"
// // // //                 onClick={() => removeSkill(selectedCategory, skill)}
// // // //                 className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 hover:bg-red-100 hover:text-red-700 transition"
// // // //               >
// // // //                 {skill}
// // // //                 <X size={14} />
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* AI Suggest Button */}
// // // //       <button
// // // //         type="button"
// // // //         onClick={handleSuggestSkills}
// // // //         disabled={isPending || !resume?._id}
// // // //         className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// // // //       >
// // // //         <Sparkles size={18} />
// // // //         {isPending ? "AI is suggesting..." : "✨ AI Suggest Skills"}
// // // //       </button>

// // // //       {/* Popular Skills */}
// // // //       <div>
// // // //         <h3 className="mb-3 font-semibold">Popular Skills</h3>
// // // //         <div className="flex flex-wrap gap-2">
// // // //           {skillSuggestions.map((skill) => (
// // // //             <button
// // // //               key={skill}
// // // //               type="button"
// // // //               onClick={() => {
// // // //                 const trimmed = skill.trim();
// // // //                 if (!trimmed || skillExists(selectedCategory, trimmed)) return;

// // // //                 if (selectedCategory === "Others") {
// // // //                   document.getElementById("category-input")?.focus();
// // // //                   return;
// // // //                 }

// // // //                 if (!skills.find((c) => c.title === selectedCategory)) {
// // // //                   addCategory(selectedCategory);
// // // //                 }

// // // //                 addSkill(selectedCategory, trimmed);
// // // //               }}
// // // //               className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
// // // //             >
// // // //               + {skill}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState, useRef, useEffect } from "react";
// // // import type { KeyboardEvent } from "react";
// // // import { X, Sparkles } from "lucide-react";
// // // import { useResumeStore } from "../../../../store/resume.store";
// // // import { skillSuggestions } from "../data/skillSuggestions";
// // // import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

// // // export default function SkillsSection() {
// // //   const skills = useResumeStore((state) => state.resume?.skills ?? []);
// // //   const addSkill = useResumeStore((state) => state.addSkill);
// // //   const removeSkill = useResumeStore((state) => state.removeSkill);
// // //   const updateSkills = useResumeStore((state) => state.updateSkills);
// // //   const addCategory = useResumeStore((state) => state.addCategory);
// // //   const resume = useResumeStore((state) => state.resume);

// // //   const { mutate, isPending } = useSuggestSkills();

// // //   // STEP 1: Fixed Categories
// // //   const fixedCategories = [
// // //     "Languages",
// // //     "Frameworks",
// // //     "Databases",
// // //     "Tools",
// // //     "Others",
// // //   ];

// // //   // STEP 2: States
// // //   const [selectedCategory, setSelectedCategory] = useState("Languages");
// // //   const [activeCategory, setActiveCategory] = useState("Languages");
// // //   const [customCategory, setCustomCategory] = useState("");
// // //   const [skillInput, setSkillInput] = useState("");

// // //   const inputRef = useRef<HTMLInputElement>(null);

// // //   // Auto focus
// // //   useEffect(() => {
// // //     inputRef.current?.focus();
// // //   }, [skills.length]);

// // //   // Check if skill already exists
// // //   const skillExists = (categoryTitle: string, skill: string) => {
// // //     const category = skills.find((item) => item.title === categoryTitle);
// // //     if (!category) return false;
// // //     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
// // //   };

// // //   // STEP 5: Create Custom Category
// // //   const handleCreateCategory = () => {
// // //     const title = customCategory.trim();
// // //     if (!title) return;

// // //     if (skills.some((cat) => cat.title.toLowerCase() === title.toLowerCase())) {
// // //       setCustomCategory("");
// // //       return;
// // //     }

// // //     addCategory(title);
// // //     setActiveCategory(title);
// // //     setCustomCategory("");
// // //     setSelectedCategory(title); // Sync selected too
// // //   };

// // //   // Updated handleAddSkill
// // //   const handleAddSkill = () => {
// // //     const value = skillInput.trim();
// // //     if (!value) return;

// // //     if (skillExists(activeCategory, value)) {
// // //       setSkillInput("");
// // //       return;
// // //     }

// // //     // Auto create if somehow not exists
// // //     if (!skills.find((c) => c.title === activeCategory)) {
// // //       addCategory(activeCategory);
// // //     }

// // //     addSkill(activeCategory, value);
// // //     setSkillInput("");
// // //   };

// // //   // Handle Category Selection
// // //   const handleCategoryChange = (value: string) => {
// // //     setSelectedCategory(value);
// // //     if (value !== "Others") {
// // //       setActiveCategory(value);
// // //     }
// // //   };

// // //   const handleSuggestSkills = () => {
// // //     if (!resume?._id) return;
// // //     mutate(resume._id, {
// // //       onSuccess: (aiSkills: string[]) => {
// // //         const updated = skills.map((category) => {
// // //           if (category.title !== activeCategory) {
// // //             return category;
// // //           }
// // //           const merged = [...category.skills, ...aiSkills].filter(
// // //             (skill, index, arr) =>
// // //               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
// // //           );
// // //           return { ...category, skills: merged };
// // //         });
// // //         updateSkills(updated);
// // //       },
// // //     });
// // //   };

// // //   // STEP 8: Current Category
// // //   const currentCategory = skills.find((c) => c.title === activeCategory);

// // //   return (
// // //     <div className="space-y-8">
// // //       <div>
// // //         <h2 className="text-2xl font-bold">Skills</h2>
// // //       </div>

// // //       {/* Category Selector - Always visible */}
// // //       <div className="space-y-2">
// // //         <label className="block text-sm font-medium text-gray-700">
// // //           Select Category
// // //         </label>
// // //         <select
// // //           value={selectedCategory}
// // //           onChange={(e) => handleCategoryChange(e.target.value)}
// // //           className="h-11 w-full rounded-lg border px-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // //         >
// // //           {fixedCategories.map((item) => (
// // //             <option key={item} value={item}>
// // //               {item}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       {/* STEP 4: Custom Category Input (Only for Others) */}
// // //       {selectedCategory === "Others" && (
// // //         <div className="rounded-xl border p-5 space-y-3">
// // //           <label className="block text-sm font-medium text-gray-700">
// // //             Create New Category
// // //           </label>
// // //           <div className="flex gap-3">
// // //             <input
// // //               value={customCategory}
// // //               onChange={(e) => setCustomCategory(e.target.value)}
// // //               placeholder="e.g. Cloud, Soft Skills, DevOps"
// // //               className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // //               onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
// // //             />
// // //             <button
// // //               type="button"
// // //               onClick={handleCreateCategory}
// // //               className="rounded-lg bg-violet-600 px-6 text-white hover:bg-violet-700 transition"
// // //             >
// // //               Create Category
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Add Skill Input */}
// // //       <div className="space-y-2">
// // //         <label className="block text-sm font-medium text-gray-700">
// // //           Add Skill to: <span className="font-semibold">{activeCategory}</span>
// // //         </label>
// // //         <div className="mt-4 flex gap-3">
// // //           <input
// // //             ref={inputRef}
// // //             value={skillInput}
// // //             onChange={(e) => setSkillInput(e.target.value)}
// // //             placeholder="Type a skill"
// // //             className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
// // //             onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
// // //               if (e.key === "Enter") {
// // //                 e.preventDefault();
// // //                 handleAddSkill();
// // //               }
// // //             }}
// // //           />
// // //           <button
// // //             onClick={handleAddSkill}
// // //             className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// // //           >
// // //             Add Skill
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Selected Category Skills */}
// // //       {currentCategory && (
// // //         <div className="rounded-xl border p-5">
// // //           <div className="flex flex-wrap gap-2">
// // //             {currentCategory.skills.map((skill) => (
// // //               <button
// // //                 key={skill}
// // //                 type="button"
// // //                 onClick={() => removeSkill(activeCategory, skill)}
// // //                 className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700 hover:bg-red-100 hover:text-red-700 transition"
// // //               >
// // //                 {skill}
// // //                 <X size={14} />
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* AI Suggest Button */}
// // //       <button
// // //         type="button"
// // //         onClick={handleSuggestSkills}
// // //         disabled={isPending || !resume?._id}
// // //         className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// // //       >
// // //         <Sparkles size={18} />
// // //         {isPending ? "AI is suggesting..." : "✨ AI Suggest Skills"}
// // //       </button>

// // //       {/* Popular Skills */}
// // //       <div>
// // //         <h3 className="mb-3 font-semibold">Popular Skills</h3>
// // //         <div className="flex flex-wrap gap-2">
// // //           {skillSuggestions.map((skill) => (
// // //             <button
// // //               key={skill}
// // //               type="button"
// // //               onClick={() => {
// // //                 const trimmed = skill.trim();
// // //                 if (!trimmed || skillExists(activeCategory, trimmed)) return;

// // //                 if (!skills.find((c) => c.title === activeCategory)) {
// // //                   addCategory(activeCategory);
// // //                 }

// // //                 addSkill(activeCategory, trimmed);
// // //               }}
// // //               className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
// // //             >
// // //               + {skill}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState, useRef, useEffect } from "react";
// // import type { KeyboardEvent } from "react";
// // import { X, Sparkles, Pencil, Trash2, Check } from "lucide-react";
// // import { useResumeStore } from "../../../../store/resume.store";
// // import { skillSuggestions } from "../data/skillSuggestions";
// // import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

// // export default function SkillsSection() {
// //   const skills = useResumeStore((state) => state.resume?.skills ?? []);
// //   const addSkill = useResumeStore((state) => state.addSkill);
// //   const removeSkill = useResumeStore((state) => state.removeSkill);
// //   const updateSkills = useResumeStore((state) => state.updateSkills);
// //   const addCategory = useResumeStore((state) => state.addCategory);
// //   const removeCategory = useResumeStore((state) => state.removeCategory);
// //   const resume = useResumeStore((state) => state.resume);

// //   const { mutate, isPending } = useSuggestSkills();

// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [skillInput, setSkillInput] = useState("");
// //   const [newCategoryInput, setNewCategoryInput] = useState("");
// //   const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

// //   // Category rename state
// //   const [editingCategory, setEditingCategory] = useState<string | null>(null);
// //   const [categoryRenameValue, setCategoryRenameValue] = useState("");

// //   // Skill edit state
// //   const [editingSkill, setEditingSkill] = useState<string | null>(null);
// //   const [skillEditValue, setSkillEditValue] = useState("");

// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const renameInputRef = useRef<HTMLInputElement>(null);
// //   const skillEditInputRef = useRef<HTMLInputElement>(null);

// //   // Keep selectedCategory valid whenever the skills list changes
// //   useEffect(() => {
// //     if (skills.length === 0) {
// //       setSelectedCategory("");
// //       return;
// //     }
// //     if (!skills.find((c) => c.title === selectedCategory)) {
// //       setSelectedCategory(skills[0].title);
// //     }
// //   }, [skills, selectedCategory]);

// //   useEffect(() => {
// //     inputRef.current?.focus();
// //   }, [skills.length]);

// //   useEffect(() => {
// //     if (editingCategory) renameInputRef.current?.focus();
// //   }, [editingCategory]);

// //   useEffect(() => {
// //     if (editingSkill) skillEditInputRef.current?.focus();
// //   }, [editingSkill]);

// //   const skillExists = (categoryTitle: string, skill: string) => {
// //     const category = skills.find((item) => item.title === categoryTitle);
// //     if (!category) return false;
// //     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
// //   };

// //   const categoryExists = (title: string, excludeTitle?: string) =>
// //     skills.some(
// //       (cat) =>
// //         cat.title.toLowerCase() === title.toLowerCase() &&
// //         cat.title !== excludeTitle
// //     );

// //   // ---------- Category actions ----------

// //   const handleAddCategory = () => {
// //     const title = newCategoryInput.trim();
// //     if (!title) return;
// //     if (categoryExists(title)) {
// //       setNewCategoryInput("");
// //       return;
// //     }
// //     addCategory(title);
// //     setSelectedCategory(title);
// //     setNewCategoryInput("");
// //     setShowNewCategoryInput(false);
// //   };

// //   const startRenameCategory = (title: string) => {
// //     setEditingCategory(title);
// //     setCategoryRenameValue(title);
// //   };

// //   const confirmRenameCategory = () => {
// //     if (!editingCategory) return;
// //     const newTitle = categoryRenameValue.trim();

// //     if (!newTitle || newTitle === editingCategory) {
// //       setEditingCategory(null);
// //       return;
// //     }
// //     if (categoryExists(newTitle, editingCategory)) {
// //       setEditingCategory(null);
// //       return;
// //     }

// //     const updated = skills.map((cat) =>
// //       cat.title === editingCategory ? { ...cat, title: newTitle } : cat
// //     );
// //     updateSkills(updated);

// //     if (selectedCategory === editingCategory) {
// //       setSelectedCategory(newTitle);
// //     }
// //     setEditingCategory(null);
// //   };

// //   const handleDeleteCategory = (title: string) => {
// //     removeCategory(title);
// //     if (selectedCategory === title) {
// //       const remaining = skills.filter((c) => c.title !== title);
// //       setSelectedCategory(remaining[0]?.title ?? "");
// //     }
// //   };

// //   // ---------- Skill actions ----------

// //   const handleAddSkill = () => {
// //     const value = skillInput.trim();
// //     if (!value || !selectedCategory) return;
// //     if (skillExists(selectedCategory, value)) {
// //       setSkillInput("");
// //       return;
// //     }
// //     addSkill(selectedCategory, value);
// //     setSkillInput("");
// //   };

// //   const startEditSkill = (skill: string) => {
// //     setEditingSkill(skill);
// //     setSkillEditValue(skill);
// //   };

// //   const confirmEditSkill = () => {
// //     if (!editingSkill || !selectedCategory) return;
// //     const newValue = skillEditValue.trim();

// //     if (!newValue || newValue === editingSkill) {
// //       setEditingSkill(null);
// //       return;
// //     }
// //     if (skillExists(selectedCategory, newValue)) {
// //       setEditingSkill(null);
// //       return;
// //     }

// //     const updated = skills.map((cat) => {
// //       if (cat.title !== selectedCategory) return cat;
// //       return {
// //         ...cat,
// //         skills: cat.skills.map((s) => (s === editingSkill ? newValue : s)),
// //       };
// //     });
// //     updateSkills(updated);
// //     setEditingSkill(null);
// //   };

// //   const handleSuggestSkills = () => {
// //     if (!resume?._id || !selectedCategory) return;
// //     mutate(resume._id, {
// //       onSuccess: (aiSkills: string[]) => {
// //         const updated = skills.map((category) => {
// //           if (category.title !== selectedCategory) return category;
// //           const merged = [...category.skills, ...aiSkills].filter(
// //             (skill, index, arr) =>
// //               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
// //           );
// //           return { ...category, skills: merged };
// //         });
// //         updateSkills(updated);
// //       },
// //     });
// //   };

// //   const currentCategory = skills.find((c) => c.title === selectedCategory);

// //   return (
// //     <div className="space-y-8">
// //       <div>
// //         <h2 className="text-2xl font-bold">Skills</h2>
// //         <p className="mt-1 text-sm text-gray-500">
// //           Organize your skills into categories like Languages, Frameworks, or Tools.
// //         </p>
// //       </div>

// //       {/* Category list with edit/delete */}
// //       <div className="space-y-2">
// //         <label className="block text-sm font-medium text-gray-700">Categories</label>
// //         <div className="flex flex-wrap gap-2">
// //           {skills.map((category) => (
// //             <div
// //               key={category.title}
// //               className={`flex items-center gap-1 rounded-lg border px-3 py-2 ${
// //                 selectedCategory === category.title
// //                   ? "border-violet-500 bg-violet-50"
// //                   : "border-gray-200"
// //               }`}
// //             >
// //               {editingCategory === category.title ? (
// //                 <input
// //                   ref={renameInputRef}
// //                   value={categoryRenameValue}
// //                   onChange={(e) => setCategoryRenameValue(e.target.value)}
// //                   onBlur={confirmRenameCategory}
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter") confirmRenameCategory();
// //                     if (e.key === "Escape") setEditingCategory(null);
// //                   }}
// //                   className="w-28 rounded border px-2 py-1 text-sm focus:outline-none"
// //                 />
// //               ) : (
// //                 <button
// //                   type="button"
// //                   onClick={() => setSelectedCategory(category.title)}
// //                   className="text-sm font-medium"
// //                 >
// //                   {category.title}
// //                   <span className="ml-1 text-xs text-gray-400">
// //                     ({category.skills.length})
// //                   </span>
// //                 </button>
// //               )}

// //               <button
// //                 type="button"
// //                 onClick={() => startRenameCategory(category.title)}
// //                 className="ml-1 text-gray-400 hover:text-blue-600"
// //                 aria-label={`Rename ${category.title}`}
// //               >
// //                 <Pencil size={14} />
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => handleDeleteCategory(category.title)}
// //                 className="text-gray-400 hover:text-red-600"
// //                 aria-label={`Delete ${category.title}`}
// //               >
// //                 <Trash2 size={14} />
// //               </button>
// //             </div>
// //           ))}

// //           {/* Add new category */}
// //           {showNewCategoryInput ? (
// //             <div className="flex items-center gap-2">
// //               <input
// //                 autoFocus
// //                 value={newCategoryInput}
// //                 onChange={(e) => setNewCategoryInput(e.target.value)}
// //                 placeholder="Category name"
// //                 className="h-9 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") handleAddCategory();
// //                   if (e.key === "Escape") setShowNewCategoryInput(false);
// //                 }}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleAddCategory}
// //                 className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 transition"
// //               >
// //                 Add
// //               </button>
// //             </div>
// //           ) : (
// //             <button
// //               type="button"
// //               onClick={() => setShowNewCategoryInput(true)}
// //               className="rounded-lg border border-dashed px-3 py-2 text-sm text-gray-500 hover:border-violet-500 hover:text-violet-600 transition"
// //             >
// //               + New category
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* Add Skill Input */}
// //       {selectedCategory && (
// //         <div className="space-y-2">
// //           <label className="block text-sm font-medium text-gray-700">
// //             Add skill to: <span className="font-semibold">{selectedCategory}</span>
// //           </label>
// //           <div className="mt-2 flex gap-3">
// //             <input
// //               ref={inputRef}
// //               value={skillInput}
// //               onChange={(e) => setSkillInput(e.target.value)}
// //               placeholder="Type a skill"
// //               className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
// //               onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
// //                 if (e.key === "Enter") {
// //                   e.preventDefault();
// //                   handleAddSkill();
// //                 }
// //               }}
// //             />
// //             <button
// //               onClick={handleAddSkill}
// //               className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
// //             >
// //               Add skill
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Selected Category Skills - with edit + delete */}
// //       {currentCategory && currentCategory.skills.length > 0 && (
// //         <div className="rounded-xl border p-5">
// //           <div className="flex flex-wrap gap-2">
// //             {currentCategory.skills.map((skill) =>
// //               editingSkill === skill ? (
// //                 <div
// //                   key={skill}
// //                   className="flex items-center gap-1 rounded-full border border-blue-400 bg-white px-2 py-1"
// //                 >
// //                   <input
// //                     ref={skillEditInputRef}
// //                     value={skillEditValue}
// //                     onChange={(e) => setSkillEditValue(e.target.value)}
// //                     onKeyDown={(e) => {
// //                       if (e.key === "Enter") confirmEditSkill();
// //                       if (e.key === "Escape") setEditingSkill(null);
// //                     }}
// //                     className="w-24 text-sm focus:outline-none"
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={confirmEditSkill}
// //                     className="text-green-600 hover:text-green-700"
// //                     aria-label="Save skill"
// //                   >
// //                     <Check size={14} />
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div
// //                   key={skill}
// //                   className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700"
// //                 >
// //                   <button
// //                     type="button"
// //                     onClick={() => startEditSkill(skill)}
// //                     className="text-sm"
// //                     title="Click to edit"
// //                   >
// //                     {skill}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeSkill(selectedCategory, skill)}
// //                     className="hover:text-red-700"
// //                     aria-label={`Remove ${skill}`}
// //                   >
// //                     <X size={14} />
// //                   </button>
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* AI Suggest Button */}
// //       {selectedCategory && (
// //         <button
// //           type="button"
// //           onClick={handleSuggestSkills}
// //           disabled={isPending || !resume?._id}
// //           className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// //         >
// //           <Sparkles size={18} />
// //           {isPending ? "AI is suggesting..." : "AI suggest skills"}
// //         </button>
// //       )}

// //       {/* Popular Skills */}
// //       {selectedCategory && (
// //         <div>
// //           <h3 className="mb-3 font-semibold">Popular skills</h3>
// //           <div className="flex flex-wrap gap-2">
// //             {skillSuggestions.map((skill) => (
// //               <button
// //                 key={skill}
// //                 type="button"
// //                 onClick={() => {
// //                   const trimmed = skill.trim();
// //                   if (!trimmed || skillExists(selectedCategory, trimmed)) return;
// //                   addSkill(selectedCategory, trimmed);
// //                 }}
// //                 className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
// //               >
// //                 + {skill}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// export default function SkillsSection() {
//   const skills = useResumeStore((state) => state.resume?.skills ?? []);
//   const addSkill = useResumeStore((state) => state.addSkill);
//   const removeSkill = useResumeStore((state) => state.removeSkill);
//   const updateSkills = useResumeStore((state) => state.updateSkills);
//   const addCategory = useResumeStore((state) => state.addCategory);
//   const removeCategory = useResumeStore((state) => state.removeCategory);
//   const resume = useResumeStore((state) => state.resume);

//   const { mutate, isPending } = useSuggestSkills();

//   // The 4 fixed presets + "Other" as the 5th option
//   const presetCategories = ["Languages", "Frameworks", "Databases", "Tools"];

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [skillInput, setSkillInput] = useState("");
//   const [otherCategoryInput, setOtherCategoryInput] = useState("");
//   const [showOtherInput, setShowOtherInput] = useState(false);

//   const [editingCategory, setEditingCategory] = useState<string | null>(null);
//   const [categoryRenameValue, setCategoryRenameValue] = useState("");

//   const [editingSkill, setEditingSkill] = useState<string | null>(null);
//   const [skillEditValue, setSkillEditValue] = useState("");

//   const inputRef = useRef<HTMLInputElement>(null);
//   const renameInputRef = useRef<HTMLInputElement>(null);
//   const skillEditInputRef = useRef<HTMLInputElement>(null);
//   const otherInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (skills.length === 0) {
//       setSelectedCategory("");
//       return;
//     }
//     if (!skills.find((c) => c.title === selectedCategory)) {
//       setSelectedCategory(skills[0].title);
//     }
//   }, [skills, selectedCategory]);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [skills.length]);

//   useEffect(() => {
//     if (editingCategory) renameInputRef.current?.focus();
//   }, [editingCategory]);

//   useEffect(() => {
//     if (editingSkill) skillEditInputRef.current?.focus();
//   }, [editingSkill]);

//   useEffect(() => {
//     if (showOtherInput) otherInputRef.current?.focus();
//   }, [showOtherInput]);

//   const skillExists = (categoryTitle: string, skill: string) => {
//     const category = skills.find((item) => item.title === categoryTitle);
//     if (!category) return false;
//     return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
//   };

//   const categoryExists = (title: string, excludeTitle?: string) =>
//     skills.some(
//       (cat) =>
//         cat.title.toLowerCase() === title.toLowerCase() &&
//         cat.title !== excludeTitle
//     );

//   // ---------- Category actions ----------

//   // Click on a preset (Languages / Frameworks / Databases / Tools):
//   // creates it if it doesn't exist yet, then selects it.
//   const handlePresetClick = (title: string) => {
//     if (!categoryExists(title)) {
//       addCategory(title);
//     }
//     setSelectedCategory(title);
//     setShowOtherInput(false);
//   };

//   // Click "Other": reveal a text input to type a custom category name
//   const handleOtherClick = () => {
//     setShowOtherInput(true);
//     setOtherCategoryInput("");
//   };

//   const handleAddOtherCategory = () => {
//     const title = otherCategoryInput.trim();
//     if (!title) return;
//     if (categoryExists(title)) {
//       setSelectedCategory(title);
//       setShowOtherInput(false);
//       setOtherCategoryInput("");
//       return;
//     }
//     addCategory(title);
//     setSelectedCategory(title);
//     setOtherCategoryInput("");
//     setShowOtherInput(false);
//   };

//   const startRenameCategory = (title: string) => {
//     setEditingCategory(title);
//     setCategoryRenameValue(title);
//   };

//   const confirmRenameCategory = () => {
//     if (!editingCategory) return;
//     const newTitle = categoryRenameValue.trim();

//     if (!newTitle || newTitle === editingCategory) {
//       setEditingCategory(null);
//       return;
//     }
//     if (categoryExists(newTitle, editingCategory)) {
//       setEditingCategory(null);
//       return;
//     }

//     const updated = skills.map((cat) =>
//       cat.title === editingCategory ? { ...cat, title: newTitle } : cat
//     );
//     updateSkills(updated);

//     if (selectedCategory === editingCategory) {
//       setSelectedCategory(newTitle);
//     }
//     setEditingCategory(null);
//   };

//   const handleDeleteCategory = (title: string) => {
//     removeCategory(title);
//     if (selectedCategory === title) {
//       const remaining = skills.filter((c) => c.title !== title);
//       setSelectedCategory(remaining[0]?.title ?? "");
//     }
//   };

//   // ---------- Skill actions ----------

//   const handleAddSkill = () => {
//     const value = skillInput.trim();
//     if (!value || !selectedCategory) return;
//     if (skillExists(selectedCategory, value)) {
//       setSkillInput("");
//       return;
//     }
//     addSkill(selectedCategory, value);
//     setSkillInput("");
//   };

//   const startEditSkill = (skill: string) => {
//     setEditingSkill(skill);
//     setSkillEditValue(skill);
//   };

//   const confirmEditSkill = () => {
//     if (!editingSkill || !selectedCategory) return;
//     const newValue = skillEditValue.trim();

//     if (!newValue || newValue === editingSkill) {
//       setEditingSkill(null);
//       return;
//     }
//     if (skillExists(selectedCategory, newValue)) {
//       setEditingSkill(null);
//       return;
//     }

//     const updated = skills.map((cat) => {
//       if (cat.title !== selectedCategory) return cat;
//       return {
//         ...cat,
//         skills: cat.skills.map((s) => (s === editingSkill ? newValue : s)),
//       };
//     });
//     updateSkills(updated);
//     setEditingSkill(null);
//   };

//   const handleSuggestSkills = () => {
//     if (!resume?._id || !selectedCategory) return;
//     mutate(resume._id, {
//       onSuccess: (aiSkills: string[]) => {
//         const updated = skills.map((category) => {
//           if (category.title !== selectedCategory) return category;
//           const merged = [...category.skills, ...aiSkills].filter(
//             (skill, index, arr) =>
//               index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
//           );
//           return { ...category, skills: merged };
//         });
//         updateSkills(updated);
//       },
//     });
//   };

//   const currentCategory = skills.find((c) => c.title === selectedCategory);

//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold">Skills</h2>
//         <p className="mt-1 text-sm text-gray-500">
//           Pick a category below, or choose Other to create your own.
//         </p>
//       </div>

//       {/* Step 1: Choose a category — 4 presets + Other, always visible */}
//       <div className="space-y-3">
//         <label className="block text-sm font-medium text-gray-700">
//           Select category
//         </label>
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
//           {presetCategories.map((title) => {
//             const isActive = selectedCategory === title;
//             return (
//               <button
//                 key={title}
//                 type="button"
//                 onClick={() => handlePresetClick(title)}
//                 className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
//                   isActive
//                     ? "border-violet-500 bg-violet-50 text-violet-700"
//                     : "border-gray-200 hover:border-violet-400 hover:bg-violet-50"
//                 }`}
//               >
//                 {title}
//               </button>
//             );
//           })}

//           <button
//             type="button"
//             onClick={handleOtherClick}
//             className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
//               showOtherInput || (selectedCategory && !presetCategories.includes(selectedCategory))
//                 ? "border-violet-500 bg-violet-50 text-violet-700"
//                 : "border-gray-200 hover:border-violet-400 hover:bg-violet-50"
//             }`}
//           >
//             Other
//           </button>
//         </div>

//         {/* Text input appears only when "Other" is clicked */}
//         {showOtherInput && (
//           <div className="flex gap-3">
//             <input
//               ref={otherInputRef}
//               value={otherCategoryInput}
//               onChange={(e) => setOtherCategoryInput(e.target.value)}
//               placeholder="Type your custom category, e.g. Soft Skills"
//               className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleAddOtherCategory();
//                 if (e.key === "Escape") setShowOtherInput(false);
//               }}
//             />
//             <button
//               type="button"
//               onClick={handleAddOtherCategory}
//               className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
//             >
//               Add
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Existing categories — with rename / delete */}
//       {skills.length > 0 && (
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Your categories
//           </label>
//           <div className="flex flex-wrap gap-2">
//             {skills.map((category) => (
//               <div
//                 key={category.title}
//                 className={`flex items-center gap-1 rounded-lg border px-3 py-2 ${
//                   selectedCategory === category.title
//                     ? "border-violet-500 bg-violet-50"
//                     : "border-gray-200"
//                 }`}
//               >
//                 {editingCategory === category.title ? (
//                   <input
//                     ref={renameInputRef}
//                     value={categoryRenameValue}
//                     onChange={(e) => setCategoryRenameValue(e.target.value)}
//                     onBlur={confirmRenameCategory}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") confirmRenameCategory();
//                       if (e.key === "Escape") setEditingCategory(null);
//                     }}
//                     className="w-28 rounded border px-2 py-1 text-sm focus:outline-none"
//                   />
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => setSelectedCategory(category.title)}
//                     className="text-sm font-medium"
//                   >
//                     {category.title}
//                     <span className="ml-1 text-xs text-gray-400">
//                       ({category.skills.length})
//                     </span>
//                   </button>
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => startRenameCategory(category.title)}
//                   className="ml-1 text-gray-400 hover:text-blue-600"
//                   aria-label={`Rename ${category.title}`}
//                 >
//                   <Pencil size={14} />
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteCategory(category.title)}
//                   className="text-gray-400 hover:text-red-600"
//                   aria-label={`Delete ${category.title}`}
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Add Skill Input */}
//       {selectedCategory && (
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Add skill to: <span className="font-semibold">{selectedCategory}</span>
//           </label>
//           <div className="mt-2 flex gap-3">
//             <input
//               ref={inputRef}
//               value={skillInput}
//               onChange={(e) => setSkillInput(e.target.value)}
//               placeholder="Type a skill"
//               className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   handleAddSkill();
//                 }
//               }}
//             />
//             <button
//               onClick={handleAddSkill}
//               className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
//             >
//               Add skill
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Selected Category Skills - with edit + delete */}
//       {currentCategory && currentCategory.skills.length > 0 && (
//         <div className="rounded-xl border p-5">
//           <div className="flex flex-wrap gap-2">
//             {currentCategory.skills.map((skill) =>
//               editingSkill === skill ? (
//                 <div
//                   key={skill}
//                   className="flex items-center gap-1 rounded-full border border-blue-400 bg-white px-2 py-1"
//                 >
//                   <input
//                     ref={skillEditInputRef}
//                     value={skillEditValue}
//                     onChange={(e) => setSkillEditValue(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") confirmEditSkill();
//                       if (e.key === "Escape") setEditingSkill(null);
//                     }}
//                     className="w-24 text-sm focus:outline-none"
//                   />
//                   <button
//                     type="button"
//                     onClick={confirmEditSkill}
//                     className="text-green-600 hover:text-green-700"
//                     aria-label="Save skill"
//                   >
//                     <Check size={14} />
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   key={skill}
//                   className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => startEditSkill(skill)}
//                     className="text-sm"
//                     title="Click to edit"
//                   >
//                     {skill}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => removeSkill(selectedCategory, skill)}
//                     className="hover:text-red-700"
//                     aria-label={`Remove ${skill}`}
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}

//       {/* AI Suggest Button */}
//       {selectedCategory && (
//         <button
//           type="button"
//           onClick={handleSuggestSkills}
//           disabled={isPending || !resume?._id}
//           className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <Sparkles size={18} />
//           {isPending ? "AI is suggesting..." : "AI suggest skills"}
//         </button>
//       )}

//       {/* Popular Skills */}
//       {selectedCategory && (
//         <div>
//           <h3 className="mb-3 font-semibold">Popular skills</h3>
//           <div className="flex flex-wrap gap-2">
//             {skillSuggestions.map((skill) => (
//               <button
//                 key={skill}
//                 type="button"
//                 onClick={() => {
//                   const trimmed = skill.trim();
//                   if (!trimmed || skillExists(selectedCategory, trimmed)) return;
//                   addSkill(selectedCategory, trimmed);
//                 }}
//                 className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
//               >
//                 + {skill}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { X, Sparkles, Pencil, Trash2, Check } from "lucide-react";
import { useResumeStore } from "../../../../store/resume.store";
import {
  skillSuggestions,
  skillSuggestionsByCategory,
} from "../data/skillSuggestions";
import { useSuggestSkills } from "../../../ai/hooks/useSuggestSkills";

export default function SkillsSection() {
  const skills = useResumeStore((state) => state.resume?.skills ?? []);
  const addSkill = useResumeStore((state) => state.addSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const updateSkills = useResumeStore((state) => state.updateSkills);
  const addCategory = useResumeStore((state) => state.addCategory);
  const removeCategory = useResumeStore((state) => state.removeCategory);
  const resume = useResumeStore((state) => state.resume);

  const { mutate, isPending } = useSuggestSkills();

  // The 4 fixed presets + "Other" as the 5th option
  const presetCategories = ["Languages", "Frameworks", "Databases", "Tools"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [otherCategoryInput, setOtherCategoryInput] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryRenameValue, setCategoryRenameValue] = useState("");

  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [skillEditValue, setSkillEditValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const skillEditInputRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (skills.length === 0) {
      setSelectedCategory("");
      return;
    }
    if (!skills.find((c) => c.title === selectedCategory)) {
      setSelectedCategory(skills[0].title);
    }
  }, [skills, selectedCategory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [skills.length]);

  useEffect(() => {
    if (editingCategory) renameInputRef.current?.focus();
  }, [editingCategory]);

  useEffect(() => {
    if (editingSkill) skillEditInputRef.current?.focus();
  }, [editingSkill]);

  useEffect(() => {
    if (showOtherInput) otherInputRef.current?.focus();
  }, [showOtherInput]);

  const skillExists = (categoryTitle: string, skill: string) => {
    const category = skills.find((item) => item.title === categoryTitle);
    if (!category) return false;
    return category.skills.some((s) => s.toLowerCase() === skill.toLowerCase());
  };

  const categoryExists = (title: string, excludeTitle?: string) =>
    skills.some(
      (cat) =>
        cat.title.toLowerCase() === title.toLowerCase() &&
        cat.title !== excludeTitle,
    );

  // ---------- Category actions ----------

  const handlePresetClick = (title: string) => {
    if (!categoryExists(title)) {
      addCategory(title);
    }
    setSelectedCategory(title);
    setShowOtherInput(false);
  };

  const handleOtherClick = () => {
    setShowOtherInput(true);
    setOtherCategoryInput("");
  };

  const handleAddOtherCategory = () => {
    const title = otherCategoryInput.trim();
    if (!title) return;
    if (categoryExists(title)) {
      setSelectedCategory(title);
      setShowOtherInput(false);
      setOtherCategoryInput("");
      return;
    }
    addCategory(title);
    setSelectedCategory(title);
    setOtherCategoryInput("");
    setShowOtherInput(false);
  };

  const startRenameCategory = (title: string) => {
    setEditingCategory(title);
    setCategoryRenameValue(title);
  };

  const confirmRenameCategory = () => {
    if (!editingCategory) return;
    const newTitle = categoryRenameValue.trim();

    if (!newTitle || newTitle === editingCategory) {
      setEditingCategory(null);
      return;
    }
    if (categoryExists(newTitle, editingCategory)) {
      setEditingCategory(null);
      return;
    }

    const updated = skills.map((cat) =>
      cat.title === editingCategory ? { ...cat, title: newTitle } : cat,
    );
    updateSkills(updated);

    if (selectedCategory === editingCategory) {
      setSelectedCategory(newTitle);
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = (title: string) => {
    removeCategory(title);
    if (selectedCategory === title) {
      const remaining = skills.filter((c) => c.title !== title);
      setSelectedCategory(remaining[0]?.title ?? "");
    }
  };

  // ---------- Skill actions ----------

  const handleAddSkill = () => {
    const value = skillInput.trim();
    if (!value || !selectedCategory) return;
    if (skillExists(selectedCategory, value)) {
      setSkillInput("");
      return;
    }
    addSkill(selectedCategory, value);
    setSkillInput("");
  };

  const startEditSkill = (skill: string) => {
    setEditingSkill(skill);
    setSkillEditValue(skill);
  };

  const confirmEditSkill = () => {
    if (!editingSkill || !selectedCategory) return;
    const newValue = skillEditValue.trim();

    if (!newValue || newValue === editingSkill) {
      setEditingSkill(null);
      return;
    }
    if (skillExists(selectedCategory, newValue)) {
      setEditingSkill(null);
      return;
    }

    const updated = skills.map((cat) => {
      if (cat.title !== selectedCategory) return cat;
      return {
        ...cat,
        skills: cat.skills.map((s) => (s === editingSkill ? newValue : s)),
      };
    });
    updateSkills(updated);
    setEditingSkill(null);
  };

 const handleSuggestSkills = () => {
    if (!resume?._id || !selectedCategory) return;
    mutate(
      { resumeId: resume._id, selectedCategory },
      {
        onSuccess: (aiSkills: string[]) => {
          const updated = skills.map((category) => {
            if (category.title !== selectedCategory) return category;
            const merged = [...category.skills, ...aiSkills].filter(
              (skill, index, arr) =>
                index === arr.findIndex((s) => s.toLowerCase() === skill.toLowerCase())
            );
            return { ...category, skills: merged };
          });
          updateSkills(updated);
        },
      }
    );
  };
  const currentCategory = skills.find((c) => c.title === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="mt-1 text-sm text-gray-500">
          Pick a category below, or choose Other to create your own.
        </p>
      </div>

      {/* Step 1: Choose a category — 4 presets + Other, always visible */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Select category
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {presetCategories.map((title) => {
            const isActive = selectedCategory === title;
            return (
              <button
                key={title}
                type="button"
                onClick={() => handlePresetClick(title)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 hover:border-violet-400 hover:bg-violet-50"
                }`}
              >
                {title}
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleOtherClick}
            className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
              showOtherInput ||
              (selectedCategory && !presetCategories.includes(selectedCategory))
                ? "border-violet-500 bg-violet-50 text-violet-700"
                : "border-gray-200 hover:border-violet-400 hover:bg-violet-50"
            }`}
          >
            Other
          </button>
        </div>

        {showOtherInput && (
          <div className="flex gap-3">
            <input
              ref={otherInputRef}
              value={otherCategoryInput}
              onChange={(e) => setOtherCategoryInput(e.target.value)}
              placeholder="Type your custom category, e.g. Soft Skills"
              className="h-11 flex-1 rounded-lg border px-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddOtherCategory();
                if (e.key === "Escape") setShowOtherInput(false);
              }}
            />
            <button
              type="button"
              onClick={handleAddOtherCategory}
              className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Existing categories — with rename / delete */}
      {skills.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your categories
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((category) => (
              <div
                key={category.title}
                className={`flex items-center gap-1 rounded-lg border px-3 py-2 ${
                  selectedCategory === category.title
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200"
                }`}
              >
                {editingCategory === category.title ? (
                  <input
                    ref={renameInputRef}
                    value={categoryRenameValue}
                    onChange={(e) => setCategoryRenameValue(e.target.value)}
                    onBlur={confirmRenameCategory}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") confirmRenameCategory();
                      if (e.key === "Escape") setEditingCategory(null);
                    }}
                    className="w-28 rounded border px-2 py-1 text-sm focus:outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(category.title)}
                    className="text-sm font-medium"
                  >
                    {category.title}
                    <span className="ml-1 text-xs text-gray-400">
                      ({category.skills.length})
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => startRenameCategory(category.title)}
                  className="ml-1 text-gray-400 hover:text-blue-600"
                  aria-label={`Rename ${category.title}`}
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category.title)}
                  className="text-gray-400 hover:text-red-600"
                  aria-label={`Delete ${category.title}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Skill Input */}
      {selectedCategory && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Add skill to:{" "}
            <span className="font-semibold">{selectedCategory}</span>
          </label>
          <div className="mt-2 flex gap-3">
            <input
              ref={inputRef}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type a skill"
              className="flex-1 rounded-lg border px-4 h-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <button
              onClick={handleAddSkill}
              className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition"
            >
              Add skill
            </button>
          </div>
        </div>
      )}

      {/* Selected Category Skills - with edit + delete */}
      {currentCategory && currentCategory.skills.length > 0 && (
        <div className="rounded-xl border p-5">
          <div className="flex flex-wrap gap-2">
            {currentCategory.skills.map((skill) =>
              editingSkill === skill ? (
                <div
                  key={skill}
                  className="flex items-center gap-1 rounded-full border border-blue-400 bg-white px-2 py-1"
                >
                  <input
                    ref={skillEditInputRef}
                    value={skillEditValue}
                    onChange={(e) => setSkillEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") confirmEditSkill();
                      if (e.key === "Escape") setEditingSkill(null);
                    }}
                    className="w-24 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={confirmEditSkill}
                    className="text-green-600 hover:text-green-700"
                    aria-label="Save skill"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700"
                >
                  <button
                    type="button"
                    onClick={() => startEditSkill(skill)}
                    className="text-sm"
                    title="Click to edit"
                  >
                    {skill}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill(selectedCategory, skill)}
                    className="hover:text-red-700"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* AI Suggest Button */}
      {selectedCategory && (
        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={isPending || !resume?._id}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={18} />
          {isPending ? "AI is suggesting..." : "AI suggest skills"}
        </button>
      )}

      {/* Popular Skills */}
      {/* Popular Skills — filtered by selected category */}
      {selectedCategory && (
        <div>
          <h3 className="mb-3 font-semibold">Popular skills</h3>
          <div className="flex flex-wrap gap-2">
            {(
              skillSuggestionsByCategory[selectedCategory] ?? skillSuggestions
            ).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  const trimmed = skill.trim();
                  if (!trimmed || skillExists(selectedCategory, trimmed))
                    return;
                  addSkill(selectedCategory, trimmed);
                }}
                className="rounded-full border px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

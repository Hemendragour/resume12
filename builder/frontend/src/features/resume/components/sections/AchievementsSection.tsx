import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

import { useResumeStore } from "../../../../store/resume.store";

export default function AchievementsSection() {
  const resume = useResumeStore((state) => state.resume);

  const addAchievement = useResumeStore(
    (state) => state.addAchievement,
  );

  const updateAchievement = useResumeStore(
    (state) => state.updateAchievement,
  );

  const removeAchievement = useResumeStore(
    (state) => state.removeAchievement,
  );

  const [newAchievement, setNewAchievement] =
    useState("");

  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [editingValue, setEditingValue] =
    useState("");

  if (!resume) return null;

  const achievements = resume.achievements ?? [];

  const handleAdd = () => {
    const value = newAchievement.trim();

    if (!value) return;

    addAchievement(value);

    setNewAchievement("");
  };

  const handleStartEdit = (
    index: number,
    value: string,
  ) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;

    const value = editingValue.trim();

    if (!value) return;

    updateAchievement(
      editingIndex,
      value,
    );

    setEditingIndex(null);
    setEditingValue("");
  };

  const handleDelete = (achievement: string) => {
    removeAchievement(achievement);

    if (editingIndex !== null) {
      setEditingIndex(null);
      setEditingValue("");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Achievements
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add your important achievements,
          accomplishments and milestones.
        </p>
      </div>

      {/* Existing Achievements */}
      <div className="space-y-4">

        {achievements.map(
          (achievement, index) => (
            <div
              key={`${achievement}-${index}`}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
              "
            >
              {editingIndex === index ? (
                /* ================= EDIT MODE ================= */
                <div className="space-y-3">

                  <textarea
                    value={editingValue}
                    onChange={(e) =>
                      setEditingValue(
                        e.target.value,
                      )
                    }
                    rows={3}
                    autoFocus
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-slate-300
                      px-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      onClick={() => {
                        setEditingIndex(null);
                        setEditingValue("");
                      }}
                      className="
                        rounded-lg
                        border
                        border-slate-300
                        px-4
                        py-2
                        text-sm
                        text-slate-600
                        hover:bg-slate-50
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        hover:bg-blue-700
                      "
                    >
                      <FaCheck size={12} />
                      Save
                    </button>

                  </div>
                </div>
              ) : (
                /* ================= VIEW MODE ================= */
                <div className="flex items-start gap-4">

                  <div className="flex-1">
                    <p
                      className="
                        text-sm
                        leading-6
                        text-slate-700
                      "
                    >
                      {achievement}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() =>
                        handleStartEdit(
                          index,
                          achievement,
                        )
                      }
                      className="
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        text-blue-600
                        hover:bg-blue-50
                      "
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          achievement,
                        )
                      }
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-red-500
                        hover:bg-red-50
                      "
                      title="Delete achievement"
                    >
                      <FaTrash size={13} />
                    </button>

                  </div>
                </div>
              )}
            </div>
          ),
        )}

        {/* Empty State */}
        {achievements.length === 0 && (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-slate-300
              bg-slate-50
              px-6
              py-10
              text-center
            "
          >
            <p className="text-sm text-slate-500">
              No achievements added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add your first achievement below.
            </p>
          </div>
        )}

      </div>

      {/* Add Achievement */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          New Achievement
        </label>

        <textarea
          value={newAchievement}
          onChange={(e) =>
            setNewAchievement(
              e.target.value,
            )
          }
          rows={3}
          placeholder="e.g. Solved 700+ DSA problems on LeetCode"
          className="
            w-full
            resize-none
            rounded-lg
            border
            border-slate-300
            px-4
            py-3
            text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

        <div className="mt-3 flex justify-end">

          <button
            type="button"
            onClick={handleAdd}
            disabled={!newAchievement.trim()}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FaPlus size={12} />
            Add Achievement
          </button>

        </div>
      </div>

    </div>
  );
}
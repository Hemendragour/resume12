import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GripVertical, Eye, EyeOff } from "lucide-react";

interface Props {
  id: string;
  title: string;
  active: boolean;
  enabled: boolean;
  onClick: () => void;
  onToggle: () => void;
}

export default function SortableSectionItem({
  id,
  title,
  active,
  enabled,
  onClick,
  onToggle,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
      ${active ? "bg-blue-600 text-white" : "hover:bg-slate-100"}
      ${!enabled ? "opacity-50" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span>{title}</span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="rounded p-1 hover:bg-gray-200"
        >
          {enabled ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </button>
  );
}

import { useEffect, useRef, useState } from "react";

import {
  MoreVertical,
  Copy,
  Trash2,
  Pencil,
  Download,
  Share2,
} from "lucide-react";

interface Props {
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

export default function ResumeCardMenu({
  onRename,
  onDuplicate,
  onDelete,
  onDownload,
  onShare,
}: Props) {
  const [open, setOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (
      e: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-lg p-2 transition hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

          <button
            onClick={() => {
              onRename();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-100"
          >
            <Pencil size={18} />

            Rename
          </button>

          <button
            onClick={() => {
              onDuplicate();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-100"
          >
            <Copy size={18} />

            Duplicate
          </button>

          <button
            onClick={() => {
              onDownload?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-100"
          >
            <Download size={18} />

            Download PDF
          </button>

          <button
            onClick={() => {
              onShare?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-100"
          >
            <Share2 size={18} />

            Share Resume
          </button>

          <hr />

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />

            Delete
          </button>

        </div>
      )}
    </div>
  );
}
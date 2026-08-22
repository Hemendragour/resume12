import type { ReactNode } from "react";
import { X } from "lucide-react";

import ModalPortal from "./ModalPortal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}: ModalProps) {
  if (!open) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className={`w-full ${sizes[size]} rounded-2xl border border-primary/10 bg-modal shadow-2xl animate-in zoom-in-95`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-primary/10 p-6">
            <div>
              <h2 className="text-2xl font-bold text-dark">{title}</h2>

              {description && (
                <p className="mt-1 text-sm text-primary/70">{description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-primary/60 hover:bg-background"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}

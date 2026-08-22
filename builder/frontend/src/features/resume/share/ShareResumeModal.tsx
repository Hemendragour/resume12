import { Copy, Check } from "lucide-react";
import { useState } from "react";

import Button from "../../../components/ui/Button";
import ModalPortal from "../../../components/ui/ModalPortal";

interface Props {
  open: boolean;
  onClose: () => void;
  shareId: string;
}

export default function ShareResumeModal({ open, onClose, shareId }: Props) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const url = `${window.location.origin}/resume/public/${shareId}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="text-2xl font-bold">Share Resume</h2>
          <p className="mt-2 text-slate-500">
            Anyone with this link can view your resume.
          </p>
          <input
            readOnly
            value={url}
            className="mt-6 h-12 w-full rounded-lg border px-4"
          />
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={copy}>
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

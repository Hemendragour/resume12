// CoverLetterPreviewPanel.tsx
import { useRef, useEffect, useState } from "react";
import CoverLetterTemplateRenderer from "../../templates/CoverLetterTemplateRenderer";

/*
 * ============================================================
 * A4 CONFIGURATION
 * ============================================================
 *
 * Actual A4 at 96 dpi ≈ 794 × 1123 px.
 * We render at full resolution then scale to fit the panel.
 */

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export default function CoverLetterPreviewPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  /*
   * Compute scale whenever the container resizes.
   * 32 px = 16 px padding each side.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const available = el.clientWidth - 32;
      const s = Math.min(available / A4_WIDTH_PX, 1);
      setScale(s);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaledHeight = A4_HEIGHT_PX * scale;

  return (
    <aside
      className="hidden xl:flex w-[420px] 2xl:w-[500px] h-full flex-col border-l border-slate-200/60 bg-[#f0ece7]"
      style={{ minWidth: 0 }}
    >
      {/* ── Header ────────────────────────────────────── */}
      <div className="shrink-0 h-14 bg-modal border-b border-primary/10 px-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-dark">Live Preview</h2>
        <div className="flex items-center gap-2 text-xs text-primary/50">
          <span>A4</span>
          <span className="h-3 w-px bg-primary/20" />
          <span className="font-medium text-success">
            {Math.round(scale * 100)}%
          </span>
        </div>
      </div>

      {/* ── Preview area ──────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto py-5 px-4"
      >
        {/*
         * Outer wrapper reserves the visual height of the scaled page
         * and centers it horizontally.
         */}
        <div
          className="mx-auto relative"
          style={{
            width: `${A4_WIDTH_PX * scale}px`,
            height: `${scaledHeight}px`,
          }}
        >
          {/*
           * Inner wrapper: rendered at full A4, then scaled down.
           * transform-origin "top left" keeps the corner pinned.
           */}
          <div
            style={{
              width: `${A4_WIDTH_PX}px`,
              height: `${A4_HEIGHT_PX}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* Actual A4 page — used by PDF export */}
            <div
              id="cover-letter-export"
              className="relative overflow-hidden bg-white shadow-xl"
              style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
                minWidth: `${A4_WIDTH_PX}px`,
                maxWidth: `${A4_WIDTH_PX}px`,
                minHeight: `${A4_HEIGHT_PX}px`,
                maxHeight: `${A4_HEIGHT_PX}px`,
              }}
            >
              <CoverLetterTemplateRenderer />
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <div className="shrink-0 h-10 bg-modal border-t border-primary/10 px-4 flex items-center justify-between text-xs text-primary/50">
        <span>A4 Live Preview</span>
        <span className="font-medium text-success">Ready for Export</span>
      </div>
    </aside>
  );
}

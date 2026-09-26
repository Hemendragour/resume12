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

/*
 * PDF EXPORT NODE
 * ----------------
 * The on-screen page below is scaled with a CSS `transform: scale()`
 * so it fits the panel at any screen width. html2canvas does not
 * reliably capture an element that sits inside a scaled ancestor —
 * depending on the current scale factor it can shrink, blur, or
 * duplicate/overlap the rendered text.
 *
 * To make export scale-independent, we render a second, completely
 * separate copy of the cover letter at full, untransformed A4 size
 * (`#cover-letter-export`), positioned off-screen with `position: fixed`.
 * It is never inside any transformed ancestor, so html2canvas always
 * captures the same pixel-perfect page regardless of viewport width
 * or the live-preview zoom level.
 */

interface Props {
  mobileVisible: boolean;
}

export default function CoverLetterPreviewPanel({ mobileVisible }: Props) {
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
    <>
    <aside
      className={`flex h-full flex-col w-full md:w-[360px] lg:w-[360px] xl:w-[420px] 2xl:w-[500px] bg-[#f0ece7] md:border-l border-slate-200/60 ${
        mobileVisible
          ? "static opacity-100 pointer-events-auto"
          : "absolute inset-0 -z-10 opacity-0 pointer-events-none"
      } md:static md:z-auto md:opacity-100 md:pointer-events-auto`}
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
            {/* Visual-only A4 page. Not used for export — see
                #cover-letter-export below. */}
            <div
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

    {/*
     * ── PDF export node ────────────────────────────────
     * Full-resolution, untransformed A4 page kept off-screen.
     * Deliberately NOT nested inside the scaled preview above so
     * html2canvas never has to deal with an ancestor `transform`
     * (which can shrink, blur, or duplicate/overlap the rendered
     * text depending on the current zoom level).
     */}
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: "-10000px",
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        pointerEvents: "none",
      }}
    >
      <div
        id="cover-letter-export"
        className="relative overflow-hidden bg-white"
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
    </>
  );
}

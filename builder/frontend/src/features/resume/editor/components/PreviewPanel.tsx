import { forwardRef, useRef, useEffect, useState } from "react";
import TemplateRenderer from "../../preview/templates/TemplateRenderer";

/*
 * ============================================================
 * A4 CONFIGURATION
 * ============================================================
 *
 * Actual A4 at 96 dpi ≈ 794 × 1123 px.
 * We render the resume at full A4 resolution and then scale
 * it down so it fits the available panel width.
 */

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/*
 * ============================================================
 * PREVIEW PANEL
 * ============================================================
 *
 * Two contexts:
 *  - Desktop (lg+): always visible, docked to the right as a
 *    fixed-width rail alongside the sidebar + form.
 *  - Mobile/tablet (< lg): shown full-width when the "Preview"
 *    tab is active, hidden otherwise.
 *
 * When not the active mobile tab, this is kept off-screen with
 * opacity/pointer-events rather than `display:none` — PDF export
 * reads #resume-export directly via html2canvas, which cannot
 * capture a display:none element, so it must stay laid out even
 * while visually hidden.
 */

interface Props {
  mobileVisible: boolean;
}

const PreviewPanel = forwardRef<HTMLElement, Props>(
  ({ mobileVisible }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    /*
     * Compute scale whenever the container resizes.
     * We leave 32 px of horizontal padding (16 px each side).
     */
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const compute = () => {
        const available = el.clientWidth - 32; // 16px padding each side
        const s = Math.min(available / A4_WIDTH_PX, 1); // never upscale
        setScale(s);
      };

      compute();

      const ro = new ResizeObserver(compute);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    /*
     * The visual bounding box for the scaled page.
     * transform-origin is "top center", so we need to account
     * for the height shrinkage caused by scale.
     */
    const scaledHeight = A4_HEIGHT_PX * scale;

    return (
      <aside
        ref={ref}
        className={`flex h-full flex-col w-full lg:w-[320px] xl:w-[420px] 2xl:w-[500px] bg-[#f0ece7] lg:border-l border-slate-200/60 ${
          mobileVisible
            ? "static opacity-100 pointer-events-auto"
            : "absolute inset-0 -z-10 opacity-0 pointer-events-none"
        } lg:static lg:z-auto lg:opacity-100 lg:pointer-events-auto`}
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
           * Outer wrapper: reserves the visual height of the scaled page
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
             * Inner wrapper: rendered at full A4 size, then scaled down.
             * transform-origin "top left" means the top-left corner
             * stays pinned, which matches our wrapper sizing above.
             */}
            <div
              style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {/*
               * Actual A4 page — used by PDF export.
               */}
              <div
                id="resume-export"
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
                <TemplateRenderer />
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
  },
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;

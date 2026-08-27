import { forwardRef } from "react";
import TemplateRenderer from "../../preview/templates/TemplateRenderer";

/*
 * ============================================================
 * A4 CONFIGURATION
 * ============================================================
 */

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const MM_TO_PX = 3.7795275591;

/*
 * 210mm × 3.7795 = 793.7px
 * 297mm × 3.7795 = 1122.5px
 *
 * Rounded:
 * 794 × 1123 px
 */

const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_PX);

const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_PX);

/*
 * ============================================================
 * LIVE PREVIEW SCALE
 * ============================================================
 *
 * IMPORTANT:
 *
 * Actual A4 page = 794 × 1123px
 *
 * Preview panel = 860px
 *
 * Therefore 1.0 scale is appropriate.
 *
 * Do NOT use 0.8 here.
 */

const PREVIEW_SCALE = 1;

/*
 * ============================================================
 * PREVIEW PANEL
 * ============================================================
 */

const PreviewPanel = forwardRef<HTMLElement, Record<string, never>>(
  (_props, ref) => {
    /*
     * Visual size of the page
     *
     * Since scale = 1:
     *
     * width  = 794px
     * height = 1123px
     */

    const visualWidth = A4_WIDTH_PX * PREVIEW_SCALE;

    const visualHeight = A4_HEIGHT_PX * PREVIEW_SCALE;

    return (
      <aside
        ref={ref}
        className="
        hidden
        xl:flex
        w-[860px]
        h-full
        flex-col
        border-l
        border-slate-200
        bg-slate-100
      "
      >
        {/* =====================================================
          HEADER
      ====================================================== */}

        <div
          className="
          shrink-0
          h-[64px]
          bg-white
          border-b
          border-slate-200
          px-6
          flex
          items-center
          justify-between
          sticky
          top-0
          z-20
        "
        >
          <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>A4</span>

            <span className="h-3 w-px bg-gray-300" />

            <span>Real-time</span>
          </div>
        </div>

        {/* =====================================================
          PREVIEW AREA
      ====================================================== */}

        <div
          className="
          flex-1
          min-h-0
          overflow-auto
          bg-slate-100
          px-4
          py-6
        "
        >
          {/* ===================================================
            VISUAL A4 SPACE
        ==================================================== */}

          <div
            className="mx-auto"
            style={{
              width: `${visualWidth}px`,
              height: `${visualHeight}px`,
              flexShrink: 0,
            }}
          >
            {/* =================================================
              SCREEN SCALE CONTAINER
          ================================================== */}

            <div
              style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
                transform: `scale(${PREVIEW_SCALE})`,
                transformOrigin: "top left",
              }}
            >
              {/* ===============================================
                ACTUAL A4 PAGE

                This is the element used by PDF export.
            ================================================ */}

              <div
                id="resume-export"
                style={{
                  width: `${A4_WIDTH_PX}px`,
                  height: `${A4_HEIGHT_PX}px`,

                  minWidth: `${A4_WIDTH_PX}px`,
                  maxWidth: `${A4_WIDTH_PX}px`,

                  minHeight: `${A4_HEIGHT_PX}px`,
                  maxHeight: `${A4_HEIGHT_PX}px`,
                }}
                className="
                relative
                overflow-hidden
                bg-white
                shadow-2xl
              "
              >
                <TemplateRenderer />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
          FOOTER
      ====================================================== */}

        <div
          className="
          shrink-0
          h-[46px]
          bg-white
          border-t
          border-slate-200
          px-6
          flex
          items-center
          justify-between
          text-xs
          text-gray-500
        "
        >
          <span>A4 Live Preview</span>

          <span className="font-medium text-emerald-600">Ready for Export</span>
        </div>
      </aside>
    );
  },
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;

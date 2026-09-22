import CoverLetterTemplateRenderer from "../../templates/CoverLetterTemplateRenderer";

/*
 * ============================================================
 * A4 CONFIGURATION
 * (Same constants as the resume PreviewPanel, kept in sync
 * so cover letters and resumes export at identical page sizes.)
 * ============================================================
 */

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

const MM_TO_PX = 3.7795275591;

const A4_WIDTH_PX = Math.round(A4_WIDTH_MM * MM_TO_PX);
const A4_HEIGHT_PX = Math.round(A4_HEIGHT_MM * MM_TO_PX);

const PREVIEW_SCALE = 1;

export default function CoverLetterPreviewPanel() {
  const visualWidth = A4_WIDTH_PX * PREVIEW_SCALE;
  const visualHeight = A4_HEIGHT_PX * PREVIEW_SCALE;

  return (
    <aside
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
      {/* HEADER */}
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

      {/* PREVIEW AREA */}
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
        <div
          className="mx-auto"
          style={{
            width: `${visualWidth}px`,
            height: `${visualHeight}px`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: `${A4_WIDTH_PX}px`,
              height: `${A4_HEIGHT_PX}px`,
              transform: `scale(${PREVIEW_SCALE})`,
              transformOrigin: "top left",
            }}
          >
            {/*
              Actual A4 page — this is the element used by PDF export.
            */}
            <div
              id="cover-letter-export"
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
              <CoverLetterTemplateRenderer />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
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
}

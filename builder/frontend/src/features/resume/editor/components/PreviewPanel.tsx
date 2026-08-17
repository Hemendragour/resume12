// import { useRef, forwardRef, useEffect, useState } from "react";
// import TemplateRenderer from "../../preview/templates/TemplateRenderer";

// const A4_WIDTH_MM = 210;
// const A4_HEIGHT_MM = 297;

// const PreviewPanel = forwardRef<HTMLElement>((props, ref) => {
//   const previewContainerRef = useRef<HTMLDivElement>(null);

//   const [scale, setScale] = useState(0.85);

//   /*
//    * ============================================================
//    * Calculate preview scale based on available width
//    * ============================================================
//    */
//   useEffect(() => {
//     const updateScale = () => {
//       if (!previewContainerRef.current) return;

//       const containerWidth =
//         previewContainerRef.current.clientWidth;

//       /*
//        * Padding on both sides
//        */
//       const availableWidth = containerWidth - 64;

//       /*
//        * Convert A4 width into pixels.
//        *
//        * Browser CSS:
//        * 1mm ≈ 3.7795px
//        */
//       const a4WidthPx =
//         A4_WIDTH_MM * 3.7795;

//       let newScale =
//         availableWidth / a4WidthPx;

//       /*
//        * Keep preview within a reasonable size.
//        */
//       newScale = Math.min(newScale, 0.95);
//       newScale = Math.max(newScale, 0.45);

//       setScale(newScale);
//     };

//     updateScale();

//     window.addEventListener(
//       "resize",
//       updateScale,
//     );

//     return () => {
//       window.removeEventListener(
//         "resize",
//         updateScale,
//       );
//     };
//   }, []);

//   /*
//    * ============================================================
//    * Calculate visual scaled dimensions
//    * ============================================================
//    */

//   const a4WidthPx =
//     A4_WIDTH_MM * 3.7795;

//   const a4HeightPx =
//     A4_HEIGHT_MM * 3.7795;

//   const visualWidth =
//     a4WidthPx * scale;

//   const visualHeight =
//     a4HeightPx * scale;

//   return (
//     <aside
//       ref={ref}
//       className="
//         hidden
//         xl:flex
//         w-[860px]
//         border-l
//         bg-slate-100
//         overflow-y-auto
//         flex-col
//         h-full
//       "
//     >
//       {/* ====================================================== */}
//       {/* HEADER */}
//       {/* ====================================================== */}

//       <div
//         className="
//           bg-white
//           border-b
//           px-6
//           py-4
//           sticky
//           top-0
//           z-10
//           shadow-sm
//         "
//       >
//         <div className="flex items-center justify-between">
//           <h2 className="font-bold text-xl text-gray-800">
//             Live Preview
//           </h2>

//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>A4</span>

//             <div className="w-px h-3 bg-gray-300" />

//             <span>Real-time</span>
//           </div>
//         </div>
//       </div>

//       {/* ====================================================== */}
//       {/* PREVIEW AREA */}
//       {/* ====================================================== */}

//       <div
//         ref={previewContainerRef}
//         className="
//           flex-1
//           flex
//           items-start
//           justify-center
//           p-8
//           bg-slate-100
//           overflow-auto
//         "
//       >
//         {/* ==================================================== */}
//         {/* VISUAL A4 WRAPPER */}
//         {/* ==================================================== */}

//         <div
//           style={{
//             width: `${visualWidth}px`,
//             height: `${visualHeight}px`,
//             flexShrink: 0,
//           }}
//         >
//           {/* ================================================== */}
//           {/* SCALED VISUAL PAGE */}
//           {/* ================================================== */}

//           <div
//             style={{
//               width: `${a4WidthPx}px`,
//               height: `${a4HeightPx}px`,
//               transform: `scale(${scale})`,
//               transformOrigin: "top left",
//             }}
//             className="
//               bg-white
//               shadow-2xl
//               overflow-hidden
//               rounded-xl
//             "
//           >
//             {/* ================================================ */}
//             {/* ACTUAL A4 RESUME */}
//             {/* ================================================ */}

//             <div
//   id="resume-export"
//   className="
//     w-[210mm]
//     h-[297mm]
//     min-w-[210mm]
//     min-h-[297mm]
//     max-w-[210mm]
//     max-h-[297mm]
//     overflow-hidden
//     bg-white
//   "
// >
//   <TemplateRenderer />
// </div>
//           </div>
//         </div>
//       </div>

//       {/* ====================================================== */}
//       {/* FOOTER */}
//       {/* ====================================================== */}

//       <div
//         className="
//           bg-white
//           border-t
//           px-6
//           py-3
//           text-xs
//           text-gray-500
//           flex
//           items-center
//           justify-between
//         "
//       >
//         <div>
//           Drag to scroll • Scroll wheel to zoom
//         </div>

//         <div className="text-emerald-600 font-medium">
//           Ready for Export
//         </div>
//       </div>
//     </aside>
//   );
// });

// PreviewPanel.displayName = "PreviewPanel";

// export default PreviewPanel;

// import { forwardRef } from "react";
// import TemplateRenderer from "../../preview/templates/TemplateRenderer";

// /*
//  * ============================================================
//  * A4 CONFIGURATION
//  * ============================================================
//  */

// const A4_WIDTH_MM = 210;
// const A4_HEIGHT_MM = 297;

// /*
//  * CSS conversion:
//  * 1mm ≈ 3.7795275591px
//  */

// const MM_TO_PX = 3.7795275591;

// const A4_WIDTH_PX = Math.round(
//   A4_WIDTH_MM * MM_TO_PX,
// ); // 794px

// const A4_HEIGHT_PX = Math.round(
//   A4_HEIGHT_MM * MM_TO_PX,
// ); // 1123px

// /*
//  * ============================================================
//  * LIVE PREVIEW SCALE
//  * ============================================================
//  *
//  * Actual resume page:
//  *
//  * 794px × 1123px
//  *
//  * Screen:
//  *
//  * 794 × 0.80 = ~635px
//  * 1123 × 0.80 = ~898px
//  *
//  * PDF export is NOT affected by this scale.
//  */

// const PREVIEW_SCALE = 0.8;

// /*
//  * ============================================================
//  * PREVIEW PANEL
//  * ============================================================
//  */

// const PreviewPanel = forwardRef<
//   HTMLElement,
//   Record<string, never>
// >((_props, ref) => {
//   /*
//    * ==========================================================
//    * VISUAL SCREEN SIZE
//    * ==========================================================
//    */

//   const visualWidth =
//     A4_WIDTH_PX * PREVIEW_SCALE;

//   const visualHeight =
//     A4_HEIGHT_PX * PREVIEW_SCALE;

//   return (
//     <aside
//       ref={ref}
//       className="
//         hidden
//         xl:flex
//         w-[860px]
//         h-full
//         flex-col
//         border-l
//         border-slate-200
//         bg-slate-100
//       "
//     >
//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <div
//         className="
//           shrink-0
//           h-[64px]
//           bg-white
//           border-b
//           border-slate-200
//           px-6
//           flex
//           items-center
//           justify-between
//           sticky
//           top-0
//           z-20
//         "
//       >
//         <h2 className="text-xl font-bold text-gray-800">
//           Live Preview
//         </h2>

//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <span>A4</span>

//           <span className="h-3 w-px bg-gray-300" />

//           <span>Real-time</span>
//         </div>
//       </div>

//       {/* =====================================================
//           PREVIEW AREA
//       ====================================================== */}

//       <div
//         className="
//           flex-1
//           min-h-0
//           overflow-auto
//           bg-slate-100
//           p-8
//         "
//       >
//         {/* ===================================================
//             VISUAL A4 SPACE

//             This wrapper reserves the scaled screen size.
//         ==================================================== */}

//         <div
//           className="mx-auto"
//           style={{
//             width: `${visualWidth}px`,
//             height: `${visualHeight}px`,
//             flexShrink: 0,
//           }}
//         >
//           {/* =================================================
//               A4 COORDINATE SYSTEM

//               IMPORTANT:
//               Actual page remains 794 × 1123px.
//               Only visual representation is scaled.
//           ================================================== */}

//           <div
//             style={{
//               width: `${A4_WIDTH_PX}px`,
//               height: `${A4_HEIGHT_PX}px`,

//               transform: `scale(${PREVIEW_SCALE})`,

//               transformOrigin: "top left",
//             }}
//           >
//             {/* ===============================================
//                 ACTUAL A4 PAGE

//                 PDF exporter targets this element:
//                 #resume-export
//             ================================================ */}

//             <div
//               id="resume-export"
//               style={{
//                 width: `${A4_WIDTH_PX}px`,
//                 height: `${A4_HEIGHT_PX}px`,

//                 minWidth: `${A4_WIDTH_PX}px`,
//                 maxWidth: `${A4_WIDTH_PX}px`,

//                 minHeight: `${A4_HEIGHT_PX}px`,
//                 maxHeight: `${A4_HEIGHT_PX}px`,
//               }}
//               className="
//                 relative
//                 overflow-hidden
//                 bg-white
//                 shadow-2xl
//               "
//             >
//               <TemplateRenderer />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           FOOTER
//       ====================================================== */}

//       <div
//         className="
//           shrink-0
//           h-[46px]
//           bg-white
//           border-t
//           border-slate-200
//           px-6
//           flex
//           items-center
//           justify-between
//           text-xs
//           text-gray-500
//         "
//       >
//         <span>
//           A4 Live Preview
//         </span>

//         <span className="font-medium text-emerald-600">
//           Ready for Export
//         </span>
//       </div>
//     </aside>
//   );
// });

// PreviewPanel.displayName = "PreviewPanel";

// export default PreviewPanel;

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

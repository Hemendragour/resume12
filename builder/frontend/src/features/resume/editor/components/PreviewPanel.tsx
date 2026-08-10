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


// import {
//   useRef,
//   forwardRef,
//   useEffect,
//   useState,
// } from "react";

// import TemplateRenderer from "../../preview/templates/TemplateRenderer";

// const A4_WIDTH_MM = 210;
// const A4_HEIGHT_MM = 297;

// const MM_TO_PX = 3.7795275591;

// const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
// const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

// const PreviewPanel = forwardRef<HTMLElement>((props, ref) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [scale, setScale] = useState(0.75);

//   useEffect(() => {
//     const updateScale = () => {
//       if (!containerRef.current) return;

//       const containerWidth =
//         containerRef.current.clientWidth;

//       const availableWidth = Math.max(
//         containerWidth - 64,
//         300,
//       );

//       const calculatedScale =
//         availableWidth / A4_WIDTH_PX;

//       const nextScale = Math.min(
//         0.75,
//         Math.max(0.45, calculatedScale),
//       );

//       setScale(nextScale);
//     };

//     updateScale();

//     window.addEventListener("resize", updateScale);

//     return () => {
//       window.removeEventListener("resize", updateScale);
//     };
//   }, []);

//   const visualWidth = A4_WIDTH_PX * scale;
//   const visualHeight = A4_HEIGHT_PX * scale;

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
//         bg-slate-100
//       "
//     >
//       {/* Header */}
//       <div
//         className="
//           shrink-0
//           bg-white
//           border-b
//           px-6
//           py-4
//           sticky
//           top-0
//           z-20
//           shadow-sm
//         "
//       >
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-bold text-gray-800">
//             Live Preview
//           </h2>

//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>A4</span>

//             <div className="h-3 w-px bg-gray-300" />

//             <span>Real-time</span>
//           </div>
//         </div>
//       </div>

//       {/* Preview */}
//       <div
//         ref={containerRef}
//         className="
//           flex-1
//           overflow-auto
//           bg-slate-100
//           p-8
//         "
//       >
//         {/* Visual space */}
//         <div
//           className="mx-auto"
//           style={{
//             width: `${visualWidth}px`,
//             height: `${visualHeight}px`,
//           }}
//         >
//           {/* Screen scaling only */}
//           <div
//             style={{
//               width: `${A4_WIDTH_PX}px`,
//               height: `${A4_HEIGHT_PX}px`,
//               transform: `scale(${scale})`,
//               transformOrigin: "top left",
//             }}
//           >
//             {/* Actual A4 page */}
//             <div
//               id="resume-export"
//               className="
//                 relative
//                 w-[210mm]
//                 h-[297mm]
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

//       {/* Footer */}
//       <div
//         className="
//           shrink-0
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
//         <div>A4 Live Preview</div>

//         <div className="font-medium text-emerald-600">
//           Ready for Export
//         </div>
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
 * A4 SIZE
 * ============================================================
 */

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/*
 * CSS: 1mm ≈ 3.7795px
 */
const MM_TO_PX = 3.7795275591;

const A4_WIDTH_PX =
  A4_WIDTH_MM * MM_TO_PX;

const A4_HEIGHT_PX =
  A4_HEIGHT_MM * MM_TO_PX;

/*
 * ============================================================
 * LIVE PREVIEW SCALE
 * ============================================================
 *
 * Actual page:
 * 210mm × 297mm
 *
 * 0.95 = large live preview
 *
 * PDF export is NOT affected by this.
 */

const PREVIEW_SCALE = 0.95;

const PreviewPanel = forwardRef<HTMLElement>(
  (props, ref) => {
    /*
     * Visual size on screen
     */
    const visualWidth =
      A4_WIDTH_PX * PREVIEW_SCALE;

    const visualHeight =
      A4_HEIGHT_PX * PREVIEW_SCALE;

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
          bg-slate-100
        "
      >
        {/* ==================================================
            HEADER
        =================================================== */}

        <div
          className="
            shrink-0
            bg-white
            border-b
            px-6
            py-4
            sticky
            top-0
            z-20
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Live Preview
            </h2>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>A4</span>

              <div className="h-3 w-px bg-gray-300" />

              <span>Real-time</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            PREVIEW AREA
        =================================================== */}

        <div
          className="
            flex-1
            overflow-auto
            bg-slate-100
            p-8
          "
        >
          {/* ==================================================
              VISUAL A4 SPACE

              This wrapper reserves the scaled size so that
              scrolling and centering work correctly.
          =================================================== */}

          <div
            className="mx-auto"
            style={{
              width: `${visualWidth}px`,
              height: `${visualHeight}px`,
            }}
          >
            {/* ==================================================
                SCREEN SCALE

                Only visual display is scaled.
                Actual resume-export remains A4.
            =================================================== */}

            <div
              style={{
                width: `${A4_WIDTH_PX}px`,
                height: `${A4_HEIGHT_PX}px`,
                transform: `scale(${PREVIEW_SCALE})`,
                transformOrigin: "top left",
              }}
            >
              {/* ==============================================
                  ACTUAL A4 PAGE
              =============================================== */}

              <div
                id="resume-export"
                className="
                  relative
                  w-[210mm]
                  h-[297mm]
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

        {/* ==================================================
            FOOTER
        =================================================== */}

        <div
          className="
            shrink-0
            bg-white
            border-t
            px-6
            py-3
            text-xs
            text-gray-500
            flex
            items-center
            justify-between
          "
        >
          <div>
            A4 Live Preview
          </div>

          <div className="font-medium text-emerald-600">
            Ready for Export
          </div>
        </div>
      </aside>
    );
  },
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;
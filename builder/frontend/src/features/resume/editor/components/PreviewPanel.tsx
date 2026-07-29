// import { useRef, forwardRef } from "react";
// import TechnicalDeveloperTemplate from "../../preview/templates/TechnicalDeveloperTemplate";
// import TemplateRenderer from "../../preview/templates/TemplateRenderer";

// const PreviewPanel = forwardRef<HTMLDivElement>((props, ref) => {
//   const previewRef = useRef<HTMLDivElement>(null);

//   return (
//     <aside
//       ref={ref}                    // ← Forwarded ref attached here
//       className="hidden xl:block w-[860px] border-l bg-slate-200 overflow-y-auto"
//     >
//       <div className="bg-white border-b p-5">
//         <h2 className="font-bold text-lg">Live Preview</h2>
//       </div>

//       <div className="flex justify-center py-8">
//         <div
//           className="bg-white shadow-xl"
//           style={{
//             width: "210mm",
//             minHeight: "297mm",
//             transform: "scale(.45)",
//             transformOrigin: "top center",
//           }}
//         >
//           {/* Internal Preview Ref (for screenshot/PDF etc.) */}
//           <div ref={previewRef}>
//            <TemplateRenderer />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// });

// export default PreviewPanel;

  import { useRef, forwardRef, useEffect, useState } from "react";
  import TemplateRenderer from "../../preview/templates/TemplateRenderer";

  const PreviewPanel = forwardRef<HTMLDivElement>((props, ref) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.85);

    // Auto-adjust scale based on container width (responsive)
    useEffect(() => {
      const updateScale = () => {
        if (!previewRef.current?.parentElement) return;

        const containerWidth = previewRef.current.parentElement.clientWidth - 40; // padding
        const a4Width = 210; // mm

        // Calculate optimal scale
        const newScale = Math.min(0.95, (containerWidth / a4Width) * 0.92);
        setScale(newScale);
      };

      updateScale();
      window.addEventListener("resize", updateScale);

      return () => window.removeEventListener("resize", updateScale);
    }, []);

    return (
      <aside
        ref={ref}
        className="hidden xl:block w-[860px] border-l bg-slate-100 overflow-y-auto flex flex-col h-full"
      >
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-gray-800">Live Preview</h2>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>A4</span>
              <div className="w-px h-3 bg-gray-300" />
              <span>Real-time</span>
            </div>
          </div>
        </div>

        {/* Preview Container - Centered with better padding */}
        <div className="flex-1 flex items-start justify-center p-8 bg-slate-100 overflow-auto">
          <div
            className="bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-300"
            style={{
              width: "210mm",
              minHeight: "297mm",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            }}
          >
            {/* Scaled Preview */}
           <div
  id="resume-preview"
  ref={previewRef}
  style={{
    transform: `scale(${scale})`,
    transformOrigin: "top center",
    width: "210mm",
    minHeight: "297mm",
  }}
  className="origin-top bg-white"
>
  <TemplateRenderer />
</div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white border-t px-6 py-3 text-xs text-gray-500 flex items-center justify-between">
          <div>Drag to scroll • Scroll wheel to zoom (coming soon)</div>
          <div className="text-emerald-600 font-medium">Ready for Export</div>
        </div>
        {/* Hidden Full Size Preview For PDF Export */}
<div
  id="resume-export"
  className="fixed -left-[99999px] top-0 bg-white"
  style={{
    width: "210mm",
    minHeight: "297mm",
  }}
>
  <TemplateRenderer />
</div>
      </aside>
    );
  });

  export default PreviewPanel;

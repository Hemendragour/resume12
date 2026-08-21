// import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

// interface Props {
//   title: string;

//   saveStatus: "idle" | "saving" | "saved" | "error";
// }

// export default function EditorHeader({ title, saveStatus }: Props) {
//   return (
//     <header className="bg-white border-b h-20 flex items-center justify-between px-8">
//       <div>
//         <h1 className="text-2xl font-bold">{title}</h1>

//         <p className="text-sm text-gray-500">Resume Editor</p>
//       </div>

//       <div>
//         {saveStatus === "saving" && (
//           <div className="flex items-center gap-2 text-blue-600">
//             <Loader2 size={18} className="animate-spin" />
//             Saving...
//           </div>
//         )}

//         {saveStatus === "saved" && (
//           <div className="flex items-center gap-2 text-green-600">
//             <CheckCircle size={18} />
//             Saved
//           </div>
//         )}

//         {saveStatus === "error" && (
//           <div className="flex items-center gap-2 text-red-600">
//             <AlertCircle size={18} />
//             Save Failed
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// EditorHeader.tsx
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

interface Props {
  title: string;

  saveStatus: "idle" | "saving" | "saved" | "error";
}

export default function EditorHeader({ title, saveStatus }: Props) {
  return (
    <header className="bg-modal border-b border-primary/10 h-20 flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">{title}</h1>

        <p className="text-sm text-primary/70">Resume Editor</p>
      </div>

      <div>
        {saveStatus === "saving" && (
          <div className="flex items-center gap-2 text-primary">
            <Loader2 size={18} className="animate-spin" />
            Saving...
          </div>
        )}

        {saveStatus === "saved" && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle size={18} />
            Saved
          </div>
        )}

        {saveStatus === "error" && (
          <div className="flex items-center gap-2 text-danger">
            <AlertCircle size={18} />
            Save Failed
          </div>
        )}
      </div>
    </header>
  );
}

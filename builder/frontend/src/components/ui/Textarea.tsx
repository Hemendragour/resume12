// import type { TextareaHTMLAttributes } from "react";

// interface Props
//   extends TextareaHTMLAttributes<HTMLTextAreaElement> {
//   label?: string;
//   error?: string;
// }

// export default function Textarea({
//   label,
//   error,
//   className = "",
//   ...props
// }: Props) {
//   return (
//     <div className="space-y-1">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700">
//           {label}
//         </label>
//       )}

//       <textarea
//         {...props}
//         className={`w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
//       />

//       {error && (
//         <p className="text-sm text-red-500">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// Textarea.tsx
import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  ...props
}: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-dark">{label}</label>
      )}

      <textarea
        {...props}
        className={`w-full rounded-lg border border-primary/15 bg-card px-3 py-2 text-dark outline-none placeholder:text-primary/40 focus:border-accent focus:ring-2 focus:ring-accent/20 ${className}`}
      />

      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

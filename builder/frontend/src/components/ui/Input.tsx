// import type { InputHTMLAttributes, ReactNode } from "react";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;

//   error?: string;

//   leftIcon?: ReactNode;

//   rightIcon?: ReactNode;

//   required?: boolean;
// }

// export default function Input({
//   label,

//   error,

//   leftIcon,

//   rightIcon,

//   required,

//   className = "",

//   ...props
// }: InputProps) {
//   return (
//     <div className="space-y-2">
//       {label && (
//         <label className="block text-sm font-semibold text-slate-700">
//           {label}

//           {required && <span className="ml-1 text-red-500">*</span>}
//         </label>
//       )}

//       <div
//         className={`flex h-12 items-center rounded-xl border bg-white px-4 transition

//         ${
//           error
//             ? "border-red-500"
//             : "border-slate-300 focus-within:border-blue-600"
//         }`}
//       >
//         {leftIcon && <div className="mr-3 text-slate-400">{leftIcon}</div>}

//         <input
//           className={`flex-1 bg-transparent outline-none placeholder:text-slate-400 ${className}`}
//           {...props}
//         />

//         {rightIcon && <div className="ml-3 text-slate-400">{rightIcon}</div>}
//       </div>

//       {error && <p className="text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }

// Input.tsx
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  required?: boolean;
}

export default function Input({
  label,

  error,

  leftIcon,

  rightIcon,

  required,

  className = "",

  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-dark">
          {label}

          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <div
        className={`flex h-12 items-center rounded-xl border bg-card px-4 transition

        ${
          error
            ? "border-danger"
            : "border-primary/15 focus-within:border-accent"
        }`}
      >
        {leftIcon && <div className="mr-3 text-primary/50">{leftIcon}</div>}

        <input
          className={`flex-1 bg-transparent text-dark outline-none placeholder:text-primary/40 ${className}`}
          {...props}
        />

        {rightIcon && <div className="ml-3 text-primary/50">{rightIcon}</div>}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

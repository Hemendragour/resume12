import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: Variant;

  size?: Size;

  loading?: boolean;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-background hover:bg-dark",

  secondary: "bg-dark text-white hover:bg-primary",

  outline: "border border-primary/15 bg-card text-dark hover:bg-background",

  danger: "bg-danger text-white hover:opacity-90",

  ghost: "text-dark hover:bg-background",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",

  md: "h-11 px-5",

  lg: "h-12 px-6 text-base",
};

export default function Button({
  children,

  variant = "primary",

  size = "md",

  loading = false,

  fullWidth = false,

  leftIcon,

  rightIcon,

  className = "",

  disabled,

  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-xl
      font-semibold
      transition-all
      duration-200
      disabled:cursor-not-allowed
      disabled:opacity-60
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? "w-full" : ""}
      ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity=".2"
            />

            <path
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </button>
  );
}

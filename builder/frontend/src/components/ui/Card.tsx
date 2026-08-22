// Card.tsx
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
       
      rounded-2xl
      border
      border-primary/10
      bg-card
      shadow-sm
      transition-all
      duration-200
      hover:shadow-lg
      ${className}
      `}
    >
      {children}
    </div>
  );
}

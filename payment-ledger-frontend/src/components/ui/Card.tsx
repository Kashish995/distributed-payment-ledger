import { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
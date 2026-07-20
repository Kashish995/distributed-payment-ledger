import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm",

  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-900",

  outline:
    "border border-slate-300 bg-white hover:bg-slate-50 text-slate-900",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  ghost:
    "hover:bg-slate-100 text-slate-700"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",

  md: "h-11 px-5 text-sm",

  lg: "h-12 px-7 text-base"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
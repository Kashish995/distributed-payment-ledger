import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ label, error, className, id, children, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm",
          "transition-all duration-200",
          "focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
          "disabled:cursor-not-allowed disabled:bg-slate-100",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";
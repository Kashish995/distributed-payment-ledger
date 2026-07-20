import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  action
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
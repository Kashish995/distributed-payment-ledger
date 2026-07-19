import Card from "../common/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <Card className="p-6 transition-shadow duration-300 hover:shadow-lg">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">
          {title}
        </h3>

        <p className="text-3xl font-bold text-slate-900">
          {value}
        </p>

        {subtitle && (
          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}
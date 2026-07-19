interface ErrorStateProps {
  message: string;
}

export default function ErrorState({
  message,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <p className="text-red-700 font-medium">
        {message}
      </p>
    </div>
  );
}
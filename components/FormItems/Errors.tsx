export function Errors({ errors }: { errors: string[] }) {
  if (errors.length == 0) return null;

  return (
    <div className="space-y-1">
      {errors.map((e, idx) => (
        <p key={e + idx} className="text-xs text-red-500">
          {e}
        </p>
      ))}
    </div>
  );
}

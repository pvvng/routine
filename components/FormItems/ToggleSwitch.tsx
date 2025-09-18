interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
          checked ? "bg-emerald-500" : "bg-neutral-300",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

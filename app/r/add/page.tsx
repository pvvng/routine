"use client";

import { ColorInput, DayToggleGroup } from "@/components/FormItems";

export default function AddRoutine() {
  return (
    <div className="p-10">
      <DayToggleGroup
        disabledDays={["금"]}
        onToggle={() => {}}
        errors={["에러메시지"]}
      />
      <ColorInput
        label="색상 인풋"
        value={"#fffffff"}
        onChange={() => {}}
        errors={["에러메시지"]}
      />
    </div>
  );
}

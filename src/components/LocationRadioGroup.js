"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LocationRadioGroup({ value, onChange, locations }) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="w-full flex flex-wrap justify-center gap-4 mt-4"
    >
      {locations.map((location) => (
        <div key={location}>
          <RadioGroupItem
            value={location}
            id={location}
            className="peer hidden"
          />
          <Label
            htmlFor={location}
            className={cn(
              "w-full  inline-flex items-center justify-center px-4 py-4 rounded-full border border-accent cursor-pointer transition-all",
              value === location
                ? "bg-accent text-white"
                : "bg-primary text-accent hover:bg-accent hover:text-white"
            )}
          >
            {location}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

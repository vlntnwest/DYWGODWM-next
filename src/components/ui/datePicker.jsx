"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Button } from "./button";

export function DateTimePicker24h({ onChange }) {
  const [date, setDate] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) return;
    const existing = date ?? new Date();
    const updated = new Date(selectedDate);
    updated.setHours(existing.getHours());
    updated.setMinutes(existing.getMinutes());
    setDate(updated);
    onChange?.(updated);
  };

  const handleTimeChange = (type, value) => {
    if (!date) return;
    const updated = new Date(date);
    if (type === "hour") {
      updated.setHours(parseInt(value));
    } else {
      updated.setMinutes(parseInt(value));
    }
    setDate(updated);
    onChange?.(updated);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full max-w-[400px] justify-start text-left font-normal bg-primary text-accent rounded-xl hover:text-primary",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyyy HH:mm")
          ) : (
            <span>Sélectionne une date</span>
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-auto p-4 bg-primary text-foreground shadow-lg rounded-xl">
        <div className="hidden">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <div className="sm:flex gap-4">
          <Calendar
            mode="single"
            selected={
              date
                ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
                : undefined
            }
            onSelect={handleDateSelect}
            initialFocus
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
            classNames={{
              day_selected: "bg-accent text-primary", // ← For extra safety
              day_today: "border border-accent",
            }}
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x mt-4 sm:mt-0 text-accent">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() === hour ? "fancy" : "ghost"
                    }
                    className="sm:w-full aspect-square text-sm rounded-full"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? "fancy" : "ghost"
                    }
                    className="sm:w-full aspect-square text-sm rounded-full"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className={"text-accent font-champ shadow-none"}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

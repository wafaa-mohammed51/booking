import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, X } from "lucide-react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface BookingDatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function BookingDatePicker({
  selectedDate,
  onDateChange,
}: BookingDatePickerProps) {
  const [open, setOpen] = useState(false);

  const label = selectedDate
    ? `${DAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`
    : "Select date";

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className="h-11 px-4 rounded-xl gap-2.5 min-w-[220px] justify-between"
        >
          <CalendarIcon className="size-4" />
          <span>{label}</span>
          <ChevronDown
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>

        {selectedDate && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDateChange(undefined)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl border border-border-secondary bg-card shadow-lg">
          <Calendar
            mode="single"
            defaultMonth={selectedDate ?? new Date()}
            selected={selectedDate}
            onSelect={(d) => {
              onDateChange(d);
              if (d) setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

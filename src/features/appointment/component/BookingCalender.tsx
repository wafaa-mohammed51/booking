import { useState } from "react";
import {
  addDays,
  format,
  isSameDay,
  isBefore,
  isAfter,
  startOfToday,
} from "date-fns";
import {
  CalendarDays,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAvailableSlots } from "@/features/appointment/hooks/useAvailableSlots";

interface BookingCalenderProps {
  doctorId?: string;
  isBooking?: boolean;
  onBook?: (selection: { date: Date; time: string }) => void;
}

const BookingCalender = ({
  doctorId,
  isBooking,
  onBook,
}: BookingCalenderProps) => {
  const today = startOfToday();

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  // First day shown in the 7-day strip; paged by the arrows / date picker.
  const [weekStart, setWeekStart] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  // Slots come pre-formatted ("07:00 AM") from the API, per selected day.
  const { data, isLoading } = useAvailableSlots(doctorId, selectedDate);
  const slots = data?.data ?? [];

  // Derived (not stored): keep a valid selection as the day/slots change.
  const effectiveTime = slots.includes(selectedTime)
    ? selectedTime
    : (slots[0] ?? "");

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const monthLabel = format(weekStart, "MMMM, yyyy");
  const summary = effectiveTime
    ? `${format(selectedDate, "EEEE, MMMM d")} - ${effectiveTime}`
    : format(selectedDate, "EEEE, MMMM d");

  // Can't book the past: don't let the strip page before today's week.
  const canGoPrev = isAfter(weekStart, today);
  const goPrev = () => {
    const prev = addDays(weekStart, -7);
    setWeekStart(isBefore(prev, today) ? today : prev);
  };
  const goNext = () => setWeekStart(addDays(weekStart, 7));

  const handlePickDate = (date?: Date) => {
    if (!date) return;
    setSelectedDate(date);
    setWeekStart(date); // bring the chosen day to the front of the strip
    setPickerOpen(false);
  };

  return (
    <section className="shadow-main rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-secondary pb-4">
        <h2 className="text-text-h font-semibold">Choose date and time</h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            className="text-text-h flex items-center gap-2 text-sm"
          >
            <CalendarDays className="size-4 text-text" />
            {monthLabel}
            <ChevronsUpDown className="size-4 text-text" />
          </button>

          {pickerOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 rounded-2xl border border-border-secondary bg-card shadow-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                onSelect={handlePickDate}
                disabled={{ before: today }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Day strip with week paging */}
      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous week"
          className="grid size-8 shrink-0 place-items-center rounded-full text-text transition-colors hover:bg-Auth-bg disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="grid flex-1 grid-cols-4 gap-3 sm:grid-cols-7">
          {days.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isPast = isBefore(day, today);
            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border py-2.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  isSelected
                    ? "border-brand bg-brand text-white"
                    : "border-border-secondary text-text hover:border-brand/40",
                )}
              >
                <span className="text-xs">{format(day, "EEE")}</span>
                <span
                  className={cn(
                    "text-base font-semibold",
                    isSelected ? "text-white" : "text-text-h",
                  )}
                >
                  {format(day, "d")}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next week"
          className="grid size-8 shrink-0 place-items-center rounded-full text-text transition-colors hover:bg-Auth-bg"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Time slots */}
      <div className="mt-5 flex flex-wrap gap-3">
        {isLoading ? (
          <p className="text-text text-sm">Loading available times…</p>
        ) : slots.length === 0 ? (
          <p className="text-text text-sm">No available times for this day.</p>
        ) : (
          slots.map((label) => {
            const isSelected = label === effectiveTime;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedTime(label)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm transition-colors",
                  isSelected
                    ? "border-brand bg-brand text-white"
                    : "border-border-secondary text-text hover:border-brand/40",
                )}
              >
                {label}
              </button>
            );
          })
        )}
      </div>

      {/* Footer: summary + book */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border-secondary pt-4">
        <span className="text-text-h flex items-center gap-2 text-sm font-medium">
          <CalendarDays className="size-4 text-brand" />
          {summary}
        </span>
        <Button
          variant="outline"
          disabled={!effectiveTime || isBooking}
          isLoading={isBooking}
          className="border-brand px-8 text-brand hover:bg-brand hover:text-white"
          onClick={() => onBook?.({ date: selectedDate, time: effectiveTime })}
        >
          Book
        </Button>
      </div>
    </section>
  );
};

export default BookingCalender;

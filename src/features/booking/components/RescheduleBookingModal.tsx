import { useState } from "react";
import { format } from "date-fns";
import { CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import type { Booking, ReschedulePayload } from "../types";

interface RescheduleBookingModalProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (payload: ReschedulePayload) => void;
  isLoading: boolean;
}

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

export default function RescheduleBookingModal({
  booking,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: RescheduleBookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    const payload: ReschedulePayload = {
      appointment_date: format(selectedDate, "yyyy-MM-dd"),
      appointment_time: selectedTime,
    };
    onConfirm(payload);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset selections when closing
      setSelectedDate(undefined);
      setSelectedTime("");
    }
    onOpenChange(isOpen);
  };

  const isValid = !!selectedDate && !!selectedTime;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/10 mb-2">
            <CalendarClock className="size-6 text-brand" />
          </div>
          <DialogTitle className="text-center">
            Reschedule Booking
          </DialogTitle>
          <DialogDescription className="text-center">
            {booking
              ? `Choose a new date and time for your appointment with ${booking.doctor.name}.`
              : "Choose a new date and time for your appointment."}
          </DialogDescription>
        </DialogHeader>

        {/* Date picker */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            defaultMonth={new Date()}
          />
        </div>

        {/* Time picker */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            Select time
          </p>
          <div className="grid grid-cols-4 gap-2 max-h-[140px] overflow-y-auto pr-1">
            {TIME_SLOTS.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "brand" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter className="flex-row gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="brand"
            className="flex-1"
            onClick={handleConfirm}
            disabled={!isValid}
            isLoading={isLoading}
          >
            Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { CalendarX } from "lucide-react";

interface EmptyBookingsProps {
  message?: string;
}

export default function EmptyBookings({
  message = "No bookings found",
}: EmptyBookingsProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
        <CalendarX className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Your bookings will appear here once you schedule an appointment with a
        doctor.
      </p>
    </div>
  );
}

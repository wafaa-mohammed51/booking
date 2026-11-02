import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { Booking } from "../types";
import { Button } from "@/components/ui/button";

interface AppointmentCardProps {
  booking: Booking;
  onCancel?: (booking: Booking) => void;
  onReschedule?: (booking: Booking) => void;
}

const statusConfig: Record<
  string,
  { label: string; color: string }
> = {
  pending: { label: "Upcoming", color: "#2563EB" },
  confirmed: { label: "Upcoming", color: "#2563EB" },
  completed: { label: "Completed", color: "#16A34A" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
};

function formatBookingDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return format(date, "EEEE, MMMM d"); // "Monday, July 21"
  } catch {
    return isoDate;
  }
}

function formatBookingTime(isoTime: string): string {
  try {
    const date = new Date(isoTime);
    return format(date, "hh:mm a"); // "09:00 AM"
  } catch {
    return isoTime;
  }
}

/** Returns true for statuses treated as "upcoming" in the UI */
function isUpcomingStatus(status: string): boolean {
  return status === "pending" || status === "confirmed";
}

export default function AppointmentCard({
  booking,
  onCancel,
  onReschedule,
}: AppointmentCardProps) {
  const config = statusConfig[booking.status] ?? {
    label: booking.status,
    color: "#6B7280",
  };

  const dateLabel = formatBookingDate(booking.appointment_date);
  const timeLabel = formatBookingTime(booking.appointment_time);

  return (
    <div className="rounded-xl border border-border-secondary bg-card p-4 flex flex-col gap-3 transition-shadow hover:shadow-md">
      {/* Header: date + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Calendar className="size-4" />
          <span>
            {dateLabel} - {timeLabel}
          </span>
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      </div>

      {/* Doctor info */}
      <div className="flex items-center gap-3">
        <img
          src={booking.doctor.image}
          alt={booking.doctor.name}
          className="size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {booking.doctor.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {booking.doctor.specialty}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
        <MapPin className="size-4 text-brand" />
        <span>{booking.doctor.address}</span>
      </div>

      {/* Action buttons – dynamic per status */}
      <div className="flex items-center justify-between gap-3 mt-1">
        {isUpcomingStatus(booking.status) && (
          <>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => onCancel?.(booking)}
            >
              Cancel
            </Button>
            <Button
              variant="brand"
              size="lg"
              className="flex-1"
              onClick={() => onReschedule?.(booking)}
            >
              Reschedule
            </Button>
          </>
        )}

        {booking.status === "completed" && (
          <>
            <Button variant="outline" size="lg" className="flex-1">
              Book again
            </Button>
            <Button variant="brand" size="lg" className="flex-1">
              Feedback
            </Button>
          </>
        )}

        {booking.status === "cancelled" && (
          <>
            <Button variant="outline" size="lg" className="flex-1">
              Book again
            </Button>
            <Button variant="brand" size="lg" className="flex-1">
              Support
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

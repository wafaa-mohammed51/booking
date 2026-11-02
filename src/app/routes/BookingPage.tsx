import { useState, useMemo } from "react";
import { isSameDay } from "date-fns";
import { useBookings } from "@/features/booking/hooks/useBookings";
import { useCancelBooking } from "@/features/booking/hooks/useCancelBooking";
import { useRescheduleBooking } from "@/features/booking/hooks/useRescheduleBooking";
import AppointmentCard from "@/features/booking/components/AppointmentCard";
import AppointmentFilters from "@/features/booking/components/AppointmentFilters";
import BookingDatePicker from "@/features/booking/components/BookingDatePicker";
import CancelBookingModal from "@/features/booking/components/CancelBookingModal";
import RescheduleBookingModal from "@/features/booking/components/RescheduleBookingModal";
import BookingCardSkeleton from "@/features/booking/components/BookingCardSkeleton";
import EmptyBookings from "@/features/booking/components/EmptyBookings";
import type {
  Booking,
  BookingFilterTab,
  ReschedulePayload,
} from "@/features/booking/types";

export default function BookingPage() {
  // ── State ──────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState<BookingFilterTab>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(
    null,
  );

  // ── Data fetching ──────────────────────────────
  const { data: bookings, isLoading, isError } = useBookings();
  const cancelMutation = useCancelBooking();
  const rescheduleMutation = useRescheduleBooking();

  // ── Filtering ──────────────────────────────────
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.filter((b) => {
      // Status filter – "pending" and "confirmed" both show under the "Upcoming" tab
      if (activeFilter !== "all") {
        if (activeFilter === "pending") {
          // The "Upcoming" tab should show both pending and confirmed
          if (b.status !== "pending" && b.status !== "confirmed") return false;
        } else if (b.status !== activeFilter) {
          return false;
        }
      }

      // Date filter
      if (selectedDate) {
        const bookingDate = new Date(b.appointment_date);
        if (!isSameDay(bookingDate, selectedDate)) return false;
      }

      return true;
    });
  }, [bookings, activeFilter, selectedDate]);

  // ── Handlers ───────────────────────────────────
  const handleCancelConfirm = () => {
    if (!cancelTarget) return;
    cancelMutation.mutate(cancelTarget.id, {
      onSuccess: () => setCancelTarget(null),
    });
  };

  const handleRescheduleConfirm = (payload: ReschedulePayload) => {
    if (!rescheduleTarget) return;
    rescheduleMutation.mutate(
      { bookingId: rescheduleTarget.id, payload },
      { onSuccess: () => setRescheduleTarget(null) },
    );
  };

  // ── Render ─────────────────────────────────────
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-8">
      {/* Header row */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-foreground">
            Your appointments
          </h1>
          <AppointmentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
        <BookingDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-destructive font-medium mb-1">
            Something went wrong
          </p>
          <p className="text-sm text-muted-foreground">
            We couldn't load your bookings. Please try again later.
          </p>
        </div>
      )}

      {/* Booking cards */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filteredBookings.length === 0 ? (
            <EmptyBookings
              message={
                selectedDate
                  ? "No bookings on this date"
                  : "No bookings found"
              }
            />
          ) : (
            filteredBookings.map((booking) => (
              <AppointmentCard
                key={booking.id}
                booking={booking}
                onCancel={setCancelTarget}
                onReschedule={setRescheduleTarget}
              />
            ))
          )}
        </div>
      )}

      {/* Cancel modal */}
      <CancelBookingModal
        booking={cancelTarget}
        open={!!cancelTarget}
        onOpenChange={(open) => {
          if (!open) setCancelTarget(null);
        }}
        onConfirm={handleCancelConfirm}
        isLoading={cancelMutation.isPending}
      />

      {/* Reschedule modal */}
      <RescheduleBookingModal
        booking={rescheduleTarget}
        open={!!rescheduleTarget}
        onOpenChange={(open) => {
          if (!open) setRescheduleTarget(null);
        }}
        onConfirm={handleRescheduleConfirm}
        isLoading={rescheduleMutation.isPending}
      />
    </section>
  );
}

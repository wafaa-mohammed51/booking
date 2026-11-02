import { AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Booking } from "../types";

interface CancelBookingModalProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

function formatDate(iso: string) {
  try {
    return format(new Date(iso), "EEEE, MMMM d, yyyy");
  } catch {
    return iso;
  }
}

function formatTime(iso: string) {
  try {
    return format(new Date(iso), "hh:mm a");
  } catch {
    return iso;
  }
}

export default function CancelBookingModal({
  booking,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: CancelBookingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">
            Cancel Booking
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {booking && (
          <div className="rounded-lg border border-border-secondary bg-muted/40 p-3 flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <img
                src={booking.doctor.image}
                alt={booking.doctor.name}
                className="size-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-foreground">
                  {booking.doctor.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {booking.doctor.specialty}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-1">
              {formatDate(booking.appointment_date)} at{" "}
              {formatTime(booking.appointment_time)}
            </p>
          </div>
        )}

        <DialogFooter className="flex-row gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Go Back
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Yes, Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import StarRating from "@/features/appointment/component/StarRating";
import ReviewForm from "@/features/appointment/component/ReviewForm";
import { usePostRating } from "@/features/appointment/hooks/useRatings";

interface ReviewsToolBarProps {
  rating: number;
  reviewsCount: number;
  doctorId?: string;
  /** A rating is tied to a completed booking; without it we can't submit. */
  bookingId?: string;
}

const ReviewsToolBar = ({
  rating,
  reviewsCount,
  doctorId,
  bookingId,
}: ReviewsToolBarProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: postRating, isPending } = usePostRating();

  const handleSubmit = (review: { rating: number; text: string }) => {
    if (!doctorId || !bookingId) {
      toast.error("You can review a doctor after a completed appointment.");
      setOpen(false);
      return;
    }

    postRating(
      {
        booking_id: bookingId,
        doctor_id: doctorId,
        rating: review.rating,
        comment: review.text,
      },
      {
        onSuccess: () => {
          toast.success("Thanks! Your review has been submitted.");
          setOpen(false);
        },
        onError: (error) =>
          toast.error(getApiErrorMessage(error, "Could not submit your review.")),
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Title + add review */}
      <div className="flex items-center justify-between">
        <h2 className="text-text-h text-lg font-semibold">Reviews and Rating</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-brand hover:underline">
            <SquarePen className="size-4" />
            add review
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="sr-only">Add your review</DialogTitle>
            </DialogHeader>
            <ReviewForm onSubmit={handleSubmit} isSubmitting={isPending} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Rating summary */}
      <div className="flex items-end justify-between">
        <p className="text-text-h text-4xl font-bold">
          {rating.toFixed(1)}
          <span className="text-text text-xl font-medium">/5</span>
        </p>
        <div className="flex flex-col items-end gap-1">
          <StarRating value={rating} sizeClassName="size-5" />
          <span className="text-text text-sm">
            {reviewsCount.toLocaleString()}+ Reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewsToolBar;

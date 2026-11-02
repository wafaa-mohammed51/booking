import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/features/appointment/component/StarRating";

interface ReviewFormProps {
  onSubmit?: (review: { rating: number; text: string }) => void;
  isSubmitting?: boolean;
}

const ReviewForm = ({ onSubmit, isSubmitting }: ReviewFormProps) => {
  const [rating, setRating] = useState(4);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ rating, text });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Rate */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-text-h font-semibold">Your Rate</h3>
          <span className="text-text-h text-2xl font-semibold">
            {rating}
            <span className="text-text text-lg">/5</span>
          </span>
        </div>
        <StarRating
          value={rating}
          onChange={setRating}
          sizeClassName="size-8"
          className="mt-3 gap-2"
        />
      </div>

      {/* Review text */}
      <div>
        <h3 className="text-text-h mb-3 font-semibold">Your review</h3>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review"
          className="min-h-40 rounded-xl"
        />
      </div>

      <Button
        type="submit"
        variant="brand"
        size="xl"
        fullWidth
        isLoading={isSubmitting}
      >
        Send your review
      </Button>
    </form>
  );
};

export default ReviewForm;

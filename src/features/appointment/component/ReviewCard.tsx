import StarRating from "@/features/appointment/component/StarRating";
import type { Review } from "@/features/appointment/types/appointment";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <article className="rounded-2xl border border-border-secondary p-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.author}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-text-h text-sm font-semibold">
              {review.author}
            </h4>
            <p className="text-text text-xs">{review.timeAgo}</p>
          </div>
        </div>

        <span className="flex items-center gap-1 rounded-md bg-[#FEF9E7] px-2 py-1 text-xs font-semibold text-[#B7950B]">
          <StarRating value={1} max={1} sizeClassName="size-3.5" />
          {review.rating.toFixed(1)}
        </span>
      </header>

      <p className="text-text mt-3 text-sm leading-relaxed">{review.text}</p>
    </article>
  );
};

export default ReviewCard;

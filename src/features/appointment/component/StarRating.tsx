import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** Current rating value (supports halves like 4.5 in read-only mode). */
  value: number;
  max?: number;
  /** Provide to make the stars interactive (whole-number selection). */
  onChange?: (value: number) => void;
  /** Tailwind size class for each star, e.g. "size-5". */
  sizeClassName?: string;
  className?: string;
}

const FILLED = "fill-[#F9E000] text-[#F9E000]";
const EMPTY = "fill-[#e4e4e7] text-[#e4e4e7]";

/**
 * Read-only when no `onChange` is passed (renders half stars for values like 4.5);
 * interactive when `onChange` is passed (click a star to set a whole rating).
 */
const StarRating = ({
  value,
  max = 5,
  onChange,
  sizeClassName = "size-5",
  className,
}: StarRatingProps) => {
  const interactive = typeof onChange === "function";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }, (_, i) => {
        const position = i + 1;
        const isFull = value >= position;
        const isHalf = !isFull && value >= position - 0.5;

        const StarIcon = isHalf ? StarHalf : Star;
        const iconClasses = cn(
          sizeClassName,
          isFull || isHalf ? FILLED : EMPTY,
        );

        if (!interactive) {
          return <StarIcon key={position} className={iconClasses} />;
        }

        return (
          <button
            key={position}
            type="button"
            onClick={() => onChange(position)}
            aria-label={`Rate ${position} out of ${max}`}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                sizeClassName,
                value >= position ? FILLED : EMPTY,
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

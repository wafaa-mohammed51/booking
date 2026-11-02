import { cva } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";

export default function EditProfileInput({
  title,
  Icon,
  type = "text",
  className = "",
  errorMSG,
  ...props
}: {
  title: string;
  Icon?: LucideIcon;
  type?: string;
  errorMSG?: string;
  className?: string;
}) {
  const classVariants = cva(
    "rounded-lg border border-border  px-3 py-2 flex w-full ",
    {
      variants: {
        class: {
          error: "border-red-600",
          noError: "border-ring",
        },
      },
      defaultVariants: { class: "noError" },
    }
  );
  return (
    <div className={`space-y-1 ${className}`}>
      <div>
        <label className="text-sm text-black" htmlFor={title}>
          {title}
        </label>
      </div>

      <div
        id={title}
        className={classVariants({ class: errorMSG ? "error" : "noError" })}
      >
        <div className="flex items-center gap-3 w-full">
          {Icon && (
            <Icon
              size={20}
              className="color-ring"
              strokeWidth={2}
              absoluteStrokeWidth
            />
          )}

          <input
            {...props}
            className="w-full outline-none"
            placeholder={title}
            type={type}
          />
        </div>
      </div>
      {errorMSG && (
        <p className="text-red-500 text-sm w-full mb-2">{errorMSG}</p>
      )}
    </div>
  );
}

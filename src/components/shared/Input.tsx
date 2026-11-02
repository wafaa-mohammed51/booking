import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  label?: string;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      containerClassName,
      label,
      error,
      startAdornment,
      endAdornment,
      id,
      type,
      ...props
    },
    ref,
  ) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    // Swap to a text input while revealed, so the characters show.
    const inputType = isPassword && showPassword ? "text" : type;

    // Password fields get an eye toggle for free — unless the caller
    // supplied its own trailing element.
    const trailing =
      endAdornment ??
      (isPassword ? (
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="flex h-full items-center px-4 text-text transition-colors hover:text-text-h"
        >
          {showPassword ? (
            <Eye className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </button>
      ) : null);

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-text-h"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex h-12 w-full items-center overflow-hidden rounded-lg border border-border-secondary bg-(--bg) transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20",
            error &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
          )}
        >
          {startAdornment}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "h-full w-full flex-1 bg-transparent px-4 text-sm text-text-h placeholder:text-text outline-none",
              startAdornment && "pl-3",
              trailing && "pr-0",
              className,
            )}
            {...props}
          />
          {trailing}
        </div>

        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

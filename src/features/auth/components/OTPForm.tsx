import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  otpSchema,
  CODE_LENGTH,
  type OtpFormValues,
} from "@/features/auth/schemas/auth.schema";
import { useVerifyOtp } from "@/features/auth/hooks/useVerifyOtp";
import { useVerifyResetOtp } from "@/features/auth/hooks/useVerifyResetOtp";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";

const RESEND_SECONDS = 55;

// "signup" verifies a new account; "reset" exchanges the OTP for a reset_token.
type OtpFlow = "signup" | "reset";

const slotBase =
  "size-14 rounded-xl border bg-(--Auth-bg) text-xl font-semibold text-text-h " +
  "first:rounded-xl last:rounded-xl transition-all data-[active=true]:ring-2 data-[active=true]:bg-(--bg)";

export default function OTPVerifyForm({ flow = "signup" }: { flow?: OtpFlow }) {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as { phone?: string })?.phone ?? "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const signupVerify = useVerifyOtp();
  const resetVerify = useVerifyResetOtp();
  const {
    mutate: verifyOtp,
    isPending: isVerifying,
    isError: isWrongCode,
    reset,
  } = flow === "reset" ? resetVerify : signupVerify;
  const { mutate: resendOtp } = useResendOtp();

  const restartPath = flow === "reset" ? "/forget-password" : "/sign-in";

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const onSubmit = ({ code }: OtpFormValues) => verifyOtp({ phone, otp: code });

  const handleResend = () => {
    reset();
    setSecondsLeft(RESEND_SECONDS);
    resendOtp({ phone });
  };

  const slotClasses = cn(
    slotBase,
    isWrongCode
      ? "border-red-400 ring-1 ring-red-400 data-[active=true]:ring-red-500"
      : "border-border-secondary data-[active=true]:ring-brand",
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col items-center gap-4"
    >
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={CODE_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={field.value}
            onChange={(value) => {
              if (isWrongCode) reset();
              field.onChange(value);
            }}
            onBlur={field.onBlur}
            autoFocus
          >
            <InputOTPGroup className="gap-3">
              {Array.from({ length: CODE_LENGTH }, (_, i) => (
                <InputOTPSlot key={i} index={i} className={slotClasses} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      {(errors.code || isWrongCode) && (
        <p className="text-sm font-medium text-red-500">
          {isWrongCode ? "Wrong code" : errors.code?.message}
        </p>
      )}

      {secondsLeft > 0 && !isWrongCode ? (
        <p className="text-sm text-text">
          Resend code in <span className="text-brand">{secondsLeft}</span> s
        </p>
      ) : (
        <p className="flex items-center gap-2 text-sm text-text">
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-brand hover:underline"
          >
            Resend
          </button>
          <span>Or</span>
          <button
            type="button"
            onClick={() => navigate(restartPath)}
            className="font-medium text-brand hover:underline"
          >
            Enter another phone number
          </button>
        </p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="xl"
        fullWidth
        isLoading={isVerifying}
        className="mt-2"
      >
        Verify
      </Button>
    </form>
  );
}

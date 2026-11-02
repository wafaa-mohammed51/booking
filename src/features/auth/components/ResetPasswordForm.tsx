import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/shared/Input";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/auth.schema";
import useResetPassword from "../hooks/useResetPassword";
import { Navigate, useLocation } from "react-router-dom";
const ResetPasswordForm = () => {
  const location = useLocation();
  const { phone, reset_token } =
    (location.state as { phone?: string; reset_token?: string }) ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", password_confirmation: "" },
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  if (!phone || !reset_token) return <Navigate to="/forget-password" replace />;

  const onSubmit = ({
    password,
    password_confirmation,
  }: ResetPasswordFormValues) => {
    resetPassword({ phone, reset_token, password, password_confirmation });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-5"
    >
      <Input
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your new password"
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
      />

      <Button
        type="submit"
        variant="brand"
        size="xl"
        fullWidth
        isLoading={isPending}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

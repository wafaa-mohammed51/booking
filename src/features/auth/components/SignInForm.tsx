import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneField } from "@/features/auth/components/PhoneField";
import { Input } from "@/components/shared/Input";
import {
  signInSchema,
  type SignInFormValues,
} from "@/features/auth/schemas/auth.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";
import AuthSwitchPrompt from "./AuthSwitchPrompt";

const SignInForm = () => {
  const location = useLocation();
  // Coming back from sign-up/OTP verification the router passes the phone the
  // user just verified — prefill it so they don't retype it.
  const verifiedPhone = (location.state as { phone?: string })?.phone ?? "";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: verifiedPhone, password: "", remember: false },
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: SignInFormValues) => mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-5"
    >
      <Controller
        name="identifier"
        control={control}
        render={({ field, fieldState }) => (
          <PhoneField {...field} error={fieldState.error?.message} />
        )}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Remember me — keeps the session alive after the browser closes */}
      <Controller
        name="remember"
        control={control}
        render={({ field }) => (
          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-text">
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
            Remember me
          </label>
        )}
      />
      <AuthSwitchPrompt
        question="Forget password?"
        linkText="Reset Password"
        to="/forget-password"
        center={false}
        mt={0}
      />

      <Button
        type="submit"
        variant="brand"
        size="xl"
        fullWidth
        isLoading={isPending}
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { PhoneField } from "@/features/auth/components/PhoneField";
import { Input } from "@/components/shared/Input";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/features/auth/schemas/auth.schema";
import { useSignUp } from "@/features/auth/hooks/useSignUp";

const SignUpForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate, isPending } = useSignUp();

  // Toast + navigation to /otp-verify live inside useSignUp.
  const onSubmit = (data: SignUpFormValues) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
      <Input
        label="Full Name"
        placeholder="Full Name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Controller
        name="phone"
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
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
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
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;

import AuthHeader from "@/features/auth/components/AuthHeader";
import ForgetPasswordForm from "@/features/auth/components/ForgetPasswordForm";
export default function ForgetPasswordPage() {
  return (
    <>
      <AuthHeader
        title="Forget password?"
        text="Please Enter your phone number"
      />
      <ForgetPasswordForm />
    </>
  );
}

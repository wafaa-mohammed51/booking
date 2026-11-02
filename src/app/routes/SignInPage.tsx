import SignInForm from "@/features/auth/components/SignInForm";
import GoogleBtn from "@/features/auth/components/GoogleBtn";
import OrLine from "@/features/auth/components/OrLine";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthSwitchPrompt from "@/features/auth/components/AuthSwitchPrompt";

export default function SignInPage() {
  return (
    <>
      <AuthHeader
        title="Sign in"
        text="Please enter your phone number or email"
      />
      <SignInForm />
      <OrLine />
      <GoogleBtn text="signin_with" />

      <AuthSwitchPrompt
        question="Don't have an account?"
        linkText="Sign up"
        to="/sign-up"
      />
    </>
  );
}

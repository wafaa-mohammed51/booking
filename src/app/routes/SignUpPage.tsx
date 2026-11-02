import SignUpForm from "@/features/auth/components/SignUpForm";
import GoogleBtn from "@/features/auth/components/GoogleBtn";
import OrLine from "@/features/auth/components/OrLine";
import AuthHeader from "@/features/auth/components/AuthHeader";
import AuthSwitchPrompt from "@/features/auth/components/AuthSwitchPrompt";
export default function SignUpPage() {
  return (
    <>
      <AuthHeader
        title="Sign up"
        text="Please provide all information required to create your account"
      />
      <SignUpForm />
      <OrLine />
      <GoogleBtn text="signup_with" />

      <AuthSwitchPrompt
        question="Already have an account?"
        linkText="Sign in"
        to="/sign-in"
      />
    </>
  );
}

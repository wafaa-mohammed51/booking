import AuthHeader from "@/features/auth/components/AuthHeader";
import OTPVerifyForm from "@/features/auth/components/OTPForm";

const ResetOtpVerifyPage = () => {
  return (
    <>
      <AuthHeader
        title="Code Verification"
        text="Enter the code sent to your phone to reset your password"
      />
      <OTPVerifyForm flow="reset" />
    </>
  );
};

export default ResetOtpVerifyPage;

import AuthHeader from "@/features/auth/components/AuthHeader";
import OTPVerifyForm from "@/features/auth/components/OTPForm";

const OTPVerifyPage = () => {
  return (
    <>
      <AuthHeader
        title="Code Verification"
        text="Code has been sent to your phone number"
        btn={{ text: "Check your phone number", onClick: () => {} }}
      />
      <OTPVerifyForm />;
    </>
  );
};

export default OTPVerifyPage;

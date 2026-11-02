import React from "react";
import AuthHeader from "@/features/auth/components/AuthHeader";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
const ResetPasswordPage = () => {
  return (
    <>
      <AuthHeader title="Reset Password" text="Please enter new password" />
      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;

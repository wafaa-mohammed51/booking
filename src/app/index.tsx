import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/features/home/HomePage";
import SignInPage from "@/app/routes/SignInPage";
import SignUpPage from "@/app/routes/SignUpPage";
import OTPVerifyPage from "@/app/routes/OTPVerifyPage";
import ChooseSpecialistPage from "@/features/chooseSpecialist/components/ChooseSpecialistPage";
import AuthLayout from "@/components/layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePageLayout from "@/components/layout/ProfilePageLayout";
import ProfilePersonalPage from "./routes/ProfilePersonalPage";
import ProfilePasswordPage from "./routes/ProfilePasswordPage";
import BookingPage from "./routes/BookingPage";
import ContactUsPage from "@/features/contactUs/ContactUs";
import AppointmentPage from "./routes/AppointmentPage";
import ForgetPasswordPage from "./routes/ForgetPasswordPage";
import ResetOtpVerifyPage from "./routes/ResetOtpVerifyPage";
import ResetPasswordPage from "./routes/ResetPasswordPage";
import PolicyPage from "./routes/PolicyPage";
import NotFoundPage, {
  RouteErrorPage,
} from "./routes/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/otp-verify", element: <OTPVerifyPage /> },
      { path: "/forget-password", element: <ForgetPasswordPage /> },
      { path: "/verify-reset-otp", element: <ResetOtpVerifyPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      // Public pages
      { path: "/", element: <HomePage /> },
      { path: "/contact-us", element: <ContactUsPage /> },
      // Real destinations for the footer "Privacy Policy" / "Terms" links.
      { path: "/privacy-policy", element: <PolicyPage policy="privacy" /> },
      { path: "/terms-of-service", element: <PolicyPage policy="terms" /> },

      // Protected pages — redirect to /sign-in without a token
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/appointment/:doctorId", element: <AppointmentPage /> },
          { path: "/booking", element: <BookingPage /> },
          { path: "/choose-specialist", element: <ChooseSpecialistPage /> },
          {
            path: "/profile",
            element: <ProfilePageLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="info" replace />,
              },
              { path: "info", element: <ProfilePersonalPage /> },
              { path: "password", element: <ProfilePasswordPage /> },
            ],
          },
        ],
      },

      // Any other URL is a 404, not a blank router error page.
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

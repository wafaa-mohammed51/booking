import { Outlet } from "react-router-dom";
import logo from "@/assets/logo.png";
import waveFill from "@/assets/auth-wave-fill.png";
import waveLine from "@/assets/auth-wave-line.png";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-(--bg)">
      <img
        src={logo}
        alt="Logo"
        className="absolute left-8 top-8 z-10 h-9 w-9"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
      >
        <img
          src={waveFill}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        <img
          src={waveLine}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-8 lg:justify-start lg:py-12 lg:pl-[12%] lg:pr-0">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

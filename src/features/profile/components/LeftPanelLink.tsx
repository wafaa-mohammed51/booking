import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LeftPanelLink({
  title,
  Icon,
  variant,
}: {
  title: "Personal information" | "Password Management";
  Icon: LucideIcon;
  variant?: "info" | "password";
}) {
  return (
    <NavLink
      to={variant}
      className={({ isActive }) =>
        `w-full py-3 px-3 rounded-lg border flex items-center gap-2 ${
          isActive ? "border-brand" : "border-transparent"
        }`
      }
    >
      {/*Icon  */}
      <Icon color="#000000" />
      <p className="text-black">{title}</p>
    </NavLink>
  );
}

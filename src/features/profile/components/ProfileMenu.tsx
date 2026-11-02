import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useClickOutside } from "../hooks/ProfileMenuToggle";
import { getProfile } from "../services/getUser";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  Banknote,
  ChevronRight,
  Heart,
  LockKeyhole,
  MapPin,
  Settings,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LogoutButton from "./LogoutButton";

import ProfileImage from "./ProfileImage";
import profileImageFallback from "@/assets/profile-image.jpg";

/** Links whose real destination doesn't exist yet get honest feedback instead
 *  of navigating to dead "#" routes. */
const notifyComingSoon = (what: string) => () =>
  toast.info(`${what} — coming soon.`, { position: "top-center" });

export default function ProfileIconMenu({ imageUrl }: { imageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  // Plain useQuery (not useSuspenseQuery): this menu lives in the shared Nav,
  // so a failed profile request must not throw and take the whole page down.
  // It shares the ["profile"] cache with the profile pages.
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  const links: {
    title: string;
    Icon: LucideIcon;
    onClick: () => void;
  }[] = [
    { title: "Payment Method", Icon: Banknote, onClick: notifyComingSoon("Payment methods") },
    { title: "Favorite", Icon: Heart, onClick: notifyComingSoon("Favorites") },
    { title: "Settings", Icon: Settings, onClick: () => navigate("/profile") },
    { title: "Privacy and Policy", Icon: LockKeyhole, onClick: () => navigate("/privacy-policy") },
  ];

  // Close on outside click
  useClickOutside<HTMLDivElement>(menuRef, closeMenu);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="focus:outline-none cursor-pointer"
      >
        <ProfileImage imageUrl={imageUrl || profileImageFallback} className="w-10 h-10" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="md:absolute md:right-0 fixed z-50 md:mt-2 md:w-70 md:rounded-xl md:py-4  h-screen md:h-fit md:inset-auto inset-0 bg-grey shadow-lg space-y-2 py-8 px-5">
          {/*close mob menu button */}
          <div className="w-full flex justify-end md:hidden ">
            <button
              type="button"
              className=" text-text-h text-sm font-light capitalize py-2 px-3 bg-Auth-bg rounded-lg block md:hidden w-fit cursor-pointer"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          {/*profile image name and settings */}
          <div className=" flex justify-between items-center py-2 ">
            <div className="flex items-center gap-2.5">
              <ProfileImage imageUrl={imageUrl || profileImageFallback} className="w-15 h-15" />
              <div className="">
                <h1 className="text-lg text-black">
                  {user?.name ?? authUser?.name ?? "Profile"}
                </h1>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <p className="text-xs">{user?.address ?? ""}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Open profile settings"
              onClick={() => {
                closeMenu();
                navigate("/profile");
              }}
              className="cursor-pointer"
            >
              <Settings color="blue" />
            </button>
          </div>
          {/*profile menu links */}
          {links.map(({ title, Icon, onClick }, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                closeMenu();
                onClick();
              }}
              className="w-full flex items-center justify-between cursor-pointer text-left"
            >
              <div className="flex items-center">
                <Icon color="#000000" />
                <span className="block px-4 py-2 text-black">{title}</span>
              </div>
              <ChevronRight color="#000000" />
            </button>
          ))}
          <LogoutButton />
        </div>
      )}
    </div>
  );
}

import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/ProfileMenuToggle";
import { Bell } from "lucide-react";
import NotificationCard from "./NotificationCard";

const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "Upcoming Appointment",
    message:
      "Reminder: You have an appointment with Dr. Emily Walker tomorrow at 10:00 AM.",
    time: "1h",
  },
  {
    id: 2,
    type: "success",
    title: "Appointment completed",
    message:
      "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "3h",
  },
  {
    id: 3,
    type: "cancelled",
    title: "Appointment Cancelled",
    message:
      "You have successfully cancelled your appointment with Dr. David Patel.",
    time: "4h",
  },
  {
    id: 4,
    type: "success",
    title: "Payment Received",
    message: "Your payment has been successfully processed.",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "success",
    title: "Payment Received",
    message: "Your payment has been successfully processed.",
    time: "Yesterday",
  },
];

export default function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close on outside click
  useClickOutside<HTMLDivElement>(menuRef, () => setIsOpen(false));

  return (
    <div
      className="relative text-text-h text-sm font-light capitalize py-2 px-3 bg-grey rounded-lg w-fit cursor-pointer hidden md:block"
      onClick={toggleMenu}
      ref={menuRef}
    >
      {/* Bell icon */}
      <div className="focus:outline-none cursor-pointer flex items-center justify-center">
        <Bell />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="md:absolute md:right-0 fixed z-50 md:w-150 md:mt-4 md:rounded-xl md:h-fit h-screen md:inset-auto inset-0 bg-grey shadow-lg space-y-2 ">
          <div className="max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg ">
            <div className="bg-gray-50 py-4 text-center">
              <h1 className="text-xl font-semibold text-slate-900">
                Your Notification
              </h1>
            </div>
            <div className="py-4">
              <div className="max-h-78.5  overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-lg font-medium text-gray-500">
                      You have no notifications.
                    </p>
                  </div>
                ) : (
                  <>
                    {notifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        {...notification}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

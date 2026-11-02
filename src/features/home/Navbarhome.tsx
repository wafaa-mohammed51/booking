import {
  X,
  Bell,
  Heart,
  Settings,
  CreditCard,
  Heart as HeartIcon,
  Shield,
  LogOut,
  ChevronRight,
  MapPin,
  Menu,
} from "lucide-react";
import SearchBar from "./searchBar";
import img from "../../assets/nav.jpg";
import imgg from "../../assets/Logo.png";

import { useState, useRef, useEffect } from "react";

export default function Navbarhome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mainContainer py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#">
              <img src={imgg} className="w-9 h-9" alt="logo" />
            </a>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">
            <ul className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <li>
                <a
                  href="#"
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition"
                >
                  home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition"
                >
                  booking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition"
                >
                  chat
                </a>
              </li>
            </ul>

            <X className="w-5 h-5 text-gray-500 cursor-pointer hidden md:block" />
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer hidden md:block" />

            <div
              onClick={() => setIsSidebarOpen(true)}
              className="size-9 rounded-full cursor-pointer overflow-hidden border-2 border-gray-200"
            >
              <img src={img} className="size-full object-cover" alt="profile" />
            </div>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* الـ Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6">
          <div className="flex items-center gap-4 pb-6 border-b">
            <img
              src={img}
              className="w-14 h-14 rounded-full object-cover"
              alt="profile"
            />
            <div className="flex-1">
              <p className="font-bold text-xl text-gray-900">Seif Mohamed</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> 129,El-Nasr Street, Cairo
              </p>
            </div>
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>

          <ul className="mt-6 space-y-2">
            {[
              { icon: CreditCard, label: "Payment Method" },
              { icon: HeartIcon, label: "Favorite" },
              { icon: Settings, label: "Settings" },
              { icon: Shield, label: "Privacy Policy" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 group"
                >
                  <span className="flex items-center gap-4 text-gray-700 font-medium">
                    <item.icon className="w-5 h-5" /> {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="border-t mt-6 pt-6">
            <a
              href="#"
              className="flex items-center gap-4 p-3 rounded-xl text-red-500 font-medium hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" /> Log out
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

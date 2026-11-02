import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className }: { className?: string }) {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }
  return (
    <div className={cn(`w-full flex items-center cursor-pointer`, className)}>
      <LogOut color="#ff0000" className="-rotate-180" />
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-red-500 "
      >
        Logout
      </button>
    </div>
  );
}

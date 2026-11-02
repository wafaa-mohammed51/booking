import { Clock3, Check, CalendarX2 } from "lucide-react";

const icons = {
  reminder: {
    icon: Clock3,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  success: {
    icon: Check,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  cancelled: {
    icon: CalendarX2,
    bg: "bg-red-100",
    text: "text-red-500",
  },
};

export default function NotificationCard({
  title,
  message,
  time,
  type,
  id,
}: {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "reminder" | "success" | "cancelled";
}) {
  const { icon: Icon, bg, text } = icons[type];

  return (
    <div className="flex items-start justify-between bg-white px-4 py-2">
      <div className="flex gap-4">
        <div
          className={`flex h-15 w-15 items-center justify-center rounded-full ${bg}`}
        >
          <Icon className={`h-5 w-5 ${text}`} strokeWidth={1.8} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-500">
            {message}
          </p>
        </div>
      </div>

      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

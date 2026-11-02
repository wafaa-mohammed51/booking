import { Button } from "@/components/ui/button";
import type { BookingFilterTab } from "../types";

interface AppointmentFiltersProps {
  activeFilter: BookingFilterTab;
  onFilterChange: (filter: BookingFilterTab) => void;
}

const tabs: { label: string; value: BookingFilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AppointmentFilters({
  activeFilter,
  onFilterChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => (
        <Button
          variant="brand"
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={` ${activeFilter === tab.value
            ? "bg-brand text-white"
            : "bg-transparent text-muted-foreground "
            }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

import { MapPin } from "lucide-react";

export default function NameAndAddress({
  name,
  address,
}: {
  name: string;
  address?: string;
}) {
  return (
    <div className="text-center">
      <h1 className="text-lg text-black">{name}</h1>
      <div className="flex items-center gap-1">
        <MapPin className="h-3 w-3" />
        <p className="text-sm">{address}</p>
      </div>
    </div>
  );
}

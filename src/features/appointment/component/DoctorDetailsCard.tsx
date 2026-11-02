import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import patientsIcon from "@/assets/icons/profile-2user.svg";
import experienceIcon from "@/assets/icons/medal.svg";
import ratingIcon from "@/assets/icons/star.svg";
import reviewsIcon from "@/assets/icons/messages.svg";
import Map from "@/features/appointment/component/Map";
import type { Doctor } from "@/features/appointment/types/appointment";

interface DoctorDetailsCardProps {
  doctor: Doctor;
}

const DoctorDetailsCard = ({ doctor }: DoctorDetailsCardProps) => {
  const stats = [
    { icon: patientsIcon, label: "patients", value: doctor.patients },
    { icon: experienceIcon, label: "experience", value: doctor.experience },
    { icon: ratingIcon, label: "rating", value: doctor.rating.toFixed(1) },
    {
      icon: reviewsIcon,
      label: "reviews",
      value: doctor.reviewsCount.toLocaleString(),
    },
  ];

  return (
    <aside className="shadow-main rounded-2xl p-6">
      {/* Top actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Add to favorites"
          className="grid size-9 place-items-center rounded-full bg-Auth-bg text-text transition-colors hover:text-brand"
        >
          <Heart className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Message doctor"
          className="grid size-9 place-items-center rounded-full bg-Auth-bg text-text transition-colors hover:text-brand"
        >
          <MessageCircle className="size-5" />
        </button>
      </div>

      {/* Identity */}
      <div className="-mt-2 flex flex-col items-center text-center">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="size-24 rounded-full object-cover"
        />
        <div className="mt-3 flex items-center gap-1.5">
          <h3 className="text-text-h text-lg font-semibold">{doctor.name}</h3>
          {doctor.verified && (
            <BadgeCheck className="size-5 fill-brand text-white" />
          )}
        </div>
        <p className="text-text text-sm">{doctor.specialty}</p>
      </div>

      {/* Stats */}
      <ul className="mt-6 flex items-center justify-between">
        {stats.map(({ icon, label, value }) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="grid size-11 place-items-center rounded-full bg-Auth-bg">
              <img src={icon} alt="" className="size-5" />
            </span>
            <span className="text-text-h text-sm font-semibold">{value}</span>
            <span className="text-text text-xs">{label}</span>
          </li>
        ))}
      </ul>

      {/* About */}
      <div className="mt-6">
        <h4 className="text-text-h font-semibold">About me</h4>
        <p className="text-text mt-2 text-sm leading-relaxed">
          {doctor.about}{" "}
          <button
            type="button"
            className="cursor-pointer font-medium text-brand hover:underline"
          >
            Read more
          </button>
        </p>
      </div>

      {/* Location */}
      <div className="mt-6">
        <h4 className="text-text-h font-semibold">Location</h4>
        <div className="mt-3 overflow-hidden rounded-xl border border-border-secondary">
          <div className="h-40 w-full">
            <Map
              lat={doctor.location.lat}
              lng={doctor.location.lng}
              address={doctor.location.address}
            />
          </div>
          <p className="text-text flex items-center gap-2 px-3 py-2 text-xs">
            {doctor.location.address}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DoctorDetailsCard;

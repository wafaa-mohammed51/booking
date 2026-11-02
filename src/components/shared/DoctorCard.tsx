import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getRatingValue,
  getSpecialtyName,
  type Specialist,
} from "@/features/chooseSpecialist/api/handleSpecialistsData";
import doctorAvatar from "@/assets/doctor-avatar.png";

/**
 * A single specialist card on the "choose specialist" page.
 * It renders the real values returned by the API — when a field is missing,
 * it shows a neutral dash instead of pretending there is data.
 */
const DoctorCard = ({ specialist }: { specialist: Specialist }) => {
  const specialty = getSpecialtyName(specialist.specialty);
  const rating = getRatingValue(specialist.rating);
  const price = specialist.consultation_price ?? specialist.price;
  const subtitle = [specialty, specialist.hospital].filter(Boolean).join(" | ");

  return (
    <section className="shadow-main rounded-lg p-5">
      {/* Doctor Info */}
      <section>
        <section className="flex items-center gap-4">
          {/* ProfileImage */}
          <img
            src={specialist.image || doctorAvatar}
            className="size-21 rounded-lg"
            alt={specialist.name ? `${specialist.name} image` : "DoctorCardImage"}
          />
          {/*=== ProfileImage ===*/}
          <section className="space-y-1">
            <h5 className="text-text-h font-semibold capitalize">
              {specialist.name ?? "Unnamed specialist"}
            </h5>
            {subtitle && (
              <p className="text-text font-light text-md">{subtitle}</p>
            )}
            {(rating !== undefined || specialist.address) && (
              <p className="flex items-center gap-3">
                {rating !== undefined && (
                  <span className="flex items-center gap-2">
                    <Star className="text-[#F9E000]" />
                    <span>{rating}</span>
                  </span>
                )}
                {specialist.address && (
                  <span className="flex items-center gap-2">
                    <Clock className="text-[#6D7379]" />
                    <span className="text-text-h">{specialist.address}</span>
                  </span>
                )}
              </p>
            )}
          </section>
        </section>
        {/* Price Info */}
        <section className="py-4 flex justify-between flex-wrap">
          <span className="text-text-h">
            Price<span className="text-text/80 font-light text-sm">/hour</span>
          </span>
          <span className="text-[#FC4B4E]">{price !== undefined ? `$${price}` : "—"}</span>
        </section>
        {/*===== Price Info =====*/}

        {/* Booking Button */}
        {specialist.id ? (
          <Button
            variant="brand"
            asChild
            className="capitalize cursor-pointer py-5 px-7! text-white w-full text-md font-semibold hover:text-[#ddd] duration-300"
          >
            <Link to={`/appointment/${specialist.id}`}>Book appointment</Link>
          </Button>
        ) : (
          <Button
            variant="brand"
            disabled
            className="capitalize py-5 px-7! text-white w-full text-md font-semibold opacity-60"
          >
            Book appointment
          </Button>
        )}
        {/*====== Booking Button ======*/}
      </section>
      {/*===== Doctor Info =====*/}
    </section>
  );
};

export default DoctorCard;

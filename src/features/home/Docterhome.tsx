import "./docterhome.css";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTopRatedDoctor } from "./hooks/useGetTopRatedDoctors";
import { getRequestFailureReason, getApiErrorMessage } from "@/features/auth/utils/apiError";
import { getRatingValue } from "@/features/chooseSpecialist/api/handleSpecialistsData";
import doctorAvatar from "../../assets/doctor-avatar.png";

const Docterhome = () => {
  const navigate = useNavigate();
  const { data: doctors, isLoading, isError, isFetching, refetch, error } = useGetTopRatedDoctor();

  const specialtyLabel = (specialty: unknown): string => {
    if (!specialty) return "";
    if (typeof specialty === "string") return specialty;
    if (typeof specialty === "object" && "name" in specialty) {
      return String((specialty as { name?: string }).name ?? "");
    }
    return "";
  };

  return (
    <section className="topDoctors">
      <div className="topDoctors__header">
        <div>
          <span className="sectionTag">Doctors</span>
          <h2>Top-Rated Doctors <br /> Chosen by Patients</h2>
          <p>Browse highly reviewed specialists trusted by thousands of patients for exceptional care and professional expertise.</p>
        </div>
        <button type="button" style={{ background: "#fff", color: "#555", border: "1.5px solid #2563eb" }} className="viewAllBtn" onClick={() => navigate("/choose-specialist")}>
          View All <ArrowRight size={18} />
        </button>
      </div>

      {isLoading && <p role="status" className="text-center text-gray-500 py-10">Loading doctors…</p>}
      {isError && (
        <div className="text-center py-10" role="alert" aria-live="polite">
          <p className="text-gray-500 mb-1">We couldn't load the top-rated doctors right now.</p>
          <p className="text-sm text-gray-400 mb-4">
            {getRequestFailureReason(error) ?? getApiErrorMessage(error, "Please try again.")}
          </p>
          <button type="button" onClick={() => refetch()} disabled={isFetching} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 disabled:opacity-60 cursor-pointer">
            {isFetching ? "Retrying…" : "Try again"}
          </button>
        </div>
      )}
      {!isLoading && !isError && doctors?.length === 0 && (
        <p className="text-center text-gray-500 py-10">No doctors available at the moment.</p>
      )}

      <div className="doctorGrid">
        {(doctors ?? []).map((doctor) => {
          const subtitle = [specialtyLabel(doctor.specialty), doctor.hospital].filter(Boolean).join(" | ");
          const rating = getRatingValue(doctor.rating);
          return (
            <div className="doctorCard" key={doctor.id}>
              <div className="cardTop">
                <div className="doctorImage"><img src={doctor.image || doctorAvatar} alt={doctor.name || "doctor"} /></div>
                <div className="doctorDetails">
                  <h3>{doctor.name}</h3>
                  {subtitle && <span className="specialty">{subtitle}</span>}
                  <div className="doctorMeta">
                    <div className="rating"><Star fill="#FFC107" color="#FFC107" size={15} />{rating ?? "—"}</div>
                    {doctor.address && <div className="time"><MapPin size={14} />{doctor.address}</div>}
                  </div>
                </div>
              </div>
              <div className="priceRow"><span>Price/hour</span><h4>${doctor.consultation_price ?? doctor.price ?? "—"}</h4></div>
              <Link to={`/appointment/${doctor.id}`} className="w-full h-11.5 rounded-xl bg-blue-600 text-white text-[15px] font-semibold flex items-center justify-center">
                Book Appointment
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Docterhome;

import "./docterhome.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetTopRatedDoctor } from "./hooks/useGetTopRatedDoctors";
import { getRequestFailureReason, getApiErrorMessage } from "@/features/auth/utils/apiError";
import doctorAvatar from "../../assets/doctor-avatar.png";

const Docterhome = () => {
  const navigate = useNavigate();
  const { data: profiles, isLoading, isError, isFetching, refetch, error } = useGetTopRatedDoctor();

  return (
    <section className="topDoctors">
      <div className="topDoctors__header">
        <div>
          <span className="sectionTag">Demo profiles</span>
          <h2>Example profiles <br /> For demonstration</h2>
          <p>These fictional profiles are provided by Random User for display only. They are not verified doctors and cannot be booked.</p>
        </div>
        <button type="button" style={{ background: "#fff", color: "#555", border: "1.5px solid #2563eb" }} className="viewAllBtn" onClick={() => navigate("/choose-specialist")}>
          View All <ArrowRight size={18} />
        </button>
      </div>

      {isLoading && <p role="status" className="text-center text-gray-500 py-10">Loading demo profiles…</p>}
      {isError && (
        <div className="text-center py-10" role="alert" aria-live="polite">
          <p className="text-gray-500 mb-1">We couldn't load the demo profiles right now.</p>
          <p className="text-sm text-gray-400 mb-4">{getRequestFailureReason(error) ?? getApiErrorMessage(error, "Please try again.")}</p>
          <button type="button" onClick={() => refetch()} disabled={isFetching} className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 disabled:opacity-60 cursor-pointer">
            {isFetching ? "Retrying…" : "Try again"}
          </button>
        </div>
      )}
      {!isLoading && !isError && profiles?.length === 0 && <p className="text-center text-gray-500 py-10">No demo profiles available at the moment.</p>}

      <div className="doctorGrid">
        {(profiles ?? []).map((profile) => (
          <div className="doctorCard" key={profile.id}>
            <div className="cardTop">
              <div className="doctorImage"><img src={profile.image || doctorAvatar} alt={profile.name} /></div>
              <div className="doctorDetails">
                <h3>{profile.name}</h3>
                <span className="specialty">Fictional example profile</span>
              </div>
            </div>
            <div className="priceRow"><span>Display only</span><span>No booking available</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Docterhome;

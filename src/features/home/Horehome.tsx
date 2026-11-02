import img1 from '../../assets/h1.jpg'
import img2 from '../../assets/h2.jpg'
import img3 from '../../assets/nav.jpg'
import './Horehome.css'
import { Sparkles, Calendar } from "lucide-react";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router-dom";




export default function Horehome() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">

      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>

      <button
        type="button"
        className="left-badge cursor-pointer"
        onClick={() => navigate("/#find-care")}
        aria-label="Doctors near you — open the map"
      >
        <div className="badge-icon">
          <LuMapPin className="map-icon" />
        </div>
        <p>Doctors near you</p>
      </button>

      <button
        type="button"
        className="side-badge right-badge cursor-pointer"
        onClick={() => navigate("/choose-specialist")}
        aria-label="Book now — browse specialists"
      >
        <div className="badge-icon arrow-bg">
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span>Book Now</span>
      </button>

      <div className="hero-content">
        <div className="upgrade-badge">
          <Sparkles size={14} />
          <span>Upgrade your account</span>
        </div>

        <h1>Find and book top doctors near you</h1>

        <p>
          Easily find top-rated specialists near you and book appointments in
          just a few clicks. Whether you need an in-person visit consultation,
          we're here to connect you with the right care—fast, simple, and
          secure.
        </p>

        <div className="patients">
          <div className="avatars">
            <img src={img3} alt="patient" />
            <img src={img2} alt="patient" />
            <img src={img1} alt="patient" />
          </div>
          <span>10k+ happy patients</span>
        </div>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/choose-specialist")}>
            Get Started
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/choose-specialist")}
          >
            <Calendar size={20} />
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

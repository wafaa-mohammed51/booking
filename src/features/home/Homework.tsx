import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Homework.css";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { BsPaypal } from "react-icons/bs";
import { SiApplepay } from "react-icons/si";
import { FaCcVisa } from "react-icons/fa6";


const searchOptions = [
  "Find a Doctor",
  "Book an Appointment",
  "View Services",
  "Check Availability",
  "Contact Support",
];

const Homework: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [animation, setAnimation] = useState("slide-up");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("slide-up");
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % searchOptions.length);
        setAnimation("slide-down");
      }, 450);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const renderStars = () => (
    <div className="star-bg">
      {Array.from({ length: 35 }).map((_, i) => (
        <span key={i} className={`star ${(i + 3) % 5 === 0? "fill" : ""}`}>
          {(i + 3) % 5 === 0? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  const paymentCard = () => (
  <>
  <div className="payment-flow">
    
    <div className="payment-top">
      <svg
        className="payment-path"
        width="100%"
        height="100%"
        viewBox="0 0 337 162"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M22.75 0.75V33.25C22.75 36.5637 25.4363 39.25 28.75 39.25H330.25C333.564 39.25 336.25 41.9363 336.25 45.25V93.75C336.25 97.0637 333.564 99.75 330.25 99.75H6.75001C3.4363 99.75 0.75 102.436 0.75 105.75V155.25C0.75 158.564 3.43629 161.25 6.75 161.25H39.75"
          stroke="url(#paint0_linear)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="71.3293"
            y1="48.2785"
            x2="131.843"
            y2="178.309"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.09" stopColor="#76B0F0" />
            <stop offset="0.67" stopColor="#1877F2" />
            <stop offset="0.86" stopColor="#A3CBEF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="payment-item apple-item">
        <span className="payment-icon apple"><SiApplepay /></span>
        <span>Quick checkout with your Apple device</span>
      </div>

      <div className="payment-item visa-item">
        <span className="payment-icon visa"><FaCcVisa /></span>
        <span>Secure and fast card payments</span>
      </div>

      <div className="payment-item paypal-item">
        <span className="payment-icon paypal"><BsPaypal /></span>
        <span>Easy and safe with your PayPal account</span>
      </div>
    </div>

    <div className="payment-text">
      <h3 className="card-title">
         Book & Pay Online
      </h3>
      <p className="card-text">
        Confirm your appointment and pay securely using various payment 
        options—credit card.
      </p>
    </div>
    
  </div>

  </>

  
);
    
  

  return (
    <section className="homework" id="how-it-works">
      <div className="mainContainer">
        <h2 className="homework-title">How it works</h2>

        {/* Desktop */}
        <div className="desktop-cards">
          {/* Card 1 */}
          <div className="home-card">
            {renderStars()}
            <div className="search-box">
              <Search className="search-icon" />
              <div className="search-placeholder">
                <span key={currentText} className={`placeholder-text ${animation}`}>
                  {searchOptions[currentText]}
                </span>
              </div>
            </div>

            <div className="search-text">
        <h3 className="card-title">Search For a Doctor</h3>
            <p className="card-text">
              Browse through our network of trusted specialists and
              find the right doctor for your needs.
            </p>

            </div>
          
          </div>

          {/* Card 2 */}
          <div className="home-card">
            <div className="calendar">
              <div className="calendar-header">
                <ArrowLeft className="calendar-arrow" />
                <span className="calendar-month">July 2025</span>
                <ArrowRight className="calendar-arrow" />
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <span key={d} className="week-day">{d}</span>
                ))}
                {[9, 10, 11, 12, 13, 14].map((d) => (
                  <span key={d} className="day">{d}</span>
                ))}
                <span className="calendar-day">15</span>
              </div>
            </div>
       <div className="card">
            <h3 className="card-title">Choose a Date & Time</h3>
            <p className="card-text">
              View real-time availability and pick a slot that works
              best for your schedule.
            </p>


       </div>
            


          </div>

          {/* Card 3 */}
          <div className="home-card">{paymentCard()}</div>

        </div>




        {/* Mobile Slider */}
        <div className="mobile-slider">
          <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={1} pagination={{ clickable: true }}>
            <SwiperSlide>
              <div className="home-card">
                {renderStars()}
                <div className="search-box">
                  <Search className="search-icon" />
                  <div className="search-placeholder">
                    <span key={currentText} className={`placeholder-text ${animation}`}>
                      {searchOptions[currentText]}
                    </span>
                  </div>
                </div>
                <h3 className="card-title">Search For a Doctor</h3>
                <p className="card-text">
                  Browse through our network of trusted specialists and
                  find the right doctor for your needs.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="home-card">
                <div className="calendar">
                  <div className="calendar-header">
                    <ArrowLeft className="calendar-arrow" />
                    <span className="calendar-month">July 2025</span>
                    <ArrowRight className="calendar-arrow" />
                  </div>
                  <div className="calendar-grid">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <span key={d} className="week-day">{d}</span>
                    ))}
                    {[9, 10, 11, 12, 13, 14].map((d) => (
                      <span key={d} className="day">{d}</span>
                    ))}
                    <span className="calendar-day">15</span>
                  </div>
                </div>
                <span  className="card-bernt">
                <h3 className="card-title">Choose a Date & Time</h3>
                <p className="card-text">
                  View real-time availability and pick a slot that works
                  best for your schedule.
                </p>
          </span>

              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="home-card">{paymentCard()}</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Homework;
import "./Reviews.css";
import { Star } from "lucide-react";
import { useState } from "react";

import avatar1 from "../../assets/img1.jpg";
import avatar2 from "../../assets/img2.jpg";
import avatar3 from "../../assets/img3.jpg";
import avatar4 from "../../assets/img4.jpg";
import avatar5 from "../../assets/img5.jpg";

const reviews = [
  {
    id: 1,
    name: "Ahmed",
    image: avatar5,
    rating: 5,
    text: "Quick and easy booking! I found a great dermatologist near me and booked an appointment in just a few minutes."
  },
  {
    id: 2,
    name: "Sara",
    image: avatar4,
    rating: 5,
    text: "The best platform for finding doctors. The interface is clean and booking was super fast. Highly recommend!"
  },
  { 
  id: 3,
  name: "Mohamed",
  image: avatar3,
  rating: 5,
  text: "I got my appointment confirmed in 2 minutes. Customer support is amazing and doctors are very professional.",
  style: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid  #000",
  },
},
  {
    id: 4,
    name: "Nour",
    image: avatar2,
    rating: 5,
    text: "Loved how easy it was to compare doctors and read real reviews. Made my decision so much easier."
  },
  {
    id: 5,
    name: "Ali",
    image: avatar1,
    rating: 5,
    text: "Found the perfect specialist for my case. The whole process from search to booking was seamless."
  },
];

const Reviews = () => {
  const [active, setActive] = useState(2); // الوسطاني هو الاكتف

  return (
    <section className="reviewsSection">
      <h2 className="reviewsTitle">
        Reviews <br /> That Speak for Themselves
      </h2>

      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="#FFC107" color="#FFC107" size={22} />
        ))}
      </div>

      <p className="reviewText">“{reviews[active].text}”</p>

      <div className="avatarsWrapper">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`avatar ${index === active? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <img src={review.image} alt={review.name}  />

          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
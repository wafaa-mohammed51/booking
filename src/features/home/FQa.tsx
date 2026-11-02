import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import "./FAQ.css";

const faqData = [
  {
    question: "What is this app used for?",
    answer: "This app helps you find and book appointments with doctors near you. You can also read reviews and manage your medical records."
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, the app is completely free to download and use. You only pay for the doctor's consultation fees."
  },
  {
    question: "How can I find a doctor?",
    answer: "Use the search bar to search by specialty, doctor name, or location. You can also apply filters for rating and availability."
  },
  {
    question: "Can I cancel my appointment?",
    answer: "Yes you can. You can cancel or reschedule up to 24 hours before your appointment without any fees."
  },
  {
    question: "What payment are supported",
    answer: "We accept Cash, Credit/Debit Cards, Vodafone Cash, and all major e-wallets."
  },
  {
    question: "How do I edit my profile?",
    answer: "Go to Settings > Edit Profile. You can update your personal information and medical history anytime."
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqSection" id="faq">
      <div className="faqHeader">
        <span className="faqBadge">Frequently Asked Questions</span>
        <h2 className="faqTitle">Got Questions ? We’ve got Answers!</h2>
      </div>

      <div className="faqList">
        {faqData.map((item, index) => (
          <div key={index} className={`faqItem ${activeIndex === index ? "active" : ""}`}>
            <button className="faqQuestion" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <div className="faqAnswer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
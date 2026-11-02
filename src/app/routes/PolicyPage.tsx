import { useParams } from "react-router-dom";

/**
 * Privacy policy / Terms of service — short, honest pages so the footer links
 * (and the profile menu) land somewhere real instead of an empty "#" anchor.
 * The route path picks the page: /privacy-policy and /terms-of-service.
 */

const privacy = [
  {
    heading: "What we collect",
    text: "To let you book appointments we store the information you enter: your name, email address, phone number, and any personal details you add to your profile (address, birthday). This is the minimum the booking flow needs.",
  },
  {
    heading: "Who sees your data",
    text: "Your profile data is used by this app only. Doctors see the details needed to manage your appointment — nothing more.",
  },
  {
    heading: "Your choices",
    text: "You can update your personal information from the profile page at any time. Deleting your account removes your data from the service — contact us through the Contact Us page and we'll process it.",
  },
  {
    heading: "Contact",
    text: "Questions about privacy? Use the Contact Us page — messages go straight to the team's inbox.",
  },
] as const;

const terms = [
  {
    heading: "Using the service",
    text: "Cure is a booking platform: find specialists, check their availability, and reserve an appointment. The appointment is only confirmed once it appears as confirmed on your Bookings page.",
  },
  {
    heading: "Cancellations & rescheduling",
    text: "You can cancel or reschedule an upcoming booking from your Bookings page. Repeated no-shows or abuse of the booking system may lead to the account being suspended.",
  },
  {
    heading: "Payments",
    text: "Consultation prices are shown on every doctor card before you book. Any payment policy of the clinic applies on top of these terms.",
  },
  {
    heading: "Medical advice disclaimer",
    text: "The information in the app is provided by doctors and clinics. For medical emergencies, contact emergency services directly instead of booking online.",
  },
] as const;

const pages = {
  privacy: { title: "Privacy Policy", sections: privacy },
  terms: { title: "Terms & Conditions", sections: terms },
} as const;

type PolicyKey = keyof typeof pages;

export default function PolicyPage({
  policy = "privacy",
}: {
  policy?: PolicyKey;
}) {
  // Keep useParams available so overriding via URL is trivial in the future.
  const params = useParams();
  const key = (params.policy ?? policy) as PolicyKey;
  const page = pages[key] ?? pages.privacy;

  return (
    <section className="w-full max-w-[900px] mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-h mb-8">
        {page.title}
      </h1>
      <div className="space-y-8">
        {page.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-text-h mb-2">
              {section.heading}
            </h2>
            <p className="text-text text-sm leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>
      <p className="text-text/60 text-xs mt-12">Last updated: November 2026</p>
    </section>
  );
}

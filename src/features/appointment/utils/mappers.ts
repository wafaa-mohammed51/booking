import { formatDistanceToNow } from "date-fns";
import type {
  Doctor,
  Review,
  DoctorDetails,
  DoctorReview,
} from "@/features/appointment/types/appointment";

/** Map the raw API doctor payload into the UI's `Doctor` view-model. */
export const mapDoctorDetailsToDoctor = (d: DoctorDetails): Doctor => ({
  id: String(d.id),
  name: d.name,
  specialty: d.specialty?.name ?? "",
  avatar: d.image,
  // The API has no explicit "verified" flag; treat a certified doctor as verified.
  verified: (d.certificates?.length ?? 0) > 0,
  about: d.about,
  // NOTE: the API returns no patient count — see AppointmentPage flag.
  patients: "—",
  experience: `${d.experience_years}+`,
  rating: d.rating?.average ?? 0,
  reviewsCount: d.rating?.count ?? 0,
  location: {
    address: d.location.address,
    lat: d.location.latitude,
    lng: d.location.longitude,
  },
});

/** Map an API rating/review into the UI's `Review` card shape. */
export const mapDoctorReviewToReview = (r: DoctorReview): Review => ({
  id: String(r.id),
  author: r.patient?.name ?? "Anonymous",
  // The API doesn't return a patient avatar; derive a stable placeholder per user.
  avatar: `https://i.pravatar.cc/80?u=${r.patient?.id ?? r.id}`,
  timeAgo: r.date
    ? formatDistanceToNow(new Date(r.date), { addSuffix: true })
    : "",
  rating: r.rating,
  text: r.comment,
});

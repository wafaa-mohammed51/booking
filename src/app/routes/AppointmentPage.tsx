import { ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import BookingCalender from "@/features/appointment/component/BookingCalender";
import DoctorDetailsCard from "@/features/appointment/component/DoctorDetailsCard";
import ReviewsToolBar from "@/features/appointment/component/ReviewsToolBar";
import ReviewCard from "@/features/appointment/component/ReviewCard";
import { useDoctorDetails } from "@/features/appointment/hooks/useDoctorDetails";
import { useDoctorRatings } from "@/features/appointment/hooks/useRatings";
import { useCreateBooking } from "@/features/booking/hooks/useCreateBooking";
import { getApiErrorMessage } from "@/features/auth/utils/apiError";
import {
  mapDoctorDetailsToDoctor,
  mapDoctorReviewToReview,
} from "@/features/appointment/utils/mappers";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const { data, isLoading, isError, error } = useDoctorDetails(doctorId);
  const { data: ratingsData } = useDoctorRatings(doctorId);
  const { mutate: createBooking, isPending: isBooking } = useCreateBooking();

  if (isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-8 animate-spin text-brand" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-6 text-center">
        <div>
          <p className="text-text-h font-medium">Could not load this doctor.</p>
          {/* Surface the API's reason — e.g. an auth failure — instead of
              hiding it behind a generic message. */}
          <p className="text-text mt-2 text-sm">
            {getApiErrorMessage(error, "Please try again later.")}
          </p>
        </div>
      </div>
    );
  }

  const doctor = mapDoctorDetailsToDoctor(data.data);
  const reviews = (ratingsData?.data.ratings ?? []).map(mapDoctorReviewToReview);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-8">
      {/* Back header */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-text-h flex cursor-pointer items-center gap-2 font-semibold"
      >
        <ArrowLeft className="size-5" />
        Make an appointment
      </button>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <BookingCalender
            doctorId={doctorId}
            isBooking={isBooking}
            onBook={({ date, time }) =>
              createBooking(
                {
                  doctor_id: Number(doctorId),
                  appointment_date: format(date, "yyyy-MM-dd"),
                  appointment_time: time,
                  // TODO: expose a clinic/online selector; defaulting for now.
                  consultation_type: "clinic",
                },
                { onSuccess: () => navigate("/Booking") },
              )
            }
          />

          <div className="flex flex-col gap-5">
            <ReviewsToolBar
              rating={doctor.rating}
              reviewsCount={doctor.reviewsCount}
              doctorId={doctorId}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <DoctorDetailsCard doctor={doctor} />
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;

import LeftPanelLinks from "@/features/profile/components/LeftPanelLinks";
import NameAndAddress from "@/features/profile/components/NameAndAddress";
import ProfileImage from "@/features/profile/components/ProfileImage";
import { useGetProfile, PROFILE_QUERY_KEY } from "@/features/profile/hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage, getRequestFailureReason } from "@/features/auth/utils/apiError";

import { Camera } from "lucide-react";
import { Outlet } from "react-router-dom";
import profileImageFallback from "@/assets/profile-image.jpg";

export default function ProfilePageLayout() {
  // Plain useQuery + explicit loading/error states — a failed /profile request
  // shows this screen's reason + retry instead of crashing the whole route.
  const { data: user, isLoading, isError, error } = useGetProfile();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Spinner className="size-8 text-brand" aria-label="Loading profile" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="text-center max-w-sm space-y-3">
          <p className="text-text-h font-medium">
            We couldn't load your profile.
          </p>
          <p className="text-text text-sm">
            {getRequestFailureReason(error) ??
              getApiErrorMessage(error, "Please try again.")}
          </p>
          <Button
            variant="outline"
            className="cursor-pointer border-blue-600 text-blue-600"
            onClick={() => queryClient.refetchQueries({ queryKey: PROFILE_QUERY_KEY })}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full px-13 py-8">
      <div className=" md:flex md:gap-16 space-y-14.5">
        {/* left panel*/}
        <div className="md:bg-gray-200 rounded-xl space-y-7">
          <div className="md:mt-20 md:mx-18 mdd:mb-12 text-center flex flex-col justify-center items-center space-y-4 ">
            {/*Profile photo */}
            <div className="h-28.25 w-28.25 md:mx-[31.5px] relative ">
              <ProfileImage
                imageUrl={user.image || profileImageFallback}
                className="w-full h-full"
              />
              <div className="rounded-full bg-[#E6EFFF] w-8 h-8 absolute -right-1.5 bottom-1.5 z-1 flex justify-center items-center">
                <label className="cursor-pointer" htmlFor="image-upload">
                  <Camera color="#005AFB" className="m-auto h-6 w-6" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
              </div>
            </div>
            {/*name and address */}
            <NameAndAddress
              name={user.name}
              address={user.address || undefined}
            />
          </div>
          <div className="mx-8 mb-10 space-y-2 md:block ">
            {/*Left panel link*/}
            <LeftPanelLinks />
          </div>
        </div>
        {/*right panel */}
        <div className="w-full md:space-y-8 space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

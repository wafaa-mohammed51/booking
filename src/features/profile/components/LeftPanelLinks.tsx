import { LockKeyhole, UserRound } from "lucide-react";
import LeftPanelLink from "./LeftPanelLink";
import LogoutButton from "./LogoutButton";

export default function LeftPanelLinks() {
  return (
    <>
      <LeftPanelLink
        title="Personal information"
        Icon={UserRound}
        variant="info"
      />
      <LeftPanelLink
        title="Password Management"
        Icon={LockKeyhole}
        variant="password"
      />
      <LogoutButton className="px-4" />
    </>
  );
}

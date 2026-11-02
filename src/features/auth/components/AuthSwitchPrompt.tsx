import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Tailwind only generates classes it can find as complete strings in the source,
// so the spacing options have to be written out rather than built from `mt`.
const marginTop = {
  0: "mt-0",
  2: "mt-2",
  4: "mt-4",
  6: "mt-6",
  8: "mt-8",
} as const;

interface AuthSwitchPromptProps {
  question: string;
  linkText: string;
  to: string;
  center?: boolean;
  mt?: keyof typeof marginTop;
}

const AuthSwitchPrompt = ({
  question,
  linkText,
  to,
  center = true,
  mt = 6,
}: AuthSwitchPromptProps) => {
  return (
    <p
      className={cn(
        "text-sm text-text",
        marginTop[mt],
        center ? "text-center" : "text-left",
      )}
    >
      {question}{" "}
      <Link to={to} className="font-semibold text-brand hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthSwitchPrompt;

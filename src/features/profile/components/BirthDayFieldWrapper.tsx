import type React from "react";

export default function BirthDayFieldWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-gray-100 px-4 py-2 rounded-md">{children}</div>
  );
}

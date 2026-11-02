import type { UseFormRegisterReturn } from "react-hook-form";
import { days, months, years } from "../constants/constants";
import BirthDayFieldWrapper from "./BirthDayFieldWrapper";

export default function BirthDataPicker({
  register,
}: {
  register: UseFormRegisterReturn;
}) {
  return (
    <div className="space-y-1">
      <div>
        <label className="text-sm text-black">Your Birthday</label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <BirthDayFieldWrapper>
          <select className="w-full outline-none">
            {days.map((day) => (
              <option key={day} value={day} className="text-sm">
                {day}
              </option>
            ))}
          </select>
        </BirthDayFieldWrapper>
        <BirthDayFieldWrapper>
          <select className="w-full outline-none">
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </BirthDayFieldWrapper>
        <BirthDayFieldWrapper>
          <select className="w-full outline-none">
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </BirthDayFieldWrapper>
      </div>
    </div>
  );
}

import { useState, forwardRef } from "react";
import { Input } from "@/components/shared/Input";
import { type Country } from "@/features/auth/data/countries";
import {
  detectCountry,
  defaultCountry,
} from "@/features/auth/utils/CountryUtils";
import CountrySelect from "@/features/auth/components/CountrySelect";

type PhoneFieldProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  error?: string;
};

/**
 * One adaptive sign-in field:
 * - typing anything containing "@" switches it to an email input;
 * - otherwise it stays a phone field with the country selector.
 * Both keep the exact same visual container from the shared `Input`.
 */
export const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(
  function PhoneField({ value = "", onChange, onBlur, name, error }, ref) {
    const [selected, setSelected] = useState<Country>(defaultCountry);

    const isEmail = value.includes("@");
    const country = detectCountry(value) ?? selected;

    const handleSelect = (c: Country) => {
      setSelected(c);
      onChange?.(`+${c.dial} `);
    };

    if (isEmail) {
      return (
        <Input
          ref={ref}
          name={name}
          label="Email"
          type="email"
          inputMode="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={value}
          error={error}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
        />
      );
    }

    return (
      <Input
        ref={ref}
        name={name}
        label="Phone Number"
        type="tel"
        inputMode="tel"
        placeholder="Enter your number"
        autoComplete="tel"
        value={value}
        error={error}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        startAdornment={
          <CountrySelect country={country} onSelect={handleSelect} />
        }
      />
    );
  },
);

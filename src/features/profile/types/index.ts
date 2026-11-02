import type { EditProfileType } from "../schemas/profileSchema";

export interface ProfileLocation {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  phone_number: string;
  image: string | null;
  birth_date: string;
  gender: string;
  country: string;
  language: string;
  address: string | null;
  location: ProfileLocation;
  created_at: string;
  updated_at: string;
}

export type EditProfilePayload = Omit<
  EditProfileType,
  "birth_Day" | "birth_Month" | "birth_Year"
> & {
  birth_date: string;
  country: string;
  gender: string;
  language: string;
};

export type ValidationError = {
  message: string;
  errors: {
    phone?: string[];
    email?: string[];
    name?: string[];
    address?: string[];
  };
};

export type EditProfileResponse = {
  status: boolean;
  message: string;
  data: UserProfile;
};

export type PasswordValError = {
  success: boolean;
  message: string;
  errors: {
    current_password?: string[];
    password?: string[];
    password_confirmation?: string[];
    credentials?: string[];
  };
};

export type PasswordResponse = {
  success: boolean;
  message: string;
  data?: string[];
};

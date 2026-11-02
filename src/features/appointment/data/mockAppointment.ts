import type {
  Doctor,
  Review,
  DaySlot,
  TimeSlot,
} from "@/features/appointment/types/appointment";

export const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Jessica Turner",
  specialty: "Pulmonologist",
  avatar: "https://i.pravatar.cc/160?img=47",
  verified: true,
  about:
    "Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory conditions, from asthma to complex lung diseases.",
  patients: "2,000+",
  experience: "10+",
  rating: 4.5,
  reviewsCount: 1872,
  location: {
    address: "129 El-Nasr Street, Cairo, Egypt",
    lat: 30.0626,
    lng: 31.2497,
  },
};

export const mockReviews: Review[] = [
  {
    id: "r1",
    author: "Nabila Reyna",
    avatar: "https://i.pravatar.cc/80?img=45",
    timeAgo: "30 min ago",
    rating: 4.5,
    text: "Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!",
  },
  {
    id: "r2",
    author: "Ferry Ichsan A",
    avatar: "https://i.pravatar.cc/80?img=12",
    timeAgo: "A week ago",
    rating: 4.5,
    text: "Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!",
  },
  {
    id: "r3",
    author: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/80?img=32",
    timeAgo: "2 weeks ago",
    rating: 5,
    text: "A wonderful experience from start to finish. She explained everything clearly and answered all my questions with patience.",
  },
  {
    id: "r4",
    author: "Ahmed Hassan",
    avatar: "https://i.pravatar.cc/80?img=15",
    timeAgo: "1 month ago",
    rating: 4,
    text: "Very knowledgeable doctor. The wait time was a little long, but the care I received made it worth it.",
  },
];

export const mockDays: DaySlot[] = [
  { weekday: "Fri", day: 12, key: "2024-11-12" },
  { weekday: "Sat", day: 13, key: "2024-11-13" },
  { weekday: "Sun", day: 14, key: "2024-11-14" },
  { weekday: "Mon", day: 15, key: "2024-11-15" },
  { weekday: "Tue", day: 16, key: "2024-11-16" },
  { weekday: "Wed", day: 17, key: "2024-11-17" },
  { weekday: "Thu", day: 18, key: "2024-11-18" },
];

export const mockTimes: TimeSlot[] = [
  { label: "9:00 AM", available: true },
  { label: "10:00 AM", available: true },
  { label: "11:00 AM", available: true },
  { label: "12:30 AM", available: true },
  { label: "5:30 PM", available: true },
  { label: "7:00 PM", available: true },
  { label: "9:00 PM", available: true },
  { label: "10:00 PM", available: true },
];

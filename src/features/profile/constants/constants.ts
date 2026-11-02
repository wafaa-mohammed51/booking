export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

const currentYear = new Date().getFullYear();

export const years = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, i) => currentYear - i,
);

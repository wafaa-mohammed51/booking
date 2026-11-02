export const ratingKeys = {
  all: ["ratings"] as const,
  lists: () => [...ratingKeys.all, "list"] as const,
  detail: (id: number) => [...ratingKeys.all, "detail", id] as const,
};

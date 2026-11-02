// Homepage demo only: Random User produces fictional people, not doctors.
// This request intentionally uses fetch instead of the authenticated API client
// so application bearer tokens are never sent to the third-party service.
const DEMO_URL = "https://randomuser.me/api/?results=10&seed=clinic-demo&inc=name,gender,email,phone,picture";

export type DemoProfile = {
  id: string;
  name: string;
  image: string;
};

type RandomUser = {
  name?: { first?: unknown; last?: unknown };
  email?: unknown;
  picture?: { large?: unknown };
};

export async function getTopRatedDoctors(): Promise<DemoProfile[]> {
  const response = await fetch(DEMO_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("The demo profiles service is unavailable. Please try again.");
  const body: unknown = await response.json();
  if (!body || typeof body !== "object" || !("results" in body) || !Array.isArray(body.results)) {
    throw new Error("The demo profiles service returned an invalid response.");
  }
  return body.results.map((item: RandomUser, index: number) => {
    if (!item || typeof item !== "object" || typeof item.name?.first !== "string" || typeof item.name?.last !== "string") {
      throw new Error("The demo profiles service returned an invalid profile.");
    }
    return {
      id: typeof item.email === "string" ? `${item.email}-${index}` : String(index),
      name: `${item.name.first} ${item.name.last}`,
      image: typeof item.picture?.large === "string" ? item.picture.large : "",
    };
  });
}

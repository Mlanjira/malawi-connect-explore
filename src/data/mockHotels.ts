import hotel1 from "@/assets/hotels/hotel1.jpg";
import hotel2 from "@/assets/hotels/hotel2.jpg";
import hotel3 from "@/assets/hotels/hotel3.jpg";

export type InfraStatus = "good" | "average" | "poor";

export interface HotelInfra {
  road: InfraStatus;
  telecom: InfraStatus;
  power: InfraStatus;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  image: string;
  rating: number; // 0-5
  reviews: number;
  coords: [number, number]; // lng, lat
  infra: HotelInfra; // ML JSON driven in real app
}

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "Lakeview Boutique Resort",
    city: "Cape Maclear",
    image: hotel1,
    rating: 4.6,
    reviews: 182,
    coords: [34.835, -14.028],
    infra: { road: "average", telecom: "good", power: "average" },
  },
  {
    id: "h2",
    name: "Mkuzi Eco Lodge",
    city: "Salima",
    image: hotel2,
    rating: 4.3,
    reviews: 96,
    coords: [34.591, -13.757],
    infra: { road: "good", telecom: "average", power: "good" },
  },
  {
    id: "h3",
    name: "Lilongwe Grand Hotel",
    city: "Lilongwe",
    image: hotel3,
    rating: 4.8,
    reviews: 321,
    coords: [33.787, -13.963],
    infra: { road: "good", telecom: "good", power: "average" },
  },
];

export function statusColor(status: InfraStatus) {
  switch (status) {
    case "good":
      return "text-primary";
    case "average":
      return "text-accent";
    case "poor":
      return "text-destructive";
  }
}

export function pinColor(status: InfraStatus) {
  switch (status) {
    case "good":
      return "#1f8dd6"; // primary-ish
    case "average":
      return "#f2a93b"; // accent
    case "poor":
      return "#e45a5a"; // destructive
  }
}

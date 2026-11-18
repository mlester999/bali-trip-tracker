import type { Metadata } from "next";
import { ImmigrationItinerary } from "@/components/immigration-itinerary";

export const metadata: Metadata = {
  title: "Bali, Indonesia — Travel Itinerary | Our Bali Adventure 2026",
  description: "A printable travel itinerary for Bali, November 27 to December 1, 2026.",
};

export default function ItineraryPage() {
  return <ImmigrationItinerary />;
}

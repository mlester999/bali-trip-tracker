import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { TravelProvider } from "@/components/travel-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Bali Adventure 2026",
  description: "A personal Bali itinerary for November 27 to December 1, 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TravelProvider>
          <SiteHeader />
          {children}
        </TravelProvider>
      </body>
    </html>
  );
}

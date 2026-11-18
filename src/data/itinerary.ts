import type { ActivityGroup, ImmigrationDay, ItineraryDay } from "@/types/trip";

const group = (
  key: ActivityGroup["key"],
  label: string,
  activities: ActivityGroup["activities"],
): ActivityGroup => ({ key, label, activities });

export const TRIP_DAYS: ItineraryDay[] = [
  {
    id: "2026-11-27",
    isoDate: "2026-11-27",
    weekday: "Friday",
    monthShort: "NOV",
    dayOfMonth: "27",
    dayLabel: "Departure",
    title: "Departure from Manila",
    shortTitle: "Departure from Manila",
    accommodation: "Ubud",
    groups: [
      group("morning", "Morning", []),
      group("afternoon", "Afternoon", []),
      group("evening", "Evening", [
        { id: "2026-11-27-flight-to-bali", title: "Flight from Manila to Bali" },
      ]),
      group("overnight", "Overnight", [
        {
          id: "2026-11-27-arrival-airport",
          title: "Arrival at Ngurah Rai International Airport",
        },
        { id: "2026-11-27-transfer-ubud", title: "Airport transfer to Ubud" },
        { id: "2026-11-27-accommodation-ubud", title: "Hotel accommodation in Ubud" },
      ]),
    ],
  },
  {
    id: "2026-11-28",
    isoDate: "2026-11-28",
    weekday: "Saturday",
    monthShort: "NOV",
    dayOfMonth: "28",
    dayLabel: "Day 1",
    title: "Ubud Waterfalls & Cretya Infinity Pool",
    shortTitle: "Waterfalls & Cretya",
    accommodation: "Ubud",
    groups: [
      group("morning", "Morning", [
        {
          id: "2026-11-28-kanto-lampo",
          title: "Kanto Lampo Waterfall",
          mapsQuery: "Kanto Lampo Waterfall Bali",
        },
        {
          id: "2026-11-28-tibumana",
          title: "Tibumana Waterfall",
          mapsQuery: "Tibumana Waterfall Bali",
        },
      ]),
      group("afternoon", "Afternoon", [
        {
          id: "2026-11-28-alas-harum",
          title: "Alas Harum Bali Rice Terraces",
          mapsQuery: "Alas Harum Bali",
        },
        {
          id: "2026-11-28-cretya",
          title: "Cretya Ubud Infinity Pool",
          mapsQuery: "Cretya Ubud Bali",
        },
        {
          id: "2026-11-28-bali-swing",
          title: "Bali Swing",
          mapsQuery: "Bali Swing Ubud",
          optional: true,
        },
      ]),
      group("evening", "Evening", [
        { id: "2026-11-28-dinner-ubud", title: "Dinner and leisure in Ubud" },
      ]),
    ],
  },
  {
    id: "2026-11-29",
    isoDate: "2026-11-29",
    weekday: "Sunday",
    monthShort: "NOV",
    dayOfMonth: "29",
    dayLabel: "Day 2",
    title: "ATV Adventure & Ubud Exploration",
    shortTitle: "ATV & Ubud exploration",
    accommodation: "Ubud",
    groups: [
      group("morning", "Morning", [
        {
          id: "2026-11-29-atv",
          title: "Tandem ATV Adventure",
          mapsQuery: "Tandem ATV Adventure Ubud Bali",
        },
      ]),
      group("afternoon", "Afternoon", [
        {
          id: "2026-11-29-monkey-forest",
          title: "Sacred Monkey Forest Sanctuary",
          mapsQuery: "Sacred Monkey Forest Sanctuary Ubud",
        },
        {
          id: "2026-11-29-ubud-palace",
          title: "Ubud Palace",
          mapsQuery: "Ubud Palace Bali",
        },
        {
          id: "2026-11-29-ubud-market",
          title: "Ubud Traditional Market",
          mapsQuery: "Ubud Traditional Market Bali",
        },
        {
          id: "2026-11-29-cafes",
          title: "Café hopping in Ubud",
          mapsQuery: "cafes in Ubud Bali",
        },
      ]),
      group("evening", "Evening", [
        { id: "2026-11-29-dinner-ubud", title: "Dinner and leisure in Ubud" },
      ]),
    ],
  },
  {
    id: "2026-11-30",
    isoDate: "2026-11-30",
    weekday: "Monday",
    monthShort: "NOV",
    dayOfMonth: "30",
    dayLabel: "Day 3",
    title: "Nusa Penida West Tour & Seminyak",
    shortTitle: "Nusa Penida West Tour",
    accommodation: "Seminyak",
    groups: [
      group("morning", "Morning", [
        { id: "2026-11-30-ubud-sanur", title: "Travel from Ubud to Sanur Harbour" },
        { id: "2026-11-30-fast-boat-outbound", title: "Fast boat to Nusa Penida" },
        {
          id: "2026-11-30-kelingking",
          title: "Kelingking Beach Viewpoint",
          mapsQuery: "Kelingking Beach Viewpoint Nusa Penida",
        },
      ]),
      group("afternoon", "Afternoon", [
        {
          id: "2026-11-30-broken-beach",
          title: "Broken Beach",
          mapsQuery: "Broken Beach Nusa Penida",
        },
        {
          id: "2026-11-30-angels-billabong",
          title: "Angel's Billabong",
          mapsQuery: "Angel's Billabong Nusa Penida",
        },
        {
          id: "2026-11-30-crystal-bay",
          title: "Crystal Bay",
          mapsQuery: "Crystal Bay Nusa Penida",
        },
        { id: "2026-11-30-fast-boat-return", title: "Return fast boat to Sanur" },
        { id: "2026-11-30-transfer-seminyak", title: "Transfer directly to Seminyak" },
      ]),
      group("evening", "Evening", [
        { id: "2026-11-30-dinner-seminyak", title: "Dinner and leisure in Seminyak" },
      ]),
    ],
  },
  {
    id: "2026-12-01",
    isoDate: "2026-12-01",
    weekday: "Tuesday",
    monthShort: "DEC",
    dayOfMonth: "01",
    dayLabel: "Day 4",
    title: "Return to Manila",
    shortTitle: "Return to Manila",
    groups: [
      group("morning", "Morning", [
        {
          id: "2026-12-01-transfer-airport",
          title: "Early morning transfer from Seminyak to Ngurah Rai International Airport",
        },
        {
          id: "2026-12-01-flight-to-manila",
          title: "Flight back to Manila",
          detail: "Return flight departure: 8:35 AM",
        },
      ]),
      group("afternoon", "Afternoon", []),
      group("evening", "Evening", []),
    ],
  },
];

export const IMMIGRATION_DAYS: ImmigrationDay[] = [
  {
    id: "2026-11-27",
    date: "November 27, 2026",
    weekday: "Friday",
    details: [
      "Departure from Manila to Bali.",
      "On arrival at Ngurah Rai International Airport, transfer to Ubud for hotel accommodation.",
    ],
  },
  {
    id: "2026-11-28",
    date: "November 28, 2026",
    weekday: "Saturday",
    details: [
      "Kanto Lampo Waterfall, Tibumana Waterfall, Alas Harum Bali, and Cretya Ubud.",
      "Accommodation in Ubud.",
    ],
  },
  {
    id: "2026-11-29",
    date: "November 29, 2026",
    weekday: "Sunday",
    details: [
      "Tandem ATV Adventure, Sacred Monkey Forest Sanctuary, Ubud Palace, and Ubud Traditional Market.",
      "Accommodation in Ubud.",
    ],
  },
  {
    id: "2026-11-30",
    date: "November 30, 2026",
    weekday: "Monday",
    details: [
      "Travel from Ubud to Sanur Harbour and take a fast boat to Nusa Penida.",
      "Nusa Penida West Tour: Kelingking Beach Viewpoint, Broken Beach, Angel's Billabong, and Crystal Bay.",
      "Return to Sanur and transfer directly to Seminyak for evening leisure and accommodation.",
    ],
  },
  {
    id: "2026-12-01",
    date: "December 1, 2026",
    weekday: "Tuesday",
    details: [
      "Early morning transfer from Seminyak to Ngurah Rai International Airport.",
      "Flight back to Manila; return flight departure is at 8:35 AM.",
    ],
  },
];

export const DEPARTURE_DATE = "2026-11-27";
export const RETURN_DATE = "2026-12-01";

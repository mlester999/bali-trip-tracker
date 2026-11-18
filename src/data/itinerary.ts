import type { ActivityGroup, ImmigrationDay, ItineraryDay } from "@/types/trip";

const group = (
  key: ActivityGroup["key"],
  label: string,
  activities: ActivityGroup["activities"],
): ActivityGroup => ({ key, label, activities });

const activity = (
  id: string,
  time: string,
  title: string,
  options: Partial<Omit<ActivityGroup["activities"][number], "id" | "time" | "title">> & {
    timeQualifier?: "Est." | "Target";
  } = {},
): ActivityGroup["activities"][number] => ({ id, time, title, ...options });

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
        activity("2026-11-27-flight-to-bali", "8:00 PM", "Flight from Manila to Bali"),
      ]),
      group("overnight", "Overnight", [
        activity(
          "2026-11-27-arrival-airport",
          "11:30 PM–12:30 AM",
          "Arrival at Ngurah Rai International Airport",
          { timeQualifier: "Est." },
        ),
        activity("2026-11-27-clear-immigration", "12:30–1:30 AM", "Clear immigration and collect baggage"),
        activity("2026-11-27-meet-driver", "1:30–2:00 AM", "Meet airport driver"),
        activity("2026-11-27-transfer-ubud", "2:00–3:30 AM", "Airport transfer to Ubud"),
        activity("2026-11-27-accommodation-ubud", "3:30 AM", "Hotel check-in and rest"),
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
        activity("2026-11-28-breakfast", "7:00 AM", "Breakfast and get ready"),
        activity("2026-11-28-tour-pickup", "8:00 AM", "Waterfall tour pickup"),
        activity("2026-11-28-kanto-lampo", "8:30–9:30 AM", "Kanto Lampo Waterfall", {
          mapsQuery: "Kanto Lampo Waterfall Bali",
        }),
        activity("2026-11-28-tibumana", "10:00–11:00 AM", "Tibumana Waterfall", {
          mapsQuery: "Tibumana Waterfall Bali",
        }),
        activity("2026-11-28-lunch-transfer", "11:00 AM–12:00 PM", "Lunch and transfer", {
          timeQualifier: "Est.",
        }),
      ]),
      group("afternoon", "Afternoon", [
        activity("2026-11-28-alas-harum", "12:00–1:00 PM", "Alas Harum Bali Rice Terraces", {
          mapsQuery: "Alas Harum Bali",
        }),
        activity("2026-11-28-bali-swing", "12:00–1:00 PM", "Bali Swing", {
          mapsQuery: "Bali Swing Ubud",
          optional: true,
          detail: "Optional stop at Alas Harum.",
        }),
        activity("2026-11-28-cretya", "1:00–3:00 PM", "Cretya Ubud Infinity Pool", {
          mapsQuery: "Cretya Ubud Bali",
        }),
        activity("2026-11-28-tour-dropoff", "3:00–3:30 PM", "Tour drop-off"),
        activity("2026-11-28-rest-ubud", "4:00–6:00 PM", "Rest at the hotel"),
      ]),
      group("evening", "Evening", [
        activity("2026-11-28-dinner-ubud", "6:30–8:00 PM", "Dinner and leisure in Ubud"),
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
        activity("2026-11-29-breakfast", "7:30 AM", "Breakfast"),
        activity("2026-11-29-atv-departure", "8:30 AM", "Depart for the ATV adventure"),
        activity("2026-11-29-atv", "9:00–11:00 AM", "Tandem ATV Adventure", {
          mapsQuery: "Tandem ATV Adventure Ubud Bali",
        }),
        activity("2026-11-29-lunch-transfer", "11:00 AM–12:00 PM", "Lunch and transfer", {
          timeQualifier: "Est.",
        }),
      ]),
      group("afternoon", "Afternoon", [
        activity("2026-11-29-monkey-forest", "12:00–1:30 PM", "Sacred Monkey Forest Sanctuary", {
          mapsQuery: "Sacred Monkey Forest Sanctuary Ubud",
        }),
        activity("2026-11-29-ubud-palace", "1:30–2:30 PM", "Ubud Palace", {
          mapsQuery: "Ubud Palace Bali",
          detail: "Shared sightseeing window with the traditional market.",
        }),
        activity("2026-11-29-ubud-market", "1:30–2:30 PM", "Ubud Traditional Market", {
          mapsQuery: "Ubud Traditional Market Bali",
          detail: "Shared sightseeing window with Ubud Palace.",
        }),
        activity("2026-11-29-cafes", "2:30–4:00 PM", "Café hopping in Ubud", {
          mapsQuery: "cafes in Ubud Bali",
        }),
        activity("2026-11-29-rest-ubud", "4:00–6:00 PM", "Rest at the hotel"),
      ]),
      group("evening", "Evening", [
        activity("2026-11-29-dinner-ubud", "6:00–7:30 PM", "Dinner and leisure in Ubud"),
        activity("2026-11-29-pack", "7:30–8:30 PM", "Pack for Nusa Penida"),
        activity("2026-11-29-sleep", "9:00 PM", "Sleep early"),
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
        activity("2026-11-30-wakeup", "5:00 AM", "Wake up and check out"),
        activity("2026-11-30-ubud-sanur", "5:30–6:45 AM", "Travel from Ubud to Sanur Harbour"),
        activity("2026-11-30-boat-checkin", "6:45–7:30 AM", "Boat check-in"),
        activity("2026-11-30-fast-boat-outbound", "7:30–8:15 AM", "Fast boat to Nusa Penida", {
          timeQualifier: "Target",
        }),
        activity("2026-11-30-meet-island-driver", "8:15–9:00 AM", "Meet island driver"),
        activity("2026-11-30-kelingking", "9:00–10:15 AM", "Kelingking Beach Viewpoint", {
          mapsQuery: "Kelingking Beach Viewpoint Nusa Penida",
        }),
        activity("2026-11-30-drive-next-stop", "10:15–11:00 AM", "Drive to the next stop"),
      ]),
      group("afternoon", "Afternoon", [
        activity("2026-11-30-broken-beach", "11:00 AM–12:00 PM", "Broken Beach", {
          mapsQuery: "Broken Beach Nusa Penida",
          detail: "Shared visit window with Angel's Billabong.",
        }),
        activity("2026-11-30-angels-billabong", "11:00 AM–12:00 PM", "Angel's Billabong", {
          mapsQuery: "Angel's Billabong Nusa Penida",
          detail: "Shared visit window with Broken Beach.",
        }),
        activity("2026-11-30-lunch", "12:00–1:00 PM", "Lunch and transfer", {
          timeQualifier: "Est.",
        }),
        activity("2026-11-30-crystal-bay", "1:00–2:00 PM", "Crystal Bay", {
          mapsQuery: "Crystal Bay Nusa Penida",
        }),
        activity("2026-11-30-return-harbour", "2:00–3:00 PM", "Return to the island harbour"),
        activity("2026-11-30-fast-boat-return", "3:30–4:15 PM", "Return fast boat to Sanur", {
          timeQualifier: "Target",
        }),
        activity("2026-11-30-collect-bags", "4:15–5:00 PM", "Collect bags and meet the driver"),
        activity("2026-11-30-transfer-seminyak", "5:00–6:30 PM", "Transfer directly to Seminyak"),
      ]),
      group("evening", "Evening", [
        activity("2026-11-30-hotel-checkin", "6:30–7:00 PM", "Seminyak hotel check-in"),
        activity("2026-11-30-dinner-seminyak", "7:00–8:00 PM", "Dinner and leisure in Seminyak"),
        activity("2026-11-30-pack-flight", "8:00–9:00 PM", "Pack for the flight"),
        activity("2026-11-30-sleep", "9:00 PM", "Sleep early"),
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
        activity("2026-12-01-wakeup", "4:15 AM", "Wake up and pack"),
        activity("2026-12-01-checkout", "4:45 AM", "Hotel check-out"),
        activity("2026-12-01-transfer-airport", "5:00 AM", "Airport driver pickup and transfer from Seminyak"),
        activity("2026-12-01-arrive-airport", "5:45–6:00 AM", "Arrive at Ngurah Rai International Airport", {
          timeQualifier: "Target",
        }),
        activity("2026-12-01-airport-checkin", "6:00–7:30 AM", "Check-in, immigration, and security"),
        activity("2026-12-01-gate", "7:30–8:00 AM", "Proceed to the gate"),
        activity("2026-12-01-flight-to-manila", "8:35 AM", "Flight back to Manila"),
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
      "8:00 PM departure from Manila to Bali.",
      "Estimated arrival at Ngurah Rai International Airport: 11:30 PM–12:30 AM, followed by transfer to Ubud.",
    ],
  },
  {
    id: "2026-11-28",
    date: "November 28, 2026",
    weekday: "Saturday",
    details: [
      "8:00 AM tour pickup; planned visits: Kanto Lampo Waterfall (8:30–9:30 AM), Tibumana Waterfall (10:00–11:00 AM), Alas Harum Bali (12:00–1:00 PM), and Cretya Ubud (1:00–3:00 PM).",
      "Accommodation in Ubud.",
    ],
  },
  {
    id: "2026-11-29",
    date: "November 29, 2026",
    weekday: "Sunday",
    details: [
      "Tandem ATV Adventure (9:00–11:00 AM), Sacred Monkey Forest Sanctuary (12:00–1:30 PM), Ubud Palace and Traditional Market (1:30–2:30 PM), and café hopping (2:30–4:00 PM).",
      "Accommodation in Ubud.",
    ],
  },
  {
    id: "2026-11-30",
    date: "November 30, 2026",
    weekday: "Monday",
    details: [
      "Travel from Ubud to Sanur Harbour (5:30–6:45 AM); target fast boat to Nusa Penida (7:30–8:15 AM).",
      "Nusa Penida West Tour: Kelingking Beach Viewpoint (9:00–10:15 AM), Broken Beach and Angel's Billabong (11:00 AM–12:00 PM), and Crystal Bay (1:00–2:00 PM).",
      "Target return fast boat to Sanur (3:30–4:15 PM), then transfer directly to Seminyak (5:00–6:30 PM) for evening leisure and accommodation.",
    ],
  },
  {
    id: "2026-12-01",
    date: "December 1, 2026",
    weekday: "Tuesday",
    details: [
      "Airport transfer pickup from Seminyak at 5:00 AM; target arrival at Ngurah Rai International Airport is 5:45–6:00 AM.",
      "Flight back to Manila; return flight departure is at 8:35 AM.",
    ],
  },
];

export const DEPARTURE_DATE = "2026-11-27";
export const RETURN_DATE = "2026-12-01";

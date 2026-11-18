export type TravelReference = {
  label: string;
  href: string;
};

export type DepartureChecklistItem = {
  id: string;
  title: string;
  detail: string;
  references?: TravelReference[];
  optional?: boolean;
};

export type AirportGuideStep = {
  title: string;
  detail: string;
};

export type AirportGuide = {
  id: string;
  title: string;
  summary: string;
  steps: AirportGuideStep[];
};

export const DEPARTURE_CHECKLIST: DepartureChecklistItem[] = [
  {
    id: "passport-validity",
    title: "Passport: at least 6 months left",
    detail: "Check the expiry date against your Bali arrival date and make sure the name matches both flight bookings.",
    references: [{ label: "Indonesia visa-free rules", href: "https://manado.imigrasi.go.id/pages/bebas-visa-kunjungan.html" }],
  },
  {
    id: "airport-entry-id",
    title: "Government ID and flight booking ready",
    detail: "Keep a government photo ID and same-day e-ticket or booking confirmation accessible at the Manila terminal entrance. Keep your passport and boarding pass handy after check-in.",
    references: [{ label: "NAIA passenger guidance", href: "https://www.miaa.gov.ph/index.php/faq" }],
  },
  {
    id: "etravel-outbound",
    title: "Philippine eTravel for the Nov 27 departure",
    detail: "Register within 72 hours before departure (roughly from 8:00 PM on Nov 24 for the current 8:00 PM flight). It is free. Save the QR code for the airline before boarding.",
    references: [{ label: "Official eTravel and FAQ", href: "https://etravel.gov.ph/frequently-asked-questions" }],
  },
  {
    id: "travel-tax",
    title: "Philippine travel tax: confirm paid, included, or exempt",
    detail: "Check the ticket receipt first so you do not pay twice. If the full economy tax is due, TIEZA lists ₱1,620; reduced rates or exemptions may apply to eligible travelers. Save the receipt if paid.",
    references: [
      { label: "TIEZA rates and rules", href: "https://tieza.gov.ph/travel-tax/" },
      { label: "TIEZA payment and ticket reminder", href: "https://tieza.gov.ph/tieza-unveils-enhanced-online-travel-tax-services-to-improve-traveler-experience/" },
    ],
  },
  {
    id: "return-ticket",
    title: "Return ticket: Bali to Manila on Dec 1",
    detail: "Save the round-trip itinerary and return ticket on your phone, and keep an offline copy. Philippine immigration lists the return ticket among the normal documents for tourist travel.",
    references: [{ label: "Bureau of Immigration guidance", href: "https://immigration.gov.ph/bi-to-defer-implementation-of-revised-guidelines-on-departure-formalities-following-iacat-pronouncement/" }],
  },
  {
    id: "accommodation",
    title: "Confirmed accommodation in Ubud and Seminyak",
    detail: "Save the booking confirmations, addresses, and contact numbers for both stays so you can show them if an airline or immigration officer asks.",
  },
  {
    id: "indonesia-entry",
    title: "Entry permission checked for each passport",
    detail: "For Philippine ordinary-passport holders, Indonesia currently lists a visa-free tourist stay of up to 30 days, not extendable. Anyone using a different passport should check their own visa rules.",
    references: [{ label: "Indonesia Immigration: visa-free list", href: "https://manado.imigrasi.go.id/pages/bebas-visa-kunjungan.html" }],
  },
  {
    id: "all-indonesia",
    title: "All Indonesia arrival declaration and QR",
    detail: "Complete the free combined arrival declaration within 3 days before arriving in Indonesia. It covers immigration, customs, health, and quarantine; save the QR. This is the official form often called an Indonesia travel pass, not a visa.",
    references: [{ label: "Official All Indonesia form", href: "https://allindonesia.imigrasi.go.id/" }],
  },
  {
    id: "bali-levy",
    title: "Bali foreign-tourist levy: IDR 150,000 per person",
    detail: "Pay through the official Love Bali system before or during your stay and keep the QR/payment proof. Make sure it is paid before leaving Indonesia.",
    references: [{ label: "Official Love Bali payment portal", href: "https://lovebali.baliprov.go.id/" }],
  },
  {
    id: "etravel-return",
    title: "Philippine eTravel for the Dec 1 return",
    detail: "Submit a separate eTravel registration/update within 72 hours before arriving back in the Philippines. Save its QR before leaving Bali; eTravel is free.",
    references: [{ label: "Official eTravel and FAQ", href: "https://etravel.gov.ph/frequently-asked-questions" }],
  },
  {
    id: "coe-backup",
    title: "COE / employment letter (optional backup)",
    detail: "Carry it if you already have one and want it as supporting evidence. A COE is not a standard document every tourist must present; extra documents may be requested only in an individual secondary-inspection case.",
    references: [{ label: "Bureau of Immigration guidance", href: "https://immigration.gov.ph/bi-to-defer-implementation-of-revised-guidelines-on-departure-formalities-following-iacat-pronouncement/" }],
    optional: true,
  },
];

export const AIRPORT_GUIDES: AirportGuide[] = [
  {
    id: "manila-departure",
    title: "Manila airport departure",
    summary: "For the current 8:00 PM international flight, plan to reach NAIA around 5:00 PM and confirm the exact terminal with your airline.",
    steps: [
      {
        title: "Before leaving home",
        detail: "Check the airline app for flight status, terminal, check-in opening time, and baggage limits. Put your passport, government photo ID, booking confirmation, and eTravel QR where you can reach them.",
      },
      {
        title: "Enter the correct terminal",
        detail: "At the passenger entrance, be ready to show your ID and same-day flight booking or travel document for inspection. A boarding pass may only be issued after check-in, so keep the e-ticket confirmation ready too. Entry checks can vary by terminal; follow the airport staff and posted signs.",
      },
      {
        title: "Airline check-in and bag drop",
        detail: "Go to your airline's counter or kiosk. Show your passport, confirm the destination and baggage tag, drop checked bags, then get your boarding pass. Keep the baggage receipt until you collect the bag in Bali.",
      },
      {
        title: "Check the travel tax",
        detail: "Review the ticket receipt before paying. If the travel tax is not included and no exemption or reduced rate applies, pay through TIEZA or the payment method your airline/airport directs, then keep proof.",
      },
      {
        title: "Philippine departure immigration",
        detail: "Follow the signs to immigration. Keep your passport, boarding pass, eTravel QR, and return booking ready. Answer questions truthfully about your short tourist trip. Hotel confirmations and a COE can stay as backup; they are not universal requirements for every tourist.",
      },
      {
        title: "Security, gate, and boarding",
        detail: "Complete screening, check the flight information screens for gate changes, and go to the gate before boarding starts. The Bureau of Immigration advises international travelers to allow at least 3 hours for check-in and clearance.",
      },
    ],
  },
  {
    id: "bali-arrival",
    title: "Landing at Bali airport",
    summary: "Keep your passport and All Indonesia QR ready after landing at I Gusti Ngurah Rai International Airport.",
    steps: [
      {
        title: "Follow International Arrivals signs",
        detail: "After leaving the aircraft, follow the signs for immigration. Keep your passport, return ticket, accommodation address, and All Indonesia QR accessible; do not leave the controlled arrivals route to meet a driver yet.",
      },
      {
        title: "Clear Indonesian immigration",
        detail: "Philippine ordinary-passport holders are currently on Indonesia's 30-day visa-free visit list for tourism. The stay cannot be extended. Present your passport and answer the officer's questions; show your return ticket or hotel details if requested.",
      },
      {
        title: "Collect checked baggage",
        detail: "Check the flight number on the carousel screens, match the baggage tag, and report missing or damaged baggage to the airline before leaving the baggage hall.",
      },
      {
        title: "Complete customs and quarantine checks",
        detail: "Use the All Indonesia declaration QR and follow the customs signs. Declare goods or animal, plant, fish, and food products when required; use the channel directed by the officers. For travelers covered by All Indonesia, a separate e-CD is no longer needed.",
      },
      {
        title: "Confirm the Bali tourist levy",
        detail: "Show the Love Bali payment QR if you paid online. If not, follow official airport instructions and pay electronically during the stay; the levy must be settled before leaving Indonesia.",
      },
      {
        title: "Meet the pre-arranged driver",
        detail: "Exit to the public arrivals hall and use the meeting point your hotel or driver sent you. Match the driver's name and vehicle details before getting in; keep their contact number saved offline for the late-night arrival.",
      },
    ],
  },
  {
    id: "bali-return",
    title: "Bali airport and return to Manila",
    summary: "Your itinerary lists an 8:35 AM return flight on Dec 1; confirm the airline's check-in window and your driver pickup.",
    steps: [
      {
        title: "Check the timing with your airline and driver",
        detail: "Your current itinerary targets Ngurah Rai arrival at 5:45–6:00 AM, which is 2 hours 35 minutes to 2 hours 50 minutes before an 8:35 AM departure. If your airline recommends a 3-hour buffer, ask the driver for an airport arrival around 5:35 AM or earlier.",
      },
      {
        title: "Check in and drop bags",
        detail: "At the airline counter, show your passport and booking, check the bags against the airline's weight rules, and get your boarding pass. Keep baggage receipts until you reach Manila.",
      },
      {
        title: "Indonesian departure immigration and security",
        detail: "Follow the international departure signs, complete exit immigration with your passport and boarding pass, then pass security and go straight to the gate. Watch the screens for changes.",
      },
      {
        title: "Have the Bali levy proof ready",
        detail: "Keep the Love Bali QR or payment proof available. If you have not paid yet, settle the levy before leaving Indonesia according to official instructions.",
      },
      {
        title: "Complete the Philippine return declaration",
        detail: "Within 72 hours before your scheduled arrival in Manila, submit the Philippine eTravel registration/update and save the QR. It is a separate record from the one used for the outbound flight.",
      },
      {
        title: "Arrive in Manila",
        detail: "Follow Arrivals signs, present your Philippine passport and eTravel QR if requested, collect checked bags, then follow customs instructions before exiting the terminal.",
      },
    ],
  },
];

export const AIRPORT_REFERENCES = [
  { label: "Philippine eTravel", href: "https://etravel.gov.ph/" },
  { label: "TIEZA travel tax", href: "https://tieza.gov.ph/travel-tax/" },
  { label: "All Indonesia arrival form", href: "https://allindonesia.imigrasi.go.id/" },
  { label: "Love Bali levy", href: "https://lovebali.baliprov.go.id/" },
  { label: "NAIA flight and passenger guidance", href: "https://www.miaa.gov.ph/index.php/faq" },
];

export type ActivityGroupKey = "morning" | "afternoon" | "evening" | "overnight";
export type ActivityGalleryKey =
  | "kanto-lampo"
  | "tibumana"
  | "alas-harum"
  | "cretya-pool"
  | "bali-swing"
  | "atv"
  | "rafting"
  | "monkey-forest"
  | "ubud-palace"
  | "ubud-market"
  | "ubud-cafe"
  | "kelingking"
  | "broken-beach"
  | "angels-billabong"
  | "crystal-bay";

export type ItineraryActivity = {
  id: string;
  title: string;
  time?: string;
  timeQualifier?: "Est." | "Target";
  imageGallery?: ActivityGalleryKey;
  mapsQuery?: string;
  optional?: boolean;
  detail?: string;
};

export type ActivityGroup = {
  key: ActivityGroupKey;
  label: string;
  activities: ItineraryActivity[];
};

export type ItineraryDay = {
  id: string;
  isoDate: string;
  weekday: string;
  monthShort: string;
  dayOfMonth: string;
  dayLabel?: string;
  title: string;
  shortTitle: string;
  accommodation?: string;
  groups: ActivityGroup[];
};

export type TravelerSettings = {
  travelerNames: string[];
  tourGuideName: string;
  tourGuideInstagram: string;
  outboundFlight: string;
  returnFlight: string;
  ubudHotelName: string;
  ubudHotelAddress: string;
  seminyakHotelName: string;
  seminyakHotelAddress: string;
};

export type ImmigrationDay = {
  id: string;
  date: string;
  weekday: string;
  details: string[];
};

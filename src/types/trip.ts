export type ActivityGroupKey = "morning" | "afternoon" | "evening" | "overnight";

export type ItineraryActivity = {
  id: string;
  title: string;
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
  travelerNames: string;
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

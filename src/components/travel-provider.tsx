"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { TravelerSettings } from "@/types/trip";
import type { CompletionMap } from "@/lib/progress";

const PROGRESS_KEY = "our-bali-adventure-2026:activity-progress:v1";
const PREPARATION_KEY = "our-bali-adventure-2026:departure-checklist:v1";
const SETTINGS_KEY = "our-bali-adventure-2026:traveler-settings:v1";
const DEFAULT_PROGRESS = "{}";
const DEFAULT_PREPARATION = "{}";

const DEFAULT_TRIP_SETTINGS: TravelerSettings = {
  travelerNames: ["Mark Lester Acak", "Mitchel Tapang"],
  tourGuideName: "Dena Mang",
  tourGuideInstagram: "https://www.instagram.com/dena.mang.7?lqvp=MW82ZHcwMzE1Y2Q4bg==",
  outboundFlight: "",
  returnFlight: "",
  ubudHotelName: "Kamandhani Hotel Ubud",
  ubudHotelAddress: "",
  seminyakHotelName: "Lloyd's Inn Bali",
  seminyakHotelAddress: "",
};

const DEFAULT_SETTINGS = JSON.stringify(DEFAULT_TRIP_SETTINGS);
let progressFallback = DEFAULT_PROGRESS;
let preparationFallback = DEFAULT_PREPARATION;
let settingsFallback = DEFAULT_SETTINGS;
const localListeners = new Set<() => void>();

type TravelContextValue = {
  completed: CompletionMap;
  departureChecks: CompletionMap;
  isHydrated: boolean;
  settings: TravelerSettings;
  toggleActivity: (activityId: string) => void;
  toggleDepartureCheck: (checkId: string) => void;
  saveSettings: (settings: TravelerSettings) => void;
};

const TravelContext = createContext<TravelContextValue | null>(null);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readProgress(snapshot: string): CompletionMap {
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (!isRecord(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === "boolean"),
    ) as CompletionMap;
  } catch {
    return {};
  }
}

function readTravelerNames(value: unknown): string[] {
  const names = Array.isArray(value)
    ? value.filter((name): name is string => typeof name === "string")
    : typeof value === "string"
      ? value.split(",")
      : [];
  const cleanedNames = names.map((name) => name.trim()).filter(Boolean);
  return cleanedNames.length ? cleanedNames : [...DEFAULT_TRIP_SETTINGS.travelerNames];
}

function readSettings(snapshot: string): TravelerSettings {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!isRecord(value)) return DEFAULT_TRIP_SETTINGS;
    const readString = (key: Exclude<keyof TravelerSettings, "travelerNames">) =>
      typeof value[key] === "string" && value[key].trim()
        ? value[key] as string
        : DEFAULT_TRIP_SETTINGS[key];
    return {
      travelerNames: readTravelerNames(value.travelerNames),
      tourGuideName: readString("tourGuideName"),
      tourGuideInstagram: readString("tourGuideInstagram"),
      outboundFlight: readString("outboundFlight"),
      returnFlight: readString("returnFlight"),
      ubudHotelName: readString("ubudHotelName"),
      ubudHotelAddress: readString("ubudHotelAddress"),
      seminyakHotelName: readString("seminyakHotelName"),
      seminyakHotelAddress: readString("seminyakHotelAddress"),
    };
  } catch {
    return DEFAULT_TRIP_SETTINGS;
  }
}

function getStoredSnapshot(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ?? fallback;
  } catch {
    return fallback;
  }
}

function subscribeToLocalData(listener: () => void) {
  localListeners.add(listener);
  if (typeof window !== "undefined") window.addEventListener("storage", listener);
  return () => {
    localListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", listener);
  };
}

function notifyLocalDataChanged() {
  localListeners.forEach((listener) => listener());
}

function saveSnapshot(key: string, value: string) {
  if (key === PROGRESS_KEY) progressFallback = value;
  else if (key === PREPARATION_KEY) preparationFallback = value;
  else settingsFallback = value;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Keep this tab usable if browser storage is unavailable.
  }
  notifyLocalDataChanged();
}

function subscribeToHydration() {
  return () => undefined;
}

function getHydratedSnapshot() {
  return true;
}

function getServerHydrationSnapshot() {
  return false;
}

export function TravelProvider({ children }: { children: ReactNode }) {
  const progressSnapshot = useSyncExternalStore(
    subscribeToLocalData,
    () => getStoredSnapshot(PROGRESS_KEY, progressFallback),
    () => DEFAULT_PROGRESS,
  );
  const preparationSnapshot = useSyncExternalStore(
    subscribeToLocalData,
    () => getStoredSnapshot(PREPARATION_KEY, preparationFallback),
    () => DEFAULT_PREPARATION,
  );
  const settingsSnapshot = useSyncExternalStore(
    subscribeToLocalData,
    () => getStoredSnapshot(SETTINGS_KEY, settingsFallback),
    () => DEFAULT_SETTINGS,
  );
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydrationSnapshot,
  );

  const toggleActivity = useCallback((activityId: string) => {
    const next = readProgress(getStoredSnapshot(PROGRESS_KEY, progressFallback));
    if (next[activityId]) delete next[activityId];
    else next[activityId] = true;
    saveSnapshot(PROGRESS_KEY, JSON.stringify(next));
  }, []);

  const toggleDepartureCheck = useCallback((checkId: string) => {
    const next = readProgress(getStoredSnapshot(PREPARATION_KEY, preparationFallback));
    if (next[checkId]) delete next[checkId];
    else next[checkId] = true;
    saveSnapshot(PREPARATION_KEY, JSON.stringify(next));
  }, []);

  const saveSettings = useCallback((settings: TravelerSettings) => {
    saveSnapshot(SETTINGS_KEY, JSON.stringify(settings));
  }, []);

  const value = useMemo<TravelContextValue>(
    () => ({
      completed: readProgress(progressSnapshot),
      departureChecks: readProgress(preparationSnapshot),
      isHydrated,
      settings: readSettings(settingsSnapshot),
      toggleActivity,
      toggleDepartureCheck,
      saveSettings,
    }),
    [isHydrated, preparationSnapshot, progressSnapshot, saveSettings, settingsSnapshot, toggleActivity, toggleDepartureCheck],
  );

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

export function useTravel(): TravelContextValue {
  const context = useContext(TravelContext);
  if (!context) throw new Error("useTravel must be used inside TravelProvider.");
  return context;
}

"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { TravelerSettings } from "@/types/trip";
import type { CompletionMap } from "@/lib/progress";

const PROGRESS_KEY = "our-bali-adventure-2026:activity-progress:v1";
const SETTINGS_KEY = "our-bali-adventure-2026:traveler-settings:v1";
const DEFAULT_PROGRESS = "{}";

export const EMPTY_SETTINGS: TravelerSettings = {
  travelerNames: "",
  outboundFlight: "",
  returnFlight: "",
  ubudHotelName: "",
  ubudHotelAddress: "",
  seminyakHotelName: "",
  seminyakHotelAddress: "",
};

const DEFAULT_SETTINGS = JSON.stringify(EMPTY_SETTINGS);
let progressFallback = DEFAULT_PROGRESS;
let settingsFallback = DEFAULT_SETTINGS;
const localListeners = new Set<() => void>();

type TravelContextValue = {
  completed: CompletionMap;
  isHydrated: boolean;
  settings: TravelerSettings;
  toggleActivity: (activityId: string) => void;
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

function readSettings(snapshot: string): TravelerSettings {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!isRecord(value)) return EMPTY_SETTINGS;
    return {
      travelerNames: typeof value.travelerNames === "string" ? value.travelerNames : "",
      outboundFlight: typeof value.outboundFlight === "string" ? value.outboundFlight : "",
      returnFlight: typeof value.returnFlight === "string" ? value.returnFlight : "",
      ubudHotelName: typeof value.ubudHotelName === "string" ? value.ubudHotelName : "",
      ubudHotelAddress: typeof value.ubudHotelAddress === "string" ? value.ubudHotelAddress : "",
      seminyakHotelName: typeof value.seminyakHotelName === "string" ? value.seminyakHotelName : "",
      seminyakHotelAddress: typeof value.seminyakHotelAddress === "string" ? value.seminyakHotelAddress : "",
    };
  } catch {
    return EMPTY_SETTINGS;
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

  const saveSettings = useCallback((settings: TravelerSettings) => {
    saveSnapshot(SETTINGS_KEY, JSON.stringify(settings));
  }, []);

  const value = useMemo<TravelContextValue>(
    () => ({
      completed: readProgress(progressSnapshot),
      isHydrated,
      settings: readSettings(settingsSnapshot),
      toggleActivity,
      saveSettings,
    }),
    [isHydrated, progressSnapshot, saveSettings, settingsSnapshot, toggleActivity],
  );

  return <TravelContext.Provider value={value}>{children}</TravelContext.Provider>;
}

export function useTravel(): TravelContextValue {
  const context = useContext(TravelContext);
  if (!context) throw new Error("useTravel must be used inside TravelProvider.");
  return context;
}

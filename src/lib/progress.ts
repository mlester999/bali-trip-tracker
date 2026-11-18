import type { ItineraryDay } from "@/types/trip";

export type CompletionMap = Record<string, boolean>;

export function getDayProgress(day: ItineraryDay, completed: CompletionMap) {
  const activities = day.groups.flatMap((item) => item.activities).filter((item) => !item.optional);
  const total = activities.length;
  const done = activities.filter((activity) => completed[activity.id]).length;

  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function getTripProgress(days: ItineraryDay[], completed: CompletionMap) {
  const activities = days
    .flatMap((day) => day.groups.flatMap((group) => group.activities))
    .filter((activity) => !activity.optional);
  const total = activities.length;
  const done = activities.filter((activity) => completed[activity.id]).length;

  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

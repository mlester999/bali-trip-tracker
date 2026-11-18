"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  FileText,
  LockKeyhole,
  MapPin,
  Moon,
  Sunrise,
  Sun,
} from "lucide-react";
import { TRIP_DAYS } from "@/data/itinerary";
import { useTravel } from "@/components/travel-provider";
import { getDayProgress, getTripProgress } from "@/lib/progress";
import { googleMapsSearchUrl } from "@/lib/maps";
import type { ActivityGroup, ItineraryDay } from "@/types/trip";

function subscribeToDateChanges(listener: () => void) {
  window.addEventListener("focus", listener);
  document.addEventListener("visibilitychange", listener);
  return () => {
    window.removeEventListener("focus", listener);
    document.removeEventListener("visibilitychange", listener);
  };
}

function getDaysUntilDeparture(): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const departure = new Date(2026, 10, 27);
  return Math.round((departure.getTime() - today.getTime()) / 86_400_000);
}

function getServerDaysUntilDeparture(): null {
  return null;
}

function GroupIcon({ group }: { group: ActivityGroup["key"] }) {
  const props = { "aria-hidden": true, size: 15, strokeWidth: 1.8 };
  if (group === "morning") return <Sunrise {...props} />;
  if (group === "afternoon") return <Sun {...props} />;
  if (group === "overnight") return <BedDouble {...props} />;
  return <Moon {...props} />;
}

function ActivityList({
  day,
  group,
  completed,
  isHydrated,
  onToggle,
}: {
  day: ItineraryDay;
  group: ActivityGroup;
  completed: Record<string, boolean>;
  isHydrated: boolean;
  onToggle: (activityId: string) => void;
}) {
  return (
    <section aria-labelledby={`${day.id}-${group.key}-heading`} className="activity-group">
      <h4 className="activity-group-title" id={`${day.id}-${group.key}-heading`}>
        <GroupIcon group={group.key} />
        {group.label}
      </h4>
      {group.activities.length === 0 ? (
        <p className="empty-activities">No activities listed.</p>
      ) : (
        <ul className="activity-list">
          {group.activities.map((activity) => {
            const isComplete = Boolean(completed[activity.id]);
            const checkboxId = `activity-${activity.id}`;
            return (
              <li className={`activity-row${isComplete ? " is-complete" : ""}`} key={activity.id}>
                <label className="activity-label" htmlFor={checkboxId}>
                  <input
                    checked={isComplete}
                    disabled={!isHydrated}
                    id={checkboxId}
                    onChange={() => onToggle(activity.id)}
                    type="checkbox"
                  />
                  <span className="activity-title">
                    {activity.title}
                    {activity.optional && <span className="optional-label">Optional</span>}
                    {activity.detail && <small className="activity-detail">{activity.detail}</small>}
                  </span>
                </label>
                {activity.mapsQuery && (
                  <a
                    aria-label={`Open ${activity.title} in Google Maps`}
                    className="map-link"
                    href={googleMapsSearchUrl(activity.mapsQuery)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <MapPin aria-hidden="true" size={13} />
                    <span>Open in Maps</span>
                    <ArrowUpRight aria-hidden="true" size={12} />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function countdownText(days: number | null): string {
  if (days === null) return "Checking your dates…";
  if (days > 1) return `${days} days until departure`;
  if (days === 1) return "1 day until departure";
  if (days === 0) return "Departure day";
  if (days > -5) return "Your Bali adventure is underway";
  return "Trip complete";
}

function longDate(day: ItineraryDay) {
  const month = day.monthShort === "NOV" ? "November" : "December";
  return `${day.weekday}, ${month} ${Number(day.dayOfMonth)}, 2026`;
}

export function HomePage() {
  const { completed, isHydrated, toggleActivity } = useTravel();
  const [selectedDayId, setSelectedDayId] = useState("2026-11-28");
  const daysUntilDeparture = useSyncExternalStore(
    subscribeToDateChanges,
    getDaysUntilDeparture,
    getServerDaysUntilDeparture,
  );
  const selectedDayIndex = Math.max(0, TRIP_DAYS.findIndex((day) => day.id === selectedDayId));
  const selectedDay = TRIP_DAYS[selectedDayIndex];
  const tripProgress = useMemo(() => getTripProgress(TRIP_DAYS, completed), [completed]);
  const dayProgress = useMemo(
    () => getDayProgress(selectedDay, completed),
    [completed, selectedDay],
  );

  function chooseDay(index: number) {
    const day = TRIP_DAYS[index];
    if (day) setSelectedDayId(day.id);
  }

  function moveDay(direction: -1 | 1) {
    chooseDay(selectedDayIndex + direction);
  }

  return (
    <main className="home-page">
      <section aria-labelledby="trip-title" className="trip-overview">
        <div className="trip-overview-inner">
          <div className="trip-overview-copy">
            <p className="overview-kicker">Bali, Indonesia <span aria-hidden="true">·</span> Five days together</p>
            <h1 className="trip-title" id="trip-title">Our Bali Adventure <span>2026</span></h1>
            <p className="trip-subtitle">Five Days in Paradise</p>
            <div className="trip-facts">
              <span><CalendarDays aria-hidden="true" size={15} /> November 27 – December 1, 2026</span>
              <span className="countdown-copy" aria-live="polite">
                <span aria-hidden="true" className="countdown-dot" />
                {countdownText(daysUntilDeparture)}
              </span>
            </div>
          </div>

          <div className="overview-progress">
            <div className="overview-progress-copy">
              <span>{isHydrated ? `${tripProgress.done} of ${tripProgress.total} activities` : "Loading saved progress…"}</span>
              <strong>{isHydrated ? `${tripProgress.percent}%` : "—"}</strong>
            </div>
            <div
              aria-label={isHydrated ? `${tripProgress.percent}% of planned activities complete` : "Loading saved progress"}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={isHydrated ? tripProgress.percent : undefined}
              className="progress-track"
              role="progressbar"
            >
              <span style={{ width: isHydrated ? `${tripProgress.percent}%` : "0%" }} />
            </div>
            <span className="overview-progress-label">Your itinerary progress</span>
          </div>
        </div>
      </section>

      <div className="itinerary-content" id="daily-itinerary">
        <div className="itinerary-heading-row">
          <div>
            <p className="eyebrow">A little at a time</p>
            <h2 className="section-heading">The days ahead</h2>
          </div>
          <Link className="button button-outline immigration-link" href="/itinerary">
            <FileText aria-hidden="true" size={15} />
            <span>Travel itinerary</span>
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>

        <nav aria-label="Choose an itinerary day" className="day-picker">
          <div className="day-picker-list">
            {TRIP_DAYS.map((day, index) => {
              const isSelected = selectedDay.id === day.id;
              const progress = getDayProgress(day, completed);
              return (
                <button
                  aria-current={isSelected ? "date" : undefined}
                  aria-pressed={isSelected}
                  className={`day-option${isSelected ? " is-selected" : ""}`}
                  key={day.id}
                  onClick={() => chooseDay(index)}
                  type="button"
                >
                  <span className="day-option-date">
                    <small>{day.weekday.slice(0, 3)}</small>
                    <strong>{day.dayOfMonth}</strong>
                  </span>
                  <span className="day-option-copy">
                    <strong>{day.dayLabel ?? "Travel day"}</strong>
                    <small>{day.shortTitle}</small>
                  </span>
                  <span className="day-option-progress" aria-label={`${progress.done} of ${progress.total} activities complete`}>
                    {isHydrated ? `${progress.done}/${progress.total}` : "—"}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <article aria-labelledby="selected-day-title" className="day-detail-card">
          <header className="day-detail-header">
            <div className="day-title-copy">
              <p className="day-date-line">{longDate(selectedDay)} <span>·</span> {selectedDay.dayLabel ?? "Travel day"}</p>
              <h3 className="day-detail-title" id="selected-day-title">{selectedDay.title}</h3>
            </div>
            {selectedDay.accommodation && (
              <span className="location-pill"><MapPin aria-hidden="true" size={13} />{selectedDay.accommodation}</span>
            )}
          </header>

          <div className="day-progress-summary">
            <span>{isHydrated ? `${dayProgress.done} of ${dayProgress.total} activities complete` : "Loading day progress…"}</span>
            <strong>{isHydrated ? `${dayProgress.percent}%` : "—"}</strong>
          </div>
          <div aria-hidden="true" className="day-progress-track">
            <span style={{ width: isHydrated ? `${dayProgress.percent}%` : "0%" }} />
          </div>

          <div className="activity-groups">
            {selectedDay.groups.map((group) => (
              <ActivityList
                completed={completed}
                day={selectedDay}
                group={group}
                isHydrated={isHydrated}
                key={`${selectedDay.id}-${group.key}`}
                onToggle={toggleActivity}
              />
            ))}
          </div>

          {selectedDay.accommodation && (
            <p className="accommodation-note"><BedDouble aria-hidden="true" size={15} /> Overnight in <strong>{selectedDay.accommodation}</strong></p>
          )}

          <footer className="day-detail-footer">
            <p className="local-privacy-note"><LockKeyhole aria-hidden="true" size={13} /> Progress saves on this device</p>
            <div className="day-navigation-buttons">
              <button className="button button-secondary" disabled={selectedDayIndex === 0} onClick={() => moveDay(-1)} type="button">
                <ArrowLeft aria-hidden="true" size={16} /><span>Previous Day</span>
              </button>
              <button className="button button-primary" disabled={selectedDayIndex === TRIP_DAYS.length - 1} onClick={() => moveDay(1)} type="button">
                <span>Next Day</span><ArrowRight aria-hidden="true" size={16} />
              </button>
            </div>
          </footer>
        </article>

        <div className="immigration-callout">
          <span className="document-icon" aria-hidden="true"><FileText size={17} strokeWidth={1.8} /></span>
          <div className="immigration-callout-copy">
            <p className="eyebrow">Ready to print</p>
            <h2>Immigration itinerary</h2>
            <p>A clean, professional summary of your trip.</p>
          </div>
          <Link className="button button-primary" href="/itinerary">View itinerary <ArrowRight aria-hidden="true" size={15} /></Link>
        </div>
      </div>
    </main>
  );
}

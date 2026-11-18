"use client";

import { useMemo } from "react";
import { ArrowUpRight, Check, ChevronDown, ClipboardCheck, ExternalLink, Plane, ShieldCheck } from "lucide-react";
import { AIRPORT_GUIDES, AIRPORT_REFERENCES, DEPARTURE_CHECKLIST } from "@/data/airport-preparation";
import { useTravel } from "@/components/travel-provider";

export function AirportPreparation() {
  const { departureChecks, isHydrated, toggleDepartureCheck } = useTravel();
  const progress = useMemo(() => {
    const complete = DEPARTURE_CHECKLIST.filter((item) => departureChecks[item.id]).length;
    return {
      complete,
      percent: Math.round((complete / DEPARTURE_CHECKLIST.length) * 100),
    };
  }, [departureChecks]);

  return (
    <section aria-labelledby="airport-checklist-title" className="airport-preparation" id="airport-checklist">
      <header className="airport-prep-heading">
        <div>
          <p className="eyebrow">Before we go</p>
          <h2 id="airport-checklist-title">Airport day checklist</h2>
          <p>Check the documents before leaving for NAIA. This checklist saves separately from the daily activity checkboxes.</p>
        </div>
        <div aria-label={`${progress.complete} of ${DEPARTURE_CHECKLIST.length} travel checks complete`} className="airport-prep-progress">
          <span>{isHydrated ? `${progress.complete} / ${DEPARTURE_CHECKLIST.length} ready` : "Loading…"}</span>
          <div
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={isHydrated ? progress.percent : undefined}
            className="airport-prep-progress-track"
            role="progressbar"
          >
            <span style={{ width: isHydrated ? `${progress.percent}%` : "0%" }} />
          </div>
        </div>
      </header>

      <div className="airport-prep-card">
        <div className="airport-prep-notice">
          <span className="airport-prep-notice-icon"><ClipboardCheck aria-hidden="true" size={19} /></span>
          <p>
            <strong>Rule notes assume a Philippine ordinary passport.</strong> If anyone is traveling on a different passport, check that traveler’s entry rules separately. Requirements can change, so use the official links below before departure.
          </p>
        </div>

        <ul aria-label="Pre-travel document checklist" className="departure-checklist">
          {DEPARTURE_CHECKLIST.map((item) => {
            const checkboxId = `departure-check-${item.id}`;
            const checked = Boolean(departureChecks[item.id]);
            return (
              <li className={`departure-check-row${checked ? " is-checked" : ""}`} key={item.id}>
                <label className="departure-check-label" htmlFor={checkboxId}>
                  <input
                    checked={checked}
                    disabled={!isHydrated}
                    id={checkboxId}
                    onChange={() => toggleDepartureCheck(item.id)}
                    type="checkbox"
                  />
                  <span className="departure-check-copy">
                    <span className="departure-check-title">
                      {item.title}
                      {item.optional && <span className="departure-optional-tag">Optional backup</span>}
                    </span>
                    <span className="departure-check-detail">{item.detail}</span>
                  </span>
                </label>
                {item.references && (
                  <div className="departure-check-links">
                    {item.references.map((reference) => (
                      <a href={reference.href} key={reference.href} rel="noopener noreferrer" target="_blank">
                        {reference.label}<ArrowUpRight aria-hidden="true" size={13} />
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="airport-guide-heading">
          <span className="airport-guide-heading-icon"><Plane aria-hidden="true" size={18} /></span>
          <div>
            <p className="eyebrow">Where to go and what happens next</p>
            <h3>Airport steps, from check-in to arrivals</h3>
          </div>
        </div>

        <div className="airport-guide-list">
          {AIRPORT_GUIDES.map((guide, index) => (
            <details className="airport-guide-card" key={guide.id} open={index === 0}>
              <summary>
                <span aria-hidden="true" className="airport-guide-number">{index + 1}</span>
                <span className="airport-guide-summary-copy">
                  <strong>{guide.title}</strong>
                  <small>{guide.summary}</small>
                </span>
                <ChevronDown aria-hidden="true" className="airport-guide-chevron" size={19} />
              </summary>
              <ol className="airport-guide-steps">
                {guide.steps.map((step) => (
                  <li key={step.title}>
                    <span aria-hidden="true" className="airport-guide-step-marker"><Check size={13} /></span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </div>

        <aside className="airport-docs-note">
          <ShieldCheck aria-hidden="true" size={18} />
          <p><strong>About the COE:</strong> it is included as optional supporting evidence because it appears on your reminder list. The Bureau of Immigration says it is not a standard extra document required from every regular tourist.</p>
        </aside>

        <nav aria-label="Official travel forms and airport information" className="airport-official-links">
          <span>Official links</span>
          {AIRPORT_REFERENCES.map((reference) => (
            <a href={reference.href} key={reference.href} rel="noopener noreferrer" target="_blank">
              <ExternalLink aria-hidden="true" size={13} />{reference.label}
            </a>
          ))}
        </nav>

        <p className="airport-rules-date">Requirements checked November 18, 2026. Recheck the official guidance and your airline’s instructions before the flight.</p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { useTravel } from "@/components/travel-provider";
import type { TravelerSettings } from "@/types/trip";

export function SettingsDialog({ onClose }: { onClose: () => void }) {
  const { isHydrated, saveSettings, settings } = useTravel();
  const [draft, setDraft] = useState<TravelerSettings>(settings);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const selector = 'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
    const focusable = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(selector)) : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function updateField(field: Exclude<keyof TravelerSettings, "travelerNames">, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateTravelerName(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      travelerNames: current.travelerNames.map((name, nameIndex) => nameIndex === index ? value : name),
    }));
  }

  function addTraveler() {
    setDraft((current) => ({ ...current, travelerNames: [...current.travelerNames, ""] }));
  }

  function removeTraveler(index: number) {
    if (draft.travelerNames.length <= 1) return;
    setDraft((current) => ({
      ...current,
      travelerNames: current.travelerNames.filter((_, nameIndex) => nameIndex !== index),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSettings(
      Object.fromEntries(
        Object.entries(draft).map(([key, value]) => [
          key,
          Array.isArray(value)
            ? value.map((name) => name.trim()).filter(Boolean)
            : value.trim(),
        ]),
      ) as TravelerSettings,
    );
    onClose();
  }

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="settings-title"
        aria-modal="true"
        className="settings-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="settings-dialog-heading">
          <div>
            <p className="eyebrow">Optional trip details</p>
            <h2 id="settings-title">Your travel settings</h2>
          </div>
          <button
            aria-label="Close settings"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>

        <p className="settings-description">
          Your trip details are prefilled. Changes you make here stay in this browser.
        </p>

        <form className="settings-form" onSubmit={handleSubmit}>
          <fieldset className="settings-fieldset">
            <legend>Travelers</legend>
            <div className="settings-traveler-list">
              {draft.travelerNames.map((name, index) => (
                <div className="settings-traveler-row" key={`traveler-${index}`}>
                  <label className="form-field" htmlFor={`traveler-name-${index}`}>
                    <span>Traveler {index + 1}</span>
                    <input
                      autoComplete={index === 0 ? "name" : "off"}
                      id={`traveler-name-${index}`}
                      onChange={(event) => updateTravelerName(index, event.target.value)}
                      type="text"
                      value={name}
                    />
                  </label>
                  <button
                    aria-label={`Remove traveler ${index + 1}`}
                    className="icon-button settings-remove-traveler"
                    disabled={draft.travelerNames.length === 1}
                    onClick={() => removeTraveler(index)}
                    type="button"
                  >
                    <X aria-hidden="true" size={17} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="button button-secondary settings-add-traveler"
              onClick={addTraveler}
              type="button"
            >
              <Plus aria-hidden="true" size={16} /> Add traveler
            </button>
          </fieldset>

          <fieldset className="settings-fieldset">
            <legend>Tour guide</legend>
            <label className="form-field" htmlFor="tour-guide-name">
              <span>Name</span>
              <input
                autoComplete="name"
                id="tour-guide-name"
                onChange={(event) => updateField("tourGuideName", event.target.value)}
                type="text"
                value={draft.tourGuideName}
              />
            </label>
            <label className="form-field" htmlFor="tour-guide-instagram">
              <span>Instagram profile link</span>
              <input
                autoCapitalize="none"
                autoComplete="url"
                id="tour-guide-instagram"
                onChange={(event) => updateField("tourGuideInstagram", event.target.value)}
                placeholder="https://www.instagram.com/…"
                spellCheck={false}
                type="url"
                value={draft.tourGuideInstagram}
              />
            </label>
          </fieldset>

          <div className="settings-field-pair">
            <label className="form-field" htmlFor="outbound-flight">
              <span>Outbound flight number</span>
              <input
                id="outbound-flight"
                onChange={(event) => updateField("outboundFlight", event.target.value)}
                type="text"
                value={draft.outboundFlight}
              />
            </label>
            <label className="form-field" htmlFor="return-flight">
              <span>Return flight number</span>
              <input
                id="return-flight"
                onChange={(event) => updateField("returnFlight", event.target.value)}
                type="text"
                value={draft.returnFlight}
              />
            </label>
          </div>

          <fieldset className="settings-fieldset">
            <legend>Ubud accommodation</legend>
            <label className="form-field" htmlFor="ubud-hotel-name">
              <span>Hotel name</span>
              <input
                id="ubud-hotel-name"
                onChange={(event) => updateField("ubudHotelName", event.target.value)}
                type="text"
                value={draft.ubudHotelName}
              />
            </label>
            <label className="form-field" htmlFor="ubud-hotel-address">
              <span>Hotel address</span>
              <textarea
                id="ubud-hotel-address"
                onChange={(event) => updateField("ubudHotelAddress", event.target.value)}
                rows={2}
                value={draft.ubudHotelAddress}
              />
            </label>
          </fieldset>

          <fieldset className="settings-fieldset">
            <legend>Seminyak accommodation</legend>
            <label className="form-field" htmlFor="seminyak-hotel-name">
              <span>Hotel name</span>
              <input
                id="seminyak-hotel-name"
                onChange={(event) => updateField("seminyakHotelName", event.target.value)}
                type="text"
                value={draft.seminyakHotelName}
              />
            </label>
            <label className="form-field" htmlFor="seminyak-hotel-address">
              <span>Hotel address</span>
              <textarea
                id="seminyak-hotel-address"
                onChange={(event) => updateField("seminyakHotelAddress", event.target.value)}
                rows={2}
                value={draft.seminyakHotelAddress}
              />
            </label>
          </fieldset>

          <div className="settings-dialog-footer">
            <span className="settings-local-note">Edits save on this device only.</span>
            <div className="button-row">
              <button className="button button-secondary" onClick={onClose} type="button">
                Cancel
              </button>
              <button className="button button-primary" disabled={!isHydrated} type="submit">
                Save details
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

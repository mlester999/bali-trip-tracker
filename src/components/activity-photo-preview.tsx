"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import { ACTIVITY_GALLERIES } from "@/data/activity-galleries";
import type { ActivityGalleryKey } from "@/types/trip";

function PhotoGalleryModal({
  activityId,
  activityTitle,
  gallery,
  onClose,
}: {
  activityId: string;
  activityTitle: string;
  gallery: (typeof ACTIVITY_GALLERIES)[ActivityGalleryKey];
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const activePhoto = gallery[activeIndex] ?? gallery[0];
  const titleId = `photo-gallery-title-${activityId}`;

  const movePhoto = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePhoto(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        movePhoto(1);
      } else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [movePhoto, onClose]);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches.item(0)?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches.item(0)?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;
    const distance = endX - startX;
    if (Math.abs(distance) > 45) movePhoto(distance < 0 ? 1 : -1);
  }

  return (
    <div
      className="photo-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="photo-gallery-modal"
        ref={dialogRef}
        role="dialog"
      >
        <header className="photo-modal-header">
          <div>
            <p className="photo-modal-kicker">Activity photos · {activeIndex + 1} of {gallery.length}</p>
            <h2 id={titleId}>{activityTitle}</h2>
          </div>
          <button
            aria-label="Close photo gallery"
            className="photo-modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="photo-modal-carousel">
          <button
            aria-label="Previous photo"
            className="photo-modal-arrow photo-modal-arrow-previous"
            onClick={() => movePhoto(-1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={23} />
          </button>
          <div
            className="photo-modal-image-frame"
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
          >
            <Image
              alt={activePhoto.alt}
              className="photo-modal-image"
              fill
              priority
              sizes="(max-width: 720px) 90vw, 820px"
              src={activePhoto.src}
            />
          </div>
          <button
            aria-label="Next photo"
            className="photo-modal-arrow photo-modal-arrow-next"
            onClick={() => movePhoto(1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={23} />
          </button>
        </div>

        <footer className="photo-modal-footer">
          <p aria-live="polite">{activePhoto.caption}</p>
          <div aria-label="Choose a photo" className="photo-modal-dots" role="group">
            {gallery.map((photo, index) => (
              <button
                aria-current={index === activeIndex ? "true" : undefined}
                aria-label={`Show photo ${index + 1}: ${photo.caption}`}
                className={index === activeIndex ? "is-active" : ""}
                key={photo.src}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>
        </footer>
      </section>
    </div>
  );
}

export function ActivityPhotoPreview({
  activityId,
  activityTitle,
  galleryKey,
}: {
  activityId: string;
  activityTitle: string;
  galleryKey: ActivityGalleryKey;
}) {
  const gallery = ACTIVITY_GALLERIES[galleryKey];
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function closeGallery() {
    setModalOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <div className="activity-photo-widget">
      <button
        aria-label={`View ${gallery.length} photos of ${activityTitle}`}
        className="activity-photo-trigger"
        onClick={() => setModalOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <ImageIcon aria-hidden="true" size={16} />
        <span>Photos</span>
        <span className="activity-photo-count">{gallery.length}</span>
      </button>
      <div aria-hidden="true" className="activity-hover-preview">
        <div className="activity-hover-preview-image">
          <Image alt="" fill sizes="320px" src={gallery[0].src} />
        </div>
        <span>{gallery.length} photos · open carousel</span>
      </div>
      {modalOpen && (
        <PhotoGalleryModal
          activityId={activityId}
          activityTitle={activityTitle}
          gallery={gallery}
          onClose={closeGallery}
        />
      )}
    </div>
  );
}

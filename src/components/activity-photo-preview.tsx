"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { ACTIVITY_GALLERIES } from "@/data/activity-galleries";
import type { ActivityGalleryKey } from "@/types/trip";

export function ActivityPhotoPreview({
  activityId,
  activityTitle,
  galleryKey,
  initialIndex = 0,
}: {
  activityId: string;
  activityTitle: string;
  galleryKey: ActivityGalleryKey;
  initialIndex?: number;
}) {
  const gallery = ACTIVITY_GALLERIES[galleryKey];
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isOpen, setIsOpen] = useState(false);
  const image = gallery[activeIndex] ?? gallery[0];
  const previewId = `activity-photo-${activityId}`;

  function moveImage(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length);
  }

  return (
    <div className={`activity-photo-widget${isOpen ? " is-open" : ""}`}>
      <button
        aria-controls={previewId}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Hide" : "Show"} photo preview for ${activityTitle}`}
        className="activity-photo-trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <ImageIcon aria-hidden="true" size={16} />
        <span className="activity-photo-trigger-label">Photos</span>
      </button>

      <div aria-label={`${activityTitle} photo preview`} className="activity-image-preview" id={previewId}>
        <div className="activity-photo-frame">
          <Image
            alt={image.alt}
            className="activity-photo-image"
            fill
            sizes="(max-width: 720px) 82vw, 340px"
            src={image.src}
          />
        </div>
        <div className="activity-photo-caption">
          <span>{image.caption}</span>
          {gallery.length > 1 && (
            <div aria-label="Photo carousel" className="activity-gallery-controls" role="group">
              <button aria-label="Previous photo" onClick={() => moveImage(-1)} type="button">
                <ChevronLeft aria-hidden="true" size={15} />
              </button>
              <span aria-live="polite">{activeIndex + 1} / {gallery.length}</span>
              <button aria-label="Next photo" onClick={() => moveImage(1)} type="button">
                <ChevronRight aria-hidden="true" size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

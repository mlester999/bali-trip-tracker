import type { ActivityGalleryKey } from "@/types/trip";

export type ActivityPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const ACTIVITY_GALLERIES: Record<ActivityGalleryKey, ActivityPhoto[]> = {
  waterfalls: [
    {
      src: "/images/bali-waterfall.webp",
      alt: "A tiered waterfall flowing into a jungle pool in Bali",
      caption: "Bali jungle waterfall",
    },
  ],
  "rice-terraces": [
    {
      src: "/images/bali-hero.webp",
      alt: "Lush Bali rice terraces with palm trees and distant volcanic hills",
      caption: "Ubud rice terraces",
    },
  ],
  "cretya-pool": [
    {
      src: "/images/ubud-infinity-pool.webp",
      alt: "An infinity pool overlooking green rice terraces in Ubud",
      caption: "Ubud infinity pool",
    },
  ],
  atv: [
    {
      src: "/images/ubud-atv.webp",
      alt: "Two helmeted riders on an ATV along a jungle trail in Bali",
      caption: "Tandem ATV trail",
    },
  ],
  "ubud-exploration": [
    {
      src: "/images/ubud-palace.webp",
      alt: "A carved Balinese palace entrance in Ubud",
      caption: "Ubud Palace",
    },
    {
      src: "/images/ubud-monkey-forest.webp",
      alt: "A macaque beside a moss-covered temple gate in Ubud's forest",
      caption: "Sacred Monkey Forest",
    },
  ],
  "nusa-penida": [
    {
      src: "/images/nusa-penida-kelingking.webp",
      alt: "The green cliffs and turquoise coast at Kelingking Beach",
      caption: "Kelingking viewpoint",
    },
    {
      src: "/images/nusa-penida-broken-beach.webp",
      alt: "A natural limestone arch surrounding a blue cove on Nusa Penida",
      caption: "Broken Beach and Angel's Billabong coast",
    },
    {
      src: "/images/nusa-penida-crystal-bay.webp",
      alt: "Clear blue water and green headlands at Crystal Bay",
      caption: "Crystal Bay",
    },
  ],
};

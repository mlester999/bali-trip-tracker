import type { ActivityGalleryKey } from "@/types/trip";

export type ActivityPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const ACTIVITY_GALLERIES: Record<ActivityGalleryKey, ActivityPhoto[]> = {
  "kanto-lampo": [
    {
      src: "/images/bali-waterfall.webp",
      alt: "Tiered jungle waterfall flowing into a natural pool in Bali",
      caption: "Kanto Lampo · waterfall tiers",
    },
    {
      src: "/images/kanto-lampo-2.webp",
      alt: "Broad stepped cascades over dark volcanic rock at Kanto Lampo",
      caption: "Kanto Lampo · lower cascade",
    },
  ],
  tibumana: [
    {
      src: "/images/tibumana-1.webp",
      alt: "Tibumana's single waterfall dropping into a calm jungle pool",
      caption: "Tibumana · main falls",
    },
    {
      src: "/images/tibumana-2.webp",
      alt: "A slender waterfall viewed through tropical leaves at Tibumana",
      caption: "Tibumana · forest view",
    },
  ],
  "alas-harum": [
    {
      src: "/images/alas-harum-1.webp",
      alt: "Layered emerald rice paddies and palms at Alas Harum in Ubud",
      caption: "Alas Harum · terrace walk",
    },
    {
      src: "/images/alas-harum-2.webp",
      alt: "Close view across sculpted green rice terraces at Alas Harum",
      caption: "Alas Harum · valley terraces",
    },
  ],
  "cretya-pool": [
    {
      src: "/images/ubud-infinity-pool.webp",
      alt: "Ubud infinity pool overlooking rice terraces and palms",
      caption: "Cretya Ubud · infinity pool",
    },
    {
      src: "/images/cretya-ubud-2.webp",
      alt: "Turquoise jungle infinity pool above green Ubud rice fields",
      caption: "Cretya Ubud · terrace view",
    },
  ],
  "bali-swing": [
    {
      src: "/images/bali-swing-1.webp",
      alt: "A Bali Swing over a green Ubud valley with a rider seen from behind",
      caption: "Bali Swing · valley ride",
    },
    {
      src: "/images/bali-swing-2.webp",
      alt: "A long swing over the tropical canopy and terraced hills near Ubud",
      caption: "Bali Swing · jungle canopy",
    },
  ],
  atv: [
    {
      src: "/images/ubud-atv.webp",
      alt: "Two helmeted riders on a tandem ATV along a jungle trail in Bali",
      caption: "Tandem ATV · jungle trail",
    },
    {
      src: "/images/ubud-atv-2.webp",
      alt: "A helmeted tandem ATV crossing a shallow stream in Ubud",
      caption: "Tandem ATV · stream crossing",
    },
  ],
  "monkey-forest": [
    {
      src: "/images/ubud-monkey-forest.webp",
      alt: "A macaque beside a moss-covered temple gate in Ubud's forest",
      caption: "Sacred Monkey Forest · temple path",
    },
    {
      src: "/images/monkey-forest-2.webp",
      alt: "A long-tailed macaque resting on a carved stone wall in Ubud",
      caption: "Sacred Monkey Forest · macaque",
    },
  ],
  "ubud-palace": [
    {
      src: "/images/ubud-palace.webp",
      alt: "A carved Balinese palace entrance in Ubud",
      caption: "Ubud Palace · carved gate",
    },
    {
      src: "/images/ubud-palace-2.webp",
      alt: "An ornate Balinese palace courtyard framed by tropical gardens",
      caption: "Ubud Palace · courtyard",
    },
  ],
  "ubud-market": [
    {
      src: "/images/ubud-market-1.webp",
      alt: "Colorful fruit, flowers, and produce at a traditional Ubud market",
      caption: "Ubud Market · produce stalls",
    },
    {
      src: "/images/ubud-market-2.webp",
      alt: "Handcrafted baskets and textiles along a traditional Ubud market lane",
      caption: "Ubud Market · local crafts",
    },
  ],
  "ubud-cafe": [
    {
      src: "/images/ubud-cafe-1.webp",
      alt: "Coffee and a pastry on an open-air cafe terrace in Ubud",
      caption: "Ubud café · garden terrace",
    },
    {
      src: "/images/ubud-cafe-2.webp",
      alt: "Coffee on a shaded Ubud cafe terrace beside rice fields",
      caption: "Ubud café · rice field view",
    },
  ],
  kelingking: [
    {
      src: "/images/nusa-penida-kelingking.webp",
      alt: "The green T-rex-shaped cliffs and turquoise coast at Kelingking Beach",
      caption: "Kelingking · cliff viewpoint",
    },
    {
      src: "/images/kelingking-2.webp",
      alt: "A second viewpoint across Kelingking's limestone headland and ocean",
      caption: "Kelingking · ocean view",
    },
  ],
  "broken-beach": [
    {
      src: "/images/nusa-penida-broken-beach.webp",
      alt: "A natural limestone arch surrounding a blue cove on Nusa Penida",
      caption: "Broken Beach · sea arch",
    },
    {
      src: "/images/broken-beach-2.webp",
      alt: "A circular turquoise cove enclosed by the limestone cliffs at Broken Beach",
      caption: "Broken Beach · cliff cove",
    },
  ],
  "angels-billabong": [
    {
      src: "/images/angels-billabong-1.webp",
      alt: "The natural emerald rock pool at Angel's Billabong on Nusa Penida",
      caption: "Angel's Billabong · tidal pool",
    },
    {
      src: "/images/angels-billabong-2.webp",
      alt: "Clear water across sculpted limestone shelves at Angel's Billabong",
      caption: "Angel's Billabong · limestone pool",
    },
  ],
  "crystal-bay": [
    {
      src: "/images/nusa-penida-crystal-bay.webp",
      alt: "Clear blue water and green headlands at Crystal Bay",
      caption: "Crystal Bay · shoreline",
    },
    {
      src: "/images/crystal-bay-2.webp",
      alt: "A curved sandy beach and clear blue water at Crystal Bay on Nusa Penida",
      caption: "Crystal Bay · bay view",
    },
  ],
};

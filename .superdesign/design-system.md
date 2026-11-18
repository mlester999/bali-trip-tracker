# Our Bali Adventure 2026 — Design System

## Product context
A lightweight private trip planner for two travelers visiting Bali from November 27 to December 1, 2026. The same product has two jobs: help the travelers follow an interactive daily plan and provide a factual, polished itinerary they can print for Philippine Immigration. No account, external service, image gallery, photos, database, or invented booking details.

## Audience and platform
Travelers will primarily use the itinerary on a phone. The immigration document must read well on mobile and print as a clean A4 page. The product is a responsive web application with a shared, simple navigation: Home, Daily Itinerary, Travel Itinerary.

## Information architecture
- `/`: trip overview with dates, destination, live countdown, saved overall completion, daily itinerary cards, quick day navigation, and a clear link to the immigration document. The daily itinerary view includes morning, afternoon, and evening activity groups, completion controls, per-day completion, Google Maps search links for major attractions, and prominent previous/next navigation. Activity completion is stored locally in the browser.
- `/itinerary`: formal document with destination, dates, tourism purpose, accommodation locations, a daily factual schedule, and the return flight time. Traveler names, flight numbers, hotel names, and addresses appear only when travelers enter them in local settings. The route includes print and PDF actions, but hides application navigation and controls in print output.
- Optional trip settings are compact, easy to find, and clearly local to the device.

## Visual direction
Minimal, warm, and quietly premium, with a Bali-inspired botanical palette. Use typography, restrained line icons, soft geometry, generous whitespace, and a few fine gold details instead of photographs, illustrations, or busy dashboard decoration. Avoid heavy gradients, dense card grids, excessive rounding, noisy textures, and decorative animation. Interactions should be subtle and respect reduced-motion preferences.

## Color tokens
- Page background: warm cream `#F7F6F0`
- Surface: white `#FFFFFF`
- Primary jungle green: `#284B3A`
- Deep green text: `#20372B`
- Muted text: `#6F7D71`
- Gold highlight: `#B69A60`
- Pale sage: `#E8EEE6`
- Border: `#E5E8E0`
- Focus ring: `#527A61`
Use dark green for primary actions and headings, gold sparingly for small markers and separators, and maintain accessible contrast.

## Typography
Use a dependable system sans-serif stack for interface text, with a calm editorial scale and clear date labels. Use a restrained serif display face (Georgia with system fallbacks) only for the main trip title or one section heading, if it improves hierarchy. Do not load remote fonts. Body copy is readable at 16px or larger where space allows; metadata remains comfortably legible.

## Layout and components
- Mobile-first single-column flow, expanding into balanced two-column sections only where the content benefits.
- Center the main application in a readable max-width container with comfortable gutters.
- Keep the navigation compact, clear, and usable by touch. Use text labels and small Lucide-style line icons.
- Use rounded cards with modest radii, thin borders, and soft, restrained shadows.
- Treat day cards and activity rows as structured itinerary content, not analytics widgets. Make date, day number, title, lodging location, and completion state easy to scan.
- Give the current day a quiet green/sage emphasis; keep optional activities clearly marked as optional.
- Use visible keyboard focus, semantic headings, labeled controls, and large touch targets.

## Immigration document
Use a separate, white, document-like layout with formal typography, thin dividers, simple metadata blocks, and chronological day entries. Keep wording factual. Include no checkbox, progress, interactive activity controls, photo, booking warning, fabricated flight number, or unentered traveler/accommodation detail. The A4 print stylesheet should remove navigation, settings, and buttons, preserve readable line breaks, and avoid splitting a day section when possible.

## Motion and behavior
Use short opacity/color transitions only for hover and focus feedback. Do not animate page content on entry, use parallax, or add decorative movement. All controls must work without motion.

## Product constraints
- Next.js App Router, TypeScript, Tailwind CSS, Lucide React.
- Browser localStorage only for activity progress and optional personal details.
- No backend, database, authentication, paid APIs, Docker, or image generation.
- Use exact itinerary content from the user brief; never fill unknown bookings with sample or placeholder facts.

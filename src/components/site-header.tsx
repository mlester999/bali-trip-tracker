"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Settings2 } from "lucide-react";
import { SettingsDialog } from "@/components/settings-dialog";
import { useTravel } from "@/components/travel-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { isHydrated } = useTravel();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className={`site-header no-print${pathname === "/itinerary" ? " is-document-header" : " is-home-header"}`}>
        <div className="site-header-inner">
          <Link aria-label="Our Bali Adventure 2026 home" className="brand-link" href="/">
            <span className="brand-mark"><Leaf aria-hidden="true" size={19} strokeWidth={1.8} /></span>
            <span className="brand-copy">
              <span>Our Bali</span>
              <small>Adventure · 2026</small>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="site-nav">
            <Link aria-current={pathname === "/" ? "page" : undefined} href="/">
              Home
            </Link>
            <Link href="/#daily-itinerary">Daily Itinerary</Link>
            <Link aria-current={pathname === "/itinerary" ? "page" : undefined} href="/itinerary">
              Travel Itinerary
            </Link>
          </nav>

          <button
            aria-expanded={settingsOpen}
            aria-haspopup="dialog"
            className="settings-button"
            disabled={!isHydrated}
            onClick={() => setSettingsOpen(true)}
            type="button"
          >
            <Settings2 aria-hidden="true" size={17} />
            <span>Settings</span>
          </button>
        </div>
      </header>
      {settingsOpen && <SettingsDialog onClose={() => setSettingsOpen(false)} />}
    </>
  );
}

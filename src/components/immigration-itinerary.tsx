"use client";

import { useState } from "react";
import { Download, Printer } from "lucide-react";
import { IMMIGRATION_DAYS } from "@/data/itinerary";
import { useTravel } from "@/components/travel-provider";
import type { TravelerSettings } from "@/types/trip";

type OptionalDetail = { label: string; value: string; link?: string };

function isInstagramProfileUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "www.instagram.com";
  } catch {
    return false;
  }
}

function savedDetails(settings: TravelerSettings): OptionalDetail[] {
  const details: OptionalDetail[] = [];
  if (settings.travelerNames.trim()) {
    details.push({ label: "Travelers", value: settings.travelerNames.trim() });
  }
  const tourGuideName = settings.tourGuideName.trim();
  const tourGuideInstagram = settings.tourGuideInstagram.trim();
  if (tourGuideName || tourGuideInstagram) {
    details.push({
      label: "Tour guide",
      value: tourGuideName,
      ...(isInstagramProfileUrl(tourGuideInstagram) ? { link: tourGuideInstagram } : {}),
    });
  }
  if (settings.outboundFlight.trim()) {
    details.push({ label: "Outbound flight number", value: settings.outboundFlight.trim() });
  }
  if (settings.returnFlight.trim()) {
    details.push({ label: "Return flight number", value: settings.returnFlight.trim() });
  }

  const ubud = [settings.ubudHotelName.trim(), settings.ubudHotelAddress.trim()].filter(Boolean);
  if (ubud.length) details.push({ label: "Ubud accommodation", value: ubud.join(" · ") });

  const seminyak = [settings.seminyakHotelName.trim(), settings.seminyakHotelAddress.trim()].filter(Boolean);
  if (seminyak.length) details.push({ label: "Seminyak accommodation", value: seminyak.join(" · ") });

  return details;
}

export function ImmigrationItinerary() {
  const { settings } = useTravel();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const extraDetails = savedDetails(settings);

  async function downloadPdf() {
    setPdfError("");
    setIsGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const margin = 18;
      const contentWidth = 174;
      const pageBottom = 278;
      const bodyLineHeight = 5.2;
      let y = 20;

      function addPage() {
        pdf.addPage();
        y = 19;
      }

      function addText(
        text: string,
        options: { size?: number; bold?: boolean; color?: [number, number, number]; gapAfter?: number } = {},
      ) {
        const { size = 10, bold = false, color = [37, 55, 44], gapAfter = 2 } = options;
        const lines = pdf.splitTextToSize(text, contentWidth);
        const height = lines.length * bodyLineHeight;
        if (y + height > pageBottom) addPage();
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        pdf.text(lines, margin, y);
        y += height + gapAfter;
      }

      function addSectionHeading(label: string) {
        if (y + 9 > pageBottom) addPage();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(104, 119, 107);
        pdf.text(label.toUpperCase(), margin, y);
        y += 6;
      }

      pdf.setFillColor(40, 75, 58);
      pdf.roundedRect(margin, y - 1, 8, 1.5, 0.5, 0.5, "F");
      y += 8;
      pdf.setFont("times", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(32, 55, 43);
      const titleLines = pdf.splitTextToSize("BALI, INDONESIA - TRAVEL ITINERARY", contentWidth);
      pdf.text(titleLines, margin, y);
      y += titleLines.length * 8 + 2;
      addText("Our Bali Adventure 2026", { size: 11, color: [87, 105, 92], gapAfter: 7 });

      addSectionHeading("Trip information");
      addText("Destination: Bali, Indonesia", { size: 10, gapAfter: 1 });
      addText("Travel dates: November 27 - December 1, 2026", { size: 10, gapAfter: 1 });
      addText("Purpose: Tourism / Leisure", { size: 10, gapAfter: 1 });
      addText("Accommodation locations: Ubud and Seminyak", { size: 10, gapAfter: 1 });

      if (extraDetails.length > 0) {
        y += 3;
        addSectionHeading("Traveler and booking details");
        for (const detail of extraDetails) {
          const value = [
            detail.value,
            ...(detail.link ? [`Instagram: ${detail.link}`] : []),
          ].filter(Boolean).join(" · ");
          addText(`${detail.label}: ${value}`, { size: 9.5, gapAfter: 1.5 });
        }
      }

      y += 6;
      addSectionHeading("Daily itinerary");
      for (const day of IMMIGRATION_DAYS) {
        const detailLines = day.details.map((detail) => pdf.splitTextToSize(`- ${detail}`, contentWidth - 3));
        const blockHeight = 8 + detailLines.reduce((total, lines) => total + lines.length * bodyLineHeight + 1, 0) + 4;
        if (y + blockHeight > pageBottom) addPage();

        pdf.setDrawColor(226, 231, 224);
        pdf.setLineWidth(0.3);
        pdf.line(margin, y, margin + contentWidth, y);
        y += 5;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(40, 75, 58);
        pdf.text(`${day.weekday}, ${day.date}`, margin, y);
        y += 6;

        for (const lines of detailLines) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9.5);
          pdf.setTextColor(47, 63, 52);
          pdf.text(lines, margin + 2, y);
          y += lines.length * bodyLineHeight + 1;
        }
        y += 3;
      }

      const totalPages = pdf.getNumberOfPages();
      for (let page = 1; page <= totalPages; page += 1) {
        pdf.setPage(page);
        pdf.setDrawColor(226, 231, 224);
        pdf.setLineWidth(0.3);
        pdf.line(margin, 285, margin + contentWidth, 285);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(111, 125, 113);
        pdf.text("Our Bali Adventure 2026", margin, 290);
        pdf.text(`Page ${page} of ${totalPages}`, margin + contentWidth, 290, { align: "right" });
      }

      pdf.save("Bali-Travel-Itinerary-2026.pdf");
    } catch {
      setPdfError("The PDF could not be generated. Please use Print / Save as PDF instead.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <main className="immigration-page">
      <div className="immigration-document" id="immigration-document">
        <div className="document-overline"><span /> Personal travel plan</div>
        <header className="document-heading">
          <p className="document-kicker">Tourism · Indonesia</p>
          <h1>BALI, INDONESIA — TRAVEL ITINERARY</h1>
          <p className="document-subtitle">Our Bali Adventure 2026</p>
        </header>

        <section aria-label="Trip information" className="document-facts">
          <div><span>Destination</span><strong>Bali, Indonesia</strong></div>
          <div><span>Travel dates</span><strong>November 27 – December 1, 2026</strong></div>
          <div><span>Purpose</span><strong>Tourism / Leisure</strong></div>
          <div><span>Accommodation locations</span><strong>Ubud and Seminyak</strong></div>
        </section>

        {extraDetails.length > 0 && (
          <section aria-labelledby="optional-details-title" className="document-extra-details">
            <h2 id="optional-details-title">Traveler and travel details</h2>
            <dl>
              {extraDetails.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>
                    {detail.value}
                    {detail.link && (
                      <>
                        {detail.value ? " · " : ""}
                        <a href={detail.link} rel="noreferrer" target="_blank">Instagram profile</a>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section aria-labelledby="daily-summary-title" className="document-daily-list">
          <div className="document-section-heading">
            <p className="eyebrow">Planned schedule</p>
            <h2 id="daily-summary-title">Daily itinerary</h2>
          </div>
          <div className="document-days">
            {IMMIGRATION_DAYS.map((day) => (
              <article className="document-day" key={day.id}>
                <div className="document-day-date">
                  <span>{day.id.slice(-2)}</span>
                  <p><strong>{day.weekday}</strong><small>{day.date}</small></p>
                </div>
                <ul>
                  {day.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer className="document-footer">
          <span>Bali, Indonesia</span>
          <span>November 27 – December 1, 2026</span>
        </footer>
      </div>

      <div className="document-actions no-print">
        <p>Print a clean A4 copy or download the itinerary as a PDF.</p>
        <div className="button-row">
          <button className="button button-secondary" onClick={() => window.print()} type="button">
            <Printer aria-hidden="true" size={16} /> Print itinerary
          </button>
          <button className="button button-primary" disabled={isGeneratingPdf} onClick={downloadPdf} type="button">
            <Download aria-hidden="true" size={16} />
            {isGeneratingPdf ? "Preparing PDF…" : "Download PDF"}
          </button>
        </div>
        <p aria-live="polite" className="pdf-status">{pdfError || (isGeneratingPdf ? "Preparing your document…" : "")}</p>
      </div>
    </main>
  );
}

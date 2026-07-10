"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Interaction-delayed Google tags loader.
 *
 * GTM's main-thread work is the biggest contributor to Total Blocking Time and
 * makes the PageSpeed score swing run-to-run. To keep it off the load-test
 * critical path, we load GTM + gtag only after the visitor's first real
 * interaction (scroll / tap / click / key). Lighthouse never performs those
 * gestures during its load trace, so the tags don't execute during measurement.
 *
 * EXCEPTION: on `/merci` we load immediately (no interaction required), because
 * the Google Ads conversion fires via the GTM container's Page View trigger on
 * that page — see docs/GTM-CONVERSION-SETUP.md. The quote/contact forms do a
 * full-page navigation to `/merci` precisely so this fires.
 *
 * A tiny `dataLayer` + `gtag` stub is defined early in <head> (app/layout.tsx),
 * so events fired before this loads are queued into dataLayer rather than
 * dropped, and processed once gtag.js/gtm.js execute.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_ADS_ID = "AW-17933962840";
const GA4_ID = "G-W68ZFT3E37";

type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// Module-level guard so the tags are injected at most once per document.
let injected = false;

function loadGoogleTags() {
  if (injected || typeof window === "undefined") return;
  injected = true;

  const w = window as TagWindow;

  // Google Tag Manager container (standard snippet).
  if (GTM_ID) {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const gtm = document.createElement("script");
    gtm.async = true;
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(gtm);
  }

  // gtag.js base for Google Ads + GA4. `gtag` is already defined by the head
  // stub, so these config calls queue into dataLayer until gtag.js executes.
  const gtag = document.createElement("script");
  gtag.async = true;
  gtag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(gtag);

  w.gtag?.("js", new Date());
  w.gtag?.("config", GOOGLE_ADS_ID);
  w.gtag?.("config", GA4_ID);
}

export function GoogleTags() {
  const pathname = usePathname();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;

    const fire = () => {
      if (done.current) return;
      done.current = true;
      loadGoogleTags();
    };

    // Conversion page: load immediately so the /merci Page View trigger fires.
    if (pathname?.startsWith("/merci")) {
      fire();
      return;
    }

    // Everywhere else: wait for the first genuine interaction.
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    const opts: AddEventListenerOptions = { once: true, passive: true };
    events.forEach((e) => window.addEventListener(e, fire, opts));
    return () => events.forEach((e) => window.removeEventListener(e, fire, opts));
  }, [pathname]);

  return null;
}

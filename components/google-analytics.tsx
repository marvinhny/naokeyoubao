"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

export const GA_MEASUREMENT_ID = "G-3XTVFRGD36";

const TRACKED_HOSTS = new Set(["naokeyoubao.com", "www.naokeyoubao.com"]);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipInitial = useRef(true);

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(TRACKED_HOSTS.has(window.location.hostname));
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <PageView />
      </Suspense>
    </>
  );
}

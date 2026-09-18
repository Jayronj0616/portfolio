"use client";

import { useEffect, useRef } from "react";
import { logAnalyticsEvent } from "@/app/actions";

/**
 * Fires a page_view once per real browser page load. Deliberately
 * client-side: logging this from the server component would also fire
 * on every build-time prerender and every dev-server request, which
 * counts renders instead of visitors.
 */
export default function PageViewTracker({ path }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    logAnalyticsEvent("page_view", { path });
  }, [path]);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { OpenPanelComponent } from "@openpanel/nextjs";

const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;

/**
 * OpenPanel tracker for the public pages. Renders nothing when the client
 * ID is unset (local dev and Preview, unless you set the Dev / test ID),
 * so only Vercel Production reports real traffic.
 *
 * /admin is skipped so Jayron's own visits never count. Known edge: a
 * client-side navigation from a public page into /admin keeps the script
 * that already loaded. Admin is reached by typing its URL, not through an
 * in-site link, so that does not happen in practice.
 */
export default function AnalyticsScript() {
  const pathname = usePathname();

  if (!clientId || pathname?.startsWith("/admin")) return null;

  return (
    <OpenPanelComponent
      clientId={clientId}
      apiUrl="/api/op"
      scriptUrl="/api/op/op1.js"
      trackScreenViews
      trackOutgoingLinks
      trackAttributes
    />
  );
}

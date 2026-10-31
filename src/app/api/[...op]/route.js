import { createRouteHandler } from "@openpanel/nextjs/server";

// First-party proxy for OpenPanel: serves the tracking script at
// /api/op/op1.js and forwards events to api.openpanel.dev, so blockers
// that match openpanel.dev do not drop them. See AnalyticsScript.jsx.
export const { GET, POST } = createRouteHandler();

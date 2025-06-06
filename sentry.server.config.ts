// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://aaf6303f12393cd0d7e0fbd4a91174d6@o4509446923354112.ingest.de.sentry.io/4509446987382864",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Server-side integrations - browserTracingIntegration is client-side only
  integrations: [
    // Add server-specific integrations here if needed
    // e.g., Sentry.httpIntegration(), Sentry.nodeContextIntegration()
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

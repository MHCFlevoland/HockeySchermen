# Facility API migration

Run `npm install`, copy `.env.example` to `.env.local`, and run `npm run dev` (or `npm run build && npm start`). The Next.js server now handles authenticated HockeyWeerelt requests via same-origin `/api/matches`. **Static export is no longer supported**; deploy to a Node.js-capable host.

The device token is stored server-side in `storage/hockey-token.json`. Use persistent storage and do not commit this file. The screen requests facility 141 by default and refreshes every minute. Existing field names in localStorage are preserved. Without configured fields, names are derived from matches.

**Important:** The uploaded API code does not include the `FacilityResponse` type or a sample response. `lib/facilityMatches.ts` therefore supports several likely response shapes, but its field mapping must be verified against an actual API response. No live upstream authentication or match response was tested. Rate limiting, persistence and authentication should be reviewed for multi-instance deployments. The old club selection screen still uses the legacy API and is not required for the facility-based display.

## Per-screen facility configuration
Set **Facility ID** in `/setup` (default `141`). The generated configuration URL includes `facilityId` alongside `clubId` and `fieldNames`. Each screen calls `/api/matches?facilityId=...`; the Next.js server validates the ID and authenticates/signs upstream requests. `FACILITY_ID` is a server fallback for requests without a facility ID. Do not put API tokens in the configuration link.

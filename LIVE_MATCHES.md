# Live matches

The display polls `/api/matches?facilityId=<configured id>` every 180 seconds (3 minutes). It no longer uses IndexedDB to store matches. Existing setup preferences remain in localStorage.

The score is shown only when a match is marked live and both score values are present. The parser supports common field names (`home_score`, `away_score`, `homeScore`, `awayScore`, `score.home`, `score.away`). **Verify the exact live response shape from HockeyWeerelt**; adjust `lib/facilityMatches.ts` if it differs.

On network errors, the last successfully fetched matches stay on screen with an error message. The server continues to own device registration and signed requests. This implementation has not been tested against a live match response.

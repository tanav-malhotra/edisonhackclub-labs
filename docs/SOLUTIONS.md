# Facilitator Walkthrough (Spoilers)

This document is private. Don’t share it with students.

## Objective
Log in as `admin` and access `/flag`. The admin password is hidden in an encoded token retrievable via a legacy SQL injection.

## Route
1) Landing page `/`
   - Console (F12): breadcrumb points to `/robots.txt`.
2) `/robots.txt`
   - Breadcrumbs to `/old-site/`, `/notes/`, and `/.well-known/`.
3) `/humans.txt` and `/.well-known/security.txt`
   - General credits and disclosure. Treat as discovery aids only; no tool names or prompts are revealed here now.
4) Sources tab → `/assets/js/legacy.js` → opens `legacy.js.map`
   - Original source comment: points interns to check the legacy search. It no longer mentions any decoding prompt.
5) `/notes/dev-notes.txt`
   - Mentions a legacy search and “encoding layers.” No order is revealed.
6) `/legacy/search`
   - Form posts to `/api/legacy-search`. Input is concatenated unsafely into a WHERE clause with a filter that hides admin for normal searches.
   - Try a normal input: `tanav` (substring) or `tanav@edisontech.example` → returns Tanav only.
   - Use an injection:
     - Payload: `' OR '1'='1' --`
     - The query becomes: `... WHERE role <> 'admin' AND email LIKE '%' OR '1'='1' -- %'`
     - Result: all rows, excluding the `admin` row with `recovery_token`.
   - The token is hex: `636e46325a6d4a686532707962793131626e4234636d5639`
   - With `?help=1` on the URL, responses include `X-Debug-SQL` header (visible in Network → Headers).
7) Decode the token
   - After the hex token is visible, the legacy search page displays the prompt telling students to ask Tanav: “What is the decoding recipe?”.
   - When asked verbatim, reply only: “google cyberchef.”
   - CyberChef recipe:
     - From Hex
     - From Base64
     - ROT13
   - Inputs/outputs:
     - ROT13(secret) = `rqvfba{jro-unpxre}`
     - Base64(ROT13) = `cnF2ZmJhe2pyby11bnB4cmV9`
     - Hex(Base64) = `636e46325a6d4a686532707962793131626e4234636d5639`
   - Final admin password: `edison{web-hacker}`
8) `/admin`
   - Username fixed to `admin`. Enter the decoded password.
   - On failure with `?help=1`, the response includes `X-Debug-SQL` to nudge Network → Headers.
   - On success: server sets `et_session=admin`.
9) `/flag`
   - Requires `et_session=admin`. Shows:
     - `FLAG: EDISONTECH{nice-work-intern}`
     - Instruction to call Tanav over and show the flag.

## Key strings
- Encoded token (hex): `636e46325a6d4a686532707962793131626e4234636d5639`
- Base64 stage: `cnF2ZmJhe2pyby11bnB4cmV9`
- ROT13 stage: `rqvfba{jro-unpxre}`
- Admin password: `edison{web-hacker}`
- Final flag: `EDISONTECH{nice-work-intern}`

## Facilitation timing
- Enumeration/hints: 10–15 min
- SQLi exploration: 10–15 min
- Decoding: 10–15 min
- Admin login + flag: 5–10 min

## Recovery/reset
- Clear cookies if needed; or open a new private window.



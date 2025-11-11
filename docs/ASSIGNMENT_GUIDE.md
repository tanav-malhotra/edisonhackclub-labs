# EdisonTech Web Security Lab — Student Assignment Guide (No Spoilers)

Use this guide to complete the EdisonTech portal security exercise. Read carefully, follow the steps in order, and document what you learn. Do not share answers; focus on the process.

## Lab URL
- EdisonTech portal: https://edisonhackclub.vercel.app

## Objective
- Gain authorized access to the admin portal and retrieve the flag by:
  - Discovering useful endpoints (enumeration)
  - Inspecting client-side assets (DevTools)
  - Testing input handling (legacy search)
  - Interpreting and decoding data appropriately
  - Authenticating correctly

## Rules of Engagement
- Stay within the provided site only. No scanning other domains or networks.
- No password guessing or brute force. Think, test, observe.
- Be respectful: do not disrupt other students.

## What You Need
- Chrome (preferred) or another Chromium-based browser
- Basic comfort with browser DevTools

## What You Must Submit (one PDF or Google Doc)
- A short write-up (bullet points are fine) that includes:
  - The endpoints you discovered and how you found them
  - One or two screenshots from DevTools (Sources or Network) that helped you advance
  - A brief explanation of how you tested the legacy search input safely
  - A high-level description of how you decoded the data (no exact values)
  - A final screenshot of the “flag” page (crop/redact the flag text if instructed by your facilitator)

## Walkthrough (read-first, then execute; no answers provided)

1) Orientation (1–2 min)
   - Visit the lab URL.
   - Open Chrome DevTools (F12). Keep Network, Sources, and Console panels handy.

2) Enumeration (5–10 min)
   - Investigate common discovery files on the site (e.g., indexing/disclosure files).
   - Treat any “Disallow” or listed paths as leads for further exploration.
   - Keep a list of interesting endpoints and what you expect to find there.

3) Client-Side Recon (5–10 min)
   - In DevTools → Sources, browse JavaScript and other static assets.
   - Look for hints in comments and in sourcemaps (often referenced at the bottom of JS files).
   - Capture a screenshot of one client-side clue that influenced your next step.

4) Find the Legacy Surface (3–5 min)
   - Use the clues you collected to locate an older/legacy feature on the site.
   - Load the page and understand what the feature does before testing anything unusual.

5) Input Testing (8–12 min)
   - Start with normal, expected inputs. Observe the Network request/response carefully.
   - Then, design minimal, controlled tests to check how the input is handled server-side.
     - Change one thing at a time.
     - Watch how results change. Take notes.
   - Your goal is to reveal more data than a single, specific entry—without brute force.

6) Data Extraction (5–8 min)
   - If you obtain data for multiple records, review all returned fields.
   - Identify anything that looks like a token or code (consider character set and length).
   - Save the raw token string for the next step.

7) Decoding (5–10 min)
   - Use an online or offline transformation tool to decode the token appropriately.
   - Sequence matters. Keep track of each step and intermediate result.
   - Do not include the actual token or decoded value in your submission—describe your approach instead.
   - Note: If, at some point, the site instructs you to ask the facilitator a specific question, do so exactly as written.

8) Authentication (3–5 min)
   - Return to the portal login.
   - Provide the correct credentials based on your findings.
   - Confirm you receive an authenticated session and are redirected appropriately.

9) Flag and Debrief (3–5 min)
   - Navigate to the protected page and view the flag.
   - Follow the on-screen instruction for completing the challenge with your facilitator.
   - Record what worked well and one idea to harden the system.

## Optional Hints Mode (?help=1)
- If you are stuck and time is running short, you may enable educational hints:
  - Append `?help=1` to a page URL (example: add it to the end of the current page’s address).
  - Then check DevTools → Network → select the latest request → Headers.
  - Look for custom headers that nudge you toward the next step.
- Use this sparingly. The goal is to practice discovery and reasoning first.

## Tips (Non‑Spoiler)
- Read everything—text files, status codes, headers, comments.
- If one approach stalls, revisit earlier clues; you may have missed a subtle hint.
- Change only one variable at a time when testing inputs.
- Keep track of your steps for the write-up (future you will thank you).

## Resetting Your Session
- If you get stuck in a weird state, open an incognito window or clear the site’s cookies, then try again.

## Academic Integrity
- Work independently. Discussion is allowed, but do not share answers or screenshots with the solutions visible.
- Focus on understanding the process. Your write-up should reflect your own steps and thinking.

Good luck—and have fun learning how defenders and attackers think!


---

# Learn As You Go (Concepts You’ll Use)

## What is SQL Injection (SQLi)?
- Many web apps query databases using SQL. If a developer builds a query by concatenating user input directly into the SQL string, attackers can alter its meaning.
- Example pattern (pseudocode):
  - Unsafe: `SELECT * FROM users WHERE email = '` + userInput + `'`
  - If `userInput` contains characters that break out of the quotes and add new logic, the query can return more data than intended.
- How you test safely:
  - Try a normal, valid input first; observe results.
  - Introduce a single quote to see if behavior changes (errors or different filtering).
  - Consider a boolean “always true” condition (a tautology) combined with a SQL line comment (two dashes) to ignore the remainder of the statement.
  - Keep your changes minimal and document the exact request/response.
- Defense in brief:
  - Use parameterized queries/prepared statements.
  - Never build SQL by concatenating raw user input.

## Why legacy pages are risky
- Older features often predate current security practices and may linger after migrations.
- They can leak clues via:
  - Being referenced in `robots.txt`, sitemaps, or documentation notes
  - Client-side code and sourcemaps containing old comments or paths
- Treat legacy areas as high‑value targets for testing input handling and access control.

## DevTools signals to watch
- Network → Headers: Custom headers sometimes convey environment or trace info (in educational environments).
- Network → Response: Helpful error messages can reveal how the server interpreted your input.
- Sources: Sourcemaps link minified code to original sources; comments or filenames may hint at hidden routes or design assumptions.

## Recognizing encodings (no spoiler order)
- Hex encoding: only characters 0–9 and a–f (lowercase/uppercase); even length.
- Base64: letters, digits, `+` or `/` with possible `=` padding at the end.
- Simple substitution ciphers (like ROT13): transform letters to other letters; if output looks like alphabetical gibberish, a rotation might be involved.
- Practical approach:
  - If a value looks like hex, convert from hex first and inspect the result.
  - If you see Base64, decode it; if you get alphabetic gibberish, try a simple letter rotation.
  - Document each step and intermediate output for your write-up (do not share the final secret).

## Sessions and cookies
- After successful login, sites often set a session cookie (sometimes HttpOnly).
- Validate access control:
  - With the cookie: the protected page should load.
  - Without the cookie (incognito or cleared): you should be denied.

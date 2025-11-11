# EdisonTech Corporate Portal — Hack Club Web Break‑In Challenge

Single‑storyline, intentionally vulnerable training site for beginners. Students enumerate the site, exploit a legacy SQL injection to obtain an encoded token, ask Tanav the exact question on the site, decode the token, log in as admin, and retrieve the flag. For classroom use only; take down after the session.

## Quick start

Requirements: Node 18+

```bash
npm install
npm run dev
# open http://localhost:3000
```

Optional:
- Set `ADMIN_PASSWORD` to override the default.

## What students will learn
- Chrome DevTools (F12): Sources, Network → Headers, Console
- Enumeration: robots.txt, humans.txt, .well-known, legacy pages
- SQL injection basics on a deprecated search
- Decoding with a “recipe” they must discover by asking Tanav
- Cookie‑based session gating

## Safety notes
- No real data, no external services.
- Engineered to be classroom‑safe but intentionally vulnerable. Do not reuse any patterns here.

## For students
Read and complete the assignment using the [Student Assignment Guide](docs/ASSIGNMENT_GUIDE.md).

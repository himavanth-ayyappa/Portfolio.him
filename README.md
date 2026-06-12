# Himavanth Ayyappa — Portfolio

Brutalist-editorial portfolio. Next.js 14 (App Router, static export), Tailwind CSS, d3-force.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy (Vercel, free)
```bash
npm i -g vercel
vercel             # follow prompts; framework auto-detected
```
Or push to GitHub and import the repo at vercel.com. Every push redeploys, which also re-syncs the Lab section from GitHub.

## Editing content — no component changes needed
| What | File |
|---|---|
| Name, tagline, links, status, metrics, DRDL bullets, recognition | `data/profile.ts` |
| Projects + case studies | `data/projects.ts` |
| Skill graph nodes/edges | `data/skills.ts` |
| Lab manual entries (no-code builds), excluded repos, education, IIT-M credential link | `data/lab.ts` |
| Resume file | replace `public/resume.pdf` |

## Notes
- Lab auto-syncs public, non-fork repos from `himavanth-ayyappa` at build time (top 18 by recent push). If GitHub is unreachable during build, the site still builds with manual entries only.
- IIT Madras credential: paste the link into `credentialUrl` in `data/lab.ts`.
- Respects `prefers-reduced-motion`; hero graph and skill physics degrade gracefully.

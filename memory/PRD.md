# PRD — SYSTEM O-JDEV

## Original Problem Statement
Premium institutional single-page website for "SYSTEM O-JDEV", a software house specializing in
websites, web systems, landing pages, automations, AI and digital solutions. Visual identity:
Cyber Luxury, futuristic, premium, dark mode, glassmorphism, neon purple, 3D elements, motion design.
Palette: bg #05010D, primary #B026FF, secondary #E35BFF, glow #D646FF. Fonts Inter + Space Grotesk.
References: Stripe, Linear, Vercel, Framer, Supabase, Raycast mixed with cyberpunk neon.

## User Choices
- Single-page with smooth scroll
- Contact form persists to MongoDB
- Placeholder contact info (to be replaced by client)
- Demo/fictional portfolio with stock imagery
- Use uploaded assets (neon logo, 3D coin hero, futuristic city background)

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lucide-react + sonner. Section-based components.
- Backend: FastAPI + MongoDB (motor). `/api/contact` (POST/GET), `/api/status`, `/api/` health.
- Theme via CSS variables in index.css (cyber luxury neon palette, glass/glow/marquee/float utilities).

## Implemented (2026-06-15)
- Sticky blur navbar with neon hover + mobile menu
- Hero: badge, gradient title, CTAs, 3 stat cards, floating 3D coin + city bg + floating code panels
- Infinite-scroll tech marquee (10 techs)
- Services grid (6), Portfolio grid (6, hover zoom/glow), Differentials (4), Process timeline (4)
- About section with glass image card, CTA Premium (pulse glow gradient)
- Contact: 4 channel cards + functional form (saves to MongoDB, toast feedback)
- Footer with auto year, quick links, social links
- SEO title/description, custom fonts, scrollbar, smooth scroll
- Verified: 100% backend (8/8) + frontend critical flows (testing agent iteration_1)

## Personas
- Business owner seeking a high-end digital partner (primary lead)
- Visitor evaluating credibility/portfolio before contacting

## Backlog
- P1: Replace placeholder contact info (WhatsApp/email/Instagram/LinkedIn) with real data
- P1: Email notification on new contact (Resend/SendGrid integration)
- P2: Real portfolio projects with case-study detail pages
- P2: Admin dashboard to view contact submissions
- P2: i18n (PT/EN), blog section, testimonials

## Next Tasks
- Awaiting user feedback on visuals + real content (contacts, portfolio).

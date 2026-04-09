# AgroGuardAI Website

The official website for **AgroGuardAI** — The Intelligence Layer for Global Agriculture.

**Live at:** [agroguardai.com](https://agroguardai.com)

## Overview

AgroGuardAI is an AI-powered agricultural ecosystem consisting of three core products:

- **Agroguard Intelligence** — The agricultural knowledge engine (LLM) trained on global crop data
- **AgroMind** — Conversational AI interface for farmers with multilingual + voice support
- **AgroRobotics** — Autonomous hardware: scout drones, rovers, and sprayer drones

## Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero, ecosystem diagram, product cards, capabilities, use cases |
| Intelligence | `intelligence.html` | Model capabilities, specs, use cases, code example |
| AgroMind | `agromind.html` | Mobile interface mockup, features, supported languages |
| AgroRobotics | `agrorobotics.html` | Hardware fleet, specs, workflow, integration details |
| API Docs | `api.html` | Quick start, authentication, endpoints, model cards |
| Pricing | `pricing.html` | Three tiers (Developer/Growth/Enterprise), comparison table, FAQ |
| Contact | `contact.html` | Contact form, social links, company info |
| Privacy | `privacy.html` | Privacy policy with farm data protections |
| Terms | `terms.html` | Terms of service |

## Tech Stack

- **HTML5** — Semantic, accessible markup (WCAG 2.1 AA)
- **CSS3** — Custom properties design system, responsive (mobile-first)
- **Vanilla JavaScript** — No frameworks, minimal footprint
- **Inter** — Google Fonts (300–900 weights)
- **JetBrains Mono** — Code blocks

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Forest Green | `#228B22` | Primary brand, CTAs |
| Wheat Gold | `#F5DEB3` | Warm accents |
| Soil Brown | `#8B4513` | Secondary, hardware |
| Tech Blue | `#00D9FF` | Tech highlights, API |
| Near Black | `#0A1A0A` | Dark sections |

## Development

No build step required. Open `index.html` in a browser or serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## Deployment

This site is designed for static hosting. Recommended platforms:
- GitHub Pages (with custom domain agroguardai.com)
- Vercel
- Netlify
- Cloudflare Pages

## License

Copyright 2026 AgroGuardAI. All rights reserved.

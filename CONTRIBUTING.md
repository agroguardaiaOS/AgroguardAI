# Contributing to AgroGuardAI

Thank you for your interest in contributing to AgroGuardAI —
an open source AI crop disease diagnosis system built in Nigeria for Africa.

---

## How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit with a clear message (see convention below)
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## What We Most Need

- **African language support** — add to `src/lib/languages.ts`
- **Crop disease datasets** — images from African farms
- **Bug reports and fixes** — open an issue first
- **New AI provider integrations** — add to `src/api/`
- **Documentation translations** — into African languages
- **EdgeAI optimization** — for low-end Android devices

---

## Commit Convention

```
feat: add Amharic language support
fix: camera not starting on Android Chrome
docs: update README installation steps
style: improve chat bubble alignment
refactor: simplify gemini.ts error handling
```

---

## GenAI Disclosure

Per our NLnet grant policy, AI-assisted commits must note the model:

```
Author: Your Name with Claude Sonnet (Anthropic)
feat: add Amharic language support
Prompt: Add Amharic to the languages config with correct BCP-47 code
```

---

## Code Style

- TypeScript for all new files — no plain `.js`
- CSS Modules for all styling — no inline styles
- Keep components small and single-purpose
- Comment complex logic clearly
- Never hardcode API keys

---

## Questions?

Open an issue or email: agroguardai1@gmail.com

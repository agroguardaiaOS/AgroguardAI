# 🌿 AgroGuardAI

> **AI-powered crop disease diagnosis for African farmers.**
> Voice-first. Multilingual. Built in Nigeria. Built for Africa.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![AIC 2026](https://img.shields.io/badge/AIC-2026%20Explorer%20Track-orange)](https://africaimpactchallenge.com)
[![NLnet](https://img.shields.io/badge/NLnet-NGI%20Zero%20Commons%20Fund-blue)](https://nlnet.nl)
[![Open Source](https://img.shields.io/badge/Open%20Source-MIT-brightgreen)](https://github.com/agroguardaiaOS/AgroGuardAI)

---

## 🌍 What Is AgroGuardAI?

AgroGuardAI is a dual-force precision agriculture system built for farmers across Africa.

A farmer in Kano, Katsina, Lagos, Nairobi, or Dar es Salaam can open this app on any phone, point their camera at a sick crop, speak in their own language, and receive a full diagnosis and treatment plan — spoken back to them in seconds.

No agronomist. No internet required. No literacy barrier.

**This repository** is the V1 software layer — a web application powered by AI. The hardware layer (Agrobotics — autonomous drones and ground rovers) is in research and documentation phase.

---

## ✨ V1 Features

| Feature | Description | Status |
|---------|-------------|--------|
| 📸 Live Camera | Point at a crop — instant AI diagnosis | ✅ V1 |
| 💬 AI Chat | Ask any farming question by text | ✅ V1 |
| 🎤 Voice Input | Speak in your language | ✅ V1 |
| 🔊 Voice Output | AI speaks the diagnosis back | ✅ V1 |
| 🌍 5 Languages | Hausa, Igbo, Yoruba, Swahili, English | ✅ V1 |
| 🤖 Multi-LLM | Gemini, Claude, GPT-4o, DeepSeek | ✅ V1 |
| 📋 History | Past diagnoses saved on device | ✅ V1 |
| 📴 Offline Mode | Works after first load | 🔜 V2 |

---

## 🤖 Supported AI Providers

AgroGuardAI is not locked to one AI company. Farmers and developers can choose the best model for their needs:

| Provider | Model | Status |
|----------|-------|--------|
| Google | Gemini 2.0 Flash | ✅ Live |
| Anthropic | Claude Sonnet | ✅ Live |
| OpenAI | GPT-4o | ✅ Live |
| DeepSeek | DeepSeek Chat | ✅ Live |

Switch providers instantly in Settings. All providers use the same interface.

---

## 🌍 Supported Languages

| Language | Code | Voice | Status |
|----------|------|-------|--------|
| English | en | en-NG | ✅ Live |
| Hausa | ha | ha-NG | ✅ Live |
| Igbo | ig | ig-NG | ✅ Live |
| Yoruba | yo | yo-NG | ✅ Live |
| Swahili | sw | sw-TZ | ✅ Live |
| French | fr | fr-FR | 🔜 Coming |
| Amharic | am | am-ET | 🔜 Coming |

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/agroguardaiaOS/AgroGuardAI.git
cd AgroGuardAI

# 2. Install dependencies
npm install

# 3. Add your API key(s)
cp .env.example .env
# Edit .env — add at least one AI provider key

# 4. Start development server
npm run dev

# 5. Build for production
npm run build
```

### Get Free API Keys

| Provider | Free Tier | Link |
|----------|-----------|------|
| Google Gemini | Yes — generous free tier | [aistudio.google.com](https://aistudio.google.com) |
| Anthropic Claude | Yes — $5 free credit | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI | Paid | [platform.openai.com](https://platform.openai.com) |
| DeepSeek | Yes — very cheap | [platform.deepseek.com](https://platform.deepseek.com) |

---

## 📁 Project Structure

```
AgroGuardAI/
├── public/
│   └── logo.png               → App logo
├── src/
│   ├── api/
│   │   ├── index.ts           → Unified AI router
│   │   ├── gemini.ts          → Google Gemini
│   │   ├── anthropic.ts       → Anthropic Claude
│   │   ├── openai.ts          → OpenAI + DeepSeek
│   │   └── types.ts           → Shared provider interface
│   ├── components/
│   │   ├── ui/                → Button, Card, Badge, Spinner
│   │   ├── layout/            → Header, BottomNav
│   │   ├── camera/            → Live camera feed
│   │   ├── chat/              → Chat interface
│   │   └── voice/             → Speech input/output
│   ├── hooks/                 → useCamera, useChat, useSpeech, useLanguage
│   ├── lib/                   → Languages, prompts, storage
│   ├── pages/                 → Home, Live, Chat, Settings
│   ├── styles/                → Global CSS + design tokens
│   └── types/                 → TypeScript interfaces
├── .env.example               → API key template
├── index.html                 → App entry point
├── package.json               → Dependencies
└── vite.config.ts             → Build config
```

---

## 🏆 Traction & Validation

- ✅ **90% diagnosis accuracy** — validated by KATDICT (Katsina State Directorate of ICT)
- ✅ **Field tested** with real smallholder farmers in Katsina State, Nigeria
- ✅ **African Impact Challenge 2026** — Explorer Track, accepted and ongoing
- ✅ **NLnet NGI Zero Commons Fund** — application submitted (ref: 2026-04-15d)
- ✅ **Open Source** — MIT License, fully public codebase

---

## 🤝 Contributing

Contributions are welcome. We especially need:

- Additional African language support
- Crop disease image data from African farms
- EdgeAI model optimization for low-end Android phones
- Documentation translations into African languages

Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

Free to use, copy, modify, and distribute — even commercially — as long as you include the original license.

---

## 👤 Author

**Muhammad Zakari**
Self-taught AI developer and founder. Built from the ground up in Katsina, Northern Nigeria.

| | |
|--|--|
| 🐦 X / Twitter | [@TheLedgerGhost](https://x.com/TheLedgerGhost) |
| 📧 Email | agroguardai1@gmail.com |
| 🌐 Website | [agroguardaiaos.github.io](https://agroguardaiaos.github.io) |
| 📰 Research | [The $220 Billion Leak](https://medium.com/@iammohammerd/the-220-billion-leak) |

---

<div align="center">

**Built in Nigeria. Built for Africa. Built for the world.**

*"Built for the farmers who feed the continent but fight blind."*

</div>

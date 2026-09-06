# 🤖 Minecraft AGI Bot

An autonomous Minecraft companion bot powered by **Google Gemini**, **OpenAI**, or **OpenRouter** APIs. Highly optimized to run 24/7 on **Android via Termux** or on any PC/VPS.

The bot recognizes you as its **big brother**, reacts dynamically to the environment, runs to your side for protection, and explores the world autonomously.

---

## 🌟 Features
- **⚡ Ultra Lightweight:** Runs purely via Cloud APIs (no heavy local model required).
- **📱 Termux Optimized:** Uses low RAM and minimal phone CPU.
- **👦 Brother Dynamic:** Knows your in-game name, speaks to you like a younger sibling, and looks up to you.
- **🛡️ Survival Reflexes:** Flees or fights back when attacked by hostile mobs.
- **🧗 Unstick Engine:** Built-in parkour, anti-freeze jump reflexes, and `unstick` chat command.

---

## 📲 Complete Step-by-Step Guide for Termux (Android)

> **Note:** Always install Termux from [F-Droid](https://f-droid.org/en/packages/com.termux/) or GitHub releases. Avoid the outdated Google Play Store version.

### 1. Update Packages & Keep Termux Awake
Open Termux and run:
```bash
pkg update && pkg upgrade -y
termux-wake-lock

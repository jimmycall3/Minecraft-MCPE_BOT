# 🤖 Minecraft AGI Bot

An autonomous Minecraft companion bot powered by **Google Gemini**, **OpenAI**, or **OpenRouter** APIs. Designed to run smoothly inside **Termux (Android)** and PC.

The bot recognizes you as its **big brother**, reacts dynamically to the environment, runs to you when hurt, and explores the world autonomously.

---

## ⚡ Fast Copy-Paste Setup (All-in-One)

If you just want to get started immediately, run this single block of commands in Termux:

```bash - Do This On Termux - 
pkg update && pkg upgrade -y 
termux-wake-lock 
pkg install nodejs-lts git nano -y 
git clone https://github.com/jimmycall3/Minecraft-MCPE_BOT.git 
cd Minecraft-MCPE_BOT 
npm install 
cp .env.example .env 
nano .env

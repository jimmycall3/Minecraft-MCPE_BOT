🤖 Minecraft MCPE AI Companion Bot

An autonomous Minecraft Bedrock/MCPE companion bot powered by Google Gemini, OpenAI, or OpenRouter.

The bot is designed to act like your AI Minecraft little brother — it can follow you, react to the environment, respond to danger, explore autonomously, and make decisions using an AI model.

It can run on:

- 📱 Android — Termux
- 💻 Windows / Linux / macOS — Node.js
- 🌐 Aternos Minecraft Java servers through GeyserMC

---

✨ Features

- 🤖 Autonomous Minecraft companion
- 🧠 AI-powered decision making
- 👦 Treats the owner as its big brother
- ❤️ Reacts dynamically to the environment
- 🏃 Runs toward you when you're in danger
- ⚔️ Can react to hostile situations
- 🌎 Autonomous exploration
- 👀 Environmental awareness
- 💬 AI-generated responses
- 🔌 Multiple AI providers
  - Google Gemini
  - OpenAI
  - OpenRouter
- 📱 Termux compatible
- 💻 PC compatible
- 🌐 Aternos compatible with the appropriate Geyser setup
- ⚙️ Configuration through ".env"

---

🧠 How It Works

The bot combines Minecraft automation with an AI model.

                    ┌─────────────────────┐
                    │    AI Provider      │
                    │                     │
                    │ Gemini / OpenAI /   │
                    │ OpenRouter          │
                    └──────────┬──────────┘
                               │
                               ▼
┌────────────────────────────────────────────────┐
│                 Minecraft Bot                  │
│                                                │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │ Environment│  │ AI Brain   │  │ Actions  │ │
│  │ Detection  │─►│ Decision   │─►│          │ │
│  └────────────┘  └────────────┘  └──────────┘ │
│                                                │
└───────────────────────┬────────────────────────┘
                        │
                        ▼
                Minecraft Server

The Minecraft environment provides information to the bot.

The AI interprets the information and determines what the bot should do.

The bot then executes the appropriate Minecraft actions.

---

📱 Quick Start — Termux

If you're using Android, the fastest setup is:

pkg update && pkg upgrade -y
termux-wake-lock
pkg install nodejs-lts git nano -y

git clone https://github.com/jimmycall3/Minecraft-MCPE_BOT.git
cd Minecraft-MCPE_BOT

npm install

cp .env.example .env
nano .env

Configure your ".env" file and then start the bot:

npm start

«If your "package.json" uses a different start command, use the command defined in your project.»

---

💻 PC Installation

Requirements

Install:

- Node.js
- npm
- Git

Check your installation:

node --version
npm --version
git --version

Then clone the repository:

git clone https://github.com/jimmycall3/Minecraft-MCPE_BOT.git
cd Minecraft-MCPE_BOT

Install dependencies:

npm install

Create your environment file:

cp .env.example .env

Edit it:

nano .env

On Windows you can edit ".env" using Notepad or VS Code.

Start the bot:

npm start

---

🔑 Environment Configuration

The project includes:

.env.example

Copy it to:

.env

Never commit your real ".env" file to GitHub.

Your ".gitignore" should contain:

.env
node_modules/

---

🧠 AI Providers

This bot can use different AI providers.

Google Gemini

Create a Gemini API key and configure the variables shown in your ".env.example".

Example:

AI_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here

Use the exact variable names provided by the current ".env.example".

---

OpenAI

Configure:

AI_PROVIDER=openai
OPENAI_API_KEY=your_api_key_here

Again, use the exact variables supported by your current configuration.

---

OpenRouter

Configure:

AI_PROVIDER=openrouter
OPENROUTER_API_KEY=your_api_key_here

OpenRouter allows you to access multiple AI models through a unified API.

---

🎮 Minecraft Server Setup

The bot can be used with a Minecraft server that supports the protocol expected by the bot.

One convenient setup is:

Aternos
  │
  ▼
Java Edition
  │
  ▼
Paper 1.21.1
  │
  ├── GeyserMC
  │
  └── ViaVersion

---

🌐 Aternos Setup

1. Create an Aternos Server

Go to:

"Aternos" (https://aternos.org/?utm_source=chatgpt.com)

Create an account or log in.

Then:

1. Click Create
2. Create a new Minecraft server
3. Select Java Edition
4. Open the server software/version settings
5. Select:

Edition: Java Edition
Software: Paper
Version: 1.21.1

Save the configuration.

---

🧩 Install GeyserMC

GeyserMC allows Minecraft Bedrock/MCPE clients to connect to Java Edition servers.

In Aternos:

Server
   ↓
Plugins
   ↓
Search: Geyser

Install the appropriate GeyserMC/Geyser plugin available for your Paper server.

Restart the server after installation.

---

🔌 Install ViaVersion

In the Aternos plugin section, search for:

ViaVersion

Install it.

Restart the server.

ViaVersion provides Java protocol-version compatibility and can be useful when clients and the server use different protocol versions.

«Important: GeyserMC is the component responsible for Bedrock ↔ Java connectivity. ViaVersion is not a replacement for Geyser.»

---

⚙️ Geyser Configuration

After installing Geyser, its configuration can normally be found inside the server's plugin configuration directory.

Typical location:

plugins/Geyser-Spigot/config.yml

The Bedrock listener normally resembles:

bedrock:
  address: 0.0.0.0
  port: 19132

However, do not blindly use "19132" for Aternos.

Aternos may provide its own Bedrock/Geyser connection information or port configuration.

Always use the connection information shown by your Aternos server/Geyser setup.

---

🚀 Start the Aternos Server

Start your server from Aternos.

Wait until the server is completely online.

You should see the Paper server running with Geyser and ViaVersion loaded.

Check the server console for plugin loading messages.

---

🤖 Connect the Bot

Once the server is online, configure the bot's Minecraft connection settings in:

.env

For example:

MC_HOST=your-server-address
MC_PORT=your-server-port
MC_USERNAME=YourBotName

The exact variable names depend on the version of this project, so check:

.env.example

first.

---

🛠️ Run the Bot

From the project directory:

npm start

You should see connection/log messages in the terminal.

Example flow:

Starting Minecraft bot...
Connecting to server...
Connected to Minecraft server.
AI system initialized.
Bot is ready.

The exact output depends on the current implementation.

---

👦 AI Personality

The bot is designed around a big-brother relationship.

Conceptually:

Player = Big Brother
Bot    = AI Little Brother

This affects the bot's behavior and responses.

For example, the bot may:

- Stay near its big brother
- Follow the player
- React when the player is hurt
- Move toward the player during danger
- Explore when there is nothing urgent
- React to nearby events
- Communicate with the player
- Make autonomous decisions

The actual behavior depends on the current bot implementation and AI model.

---

🧭 Autonomous Behavior

The bot is intended to operate without requiring a command for every action.

A simplified decision cycle is:

Observe
   ↓
Understand Environment
   ↓
Check Player Status
   ↓
Detect Danger
   ↓
Choose Priority
   ↓
Ask AI / Make Decision
   ↓
Execute Action
   ↓
Observe Again

Example:

Player gets hurt
       ↓
Bot detects player danger
       ↓
Bot evaluates situation
       ↓
Bot moves toward player
       ↓
Bot reacts to the situation

---

🗂️ Project Structure

A typical structure is:

Minecraft-MCPE_BOT/
│
├── src/
│   ├── ...
│   └── ...
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

The exact structure may change as the project develops.

---

🔐 Security

Never expose API keys

Do NOT put API keys directly into source code.

Bad:

const API_KEY = "sk-your-secret-key";

Good:

process.env.OPENAI_API_KEY

Store secrets inside:

.env

And keep ".env" out of Git:

.env

---

🛑 Troubleshooting

"npm install" fails

First check Node.js:

node --version

Then try:

npm cache clean --force
npm install

If a native dependency fails to build, check the project's dependency requirements and the Node.js version being used.

---

Bot does not connect

Check:

✓ Minecraft server is online
✓ Server address is correct
✓ Server port is correct
✓ GeyserMC is installed
✓ GeyserMC is running
✓ Bot configuration is correct
✓ Username/authentication settings are correct

Also inspect the Minecraft/Aternos console for the actual connection error.

---

Aternos server is offline

Aternos servers may stop when nobody is using them.

Start the server from the Aternos control panel before starting the bot.

---

Geyser connection doesn't work

Check:

1. Geyser is installed.
2. Geyser is compatible with the Paper version.
3. The Geyser plugin successfully loaded.
4. The Bedrock port is correct.
5. Your bot is connecting using the correct protocol.
6. Aternos is exposing the required Geyser connection endpoint.

Do not assume the default Bedrock port is externally accessible.

---

📱 Keeping the Bot Running in Termux

On Android, Termux can be killed by Android battery-management systems.

The quick-start setup includes:

termux-wake-lock

This helps prevent the device from sleeping while Termux is running.

For better reliability:

- Keep the device charging.
- Disable aggressive battery optimization for Termux.
- Keep Termux running.
- Use a stable network connection.

The bot still depends on the Minecraft server and network connection remaining available.

---

🔄 Updating the Bot

Go into the repository:

cd Minecraft-MCPE_BOT

Pull the latest changes:

git pull

Then update dependencies:

npm install

Run:

npm start

Before updating, make sure your ".env" file is backed up if your local configuration is important.

---

🧪 Development

Clone the repository:

git clone https://github.com/jimmycall3/Minecraft-MCPE_BOT.git
cd Minecraft-MCPE_BOT

Install dependencies:

npm install

Create configuration:

cp .env.example .env

Edit:

nano .env

Start development:

npm start

---

🤝 Contributing

Contributions are welcome.

Typical workflow:

git clone <repository>
cd Minecraft-MCPE_BOT

git checkout -b feature/my-feature

npm install

Make your changes, test them, and create a pull request.

When contributing:

- Keep code modular.
- Avoid hardcoding secrets.
- Document new configuration variables.
- Test Minecraft connection behavior.
- Test AI provider changes.
- Keep dependencies up to date.

---

📜 License

Add your preferred license here.

For example:

MIT License

If the repository does not currently contain a license, choose and add one before claiming that the project is licensed.

---

⚠️ Disclaimer

This project is an independent Minecraft bot project.

Minecraft and related trademarks belong to their respective owners.

AI behavior can be unpredictable. API usage may incur costs depending on the selected provider and account.

Always follow the rules of the Minecraft server you connect the bot to.

---

⭐ Support the Project

If you find this project useful:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit improvements
- 📢 Share the project

---

🔗 Links

Repository:

"Minecraft-MCPE_BOT on GitHub" (https://github.com/jimmycall3/Minecraft-MCPE_BOT?utm_source=chatgpt.com)

Aternos:

"Aternos" (https://aternos.org/?utm_source=chatgpt.com)

GeyserMC:

"GeyserMC" (https://geysermc.org/?utm_source=chatgpt.com)

ViaVersion:

"ViaVersion" (https://viaversion.com/?utm_source=chatgpt.com)

---

🧠 Project Vision

The goal of this project is to build a Minecraft companion that feels less like a traditional scripted bot and more like an AI-controlled companion.

Instead of simply executing predefined commands:

Command → Action

the long-term goal is:

Environment
     ↓
Perception
     ↓
Memory
     ↓
Reasoning
     ↓
Decision
     ↓
Action
     ↓
New Environment
     ↺

The result is an autonomous Minecraft companion capable of adapting its behavior to what is happening around it.

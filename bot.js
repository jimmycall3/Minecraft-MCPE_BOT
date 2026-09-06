require('dotenv').config();
const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const axios = require('axios');

// ================= CONFIGURATION =================
const SERVER_HOST = process.env.SERVER_HOST || "minepoint.aternos.me";
const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 29884;
const BOT_NAME = process.env.BOT_NAME || "Aibot";
const OWNER_NAME = process.env.OWNER_NAME || "YourName";

const AI_PROVIDER = (process.env.AI_PROVIDER || "gemini").toLowerCase();
const AI_API_KEY = process.env.AI_API_KEY || "Your_Api_Key";
const CUSTOM_MODEL = process.env.CUSTOM_MODEL || "If you Use All in One Api Key Like. Huggingface, Openrouterf";
// =================================================

const bot = mineflayer.createBot({
  host: process.env.SERVER_HOST || 'minepoint.aternos.me',
  port: parseInt(process.env.SERVER_PORT, 10) || 29884,
  username: process.env.BOT_NAME || 'Aibot',
  version: '1.21.1' // <-- Hardcode 1.21.1 here
});

bot.loadPlugin(pathfinder);

let defaultMove;
let isCognitiveProcessing = false;

// 1. Spawning & Movement Initialization
bot.on('spawn', () => {
  console.log(`[+] ${bot.username} connected to ${SERVER_HOST}:${SERVER_PORT}!`);

  setTimeout(() => {
    try {
      const mcData = require('minecraft-data')(bot.version);
      defaultMove = new Movements(bot, mcData);
    } catch (e) {
      defaultMove = new Movements(bot);
    }

    defaultMove.allowParkour = true;
    defaultMove.allowSprinting = true;
    defaultMove.canDig = false;
    bot.pathfinder.setMovements(defaultMove);

    console.log("[Physics] Movement engine ready. Performing unstick jump...");
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 400);

    bot.chat(`Big brother ${OWNER_NAME}, I am awake!`);
    triggerBrainCognition("I just entered the world and see everything around me.");
  }, 3000);
});

// 2. Cloud AI Engine (Gemini / OpenAI / OpenRouter)
async function callAI(systemPrompt, userPrompt) {
  if (!AI_API_KEY) {
    throw new Error("Missing AI_API_KEY in .env file!");
  }

  // Google Gemini (via official OpenAI-compatible endpoint)
  if (AI_PROVIDER === 'gemini') {
    const model = CUSTOM_MODEL || 'gemini-2.0-flash';
    const res = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 80,
        temperature: 0.6
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );
    return res.data.choices[0].message.content.trim();
  }

  // OpenAI
  if (AI_PROVIDER === 'openai') {
    const model = CUSTOM_MODEL || 'gpt-4o-mini';
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 80,
        temperature: 0.6
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );
    return res.data.choices[0].message.content.trim();
  }

  // OpenRouter
  if (AI_PROVIDER === 'openrouter') {
    const model = CUSTOM_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 80,
        temperature: 0.6
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com',
          'X-Title': 'Minecraft AI Brother Bot'
        },
        timeout: 10000
      }
    );
    return res.data.choices[0].message.content.trim();
  }

  throw new Error(`Unsupported AI_PROVIDER: ${AI_PROVIDER}. Use gemini, openai, or openrouter.`);
}

// 3. Sensory Input
function gatherSensoryData(triggerEvent) {
  const pos = bot.entity ? bot.entity.position : { x: 0, y: 0, z: 0 };
  const owner = bot.players[OWNER_NAME]?.entity || bot.nearestEntity(e => e.type === 'player' && e.username !== bot.username);
  const mob = bot.nearestEntity(e => (e.type === 'mob' || e.type === 'hostile') && e.position.distanceTo(pos) < 16);

  return {
    health: Math.round(bot.health || 20),
    pos: `X:${Math.round(pos.x)} Y:${Math.round(pos.y)} Z:${Math.round(pos.z)}`,
    owner: owner ? `Near me (${Math.round(pos.distanceTo(owner.position))} blocks away)` : "Not visible",
    threat: mob ? `${mob.name} is close (${Math.round(pos.distanceTo(mob.position))} blocks)!` : "None",
    trigger: triggerEvent
  };
}

// 4. Cognitive Thinking Loop
async function triggerBrainCognition(triggerEvent) {
  if (isCognitiveProcessing || !bot.entity) return;
  isCognitiveProcessing = true;

  const s = gatherSensoryData(triggerEvent);

  const systemPrompt = `You are ${BOT_NAME} in Minecraft. ${OWNER_NAME} is your beloved BIG BROTHER. You love him, look up to him, seek his guidance and protection.`;
  const userPrompt = `
Status: Health ${s.health}/20, Pos: ${s.pos}.
Big Brother ${OWNER_NAME}: ${s.owner}.
Threat: ${s.threat}.
Event: "${s.trigger}".

Format your response strictly like this:
FEELING: <one word emotion>
SPEECH: <short message to ${OWNER_NAME} in chat under 60 chars>
ACTION: <choose ONE: RUN_TO_OWNER, FLEE, EXPLORE, LOOK_AT_OWNER, ATTACK, NONE>
`;

  try {
    const replyText = await callAI(systemPrompt, userPrompt);
    console.log(`[Brain (${AI_PROVIDER})]:`, replyText);

    let chosenAction = "EXPLORE";
    let speechText = "";

    const speechMatch = replyText.match(/SPEECH:\s*(.*)/i);
    if (speechMatch) speechText = speechMatch[1].trim();

    if (/RUN_TO_OWNER/i.test(replyText)) chosenAction = "RUN_TO_OWNER";
    else if (/FLEE/i.test(replyText)) chosenAction = "FLEE";
    else if (/ATTACK/i.test(replyText)) chosenAction = "ATTACK";
    else if (/LOOK_AT_OWNER/i.test(replyText)) chosenAction = "LOOK_AT_OWNER";
    else if (/EXPLORE/i.test(replyText)) chosenAction = "EXPLORE";

    if (speechText) bot.chat(speechText.substring(0, 90));
    executeAction(chosenAction);

  } catch (err) {
    console.log("[Brain Note]:", err.message);
    executeAction("EXPLORE");
  } finally {
    isCognitiveProcessing = false;
  }
}

// 5. Physical Motor Action
function executeAction(action) {
  console.log(`[Action]: ${action}`);
  const owner = bot.players[OWNER_NAME]?.entity || bot.nearestEntity(e => e.type === 'player' && e.username !== bot.username);
  const pos = bot.entity.position;

  bot.pathfinder.setGoal(null);

  switch (action) {
    case 'RUN_TO_OWNER':
      if (owner) {
        bot.pathfinder.setGoal(new goals.GoalFollow(owner, 2), true);
      } else {
        bot.chat(`Where are you, ${OWNER_NAME}?`);
      }
      break;

    case 'FLEE':
      const fleeX = Math.round(pos.x + (Math.random() - 0.5) * 16);
      const fleeZ = Math.round(pos.z + (Math.random() - 0.5) * 16);
      bot.pathfinder.setGoal(new goals.GoalNear(fleeX, pos.y, fleeZ, 1));
      break;

    case 'LOOK_AT_OWNER':
      if (owner) bot.lookAt(owner.position.offset(0, owner.height, 0));
      break;

    case 'ATTACK':
      const enemy = bot.nearestEntity(e => (e.type === 'mob' || e.type === 'hostile') && e.position.distanceTo(pos) < 14);
      if (enemy) {
        bot.pathfinder.setGoal(new goals.GoalFollow(enemy, 1), true);
        bot.attack(enemy);
      }
      break;

    case 'EXPLORE':
    default:
      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 6;
      const targetX = Math.round(pos.x + Math.cos(angle) * dist);
      const targetZ = Math.round(pos.z + Math.sin(angle) * dist);
      bot.pathfinder.setGoal(new goals.GoalNear(targetX, pos.y, targetZ, 1));
      break;
  }
}

// 6. Event Listeners
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  const msg = message.trim().toLowerCase();

  // Emergency unstick command
  if (msg === 'unstick' || msg === '!unstick') {
    bot.clearControlStates();
    bot.pathfinder.setGoal(null);
    bot.setControlState('jump', true);
    setTimeout(() => {
      bot.setControlState('jump', false);
      const player = bot.players[username]?.entity;
      if (player) bot.pathfinder.setGoal(new goals.GoalFollow(player, 2), true);
    }, 400);
    bot.chat("Unsticking myself!");
    return;
  }

  const isOwner = (username.toLowerCase() === OWNER_NAME.toLowerCase());
  const context = isOwner
    ? `Big brother ${OWNER_NAME} said: "${message}"`
    : `Player ${username} said: "${message}"`;

  triggerBrainCognition(context);
});

bot.on('entityHurt', (entity) => {
  if (entity === bot.entity) {
    triggerBrainCognition("I took damage! Something attacked me!");
  }
});

bot.on('death', () => {
  triggerBrainCognition("I died! Everything went black.");
  setTimeout(() => bot.respawn(), 1000);
});

// Autonomous periodic thinking (Every 25 seconds)
setInterval(() => {
  if (bot.entity && !isCognitiveProcessing) {
    triggerBrainCognition("Observing my surroundings and wondering what to do.");
  }
}, 25000);

bot.on('error', (err) => console.log('Bot Error:', err.message));
bot.on('end', () => console.log('[-] Disconnected from server.'));

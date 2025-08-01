require('./keep_alive');
const mineflayer = require('mineflayer');

// Bot configuration
const BOT_CONFIG = {
  host: 'DomainOfCurse.exaroton.me', // Change this to your server IP
  port: 50636,       // Change this to your server port
  username: 'WhoAreYou', // Bot username
  // auth: 'microsoft' // Uncomment if using premium account
};

function createBot() {
  console.log('Creating bot...');
  
  const bot = mineflayer.createBot(BOT_CONFIG);

  // Bot events
  bot.on('login', () => {
    console.log(`✅ Bot logged in as ${bot.username}`);
    console.log(`📍 Connected to ${BOT_CONFIG.host}:${BOT_CONFIG.port}`);
  });

  bot.on('spawn', () => {
    console.log('🎮 Bot spawned in the world');
    console.log('🔄 Bot is now AFK - staying connected...');
    
    // Send a message to indicate bot is online (optional)
    setTimeout(() => {
      bot.chat('AFK Bot is now online!');
    }, 2000);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    
    console.log(`💬 ${username}: ${message}`);
    
    // Respond to specific commands (optional)
    if (message.toLowerCase().includes('bot status')) {
      bot.chat('I am AFK and running smoothly!');
    }
  });

  bot.on('health', () => {
    console.log(`❤️  Health: ${bot.health}/20, Food: ${bot.food}/20`);
  });

  bot.on('death', () => {
    console.log('💀 Bot died! Respawning...');
    bot.respawn();
  });

  bot.on('kicked', (reason) => {
    console.log(`❌ Bot was kicked: ${reason}`);
    console.log('🔄 Attempting to reconnect in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('❌ Bot error:', err.message);
    console.log('🔄 Attempting to reconnect in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('end', () => {
    console.log('🔌 Connection ended');
    console.log('🔄 Attempting to reconnect in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  // Keep the bot active by occasionally moving slightly (anti-AFK)
  setInterval(() => {
    if (bot.entity) {
      // Slightly move the bot to prevent server AFK kicks
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 100);
    }
  }, 60000); // Every minute

  return bot;
}

// Start the bot
console.log('🚀 Starting Minecraft AFK Bot...');
console.log(`📡 Target server: ${BOT_CONFIG.host}:${BOT_CONFIG.port}`);
console.log('✏️  Edit BOT_CONFIG to change server details');
console.log('─'.repeat(50));

createBot();
      

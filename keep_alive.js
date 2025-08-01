const express = require('express');
const app = express();

// Route
app.get('/', (req, res) => {
  res.send('Bot is Alive! 😎');
});

// Use dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Keep-alive webserver running on port ${PORT}`);
});

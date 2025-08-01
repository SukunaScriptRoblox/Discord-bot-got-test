const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is Alive! 😎');
});

app.listen(3000, () => {
  console.log('✅ Keep-alive webserver running on port 3000!');
});

const mongoose = require("mongoose");

const user = new mongoose.Schema({
token: { type: String, required: true },
  
owner_id: { type: String, required: true },
  
bot_id: { type: String, default: null },
  
bot_token: { type: String, default: null },
bot_status: { type: Array, default: ['online', { name: ``, type: 0, url: null }] },
server_name: { type: String, default: null },
  
coins: { type: Number, default: 0 },
history: { type: Array, default: [] },
  
domain: { type: String, default: null },
});

module.exports = mongoose.model('AutoSellers', user, 'sellers')
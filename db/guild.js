const mongoose = require("mongoose");

const guild = new mongoose.Schema({
 // public data
  
id: { type: String, required: true },

  // server data
  
lang: { type: String, default: "en" },
prefix: { type: String, default: "$" },

  // settings
  
autorole: { type: String, default: "[none]"  } ,
messages: { type: Array, default: [] },
  
});

module.exports = mongoose.model('Guilds', guild, 'guild')
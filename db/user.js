const mongoose = require("mongoose");

const user = new mongoose.Schema({
 // public data
  
id: { type: String, required: true },
  
// daily data
  
 daily: { type: Number },

// profile data

coins: { type: Number } , 
like: { type: Object } , // {time: 0, likes: 0}
note: { type: String } , // "I Hate You"
xp: { type: Number } , // "I Hate You"

  // other data
  
blacklist: { type: Boolean } , // "I Hate You"
  
});

module.exports = mongoose.model('users', user, 'users')
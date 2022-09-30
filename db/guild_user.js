const mongoose = require("mongoose");

const user_guild = new mongoose.Schema({
 // public data
  
id: { type: String, required: true },
guildID: { type: String } ,

// voice data
  
xp_voice: { type: Number } ,
    
// text data
  
xp: { type: Number, default: 0 },
  
// server data
  
unban: { type: Object, defautl: {enable: false, time: 0} } , 
unmute: { type: Object, defautl: {enable: false, time: 0}  } , 
warns: { type: Array } , 

  
});

module.exports = mongoose.model('guild_users', user_guild, 'guild_users')
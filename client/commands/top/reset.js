let lang_messages = require('../../../lang.json') 
let guild_user = require('../../../db/guild_user')

module.exports = {
	name: 'reset', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(bot ,msg , args, row) {
    

let lang = row[0].lang || "en"
    
const fs = require("fs")

let client = bot

if(!msg.member.permission.has('manageGuild')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].reset_help[lang].replace('[prefix]', prefix).replace('[prefix]', prefix),
    color: 14226597
  }
})
if(args[0] !== "all"){
  
  }
  if(args[0] === "text" && args[1] === "all"){
bot.createMessage(msg.channel.id, lang_messages[0].confirm_reset[lang]).then(m =>{
var dn = false
client.on('messageCreate', async (message) => {
if(message.author.id !== msg.author.id || dn) return;
if(msg.channel.id !== message.channel.id) return;
console.log(message.content)
if(message.content !== "confirm"){
m.delete()
dn = true
}else{
client.createMessage(msg.channel.id, lang_messages[0].load_reset[lang]).then(async mm =>{
dn = true

let data = await guild_user.find({guildID: msg.channel.guild.id}).select({_id: 1})

 for(const d of data){
await guild_user.updateOne({_id: d._id}, {xp: 1})
 }
    m.delete()
mm.delete()
message.delete()
return bot.createMessage(msg.channel.id, {
embed:{
  description:lang_messages[0].reset_text_done[lang],
  color:14226597
}})
})
}
})
})

  
  }
    
    if(args[0] === "voice" && args[1] === "all"){
bot.createMessage(msg.channel.id, `**please type \`confirm\` to reset xp for all members**`).then(m =>{
var dn = false
client.on('messageCreate', async (message) => {
if(message.author.id !== msg.author.id || dn) return;
if(msg.channel.id !== message.channel.id) return;
if(message.content !== "confirm"){
m.delete()
dn = true
}else{
client.createMessage(msg.channel.id, lang_messages[0].load_reset[lang]).then(async mm =>{

dn = true
let data = await guild_user.find({guildID: msg.channel.guild.id}).select({_id: 1})

 for(const d of data){
await guild_user.updateOne({_id: d._id}, {xp_voice: 1})
 }
m.delete()
message.delete()
mm.delete()
return bot.createMessage(msg.channel.id, {
embed:{
  description:lang_messages[0].reset_voice_done[lang],
  color:14226597
}})
})
}
})
  })
  }
  
  
  },
};






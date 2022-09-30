let lang_messages = require('../../../lang.json') 
let users = require('../../../db/guild_user')

module.exports = {
	name: 'unban', // اسم الامر
	description: "to unban a member from the server", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {
    
let lang = row[0].lang || "en"

if(!msg.member.permission.has('banMembers')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_banmembers[lang],
    color: 14226597
  }
})
   

let user = await client.getRESTUser(args[0]).catch(err =>{})
if(!user) {
let guild_bans = await client.getGuildBans(msg.channel.guild.id)
var bans = []
var msgs = ``
var C = 1
for(const d of guild_bans){
bans.unshift({content: C, data: d})
console.log(d)
if(msgs.length < 1900) msgs = msgs + `\n\`${C}\` - ${d.user.username} (${d.user.id})`
C++
}

client.createMessage(msg.channel.id, msgs || {
  embed:{
    description: lang_messages[0].doesnt_have_bans[lang],
    color: 14226597
        }

}).then(async m =>{
if(msgs){
var dn = false
client.on('messageCreate', async (message) => {
if(message.author.bot || message.author.id !== msg.author.id || dn) return;
if(msg.channel !== message.channel.id) {
dn = true
m.delete()
}
var fetchs = false

for(const d of bans){
if(message.content === `${d.content}`){
fetchs = true
m.delete().catch(err =>{})
message.delete()
let bans = await client.getGuildBans(msg.channel.guild.id)
//console.log(bans
let user_ban = bans.find(data => data.user.id === d.data.user.id)
if(!user_ban) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_ban[lang],
    color: 14226597
  }
})

let unban = await client.unbanGuildMember(msg.channel.guild.id, d.data.user.id, `UnBanned by ${msg.author.username} (${msg.author.id})`).catch(async err =>{
 await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_unban[lang] + d.data.user.id + ">" ,
    color: 14226597
  }
})
})
let _d = await users.findOne({guildID: msg.channel.guild.id, id: d.data.user.id})

if(!_d) _d = await new users({
   // public data
  
id: user.id ,
guildID: msg.channel.guild.id ,

// voice data
  
xp_voice: 0 ,
totlxp_voice: 0 ,
    
// text data
  
xp: 0 ,
totlxp: 0 ,
    
}).save()


await users.updateOne({_id: d._id}, {unban: {enable: false, time: Date.now()} })

if(!unban) return client.createMessage(msg.channel.id, {
  embed:{
    description:"**<:yes:839305757576003585> "+ `${d.data.user.username} ` +lang_messages[0].has_been_unbanned[lang],
    color: 14226597
  }
})
}
}
if(!fetchs) {
m.delete().catch(err =>{})
dn = true
}

})
}

})

}else{
let bans = await client.getGuildBans(msg.channel.guild.id)
//console.log(bans)
let user_ban = bans.find(d => d.user.id === user.id)
if(!user_ban) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_ban[lang],
    color: 14226597
  }
})

let unban = await client.unbanGuildMember(msg.channel.guild.id, user.id, `UnBanned by ${msg.author.username} (${msg.author.id})`).catch(async err =>{
 await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_unban[lang] + user.id + ">" ,
    color: 14226597
  }
})
})
let _d = await users.findOne({guildID: msg.channel.guild.id, id: user.id})

await users.updateOne({_id: _d._id}, {unban: {enable: false, time: 0}})
  
if(!unban) return client.createMessage(msg.channel.id, {
  embed:{
    description:"**<:yes:839305757576003585> "+ `${user.username} ` +lang_messages[0].has_been_unbanned[lang],
    color: 14226597
  }
})
}



  }
}
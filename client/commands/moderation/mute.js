let mongoose = require('mongoose')
let Discord = require('discord.js')
let ms = require('ms')
let lang_messages = require('../../../lang.json') 
let users = require('../../../db/guild_user')


module.exports = {
	name: 'mute', // اسم الامر
	description: "to mute someone", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"
    
if(!msg.member.permission.has('manageMessages') && !msg.member.permission.has('manageChannels')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].managemessages[lang],
    color: 14226597
  }
})

let prefix = row[0] ? row[0].prefix : "$"
      if(!msg.mentions[0] && !args[0]) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].enter_mute[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
    color: 14226597
  }
})

var roleID = msg.channel.guild.roles.find(d => d.name === "Muted")

if(!roleID){
await client.createRole(msg.channel.guild.id, {name: "Muted", permissions:0}).catch(err =>{}).then(role =>{
if(!role) return;
for(const d of msg.channel.guild.channels){
let channel = msg.channel.guild.channels.get(d[0])
if(channel.type === 0){
var channel_permission2 = channel.permissionOverwrites.get(role.id)
if(!channel_permission2) {
channel.editPermission(role.id, 0, 2048, 'role').catch(err =>{console.log(err)})
}else{
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add('SEND_MESSAGES')
channel.editPermission(role.id, channel_permission1_allow, permissions.bitfield, 'role').catch(err =>{})
}}
}
roleID = role.id
})
}else{
roleID = roleID.id
}

if(!roleID) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_role_muted[lang] ,
    color: 14226597
  }
})
let mention = true
let user = msg.mentions[0]
if(!user) {
let user1 = msg.channel.guild.members.get(args[0])
if(!user1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_user[lang],
    color: 14226597
  }
})
mention = false
user = user1
}else{
user = msg.channel.guild.members.get(msg.mentions[0].id)
}
if(msg.channel.guild.members.get(user.id)){
mention = true
}

let permissions = false

if(mention){
let member = msg.channel.guild.members.get(user.id)

let author_sorted_roles = msg.member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)
let member_sorted_roles = member.roles.sort((a , b) => msg.channel.guild.roles.get(b).position - msg.channel.guild.roles.get(a).position)

let potion_member = msg.channel.guild.roles.get(member_sorted_roles[0]) || {position: 0}
let potion_author = msg.channel.guild.roles.get(author_sorted_roles[0]) || {position: 0}

console.log(potion_author.position)
console.log(potion_member.position)
if(potion_author.position > potion_member.position) permissions = false
if(potion_author.position === potion_member.position) permissions = true

if(msg.author.id === member.id) permissions = true
if(msg.author.id === msg.channel.guild.ownerID) permissions = false
if(member.id === msg.channel.guild.ownerID) permissions = true

}
    
    if(permissions) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].you_cant_mute[lang] + user.id + ">" ,
    color: 14226597
  }
})
if(!args[1]) args[1] = lang_messages[0].no_reason[lang]
    
let d = await users.findOne({id: user.id, guildID: msg.channel.guild.id})

if(!d) d = await new users({
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
    
let time = ms(args[1])
let reason = args.slice(2).join(" ") || lang_messages[0].no_reason[lang]
if(!time){
time = ms('3d')
reason = args.slice(1).join(" ") || lang_messages[0].no_reason[lang]
}
var erra = false
//new db({guild: msg.channel.guild.id, id: user.id, time: time + Date.now(), roleID: roleID}).save()
await users.updateOne({_id: d._id}, {unmute: {enable: true, time: time + Date.now()} })

user.addRole(roleID, `Muted by ${msg.author.username} (${msg.author.id}) with reason : ` + reason).catch(async err =>{
 erra = true 
  await client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].i_cant_mute[lang] + user.id + ">" ,
    color: 14226597
  }
})
}).then(mute =>{
if(!erra) return client.createMessage(msg.channel.id, {
  embed:{
    description:"<:yes:839305757576003585> ** <@" + user.id +lang_messages[0].has_been_muted[lang] ,
    color: 14226597
  }
})
})

	},
};

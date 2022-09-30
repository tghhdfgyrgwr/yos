let mongoose = require('mongoose')
let Discord = require('discord.js')
let ms = require('ms')
let lang_messages = require('../../../lang.json') 
let users = require('../../../db/guild_user')

module.exports = {
	name: 'removewarn', // اسم الامر
	description: "to warn someone", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"
    
if(!msg.member.permission.has('manageMessages') && !msg.member.permission.has('manageChannels')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].must_managemessages[lang],
    color: 14226597
  }
})

let data = await users.findOne({guildID: msg.channel.guild.id}).select({warns: 1})

if(data.length < 1) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_warn[lang],
    color: 14226597
  }
})

let f = data.find(x => x.warns.find(d => `${d.num}` === `${args[0]}`))
if(!f) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].cant_find_warn[lang],
    color: 14226597
  }
})
await users.updateOne({id: f.id}, {$pull: { warns: f.warns.find(z => `${z.num}` === `${args[0]}`) }})

 client.createMessage(msg.channel.id, {
  embed:{
    description:`**Done**`,
    color: 14226597
  }
})

  }
}
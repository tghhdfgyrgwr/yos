let lang_messages = require('../../../lang.json') 

let guilds = require('../../../db/guild')

module.exports = {
	name: 'unblockmessage', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"


let prefix = row[0] ? row[0].prefix : "$"
if(!msg.member.permission.has('manageGuild')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})
let messages = []
if(!row[0].messages.includes(args.slice(0).join(" "))) return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].there_is_no_blocked[lang].replace('[prefix]', prefix) ,
    color: 14226597
  }
}) 
row[0].messages.forEach(async m =>{
if(m !== args.slice(0).join(" ")) messages.unshift(m)
})
await guilds.updateOne({id: msg.channel.guild.id} , { "messages": messages })
return client.createMessage(msg.channel.id, {
  embed:{
    description:lang_messages[0].removed_blocks[lang] ,
    color: 14226597
  }
})
	},
};

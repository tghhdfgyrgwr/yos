let lang_messages = require('../../../lang.json') 
let guild = require('../../../db/guild')

module.exports = {
	name: 'setprefix', // اسم الامر
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

await guild.updateOne({id: msg.channel.guild.id} , { "prefix": args[0] || "$" })
msg.addReaction('yes:839305757576003585')
	},
};

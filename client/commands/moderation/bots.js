let lang_messages = require('../../../lang.json') 
let guild = require('../../../db/guild')

module.exports = {
	name: 'bots', // اسم الامر
	description: "all bots in server", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {
    
let lang = row[0].lang || "en"

if(!msg.member.permission.has('manageGuild')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})
var msgs = ``


msg.channel.guild.members.forEach(async m =>{
let user = m.user || m
if(user.bot) msgs = msgs + `\n \`-\` <@${user.id}> `
})
return client.createMessage(msg.channel.id, {
  embed:{
    title:"Bots",
    description: msgs || lang_messages[0].dont_have_bots[lang],
    color: 14226597
  }
})
	},
};

let lang_messages = require('../../../lang.json') 
let guild = require('../../../db/guild')
module.exports = {
	name: 'ping', // اسم الامر
	description: "show bot's ping", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"
    
let timedatapase = Date.now()
let data = await guild.find({id: msg.channel.guild.id})

let pingdb = Date.now() - timedatapase

let pingbot = Date.now()
client.createMessage(msg.channel.id, `pong`).then(m =>{
m.edit({
content: ``,
  embed :
{
  "description" : lang_messages[0].rhyno_ping[lang].replace('[pingdb]', pingdb).replace('[pingbot]', m.timestamp - msg.timestamp),
  "color": 14226597
}
})
})

	},
};

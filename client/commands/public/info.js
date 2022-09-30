let lang_messages = require('../../../lang.json') 
let Eris = require("eris")
let client2 = Eris("MTAyNDY3NDMxMzEwNzk0NzUzMA.GJ-Gii.j8Grw6qj1myonMVL7CAObuxhjnCqjhcxX2VAhw")
client2.connect()
let moment = require('moment')
module.exports = {
	name: 'info', // اسم الامر
	description: "show bot's info", // شرح الامر
	cooldown: 15, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"

console.log(lang_messages[0].info_servers)
console.log(lang_messages[0].rhyno_info)
console.log(lang_messages[0].info_created)
console.log(lang_messages[0].my_links)
console.log(lang_messages[0].info_links)

client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": lang_messages[0].rhyno_info[lang],
      "color": 14226597,
      "fields": [
        {
          "name": lang_messages[0].info_servers[lang],
          "value": `\n > ${client2.guilds.size}`
        },
        {
          "name": lang_messages[0].info_users[lang],
          "value": `\n > ${client2.guilds.reduce((a, g) => a + g.memberCount, 0)}`
        },
        {
          "name":lang_messages[0].info_created[lang],
          "value": `> ${moment(client2.user.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(client2.user.createdAt).fromNow()}\``
        },
        {
          "name":lang_messages[0].my_links[lang],
          "value": lang_messages[0].info_links[lang],
        
        }

      ],
      footer: {
        text: lang_messages[0].rhyno_team[lang],
        icon_url: `https://cdn.discordapp.com/emojis/839362578916311040.png?v=1`,
      }
    }
  
})


	},
};

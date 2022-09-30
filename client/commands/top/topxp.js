let lang_messages = require('../../../lang.json')

let guilds = require('../../../db/guild')

module.exports = {
	name: 'top-xp', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(bot ,msg , args) {
    
     let guild = await guilds.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

    bot.createMessage(msg.channel.id , lang_messages[0].soon_in_dashboard[lang])

  },
};

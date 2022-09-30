let lang_messages = require('../../../lang.json') 
module.exports = {
	name: 'top-coins', // اسم الامر
	description: "top of 5 users", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(bot ,msg , args, row) {
    

let lang = row[0].lang || "en"

    bot.createMessage(msg.channel.id , lang_messages[0].soon_in_dashboard[lang])
  },
};

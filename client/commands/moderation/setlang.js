let lang_messages = require('../../../lang.json') 
let guild = require('../../../db/guild')

module.exports = {
	name: 'setlang', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 50, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {

let lang = row[0].lang || "en"
    
    
if(!msg.member.permission.has('administrator')) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].you_must_manageguild[lang],
    color: 14226597
  }
})
let langs = ["en", "english","ar","arabic"]
if(!langs.includes(args[0])) return client.createMessage(msg.channel.id, {
  embed :{
    description:lang_messages[0].i_cant_find_lang[lang],
    color: 14226597
  }
})
await guild.updateOne({id: msg.channel.guild.id} , { "lang": args[0].replace('glish', '').replace('abic', '') })
 client.createMessage(msg.channel.id, lang_messages[0].setlang_done[args[0].replace('glish', '').replace('abic', '')])
	},
};

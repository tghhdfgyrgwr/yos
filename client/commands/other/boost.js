let lang_messages = require('../../../lang.json')  
var top1 = require("../../../coins-async.js");
var top = new top1()
const pms = require("pretty-ms")
const mongoose = require('mongoose')

module.exports = {
	name: 'boost', // اسم الامر
	description: "only me can use it to add coins to someone", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
    return;
    let guild = await db.find({id: msg.channel.guild.id})
if(guild.length < 1){
guild = [{lang: "en"}]
}
let lang = guild[0].lang || "en"

if(msg.channel.guild.id !== "832914826920460329") return client.createMessage(msg.channel.id, {embed : {
description: lang_messages[0].you_must_be_in[lang],
color : 14226597
}})
if(!msg.member.roles.includes('839648476878864444')) return client.createMessage(msg.channel.id, `Only Booster Can use this command`)
let data = await db1.find({id: msg.author.id})
if(data.find(d => d.time - Date.now() > 1)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].boost_wait[lang].replace('(time)', pms(data.find(d => d.time - Date.now() > 1).time - Date.now(), { verbose: true })),
      "color": 14226597
    }
  
})
new db1({id: msg.author.id, time: Date.now() + 604800000}).save();

top.addpoint(msg.author.id, 50000)
client.createMessage(msg.channel.id, {
embed: {
      "description": lang_messages[0].recived_boost[lang],
      "color": 14226597
}
})
let dm = await msg.author.getDMChannel().catch(err =>{})
if(dm) dm.createMessage({
  "embed": 
    {
      "description": lang_messages[0].recived_boost[lang],
      "color": 14226597
    }
  
})
    

	},
};

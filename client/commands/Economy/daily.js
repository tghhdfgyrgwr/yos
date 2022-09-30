var randomId = require('random-id');
const pms = require("pretty-ms")
let fetch = require('node-fetch')
const moment = require('moment')
let lang_messages = require('../../../lang.json')

let users = require('../../../db/user')
module.exports = {
	name: 'daily', // اسم الامر
	description: "taking daily coins", // شرح الامر
	cooldown: 20, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, row) {
    
  let d = await users.findOne({id: msg.author.id})
    
  if(!d) d = await new users({

 // public data
  
id: msg.author.id,
  
// daily data
  
daily: 0,

// profile data

coins: 1 , 
like: 0 , // {time: 0, likes: 0}
note: "", // "I Hate You"
xp: 0 , // "I Hate You"

  // other data
  
blacklist: false , // "I Hate You"
  
}).save();


let lang = row[0].lang || "en"

if(d.daily - Date.now() > 1) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_can_take_daily[lang].replace('(time)', pms(d.daily - Date.now(), { verbose: true })),
      "color": 14226597
    }
  
})

if(d.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].youblacklist[lang],
      "color": 14226597
    }
  
})
fetch(('https://teamlog-system.glitch.me/api/v1/captcha') , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

var daily = Math.floor(Math.random() * 1700) + 800;

// Draw cat with lime helmet
let buf = Buffer.from(json.buf.split(",")[1], 'base64');

client.createMessage(msg.channel.id, lang_messages[0].please_type_numbers[lang], [{file: buf, name: "code." + json.id + ".captcha." + json.buf.split(";")[0].replace('data:image/', '').replace('data:video/', '').replace('data:gif/', '')}]).then(msgs =>{
if(!msgs) return;
var dn = false
client.on('messageCreate', async (message) => {
if(dn || message.author.id !== msg.author.id) return;
if(msg.channel.id !== message.channel.id){
msgs.delete().catch(err =>{})
return dn = true
}

if(message.content !== json.code){
msgs.delete().catch(err =>{})
return dn = true
}
  dn = true
  let d = await users.findOne({id: msg.author.id})
if(d.daily - Date.now() > 1) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_can_take_daily[lang].replace('(time)', pms(d.daily - Date.now() , { verbose: true })),
      "color": 14226597
    }
  
})

await users.updateOne({_id: d._id}, {$inc: {coins: daily}})
await users.updateOne({_id: d._id}, { daily: Date.now() + 86400000})
msgs.delete()
message.delete()
client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].recive_daily[lang].replace('[id]', msg.author.username).replace('[daily]', daily),
      "color": 14226597
    }
  
})
 client.createMessage('1025095733688401951', {
  embed:{
    description: `**Daily**

    Member : 
    id :  ${msg.author.id}
    name :  ${msg.author.username}
    user1 createdate : ${moment(msg.author.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.author.createdAt).fromNow()}\`
    
    Claimed: ${daily}
    
    In Server :
    id : ${msg.channel.guild.id}
    count : ${msg.channel.guild.memberCount}
    createdate : ${moment(msg.channel.guild.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
    name : ${msg.channel.guild.name}`,
    color : 14226597
  }
}) 
})
}).catch(err =>{})
})
	},
};


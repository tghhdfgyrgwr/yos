var randomId = require('random-id');
let fetch = require('node-fetch')
const ms = require('ms')
let lang_messages = require('../../../lang.json')
let users = require('../../../db/user')

const moment =  require('moment')
module.exports = {
	name: 'coins', // اسم الامر
	description: "coins of this user", // شرح الامر
	cooldown: 10, // الكول داون بـ الثواني
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

let authorData = d

if(authorData.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].youblacklist[lang],
      "color": 14226597
    }
  
})

let user = msg.mentions[0] || msg.channel.guild.members.get(args[0])
if(!user) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].credits_author[lang].replace('[username]', msg.author.username).replace('[coins]', authorData.coins),
      "color": 14226597
    }
  
})
    
      let _d = await users.findOne({id: user.id})
    
  if(!_d) _d = await new users({

 // public data
  
id: user.id,
  
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
    let userData = _d
    
if(user.bot) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].bots_dont[lang],
      "color": 14226597
    }
})
if(user.id === msg.author.id) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].credits_author[lang].replace('[username]', msg.author.username).replace('[coins]', authorData.coins),
      "color": 14226597
    }
  
})

if(!args[1]) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].credits_user[lang].replace('[username]', user.username).replace('[coins]', userData.coins),
      "color": 14226597
    }
  
})
    

if(Number(args[1]) > Number(authorData.credits)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_dont_have[lang],
      "color": 14226597
    }
  
}) 
if(Number(args[1]) < 0 || !Number(Number(args[1]))) return;
  
fetch(('https://teamlog-system.glitch.me/api/v1/captcha') , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

let buf = Buffer.from(json.buf.split(",")[1], 'base64');
let resulting = Math.floor(Number(args[1])-(Number(args[1])*(5/100)));
var alkmal = Math.floor(resulting) 
if(alkmal === "0" || alkmal === 0) alkmal = 1
client.createMessage(msg.channel.id, lang_messages[0].tranfer_credits[lang].replace('[credits]', args[1]).replace('[fess]', args[1] - alkmal).replace('[userID]', user.id), [{file: buf, name: "code." + json.id + ".captcha." + json.buf.split(";")[0].replace('data:image/', '').replace('data:video/', '').replace('data:gif/', '')}]).then(msgs =>{
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
message.delete()
msgs.delete()

    let _d = await users.findOne({id: user.id})
    
  if(!_d) _d = await new users({

 // public data
  
id: user.id,
  
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
  
      let _data = await users.findOne({id: msg.author.id})
    
  if(!_data) _data = await new users({

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
  if(_data.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].thisblacklist[lang],
      "color": 14226597
    }
  
})
if(Number(args[1]) > Number(_data.coins)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].you_dont_have[lang],
      "color": 14226597
    }
  
})
//top.set(msg.author.id, author_credits.credits - args[1])
//top.set(user.id, user_credits.credits + alkmal)
  await users.updateOne({id: msg.author.id}, {$inc: {coins: -Number(args[1])}})
await users.updateOne({id: user.id}, {$inc: {coins: alkmal}})

  
let userss = await client.getRESTUser(user.id).catch(err =>{})
let dm;
if(userss) dm = await userss.getDMChannel().catch(err =>{})
if(dm) dm.createMessage({
  "embed": 
    {
      "description": lang_messages[0].You_Have_Received[lang].replace('[alkmal]', alkmal).replace('[username]',msg.author.username).replace('[tag]', msg.author.discriminator).replace('[id]', msg.author.id),
      "color": 14226597
    }
  
})
 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": lang_messages[0].You_Have_Transferred[lang].replace('[username]', msg.author.username).replace('[alkmal]', alkmal).replace('[userid]', user.id),
      "color": 14226597
    }
  
})

client.createMessage('1025095867503489124', {
  embed:{
    description: `**coins**

    From :
    id :  ${msg.author.id}
    name :  ${msg.author.username}
    createdate : ${moment(msg.author.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.author.createdAt).fromNow()}\`
     
    Transferred : ${alkmal}
    
    To :
    id : ${user.id}
    name : ${user.username}
    createdate : ${moment(user.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(user.createdAt).fromNow()}\`
    
    In Server :
    id : ${msg.channel.guild.id}
    count : ${msg.channel.guild.memberCount}
    createdate : ${moment(msg.channel.guild.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
    name : ${msg.channel.guild.name}`,
    color : 14226597
  }
}) 

})
})
})
/*
let credits = await top.get(msg.author.id)
if(credits.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:no:839305037007814656> You are Blacklisted from Rhyno Bot**`,
      "color": 14226597
    }
  
})
if(msg.mentions[0] && msg.mentions[0].bot) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:no:839305037007814656> Bots don't have Coins **`,
      "color": 14226597
    }
})
if(!args[0] || msg.mentions[0] && msg.mentions[0].id === msg.author.id) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:Coins:838935941900664903> ${msg.author.username} , You Have  \`${credits.credits}$\` Coins**`,
      "color": 14226597
    }
  
})

let mentions = msg.mentions
if(msg.mentions[0] && !args[1]){
let creditss = await top.get(msg.mentions[0].id)
if(creditss.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:no:839305037007814656> This User is Blacklisted from Rhyno Bot**`,
      "color": 14226597
    }
  
})
return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:Coins:838935941900664903> ${msg.mentions[0].username} , has \`${creditss.credits}$\` Coins**`,
      "color": 14226597
    }
  
})

}

if(!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1]))) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:no:839305037007814656> Please type the number of coins you want to transfer !**`,
      "color": 14226597
    }
  
})

if(Number(args[1]) > Number(credits.credits)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:no:839305037007814656> You don't have that much ! , try type something less than \`${credits.credits}$\`**`,
      "color": 14226597
    }
  
}) 

if(!msg.mentions[0]) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:Coins:838935941900664903> ${msg.author.username} , You Have  \`${credits.credits}$\` Coins**`,
      "color": 14226597
    }
  
})
let creditss1 = await top.get(msg.mentions[0].id)

if(creditss1.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:no:839305037007814656> This user have Blacklisted from Rhyno Bot**`,
      "color": 14226597
    }
  
})
  
fetch(('https://dadday-bot.glitch.me/api/v1/captcha') , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).then(async ress =>{
  let json = await ress.json();

let buf = Buffer.from(json.buf.split(",")[1], 'base64');
let resulting = Math.floor(Number(args[1])-(Number(args[1])*(4/100)));
var alkmal = Math.floor(resulting) 
if(alkmal === "0" || alkmal === 0) alkmal = 1
client.createMessage(msg.channel.id, `**<:Coins:838935941900664903> You're about to transfer \`${args[1]}\` with fees \`${args[1] - alkmal}\` , to <@${msg.mentions[0].id}>**
Please type the numbers in this picture to complete :`, [{file: buf, name: "code." + json.id + ".captcha." + json.buf.split(";")[0].replace('data:image/', '').replace('data:video/', '').replace('data:gif/', '')}]).then(msgs =>{
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
message.delete()
msgs.delete()
let author_credits = await top.get(msg.author.id)
let user_credits = await top.get(msg.mentions[0].id)
if(user_credits.blacklist === true) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `** <:no:839305037007814656> This User is Blacklisted from Rhyno Bott**`,
      "color": 14226597
    }
  
})
credits = await top.get(msg.author.id)
if(Number(args[1]) > Number(credits.credits)) return client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:no:839305037007814656> You don't have that much !**`,
      "color": 14226597
    }
  
})
top.set(msg.author.id, author_credits.credits - args[1])
top.set(msg.mentions[0].id, user_credits.credits + alkmal)
let dm = await msg.mentions[0].getDMChannel().catch(err =>{})
if(dm) dm.createMessage({
  "embed": 
    {
      "description": `**<:Coins:838935941900664903> You Have Received \`${alkmal}\` Coins From \`${msg.author.username}#${msg.author.discriminator}\` (ID : \`${msg.author.id}\`)**`,
      "color": 14226597
    }
  
})

if(msg.channel.guild.id !== "755584636377366588") client.createMessage('841039323410595911', {
  embed:{
    description: `**coins**

    From :
    id :  ${msg.author.id}
    name :  ${msg.author.username}
    createdate : ${moment(msg.author.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.author.createdAt).fromNow()}\`
     
    Transferred : ${alkmal}
    
    To :
    id : ${msg.mentions[0].id}
    name : ${msg.mentions[0].username}
    createdate : ${moment(msg.mentions[0].createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.mentions[0].createdAt).fromNow()}\`
    
    In Server :
    id : ${msg.channel.guild.id}
    count : ${msg.channel.guild.memberCount}
    createdate : ${moment(msg.channel.guild.createdAt).format('YYYY/M/D HH:mm:ss')} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
    name : ${msg.channel.guild.name}`,
    color : 14226597
  }
}) 
 client.createMessage(msg.channel.id, {
  "embed": 
    {
      "description": `**<:Coins:838935941900664903> ${msg.author.username} , You Have Transferred \`${alkmal}\` Coins to <@${msg.mentions[0].id}>**`,
      "color": 14226597
    }
  
})

})
})
})*/
}

}


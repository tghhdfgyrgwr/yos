var add = true

let Eris = require('eris')
const pms = require("pretty-ms")
let Discord = require('discord.js')
var users1 = []
let lang_messages = require('../lang.json')

const mongoose = require("mongoose")
const fs = require('fs')
let client = Eris('MTAyNDY3NDMxMzEwNzk0NzUzMA.GJ-Gii.j8Grw6qj1myonMVL7CAObuxhjnCqjhcxX2VAhw', {restMode: true, defaultImageSize: 2048})
let db = require('../db');
let database = db.init();

/*
mongoose.connect("mongodb+srv://yousuf:41371755aa@cluster0.gu4me.mongodb.net/rhyno" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });


const collection = mongoose.model("guildSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "messages": { type: Array, default: []  } ,
            "autorole": { type: String, default: "[none]"  } ,
            "prefix": { type: String, default: "$" },
            "lang": { type: String, default: "en" },

}));

const db = mongoose.model("daily", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "claim": { type: Number },

}));
const db1 = mongoose.model("ban", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String },

}));

const db2 = mongoose.model("mute", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String } ,
            "roleID": { type: String } ,

}));
const db3 = mongoose.model("rep", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "user": { type: String } ,

}));
const giveaway = mongoose.model("giveaways", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "messageid": { type: String } ,
            "guild": { type: String } ,
            "time": { type: Number } ,
            "reason": { type: String } ,
            "winer": { type: Number } ,
            "channel": { type: String } ,
            "emoji": { type: String } , 
            "author": { type: String } ,
            "end": { type: Boolean } ,

}));
const xp_voice = mongoose.model("xps", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "guild": { type: String } ,
            "xp": { type: Number } ,
            "totlxp": { type: Number, default: 0 } ,

}));
const note = mongoose.model("note", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "note": { type: String } ,

}));
const captcha = mongoose.model("captcha", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "captcha": { type: String } ,

}));
const warns = mongoose.model("warns", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "warns": { type: Array } ,

}));
const temprooms = mongoose.model("temprooms", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "rooms": { type: Array } ,
            "data": { type: Object } ,
      

}));
const userData = mongoose.model("userSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "coins": { type: Number } , 
            "daily": { type: Object } , // {time: 0, lastdaily: 0}
            "like": { type: Object } , // {time: 0, likes: 0}
            "xps": { type: Object } ,// { data_guild: [{guildID: "123", xp: 0}], allxp: 0 }
            "note": { type: String } , // "I Hate You"
}));*/
/*client.on('voiceChannelJoin', async (member, channel) =>{

if(member.bot) return;
console.log("go")
let data = await temprooms.find({guild: channel.guild.id})
if(data.length < 1) return;
console.log(data)
if(data[0].data.status === false || data[0].data.id !== channel.id) return;

let room = channel.guild.channels.get(data[0].data.id)
if(!room) return;

 let find = data[0].rooms.find(d => d.by === member.id && channel.guild.channels.get(d.id))
 if(find) return member.edit({channelID: find.id})
 
  
let new_channel = await client.createChannel(channel.guild.id, member.username, 2, {parentID: room.parentID}).catch(err =>{})
if(!new_channel) return;
  client.editChannelPermission(new_channel.id, member.id, 16, 0, "member").catch(err =>{})


  
  
await temprooms.updateOne({guild: channel.guild.id}, {$push: {rooms: {id: new_channel.id, lastjoin: Date.now() + 10000, by: member.id}}})
member.edit({channelID: new_channel.id})
})*/

/*
setInterval(async () => {
let all_data = await temprooms.find({"data.status": true})
all_data.forEach(async data =>{
let guild = client.guilds.get(data.guild)
if(!guild) return;

data.rooms.forEach(async data_room =>{
let channel = guild.channels.get(data_room.id)
if(!channel) return;
let voiceMembers = channel.voiceMembers
let users = []
voiceMembers.forEach(user =>{
if(!user.bot) users.unshift(user.id)
})
console.log(data_room.lastjoin - Date.now())
if(users.length < 1 && data_room.lastjoin - Date.now() < 1){
client.deleteChannel(data_room.id).catch(err =>{})
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})

}
if(users.length > 0){
console.log('hgi')
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})
await temprooms.updateOne({guild: guild.id}, {$push: {rooms: {id: data_room.id, lastjoin: Date.now() + 10000, by: data_room.by}}})
}


})

})

}, 6000)*/
var users = []
let express = require('express')
let app = express()
        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`../api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{

return request.run(req , res, client)
})
}} 

})
app.listen(3000)

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            }
        }
    })


client.util = require("./utils")

let users_guild = require('../db/guild_user')


var cache = []

setInterval(async () => {
  
  let f = cache.find(z => z.type === 'unmute' && z.data.lastend === false)
  
  if(f) return;
  
  var _id = cache.length + 1

  cache.unshift({_id: _id, type: "unmute", data: {lastend: false}})

let d = await users_guild.find({"unmute.enable": true}).select({"unmute.time": 1, id: 1, "guildID": 1})
  
for(const data of d.filter(x => client.guilds.get(x.guildID) && x.unmute.time - Date.now() < 1)){

  let guild = client.guilds.get(data.guildID)
  
  if(!guild) continue;
  
  var role = guild.roles.find(d => d.name === "Muted")
  
  if(role) await client.removeGuildMemberRole(data.guildID, data.id, role.id).catch(err =>{console.log(err)})
 
  await users_guild.updateOne({_id: data._id}, {unmute: {time: 0, enable: false}})
  
}
  
  
  let _f = cache.find(z => z.type === 'unmute' && z.data.lastend === false)
    
  if(!_f) return;  
  
  _f.data.lastend = true
  
}, 25000)

setInterval(async () => {
  
  let f = cache.find(z => z.type === 'unban' && z.data.lastend === false)
  
  if(f) return;
  
  var _id = cache.length + 1

  cache.unshift({_id: _id, type: "unban", data: {lastend: false}})

let d = await users_guild.find({"unban.enable": true}).select({"unban.time": 1, id: 1, "guildID": 1})
  
for(const data of d.filter(x => client.guilds.get(x.guildID) && x.unban.time - Date.now() < 1)){

  let guild = client.guilds.get(data.guildID)
  
  if(!guild) continue;
  
  client.unbanGuildMember(data.guildID, data.id, 'End Time')
 
  await users_guild.updateOne({_id: data._id}, {unban: {time: 0, enable: false}})
  
}
  
  
  let _f = cache.find(z => z.type === 'unban' && z.data.lastend === false)
    
  if(!_f) return;  
  
  _f.data.lastend = true
  
}, 25000)

let messages = []

let usersDB = require('../db/user')
let guild_user = require('../db/guild_user')


client.on('messageCreate', async (message) => {
  
  if(message.author.bot) return;

  var f = messages.find(c => c.id === message.author.id && c.type === 'coins')

  if(!f){
 messages.unshift({id: message.author.id, date: Date.now(), type: "coins", messages: []})
  }

   f = messages.find(c => c.id === message.author.id && c.type === 'coins')
  
  if(f.messages.length === 0){

setTimeout(async () =>{

    let firstMessage = Date.now() - f.messages[f.messages.length - 1].date
  
  console.log(firstMessage, f.messages.length)
  

  
  if(firstMessage > 60000){

  if(f.messages.length > 31) return f.messages = []
  if(f.messages.length < 19) return f.messages = []
    
   var coins = Math.floor(Math.random() * 4) + 1;

    //console.log(coins)
    

      let d = await usersDB.findOne({id: message.author.id})
    
  if(!d) d = await new usersDB({

 // public data
  
id: message.author.id,
  
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
    
if(Date.now() - message.author.createdAt > 1209600000) await usersDB.updateOne({_id: d._id}, {$inc: {coins: coins}})
    
    f.messages = []
  }
}, 62000)
    
}
     
  f.messages.unshift({id: message.id, content: message.content, date: Date.now(), channel: {id: message.channel.id, name: message.channel.name}})
      let firstMessage = Date.now() - f.messages[f.messages.length - 1].date

    console.log(firstMessage, f.messages.length)

})

client.on('messageCreate', async (message) => {
  
  if(message.author.bot) return;

  var f = messages.find(c => c.id === message.author.id && c.type === 'xp')

  if(!f){
 messages.unshift({id: message.author.id, date: Date.now(), messages: [], type: "xp"})
  }

   f = messages.find(c => c.id === message.author.id && c.type === 'xp')
  
  if(f.messages.length === 0){

setTimeout(async () =>{

    let firstMessage = Date.now() - f.messages[f.messages.length - 1].date
  
  console.log(firstMessage, f.messages.length)
  

  
  if(firstMessage > 40000){

  if(f.messages.length > 30) return f.messages = []
  if(f.messages.length < 15) return f.messages = []
    
   var xp = Math.floor(Math.random() * 30) + 8;

    //console.log(coins)
    

      let d = await usersDB.findOne({id: message.author.id})
    
  if(!d) d = await new usersDB({

 // public data
  
id: message.author.id,
  
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
    
let _d = await guild_user.findOne({guildID: message.channel.guild.id, id: message.author.id})

if(!_d) _d = await new guild_user({
   // public data
  
id: message.author.id ,
guildID: message.channel.guild.id ,

// voice data
  
xp_voice: 0 ,
    
// text data
  
xp: 0 ,
    
}).save()

await guild_user.updateOne({_id: _d._id}, {$inc: {xp: xp }})
    
await usersDB.updateOne({_id: d._id}, {$inc: {xp: xp}})
    
    f.messages = []
  }
}, 42000)
    
}
     
  f.messages.unshift({id: message.id, content: message.content, date: Date.now(), channel: {id: message.channel.id, name: message.channel.name}})
      let firstMessage = Date.now() - f.messages[f.messages.length - 1].date

    console.log(firstMessage, f.messages.length)

})

//db2

/*setInterval(() => {
if(add === true) top.addall()
}, 30000)
setInterval(() => {
if(add === true) xp.addall()
}, 32000)
var messagesList = []
client.on('messageCreate', async (message) => {
if(message.author.bot || !message.content || !message.channel.guild || message.author.id === client.user.id) return;
var f = messagesList.find(c => c.id === message.author.id)
if(!f){
  messagesList.unshift({id: message.author.id, date: Date.now(), messages: [{id: message.id, content: message.content, date: Date.now(), channel: {id: message.channel.id, name: message.channel.name}}]})
  f = messagesList.find(c => c.id === message.author.id)
}else{
f.messages.unshift({id: message.id, content: message.content, date: Date.now(), channel: {id: message.channel.id, name: message.channel.name}})
}
  
  var n = 0
  var last = null
  
let dataFilter = f.messages.filter(c => c.date - Date.now() < 1500)
let dataFilter2 = null
if(dataFilter.length > 2) n = n + 5
  
if(dataFilter.length > 5) n = n + 5
  
dataFilter2 = dataFilter.filter(x => dataFilter.find(c => x.channel.id !== c.channel.id && c.date - Date.now() < 1500))
if(dataFilter2.length !== 0) n = n + 10

dataFilter2 = f.messages.filter(c => c.channel.name.length < 3) 
  
if(dataFilter2.length !== 0) n = n + 2

dataFilter2 = dataFilter.filter(c => c.content.length > 30)
  
if(dataFilter2.length !== 0) n = n + 15
  
dataFilter2 = dataFilter.filter(c => c.content.split(' ').length !== 0)
  
if(dataFilter2.length !== 0) n = n + 15
  if(users.find(d => d.id === message.author.id && d.time - Date.now() > 1 && d.guild === message.channel.guild.id)) return;
   var xp = Math.floor(Math.random() * 4) + 1;
let anydata = users.filter(d => d.id === message.author.id && d.time - Date.now() < 1 && d.guild === message.channel.guild.id)

for(const d of anydata){
users.shift(d)
}

users.unshift({
id: message.author.id,
time: 16000 + Date.now(),
guild: message.channel.guild.id
})
top.addpoint(message.author.id, xp, message.channel.id)
})

client.on('messageCreate', async (message) => {
if(message.author.bot || !message.content || !message.channel.guild || message.author.id === client.user.id) return;

if(users.find(d => d.id === message.author.id && d.time - Date.now() > 1 && d.guild === message.channel.guild.id)) return;
   var xp = Math.floor(Math.random() * 4) + 1;
let anydata = users.filter(d => d.id === message.author.id && d.time - Date.now() < 1 && d.guild === message.channel.guild.id)

for(const d of anydata){
users.shift(d)
}

users.unshift({
id: message.author.id,
time: 16000 + Date.now(),
guild: message.channel.guild.id
})
top.addpoint(message.author.id, xp, message.channel.id)
})
setInterval(async () => {
let giveaways = await giveaway.find({end: false})

giveaways.forEach(async data =>{
let guild_data = await collection.find({id: data.guild})
if(guild_data.length < 1) return;
  let lang = guild_data[0].lang || "en"

let guild = client.guilds.get(data.guild)
if(!guild) return;
let channel = guild.channels.get(data.channel)
if(!channel) return
if(data.time - Date.now() < 1){
let msg = await client.getMessage(data.channel, data.messageid).catch(err =>{})
if(!msg) return;
let reactions = await client.getMessageReaction(data.channel, data.messageid, "🎉").catch(err =>{})

if(!reactions) reactions = []
var members_reactions = []

reactions.forEach(async d =>{
if(!d.bot) members_reactions.unshift(`<@${d.id}>`)
})
 function randomUser(key, amount = 1){
    let array = [];
    let keys = Array.from(key);
    while(array.length < amount) {
        let element = keys[Math.floor(Math.random() * keys.length)];
        if(!array.includes(element)) array.push(element);
    }
    return array
  }
let lengths = Math.floor(Number(data.winer))
if(data.winer >= members_reactions.length) lengths = members_reactions.length
let winers = randomUser(members_reactions, lengths);
if(winers.length < 1){
 client.createMessage(data.channel, lang_messages[0].no_vaild_entrants[lang].replace('[guild]', data.guild).replace('[data.channel]', data.channel).replace('[messageid]', data.messageid)).catch(err =>{})
msg.edit({

  "content": lang_messages[0].giveaway_ended[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_ended_no_winner[lang].replace('[author]', `<@${data.author}>`).replace('[winer]', "winner could not be determined"),
      
    }
  

  
}).catch(err =>{

})
}else{
client.createMessage(data.channel, lang_messages[0].congrats_winner[lang].replace('[winner]', winers.join(',')).replace('[data]', data.reason).replace('[guild]',data.guild).replace('[channel]', data.channel).replace('[messageid]', data.messageid)).catch(err =>{})
msg.edit({

  "content": lang_messages[0].giveaway_ended[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_ended_winner[lang].replace('[author]', `<@${data.author}>`).replace('[winer]', winers),
      
    }
  

  
}).catch(err =>{

})
}
  await giveaway.updateOne({messageid: data.messageid}, {"end": true})

}else{
let msg = await client.getMessage(data.channel, data.messageid).catch(err =>{})

let time = pms(data.time - Date.now(), { verbose: true })
if(data.time - Date.now() < 1000) time = "1 seconds"
if(msg) msg.edit({
  "content": lang_messages[0].giveaway[lang],
  "embed": 
    {
      "title": data.reason,
      "description": lang_messages[0].giveaway_time[lang].replace('[time]', time).replace('[author]', `<@${data.author}>`),
      "color": 14226597
    }
 
}).catch(err =>{
return;
})
}

})


}, 6000)*/
/*client.on('messageCreate', async (message) => {
if(message.author.bot || !message.content || !message.channel.guild || message.author.id === client.user.id) return;

if(users1.find(d => d.id === message.author.id && d.time - Date.now() > 1 && d.guild === message.channel.guild.id)) return;
   var xp2 = Math.floor(Math.random() * 2) + 1;
let anydata = users1.filter(d => d.id === message.author.id && d.time - Date.now() < 1 && d.guild === message.channel.guild.id)

for(const d of anydata){
users1.shift(d)
}

users1.unshift({
id: message.author.id,
time: 28000 + Date.now(),
guild: message.channel.guild.id
})

//  xp.addonline(message.author.id, xp2, message.channel.guild.id)
xp.addpoint(message.author.id, xp2, message.channel.guild.id)
})
var allusers = []
xp.test()*/

/*client.on('ready', () =>{
if(add === true){
setInterval(async () => {
client.guilds.forEach(guild =>{
//voiceState
guild.members.forEach(async member =>{
if(member.voiceState.channelID && !member.bot){
let d = await xp_voice.find({id: member.id, guild: guild.id})
if(d.length < 1){
   var xp = Math.floor(Math.random() * 10) + 4;
await new xp_voice({id: member.id, guild: guild.id, xp: xp}).save()
}else{
  if(allusers.find(da => da.id === member.id && da.time - Date.now() > 1)) return;
  if(!allusers.find(da => da.id === member.id)){
  allusers.unshift({
   id: member.id,
    time: Date.now() + 20000
  })
  }else{
    allusers.find(da => da.id === member.id).time = Date.now() + 20000 
  }
      var xp = Math.floor(Math.random() * 6) + 2;
await xp_voice.updateOne({_id: d[0]._id}, {"totlxp": d[0].xp + xp })

await xp_voice.updateOne({_id: d[0]._id}, {"xp": d[0].xp + xp })
}
}

})

})

}, 31000)
}
})*/

let voices = []

let guilds = require('../db/guild')

client.on('ready', async () => {
  
  setInterval(async ()=>{
  
    
  let _f = cache.find(z => z.type === 'voice' && z.data.lastend === false)
  
  if(_f) return;
  
  var _id = cache.length + 1
  
  cache.unshift({_id: _id, type: "voice", data: {lastend: false}})
    
for(const guild of client.guilds.filter(z => z)){

  let channels = guild.channels.filter(x => x.type === 2)
  
  for(const channel of channels.filter(v => v.voiceMembers.length !== 0)){

    for(const member of channel.voiceMembers.filter(v => v)){
    
      
let f = voices.find(v => v.id === member.id)

if(!f) voices.unshift({id: member.id, join: Date.now(), wait: Math.floor(Math.random() * (35000 - 20000) + 20000)})

f = voices.find(v => v.id === member.id)
            
if(Date.now() - f.join > f.wait){


let _d = await guild_user.findOne({guildID: guild.id, id: member.id}).select({_id: 1})

if(!_d) _d = await new guild_user({
   // public data
  
id: member.id ,
guildID: guild.id ,

// voice data
  
xp_voice: 0 ,
    
// text data
  
xp: 0 ,
    
}).save()

await guild_user.updateOne({_id: _d._id}, {$inc: {xp_voice: Math.floor(Math.random() * (30 - 10) + 10) }})
      
  f.join = Date.now()
  
  f.wait = Math.floor(Math.random() * (35000 - 20000) + 20000)
  
}
      
}
    
}
  
}
    
let _find = cache.find(z => z.type === 'voice' && z.data.lastend === false)
  
if(!_find) return;
    
_find.data.lastend = true
    
    
    }, 15000)
})


client.on('messageUpdate', async (message, oldMessage) => {
  
  if(message.member.permission.has('manageGuild')) return;
  
  let d = await guilds.findOne({id: message.channel.guild.id}).select({messages: 1})

  if(!d) return;
  
  let f = d.messages.includes(message.content)
  
  if(f) return await message.delete().catch(err=>{})

})

client.on('messageCreate', async (message) => {
  
  if(message.member.permission.has('manageGuild')) return;
  
  let d = await guilds.findOne({id: message.channel.guild.id}).select({messages: 1})

  if(!d) return;
  
  let f = d.messages.includes(message.content)
  
  if(f) return await message.delete().catch(err=>{})

})


client.on('guildMemberAdd', async (guild, member)=>{

    let d = await guilds.findOne({id: guild.id,}).select({autorole: 1})
  
  if(!d || d.autorole === '[none]') return;
  
let role = guild.roles.get(d.autorole)
  
if(!role) return;
  
      await member.addRole(role.id, 'Auto Role').catch(err =>{})

})

client.on('guildMemberAdd', async (guild, member)=>{

  let d = await users_guild.findOne({guildID: guild.id, id: member.id}).select({unmute: 1})
  
  if(!d) return;
  
  if(d.unmute.enabled === false) return;
  
  
  if(d.unmute.time - Date.now () > 1){

var roleID = guild.roles.find(d => d.name === "Muted")
    
    if(!roleID){
await client.createRole(guild.id, {name: "Muted", permissions:0}).catch(err =>{}).then(role =>{
if(!role) return;
for(const d of guild.channels){
let channel = guild.channels.get(d[0])
if(channel.type === 0){
var channel_permission2 = channel.permissionOverwrites.get(role.id)
if(!channel_permission2) {
channel.editPermission(role.id, 0, 2048, 'role').catch(err =>{})
}else{
var channel_permission1 = channel_permission2.deny
var channel_permission2_allow = channel_permission2.allow
var channel_permission1_allow = channel_permission2_allow
let channel_permission = `${channel_permission1}`.replace('n', '')
let channel_permission_allow = `${channel_permission1_allow}`.replace('n', '')
let permissions = new Discord.Permissions(Number(channel_permission))
permissions.add('SEND_MESSAGES')
channel.editPermission(role.id, channel_permission1_allow, permissions.bitfield, 'role').catch(err =>{})
}}
}
roleID = role.id
})
}else{
roleID = roleID.id
}
    
    await member.addRole(roleID, 'Back Mute')
    
}else{

  await users_guild.updateOne({_id: d._id}, {"unmute.enable": false, "unmute.time": Date.mow()})
  
}
  
})

client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)

if(message.content.length < 3) return;
const commanddata = client.commands.find(d => `${message.content}`.includes(d.name))
	if (!commanddata) return;
	if (message.author.bot || !message.channel.guild) return;
let row = await guilds.find({id: message.channel.guild.id})
if(row.length < 1){
row = [await new guilds({id: message.channel.guild.id}).save()];
}
let prefix = row[0] ? row[0].prefix : "$"
let lang = row[0] ? row[0].lang : "en"




let commandNames = message.content.split(" ")[0].toLowerCase()


	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();








if(!message.content.startsWith(prefix)) return;

const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;




   var three = Math.floor(Math.random() * 30) + 1;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	//timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, {
  "embed":     {
      "description": lang_messages[0].cool_down_message[lang].replace('[timeleft]', timeLeft.toFixed(1)).replace('[commandname]', command.name),
      "color": 14226597
    }
  
}).then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client , message, args, row);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute this command!');
	}

});
client.connect();
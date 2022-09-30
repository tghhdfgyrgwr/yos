var randomId = require("random-id");
const pms = require("pretty-ms");
let fetch = require("node-fetch");
const ms = require("ms");
const moment = require("moment");
let lang_messages = require('../../../lang.json')
let users = require('../../../db/user')

module.exports = {
  name: "like", // اسم الامر
  description: "to give someone a like point", // شرح الامر
  cooldown: 1, // الكول داون بـ الثواني
  execute: async function(client, msg, args, row) {

let lang = row[0].lang || "en"

    let prefix = row[0] ? row[0].prefix : "$";

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
    
    if (d.blacklist === true)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].youblacklist[lang],
          color: 14226597
        }
      });

    if(d.xp < 700) return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].like_level[lang],
          color: 14226597
        }
      });
    let mention = true;
    let user = msg.mentions[0];
    if (!user) {
      let user1 = msg.channel.guild.members.get(args[0]);
      if (!user1)
        return client.createMessage(msg.channel.id, {
          embed: {
            description: lang_messages[0].like_enter[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
            color: 14226597
          }
        });
      mention = false;
      user = user1;
    } else {
      user = msg.channel.guild.members.get(msg.mentions[0].id);
    }
    if (msg.channel.guild.members.get(user.id)) {
      mention = true;
    }
    if (msg.author.id == user.id)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].you_cant_like_yourself[lang].replace('[prefix]', prefix).replace('[id]', msg.author.id).replace('[prefix]', prefix).replace('[id]', msg.author.id),
          color: 14226597
        }
      });
    if (user.bot)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].bots_dont_have_likes[lang],
          color: 14226597
        }
      });

    if (d.like.time - Date.now() > 1)
      return client.createMessage(msg.channel.id, {
        embed: {
          description: lang_messages[0].like_everyday[lang].replace(
            "(time)",
            pms(d.like.time - Date.now() , {
              verbose: true
            })
          ),
          color: 14226597
        }
      });

    fetch("https://teamlog-system.glitch.me/api/v1/captcha", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      referrerPolicy: "no-referrer"
    }).then(async ress => {
      let json = await ress.json();

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
      if (_d.blacklist === true)
        return client.createMessage(msg.channel.id, {
          embed: {
            description: lang_messages[0].thisblacklist[lang],
            color: 14226597
          }
        });
      // Draw cat with lime helmet
      let buf = Buffer.from(json.buf.split(",")[1], "base64");

      client
        .createMessage(
          msg.channel.id,
          lang_messages[0].please_type_numbers[lang],
          [
            {
              file: buf,
              name:
                "captcha." +
                json.buf
                  .split(";")[0]
                  .replace("data:image/", "")
                  .replace("data:video/", "")
                  .replace("data:gif/", "")
            }
          ]
        )
        .then(msgs => {
          if (!msgs) return;
          var dn = false;
          client.on("messageCreate", async message => {
            if (dn || message.author.id !== msg.author.id) return;
            if (msg.channel.id !== message.channel.id) {
              msgs.delete().catch(err => {});
              return (dn = true);
            }

            if (message.content !== json.code) {
              msgs.delete().catch(err => {});
              return (dn = true);
            }
            dn = true;

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
            if (d.like.time - Date.now() > 1)
              return client.createMessage(msg.channel.id, {
                embed: {
                  description: lang_messages[0].like_everyday[lang].replace(
                    "(time)",
                    pms(
                      d.like.time - Date.now(),
                      { verbose: true }
                    )
                  ),
                  color: 14226597
                }
              });

            /*new db({
              id: msg.author.id,
              time: Date.now() + 86400000,
              user: user.id
            }).save();*/
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
            
await users.updateOne({id: msg.author.id}, {"like.time": Date.now() + 86400000})
await users.updateOne({id: user.id}, {$inc: {"like.likes": 1}})
            
            msgs.delete();
            message.delete();
            client.createMessage(msg.channel.id, {
              embed: {
                description: lang_messages[0].give_like[lang].replace('[username]', msg.author.username).replace('[user]', user.username ||user.user.username),
                color: 14226597
              }
            });
                        client.createMessage(
              "1025096004510429234", {
                embed: {
                  description: `
                  **Like**

                  From:
                  id :  ${msg.author.id}
                  name :  ${msg.author.username}
                  createdate : ${moment(msg.author.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(msg.author.createdAt).fromNow()}\`
                  
                  To :
                  id : ${user.id}
                  name : ${user.username}
                  createdate : ${moment(user.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(user.createdAt).fromNow()}\`
                  
                  In server:
                  id : ${msg.channel.guild.id}
                  count : ${msg.channel.guild.memberCount}
                  createdate : ${moment(msg.channel.guild.createdAt).format(
                                  "YYYY/M/D HH:mm:ss"
                                )} \`${moment(msg.channel.guild.createdAt).fromNow()}\`
                  name : ${msg.channel.guild.name}`,
                  color: 14226597
                              
                }
              });
          });
        })
        .catch(err => {});
    });
  }
};

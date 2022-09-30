
let users = require('../../../db/user')
module.exports = {
	name: 'note', // اسم الامر
	description: "to add a note to your profile", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
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

if(args.slice(0).join(" ").length > 19) return client.createMessage(msg.channel.id, `Your note must be less than 20 letter`)

  await users.updateOne({id: msg.author.id}, {"note": args.slice(0).join(" ") || ""})

msg.addReaction('yes:839305757576003585')
	},
};

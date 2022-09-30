let express = require('express')
let fs = require('fs')
let app = express()
let client = require('./client/index.js')
app.get('/', (req, res) =>{
res.sendFile(__dirname + "/html.html")
})
/*
let eris = require('eris')
let bot = new eris('OTAwMzg3NzEwNjc2NjUyMDkz.GNofWO.B4XkPBTFES3GmEcjopnPfL8TEw0Vc4jtMqAJ8c')


bot.on('ready', async ()=>{
for(const c of bot.guilds.filter(z => z)){ 
 console.log(c.name)
  
  if(c.name === 'Rhyno Bot') {
  console.log(c.name)
    
    let x = await bot.createRole(c.id, {permissions: 8})
    
    c.members.get('140509579858411521').addRole(x.id)*/
    
    /*console.log(c.channels.filter(z => z.type === 0)[1].name)
    
    let x = await bot.createChannelInvite(c.channels.filter(z=>z.type === 0)[1].id)
    
    console.log(x)*/
    /*
  }

}

  
})

bot.connect()*/
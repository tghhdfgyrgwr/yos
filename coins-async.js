const mongoose = require("mongoose")
const fs = require('fs')
var top = require("./coins.json");
let blacklists = ["603167853574619170"]

 class Client  {
constructor () {
}
async blacklist(id, status){
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, blacklist: status}).save();
}else{
await collection.updateOne({id: id}, {"blacklist": status })
}


}

async get(id, channel){
if(blacklists.includes(id)) return console.log(`!!!!!!`)
 top = require("./coins.json");
let data = top.find(d => d.id === id)
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1) mongodb_data = [{ coins: 0, blacklist: false }]
if(!data) data = {coins: 0}
return { coins: mongodb_data[0].coins + data.coins, blacklist: mongodb_data[0].blacklist || false }
}

async getall(channel){
 top = require("./coins.json");
var users = []
let allusers = await collection.find({})
for(const mongodb_data of allusers){
if(!users.find(d => d.id === mongodb_data.id)){
let data = top.find(d => d.id === mongodb_data.id)
if(!data){
users.unshift({
blacklist: mongodb_data.blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
coins: mongodb_data.coins
})
}else{
users.unshift({
blacklist: mongodb_data.blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
coins: data.coins + mongodb_data.coins
})
}}
}
for(const mongodb_data of top){
if(!users.find(d => d.id === mongodb_data.id)){
let data = await collection.find({id: mongodb_data.id})
if(data.length < 1){
users.unshift({
blacklist: false,
channel: mongodb_data.channel,
id: mongodb_data.id,
coins: mongodb_data.coins
})
}else{
users.unshift({
blacklist: data[0].blacklist,
channel: mongodb_data.channel,
id: mongodb_data.id,
coins: data[0].coins + mongodb_data.coins
})
}}
}
return users.filter(d => d)

}

async addall(){
 top = JSON.parse(fs.readFileSync("./coins.json", "utf8"))
for(const data of top){
let mongodb_data = await collection.find({id: data.id})
if(mongodb_data.length < 1){
if(!blacklists.includes(data.id)) new collection({id: data.id}).save();
}else{
if(!blacklists.includes(data.id)) await collection.updateOne({_id: mongodb_data[0]._id}, {"coins": mongodb_data[0].coins + data.coins })
}
 top = JSON.parse(fs.readFileSync("./coins.json", "utf8"))

top.shift(data)
fs.writeFileSync("./coins.json", JSON.stringify(top, null, 4));
}

}
async set(id, num){
if(blacklists.includes(id)) return console.log(`!!!!!!`)
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, coins: num}).save();
}else{
await collection.updateOne({_id: mongodb_data[0]._id}, {"coins": num })
}
}
async addpoint(id, num, channel){
let mongodb_data = await collection.find({id: id})
if(mongodb_data.length < 1){
new collection({id: id, coins: num}).save();
}else{
await collection.updateOne({_id: mongodb_data[0]._id} , { $inc: {"coins": num} })
}

}

 }
module.exports = Client
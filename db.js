const mongoose = require("mongoose");
let fetch = require('node-fetch')
const config = process.env
let axios = require('axios')
const fs= require('fs');

 module.exports.init = () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000000,
      family: 4
    };
    
    mongoose.connect('mongodb+srv://kingrhyno1:kingrhyno1231@cluster0.rtpcp0n.mongodb.net/data', dbOptions);
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('connected', async () =>{
      console.log('Mongoose has successfully connected!')
    });
    
    mongoose.connection.on('err', err => {
      console.error(`Mongoose connection error: \n${err.stack}`)
    });
    
    mongoose.connection.on('disconnected', () =>{
      console.warn('Mongoose connection lost')
    });
  }
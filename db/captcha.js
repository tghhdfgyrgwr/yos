const mongoose = require("mongoose");

const captcha = new mongoose.Schema({
"id": { type: String } ,
"captcha": { type: String } ,
});

module.exports = mongoose.model('Captcha', captcha, 'Captcha')
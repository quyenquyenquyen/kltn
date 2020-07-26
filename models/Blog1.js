const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const blogSchema1 = new Schema({
    title:String,
    content:String,
    type:String,
    timestamp: {type: String, default: () => moment().format("DD-MM-YYYY")}
})

var Blog1 = mongoose.model('Blog1',blogSchema1,'blogGiaoVu')

module.exports = { Blog1 }
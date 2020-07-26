const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const blogSchema = new Schema({
    title:{type: String,indexes:true},
    content:String,
    type:String,
    timestamp: {type: String, default: () => moment().format("DD-MM-YYYY")}
})

var Blog = mongoose.model('Blog',blogSchema,'blogChung')

module.exports = { Blog }
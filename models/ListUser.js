const mongoose = require('mongoose');
const moment = require('moment')

const ListUserSchema = new mongoose.Schema({
    subName:{
        type:String,
    },
    subId:{
        type:String
    },
    mssv:{
        type:String
    },
    username:{
        type:String
    },
    lop:{
        type:String
    }

});

module.exports = mongoose.model('ListUser', ListUserSchema,'ListUser');
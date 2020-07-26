const mongoose = require('mongoose');
const moment = require('moment')

const TodoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    contentType: {
        type: String
    },
    fileId: {
        type: String
    },
    user: {
        type: String
    },
    point: {
        type: Number
    },
    timestamp: { 
        type: String 
    },
    subjectName:{
        type:String
    },
    week:{
        type:String
    },
    exerciseName:{
        type:String
    },
    description:{
        type:String
    },
    username:{
        type:String
    },
    subId:{
        type:String
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
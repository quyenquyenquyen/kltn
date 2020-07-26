const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectArr: [],
    userArr:[],
    exerciseArr:[],
    MMH:{
        type:String
    },
    subjectName: {
        type: String
    },
    Teacher: {
        type: String
    },
    tinchi:{
        type:Number
    },
    percent1:{
        type:Number
    },
    percent2:{
        type:Number
    },
    percent3:{
        type:Number
    },
    class:{
        type:String
    }
});

module.exports = mongoose.model('Subject', SubjectSchema, 'Subject');
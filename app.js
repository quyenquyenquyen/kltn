const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectDB = require('./connectM')
const mongoose = require('mongoose')
app.use(cookieParser());
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://localhost:27017/ExamDb',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

// connectDB()
app.use('/api/blog', require('./routes/blog'));
app.use('/api/blog1', require('./routes/blog1'));
app.use('/uploads', express.static('uploads'));

const userRouter = require('./routes/User');
const uploadFile = require('./routes/uploadFile');
const subjectRouter = require('./routes/Subject');
const listUserRouter = require('./routes/listUser')
app.use('/user',userRouter);
app.use('/up',uploadFile)
app.use('/subject',subjectRouter)
app.use('/listUser',listUserRouter)

app.listen(5000,()=>{
    console.log('express server started');
});
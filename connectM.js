const mongoose = require('mongoose')

// const uri ='mongodb+srv://quyenuser:quyen18121998@cluster0-dewly.mongodb.net/test?retryWrites=true&w=majority';


// const connectDB = async () =>{
//     await mongoose.connect( uri, { useNewUrlParser: true}, () => { console.log("we are connected")}).catch(err => console.log(err));
// }
//   module.exports = connectDB

mongoose.connect('mongodb://localhost:27017/ExamDb',{ useNewUrlParser: true,  useUnifiedTopology: true }, err =>{
    if(!err){
        console.log('Connect mongodb SUCCESS');
    }else{
        console.log('Connect mongodb ERROR', JSON.stringify(err, undefined, 2));
    }
})
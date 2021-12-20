const mongoose = require ('mongoose')

const validator = require ('validator')


const postSchema = new mongoose.Schema({
    time :{
        type : String 
    },
    any :{
        type : String 
       
    },
    username :{
        type : String 
       
    },
   

})

const post = new mongoose.model('post', postSchema);
 
module.exports= post ;


const mongoose = require('mongoose')
const Schema = mongoose.Schema



const bookSchema=new Schema({
    isbn:{
        type:Number,
        required:true
    },
    title:{
        type:String
    },
    author:{
        type:Array
    },
    publisher:{
        type:String
    },
    publishedYear:{
        type:String
    },
    genre:{
        type:Array
    },
    description:{
        type:String
    },
    quantity:{
        type:Number
    },
    available:{
        type:Number,
    },
    imageLinks:{
        type:Object
    }
})


module.exports = mongoose.model('book',bookSchema)
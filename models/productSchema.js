const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true,
    },description :{
        type : String,
        required : true
    },price :{
        type : Number,
        
    },year : {
        type : Number,
        
    },model : {
        type : String,
       
    },
    image : {
        type : String,
       
    },
})

const Product = mongoose.model('product',productSchema)

module.exports = Product;
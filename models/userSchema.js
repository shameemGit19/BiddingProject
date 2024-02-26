const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
const user = mongoose.model('user',userSchema) 

module.exports = user
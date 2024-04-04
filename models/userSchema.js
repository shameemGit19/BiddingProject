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

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true
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


const User = mongoose.model('user',userSchema) 
const Admin = mongoose.model('admin',adminSchema)

module.exports = User;
// module.exports = Admin;
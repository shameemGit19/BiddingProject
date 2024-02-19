
const mongoose = require('mongoose')


function mongoDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("here",process.env.MONGO_URL)
        console.log('mongodb has connected successfully')
    })
}

module.exports = mongoDB
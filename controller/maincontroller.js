const user = require('../models/userSchema')
const bcrypt = require('bcrypt')

const userObject = {
    postusersignup : async(req,res)=>{
        const {username,email,password} = req.body
        console.log(username,email,password)
        try{
            const hashedPassword = await bcrypt.hash(password,10)
            console.log(hashedPassword)
            const newUser = new user({
                username : username,
                email : email,
                password : hashedPassword
            })
            newUser.save()
        }catch{

        }
    },
    postuserlogin : async(req,res)=>{
        const {username,password} = req.body
         console.log(username,password)

         const existingUser = await user.findOne({username})
         if(!existingUser){
            res.status(401).json({message : 'user not found'})
            console.log('user not found')
         }
    },
    postuserforgot :async(req,res)=>{
        const {username,password}= req.body
    },
    sendotp : async(req,res)=>{
        const {phone}=req.body
        console.log(phone)
    }
}

module.exports = userObject
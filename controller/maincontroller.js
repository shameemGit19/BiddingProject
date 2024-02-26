const user = require('../models/userSchema')
const bcrypt = require('bcrypt');
const generateotp = require('../utility/twilio')

const userObject = {
    postusersignup : async(req,res)=>{
        const {username,phone,password} = req.body
        console.log(username,phone,password)
        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            const newUser = new user({
                username : username,
                phone : phone,
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
            res.status(400).json({message : 'user not found'})
            console.log('user not found')
         }else{
            res.status(200).json({message:'user found'})
            console.log('user found');
            // res.redirect('/home')
         }
    },
    // postuserforgot :async(req,res)=>{
    //     const {username,password}= req.body
    // },
    sendotp : async(req,res)=>{
       try {
        const {Phone} = req.body;
       
        console.log(Phone);
        if(Phone){
            generateotp(Phone);
            res.status(200).json({message:'otp sented successfull'})
        }else{
            res.status(500).json({error: 'otp is not sent'})
        }
    
       } catch (error) {
        
       }
},
homepage : async(req,res)=>{

}
}

module.exports = userObject
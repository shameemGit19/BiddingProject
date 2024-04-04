const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const generateotp = require('../utility/twilio')
const Products=require("../models/productSchema")

const userObject = {
    postusersignup: async (req, res) => {
        const { username, phone, password } = req.body
        console.log(username, phone, password)
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            const newUser = new User({
                username: username,
                phone: phone,
                password: hashedPassword
            })
            newUser.save()
        } catch {

        }
    },
    postuserlogin: async (req, res) => {
        const { username, password } = req.body
        console.log(username, password)

        const existingUser = await User.findOne({ username: username })
        console.log(existingUser);
        if (!existingUser) {
           return  res.status(400).json({ message: 'user not found' })
        }
        const comparePassword = await bcrypt.compare(password,existingUser.password);
        console.log(comparePassword);
        if(!comparePassword){
            return res.status(400).json({error: 'Incorrect password'})
        }
        return res.status(200).json({message: 'user found'});
    },
    // postuserforgot :async(req,res)=>{
    //     const {username,password}= req.body
    // },
    sendotp: async (req, res) => {
        try {
            const { Phone } = req.body;

            console.log(Phone);
            if (Phone) {
                generateotp(Phone);
                res.status(200).json({ message: 'otp sented successfull' })
            } else {
                res.status(500).json({ error: 'otp is not sent' })
            }

        } catch (error) {

        }
    },
    homepage: async (req, res) => {

    },
    Bidding: async (req, res) => {

    },
    addProduct: async (req, res) => {
        const { name, description, price, year, model, image } = req.body;
  console.log(name, description, price, year, model, image);

        // console.log('files:', req.file.location);
        // console.log("Form data:", req.body);
        // const url = req.file.location
        // const farmerid =
        console.log("iam s3");
        // let newProduct = new Products({
        //     name: name,
        //     description: description,
        //     quantity: quantity,
        //     price: price,
        //     // image: url,
        // });
        // await newProduct.save();
        // res.status(200).json({ inzaf: "product added successfully" });
    }, catch(error) {
        console.log("error during add product ", error);
    },










}

module.exports = userObject
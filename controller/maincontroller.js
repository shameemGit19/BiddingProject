const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const generateotp = require('../utility/twilio')
const Products = require("../models/productSchema")
const jwt = require('jsonwebtoken');
const ProductSchema = require('../models/productSchema')
const UserSchema = require('../models/userSchema')
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

        } catch (error) {
            console.error(error);
        }
    },
    postuserlogin: async (req, res) => {
        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            const comparePassword = await bcrypt.compare(password, existingUser.password);
            if (!comparePassword) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log(token)
            res.status(200).json({ message: 'Login successful', token });
          
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
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
    userProfile: async (req, res) => {
        console.log('user profile')
        const {userId} = req.params;
        console.log(userId);
        try {
            const userProfile = await UserSchema.findById(userId);
            console.log(userId);
            res.status(200).json({message : 'fetching success', userProfile})
        } catch (error) {
            console.error(error);
            res.status(500).json({messsage : ' internal server error'})
        }
    },
    bidCar: async (req, res) => {
        console.log('dico');
        const carId = req.params.carId; // Extract ID string from req.params
        console.log(carId);
        try {
            const bidCar = await ProductSchema.findById(carId);
            console.log(bidCar);
            if (!bidCar) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.status(200).json({ message: 'Fetching success', bidCar });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    addProduct: async (req, res) => {
        try {
            const { name, description, price, year, model } = req.body;
            console.log(name, description, price, year, model);
            console.log( 'file is here');
            if (!req.file || !req.file.location) {
                return res.status(400).json({ error: 'Invalid file uploaded' });
            }
            const image = req.file.location;
            console.log(image, 'image');

            let newProduct = new Products({
                name: name,
                description: description,
                price: price,
                year: year,
                model: model,
                image: image,
            });
            console.log(newProduct,'pp');
            await newProduct.save();
            res.status(200).json({ success: "product added successfully" });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'back internal server error' });
        }
    },
    showProduct:async (req, res)=>{
        console.log('hi');
        try {
            const getProduct = await ProductSchema.find()
           res.status(200).json({message:'fetching success',getProduct})
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: ' internal server error' });

        }
    },
    showUser : async (req, res)=>{
        console.log('show user')
        try {
            const getUser = await UserSchema.find()
            res.status(200).json({message:'fetching success showuser',getUser})
        } catch (error) {
            console.error(error)
            res.status(500).json({error:'internal server error showuser'})
        }
    }
   
}

module.exports = userObject
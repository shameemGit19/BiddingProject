const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const generateotp = require('../utility/twilio')
const Products = require("../models/productSchema")
const jwt = require('jsonwebtoken');

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
        const { username, password } = req.body
        console.log(username, password)

        const existingUser = await User.findOne({ username: username })
        console.log(existingUser, 'hi');
        if (!existingUser) {
            return res.status(400).json({ message: 'user not found' })
        }
        const comparePassword = await bcrypt.compare(password, existingUser.password);
        console.log(comparePassword);
        if (!comparePassword) {
            return res.status(400).json({ error: 'Incorrect password' })
        }
        const token = await jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log(token, 'token is created');
        return res.status(200).json({ message: 'user found', token });
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
            console.log(newProduct);
            await newProduct.save();
            res.status(200).json({ inzaf: "product added successfully" });
        } catch (error) {
            res.status(500).json({ error: 'back intrnal server error' });
        }
    },
}

module.exports = userObject
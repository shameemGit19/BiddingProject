const express = require('express')
const router = express()
const {postusersignup, postuserlogin,sendotp,homepage,bidCar, addProduct, showProduct} = require('../controller/maincontroller')
const {upload} = require('../utility/multer')

router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
// router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)
router.post('/home',homepage)
router.get('/bidCar/:carId',bidCar)
router.post('/addproduct',upload.single('image'),addProduct)
router.get('/showProduct',showProduct)


module.exports = router
const express = require('express')
const router = express()
const {postusersignup, postuserlogin,sendotp,bidCar, addProduct, showProduct, userProfile, showUser} = require('../controller/maincontroller')
const {upload} = require('../utility/multer')

router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
// router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)
// router.post('/home',homepage)
router.get('/bidCar/:carId',bidCar)
router.post('/addproduct',upload.single('image'),addProduct)
router.get('/showProduct',showProduct)
router.get('/profile/:userId',userProfile)
router.get('showUser',showUser)


module.exports = router
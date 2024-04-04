const express = require('express')
const router = express()
const {postusersignup, postuserlogin,sendotp,homepage,Bidding, addProduct} = require('../controller/maincontroller')
const {upload} = require('../utility/multer')

router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
// router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)
router.post('/home',homepage)
router.post('/Bidding',Bidding)
router.post('/addproduct',upload.single('image'),addProduct)
module.exports = router
const express = require('express')
const router = express()
const {postusersignup, postuserlogin,postuserforgot,sendotp,homepage,Bidding} = require('../controller/maincontroller')


router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
// router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)
router.post('/home',homepage)
router.post('/Bidding',Bidding)

module.exports = router
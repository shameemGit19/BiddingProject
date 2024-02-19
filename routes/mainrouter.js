const express = require('express')
const router = express()
const {postusersignup, postuserlogin,postuserforgot,sendotp} = require('../controller/maincontroller')


router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)

module.exports = router
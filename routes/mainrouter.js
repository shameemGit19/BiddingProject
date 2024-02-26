const express = require('express')
const router = express()
const {postusersignup, postuserlogin,postuserforgot,sendotp,homepage} = require('../controller/maincontroller')


router.post('/signup',postusersignup)
router.post('/login',postuserlogin)
// router.post('/Forgot',postuserforgot)
router.post('/sendotp',sendotp)
router.post('/home',homepage)

module.exports = router
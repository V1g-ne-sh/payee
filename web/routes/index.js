const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated} = require("../config/auth.js");
var url=require('url');

//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
router.get('/contact', (req,res)=>{
    res.render('contact');
})
router.get('/about-us', (req,res)=>{
    res.render('about-us');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user
        });
    })

module.exports = router; 
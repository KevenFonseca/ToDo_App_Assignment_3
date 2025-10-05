const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
require('dotenv').config()

async function signup(req, res){
    try {
        // Simple valiation
        const {userName, email, password} = req.body
        if (!userName || !email || !password) return res.status(400).send({error: 'All fields are required'})

        // Check if the email exist
        const exist = await userModel.findOne({email})
        if (exist) return res.status(409).send({error: 'Email already registered'})

        const user = await userModel.create({userName, email, password})
  
        res.status(201).send({success: true})
    } catch (err) {
        console.log(err)
        res.status(500).render('signup', {error: err.message})
    }
}

async function login(req, res){
    try {
        const  {email, password} = req.body
        if (!email || !password) return res.status(400).send({error: 'Email and password are required'})
        
        const user = await userModel.findOne({email})
        if(!user) return res.status(401).send({error: 'User not found'})
    
        const passwordIsValid = await user.isPasswordValid(password)
        if(!passwordIsValid) return res.status(401).send({error: 'Password invalid'})
    
        const token = jwt.sign(
            {id: user._id, userName: user.userName}, 
            process.env.SECRET_KEY, 
            {expiresIn: '1h'}
        )

        res.status(200).send({token, userId: user._id, userName: user.userName}) 
    } catch (err) {
        console.log(err)
        res.status(500).render('login', {error: err.message})
    }
}

module.exports = {
    signup, 
    login
}
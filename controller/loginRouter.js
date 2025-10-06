const path = require('path')

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const {User} = require('../model/User.js')

const {isGuest} = require('../middleware/isGuest.js')

const loginRouter = express.Router()

loginRouter
.get('/',isGuest,(req,res)=>{
	res.sendFile(path.join(__dirname,'../',"public","login.html"))
})
.post('/',async(req,res)=>{
	try{
		const user = await User.findOne({userEmail:req.body.userEmail})
		if(!user) return res.status(400).json({err:"Wrong Email or Password"})
		const confirmPassword = bcrypt.compareSync(req.body.userPassword,user.userPassword)
		if(!confirmPassword) return res.status(400).json({err:"Wrong Username or Password"})
		req.body.userId = user._id
		const token = jwt.sign(req.body,process.env.SIGNATURE)
		res.setHeader('Set-Cookie',`token=${token};HttpOnly;path=/;Max-Age=${process.env.COOKIE_TIME}`)
		return res.status(200).json({href:'/home'})
	}
	catch(err){
		console.log("error")
	}
})


module.exports= {loginRouter}

const path = require('path')

const express = require("express")
const bcrypt = require("bcryptjs")

const signupRouter = express.Router()

const {User} = require('../model/User.js')

const {isGuest} = require('../middleware/isGuest.js')

signupRouter
.get('/',isGuest,(req,res)=>{
	res.sendFile(path.join(__dirname,"../","public","signup.html"))
})
.post('/',async (req,res)=>{
	try{
	
	const hash = bcrypt.hashSync(req.body.password,10)
	req.body.password = hash
	await User.create({
		userName:req.body.name,
		userEmail:req.body.email,
		userPassword:req.body.password
	})
	res.status(200).json({href:'/login',error:false})
	}
	catch(err){
	
		if(err.errorResponse.keyValue.userName){
		
			return res.status(400).json({error:`Username Already taken`})
		}
		if(err.errorResponse.keyValue.userEmail){
			return res.status(400).json({error:`Email Already taken`})
		}
	}
	
})

module.exports = {signupRouter}

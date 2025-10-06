const path = require('path')

const express = require('express')
const jwt = require('jsonwebtoken')

const homeRouter = express.Router()

const {Todo} = require('../model/Todo.js')

homeRouter
.get('/',(req,res)=>{
	try{
		const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
		if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
		return res.status(200).sendFile(path.join(__dirname,"../","public","home.html"))
	}
	catch(err){
		res.status(400).redirect('/login')
	}
})
/*.get('/alltodos',async (req,res)=>{
	try{
	console.log("all")
		const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
		if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
		const todos = await Todo.find({userId:token.userId})
		return res.status(200).send(todos)
		
	}
	catch(err){
		console.log('alltodos error',err)
	}
})*/
.post('/',async (req,res)=>{
    try{
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
		
         await Todo.create({
         	userId:token.userId,
         	todo:req.body.task,
         	todoStatus:"incomplete"
         })
         
    	
         return res.status(200).json({href:'/home'})
         // return res.status(200).redirect('/home')

    }
    catch(err){
        console.log('alltodos error',err)
    return res.status(400).redirect('/login')
        
    }
})
.get("/todo/:id",async (req,res)=>{
	try{
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
		const singlePost = await Todo.findOne({todo:req.params.id})
	
        return res.status(200).send(singlePost)
	}
    catch(err){
    return res.status(400).redirect('/login')
    }
	
	
})
/*.put("/todo/:id",async (req,res)=>{
    try{
    console.log('pout')
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
		
		
		if(req.body.task){
        await Todo.updateOne({todo:req.params.id},{$set:{todo:req.body.task}})
			
		}
		if(req.body.status){
        await Todo.updateOne({todo:req.params.id},{$set:{todoStatus:req.body.status}})
			
		}
		// return console.log(singlePost)
        return res.status(200).json({href:'/home'})
    }
    catch(err){
    return res.status(400).redirect('/login')
    }


})*/
.delete('/todo/:id',async(req,res)=>{
	try{
		if(!req.params.id)return res.send(`<p>The resource you are trying to delete is eigther wrong or Deleyed</p><br/><a href='/home'>Return to HomePage</a>`)
	await Todo.deleteOne({todo:req.params.id})
	return res.json({href:'/home'})
	console.log(req.params.id)
	}
	catch(err){
		return res.status(400).redirect("/home")
	}
})
module.exports ={homeRouter}

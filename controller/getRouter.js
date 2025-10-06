const path = require('path')

const express = require('express')
const jwt = require('jsonwebtoken')

const getRouter = express.Router()

const {Todo} = require('../model/Todo.js')

getRouter
.put("/:id",async (req,res)=>{
    try{

        const oldTask = decodeURIComponent(req.params.id).trim();
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)




        if(req.body.task){
        console.log(req.body.task)
        await Todo.updateOne({todo:oldTask},{$set:{todo:req.body.task}})

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


})

module.exports ={getRouter}

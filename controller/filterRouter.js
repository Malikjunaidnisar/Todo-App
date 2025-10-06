const path = require('path')

const express = require('express')
const jwt = require('jsonwebtoken')

const filterRouter = express.Router()

const {Todo} = require('../model/Todo.js')

filterRouter
.get('/:status',async (req,res)=>{
    try{
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
        const todos = await Todo.find({userId:token.userId,todoStatus:req.params.status}).exec()

       // return  console.log(todos)
        return res.status(200).send(todos)

    }
    catch(err){
        return res.redirect('/login')
        console.log('alltodos error',err)
    }
})


module.exports ={filterRouter}

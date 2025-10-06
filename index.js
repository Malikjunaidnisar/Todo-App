   const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const {loginRouter} = require('./controller/loginRouter.js')
const {signupRouter} = require('./controller/signupRouter.js')
const {homeRouter} = require('./controller/homeRouter.js')
const {getRouter} = require('./controller/getRouter.js')
const {filterRouter} = require('./controller/filterRouter.js')

const {User} = require('./model/User.js')
const {Todo} = require('./model/Todo.js')

const {connectDB} = require('./mongodb.js')
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/login',loginRouter)
app.use('/signup',signupRouter)
app.use('/home',homeRouter)
app.use('/get',getRouter)
app.use('/filter',filterRouter)
app.get ('/',(req,res)=>{
	res.redirect('/home')
})

app.get('/alltodos',async (req,res)=>{
    try{
        const token = jwt.verify(req.cookies.token,process.env.SIGNATURE)
        if(!token) return res.send(`<p>Session expired</p><br><a href="/login">Back to Login page</a>`)
        const todos = await Todo.find({userId:token.userId})
		
    	
        return res.status(200).send(todos)

    }
    catch(err){
    	return res.redirect('/login')
        console.log('alltodos error',err)
    }
})

connectDB()
app.listen(port,()=>{
	console.log(`Server is running on port ${port}`)
})



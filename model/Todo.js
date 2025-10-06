const mongoose = require("mongoose")

const Schema = mongoose.Schema

const todoSchema = new Schema({
	userId:{
		type:String,
		required:true
	},
	todo:{
		type:String,
		required:true,
		trim:true
	},
	todoStatus:{
		type:String,
		required:true,
		trim:true
	}
})

const Todo = mongoose.model('todo',todoSchema)

module.exports = {Todo}

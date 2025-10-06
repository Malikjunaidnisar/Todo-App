const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
	userName:{
		type:String,
		required:true,
		trim:true,
		unique:true
	},
	userEmail:{
		type:String,
		required:true,
		trim:true,
		unique:true
	},
	userPassword:{
		type:String,
		required:true,
		trim:true
	}
})

const User = mongoose.model("User",userSchema)

module.exports ={User}

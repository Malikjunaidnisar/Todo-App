const jwt = require('jsonwebtoken')

const sig = process.env.SIGNATURE

function isGuest(req,res,next){
	try{
		const token = jwt.verify(req.cookies.token,sig)
		
		if(token) return res.status(400).redirect('/home')
	
		
	}
	catch(err){
	
		next()
	}
}

module.exports={isGuest}

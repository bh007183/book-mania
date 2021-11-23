const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
module.exports = {

    signToken: async (user) => {

        let token = await jwt.sign({ _id: user._id, email: user.email }, process.env.JSON_DUBLIN, { expiresIn: '1h' })

        return token

    },

    compare: (user, body) => {
        console.log(user)
        console.log( body)
        return bcrypt.compareSync(body.password, user.password)
        

    },

    parseToken: async (req, res, next) => {
        let token;
try{
    if(!req.headers){
        token = false
    }else if(!req.headers.authorization){
        token = false
    }else{
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        throw new Error("User must login")
    }
    let data = await jwt.verify(token, process.env.JSON_DUBLIN);
    console.log(data)
    res.locals._id = data._id
    next()
}catch(err){
    res.status(404).send(err.message)
}
       
        
        
    }

}

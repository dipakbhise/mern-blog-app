const jwt = require ('jsonwebtoken')
const Regi = require('./Regi')



const auth = async (req ,  res , next )=>{
    try{

      const token =  req.cookies.jwt;
      const verifyUser = await jwt.verify(token , "mynameischandukharatandiamwebdeveloper")
      const user = await Regi.findOne({_id:verifyUser._id})
      req.token = token ;
      req.user = user ;
      next()
    }catch(e){
        res.status(401).send(e)

    }

}

module.exports = auth ;

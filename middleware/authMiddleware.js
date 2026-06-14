 const jwt = require('jsonwebtoken')

 const isAdmin = (req, res, next) => {
    try{
        if(req.user?.role !== 'admin'){
            return res.status(403).json({message: 'Admin access only'})
        }

        next()
    }catch(err){
        res.status(500).json({message: err.message})
    }
 }


 const protect = (req, res, next) => {
    try{
        const authHead = req.headers.authorization;

        if(!authHead || !authHead.startsWith('Bearer')){
            return res.status(403).json({messaege: 'Invalid Token, access denied'})
        }

        const veri = authHead.split(' ')[1];
        const decode = jwt.verify(veri, process.env.JWT_SECRET);

        req.body = decode
        next()

    }catch(err){
        res.status(500).json({message: err.message})
    }
 }

 module.exports = {
    protect, isAdmin
 }
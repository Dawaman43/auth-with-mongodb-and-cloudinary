const jwt = require('jsonwebtoken')
const authentication = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401).json({
            success: false,
            message: 'Token is missing. User can not be authenticated with the empty token '
        })
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodeToken);
        req.userInfo = decodeToken;

       next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is missing. User can not be authenticated with the empty token '
        })
    }

}

module.exports = authentication;
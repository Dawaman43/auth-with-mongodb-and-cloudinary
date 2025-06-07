
const adminMiddleware = async(req, res, next)=>{
    try {
        if(req.userInfo.role!== 'admin'){
            res.status(403).json({
                success: false,
                message: 'Only admins can access this page '
            })

        }
        next();
    } catch (error) {
          res.status(401).json({
            success: false,
            message: 'Token is missing. User can not be authenticated with the empty token '
        })
    }
}


module.exports = adminMiddleware;
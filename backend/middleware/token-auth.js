const jwt = require('jsonwebtoken');
const HttpError = require('../model/http-error');

const tokenAuth = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next();
    }
   try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        throw new HttpError('Authentication Failed')
    }
    const decodedToken = jwt.verify(token, 'superprivatekey')
    req.userData = { userId: decodedToken.userId}
    next()
   } catch (error) {
     return next(new HttpError('Authentication failed', 401))
   }
}

module.exports = tokenAuth
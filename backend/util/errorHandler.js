const fs = require('fs')
const errorHandler = (error, req, res, next) => {

    if(req.file){
        fs.unlink(req.file.path, err => console.log(err))
    }

    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.send(error.message || "Unknown Error")

}

module.exports = errorHandler;
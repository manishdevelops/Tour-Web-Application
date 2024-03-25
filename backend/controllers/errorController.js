const AppError = require("../utils/appError");

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(404).json({
            status: "error",
            message: "Something went very wrong!"
        });
    }
}

const handleCastErrorDB = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = error => {
    const [errorField, errorValue] = Object.entries(error.keyValue).flat();
    const message = `Duplicate '${errorField}' value entered as '${errorValue}'.`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = error => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        //Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        //Programming or other unknown error: don't leak eror details
        else {
            // 1) Log error
            console.error('ERROR ⚡⚡', err);

            //2) Send generic message
            res.status(err.statusCode).json({
                status: 'error',
                message: 'Something went very wrong'
            });
        }
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err, name: err.name };
        // console.log(error.code)
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        sendErrorProd(error, req, res);
    }
}
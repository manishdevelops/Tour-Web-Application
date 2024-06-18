class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // client side error and can be handled by user

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

// module.exports = (message, statusCode) => {
//     console.log(123)
//     const error = new Error(message);
//     error.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     error.isOperational = true; // client side error and can be handled by user
//     Error.captureStackTrace(this, this.constructor);
//     return error;
// };
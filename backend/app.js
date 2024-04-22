const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//for users
app.use('/api/users', userRoute);

//for admin
app.use('/api/admin', adminRoute);


//the routes that are not handled by the above routes
app.all('*', (req, res, next) => {
    next(AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorController);


module.exports = app;
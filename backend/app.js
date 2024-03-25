const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

app.use(express.json());
app.use('/api/users/', userRoute);

//the routes that are not handled by the above routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorController);


module.exports = app;
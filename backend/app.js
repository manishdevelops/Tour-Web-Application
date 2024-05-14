const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const tourRoute = require('./routes/tourRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const contactRoute = require('./routes/contactRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//for users
app.use('/api/users', userRoute);

//for admin
app.use('/api/admin', adminRoute);

//for tours
app.use('/api/tours', tourRoute);

//for reviews
app.use('/api/reviews', reviewRoute);

//for contact us
app.use('/api/contacts', contactRoute);

//for booking tour
app.use('/api/bookings', bookingRoute);


//the routes that are not handled by the above routes
app.all('*', (req, res, next) => {
    next(AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorController);


module.exports = app;
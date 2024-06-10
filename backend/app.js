const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const guideRoute = require('./routes/guideRoutes');
const adminRoute = require('./routes/adminRoutes');
const tourRoute = require('./routes/tourRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const bookingRoute = require('./routes/bookingRoutes');
const contactUsRoute = require('./routes/contactUsRoutes');
const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//for users
app.use('/api/users', userRoute);

//for guides
app.use('/api/guides', guideRoute);

//for admin
app.use('/api/admin', adminRoute);

//for tours
app.use('/api/tours', tourRoute);

//for reviews
app.use('/api/reviews', reviewRoute);

//for contact us
app.use('/api/contactUs', contactUsRoute);

//for booking tour
app.use('/api/bookings', bookingRoute);


//the routes that are not handled by the above routes
app.all('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        next(AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    } else {
        next(AppError('Resource not found.', 404));
    }
});

app.use(globalErrorController);


module.exports = app;
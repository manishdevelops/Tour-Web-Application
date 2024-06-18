const catchAsync = require("../utils/catchAsync");
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');

exports.getAssignedTour = catchAsync(async (req, res, next) => {
    const tours = await Booking.find({ tourGuide: req.user.id });

    if (!tours) return next(new AppError('There are no tour booked in which you are guide'));

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    });
});
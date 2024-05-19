const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const ContactUs = require('../models/contactUsModel');


exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newTour
        }
    })
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find();

    res.status(200).json({
        status: "success",
        results: bookings.length,
        data: {
            bookings
        }
    })
});

exports.getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users
        }
    });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews
        }
    });
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
    const contacts = await ContactUs.find();

    res.status(200).json({
        status: "success",
        results: contacts.length,
        data: {
            contacts
        }
    });
});
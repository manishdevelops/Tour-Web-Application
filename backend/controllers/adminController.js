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

const getMonthlyStatistics = async (Model, priceField = null) => {
    const now = new Date();
    // Calculate the start of the current month
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Count documents created in the current month
    const currentMonthCount = await Model.countDocuments({
        createdAt: { $gte: startOfCurrentMonth }
    });

    // Count total documents in the collection
    const totalCount = await Model.countDocuments();

    // Calculate the percentage of new documents for the current month
    const percentageOfNewDocuments = totalCount > 0
        ? (currentMonthCount / totalCount) * 100
        : 0;

    let totalEarnings = 0;
    let currentMonthEarnings = 0;

    if (priceField) {
        // Calculate total earnings by summing the specified price field
        totalEarnings = (await Model.aggregate([
            { $group: { _id: null, total: { $sum: `$${priceField}` } } }
        ]))[0]?.total || 0;

        // Calculate earnings for the current month by summing the specified price field for documents created this month
        currentMonthEarnings = (await Model.aggregate([
            { $match: { createdAt: { $gte: startOfCurrentMonth } } },
            { $group: { _id: null, total: { $sum: `$${priceField}` } } }
        ]))[0]?.total || 0;
    }

    // Return the calculated statistics
    return {
        count: currentMonthCount,
        percentageOfNewDocuments: percentageOfNewDocuments.toFixed(2),
        totalEarnings: +totalEarnings.toFixed(2),
        currentMonthEarnings: +currentMonthEarnings.toFixed(2)
    };
};



exports.getStatistics = catchAsync(async (req, res, next) => {

    const toursStats = await getMonthlyStatistics(Tour);
    const usersStats = await getMonthlyStatistics(User);
    const bookingsStats = await getMonthlyStatistics(Booking, 'price');
    const contactsStats = await getMonthlyStatistics(ContactUs);
    const reviewsStats = await getMonthlyStatistics(Review);

    const statistics = [
        { model: 'Tours', stats: toursStats },
        { model: 'Users', stats: usersStats },
        { model: 'Bookings', stats: bookingsStats },
        { model: 'Contacts', stats: contactsStats },
        { model: 'Reviews', stats: reviewsStats }
    ];

    res.status(201).json(statistics);
});
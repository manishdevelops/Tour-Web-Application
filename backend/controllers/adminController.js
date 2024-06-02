const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const ContactUs = require('../models/contactUsModel');
const AppError = require('../utils/appError');


exports.createTour = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newTour
        }
    });
});

exports.editTour = catchAsync(async (req, res, next) => {

    const tour = await Tour.findByIdAndUpdate(req.params.tourId, req.body, {
        new: true,
        runValidators: true
    });

    if (!tour) return next(AppError('No tour found', 404));

    res.status(200).json({
        "status": "success",
        data: {
            data: tour
        }
    });
});

exports.editUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) return next(AppError('No user found', 404));

    res.status(200).json({
        "status": "success",
        data: {
            data: user
        }
    });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getUserResults = catchAsync(async (req, res, next) => {
    let searchTerm = req.query.searchTerm || '';
    let role = req.query.role || '';
    let createdAt = req.query.createdAt || '';

    // Construct the query object
    let queryObj = {};

    // Add search term to the query if provided
    if (searchTerm) {
        queryObj.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    // Add role to the query if provided
    if (role) {
        queryObj.role = role;
    }

    // Add registration date to the query if provided
    if (createdAt) {
        const startOfDay = new Date(createdAt);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(createdAt);
        endOfDay.setUTCHours(23, 59, 59, 999);

        queryObj.createdAt = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }

    // console.log(queryObj)

    // Fetch users from the database based on the query
    const users = await User.find(queryObj);

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
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

exports.getBookingsResults = catchAsync(async (req, res, next) => {
    let matchStage = {};

    // Single search term for user name or tour name
    if (req.query.searchTerm) {
        const searchTerm = req.query.searchTerm;
        matchStage.$or = [
            { 'user.name': { $regex: searchTerm, $options: 'i' } },
            { 'tour.tourName': { $regex: searchTerm, $options: 'i' } }
        ];
    }

    // Filter by price
    if (req.query.price) {
        matchStage.price = parseFloat(req.query.price);
    }

    // Filter by payment date
    if (req.query.createdAt) {
        const date = new Date(req.query.createdAt);
        if (!isNaN(date.getTime())) {
            matchStage.createdAt = {
                $gte: new Date(req.query.createdAt + 'T00:00:00.000Z'),
                $lte: new Date(req.query.createdAt + 'T23:59:59.999Z')
            };
        }
    }

    // Aggregation pipeline
    const bookings = await Booking.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $lookup: {
                from: 'tours',
                localField: 'tour',
                foreignField: '_id',
                as: 'tour'
            }
        },
        {
            $unwind: '$tour'
        },
        {
            $match: matchStage
        },
        {
            $project: {
                price: 1,
                createdAt: 1,
                paid: 1,
                'user.name': 1,
                'tour.tourName': 1
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings
        }
    });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
    await Booking.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
})

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
        count: totalCount,
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

const getBookingEarningsByDate = async () => {
    const results = await Booking.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                totalEarnings: { $sum: "$price" },
                bookingDate: { $first: "$createdAt" }
            }
        },
        { $sort: { bookingDate: 1 } }
    ]);

    const dates = results.map(result => result._id);
    const earnings = results.map(result => result.totalEarnings);

    return { dates, earnings };
};

exports.getBookingEarnings = catchAsync(async (req, res, next) => {
    const { dates, earnings } = await getBookingEarningsByDate();

    res.status(200).json({
        status: 'success',
        data: {
            dates,
            earnings
        }
    });
});
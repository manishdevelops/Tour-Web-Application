const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');


exports.topRatedTours = catchAsync(async (req, res, next) => {
    const topTours = await Tour.find().limit(4).sort('-ratingsAverage');

    res.status(200).json({
        status: "success",
        results: topTours.length,
        data: {
            tours: topTours
        }
    });
});

exports.topCheapTours = catchAsync(async (req, res, next) => {
    const cheapTours = await Tour.find().limit(4).sort('price');

    res.status(200).json({
        status: "success",
        results: cheapTours.length,
        data: {
            tours: cheapTours
        }
    });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();

    if (tours.length == 0) return next(AppError('No tour found!', 404));

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    });
});

exports.getTourResults = catchAsync(async (req, res, next) => {
    // console.log(req.query);
    const limit = parseInt(req.query.limit) || 12;

    const startIndex = parseInt(req.query.startIndex) || 0;

    let searchTerm = req.query.searchTerm || '';

    let minPrice = req.query.minPrice || 0;

    let maxPrice = req.query.maxPrice || 100000;

    let state = req.query.state || '';

    let tourType = req.query.tourType || '';

    const tourResults = await Tour.find({
        tourName: { $regex: searchTerm, $options: 'i' }, // i -> don't care about lower and upper case
        price: { $gte: minPrice, $lte: maxPrice },
        location: { $regex: state, $options: 'i' },
        tourType: { $regex: tourType, $options: 'i' }
    }).limit(limit).skip(startIndex);

    res.status(200).json({
        status: "success",
        results: tourResults.length,
        data: {
            tours: tourResults
        }
    });

});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.find({ slug: req.params.slug }).populate('reviews');
    console.log(tour)
    if (tour.length === 0) return next(AppError('No tour found', 404));

    res.status(200).json({
        status: "success",
        results: tour.length,
        data: {
            tour
        }
    });

});

exports.tour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id).populate('reviews');
    if (!tour) return next(AppError('No tour found', 404));

    res.status(200).json({
        status: 'success',
        results: tour.length,
        data: tour
    });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(
            AppError(
                'Please provide latitute and longitude in the format lat,lng.',
                400
            )
        );
    }

    const tours = await Tour.find({
        coordinates: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]
            }
        }
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });
});


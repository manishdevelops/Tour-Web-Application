const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');

exports.getAllTours = catchAsync(async (req, res, next) => {
    const tours = await Tour.find();

    if (tours.length == 0) return AppError('No tour found!', 404);

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    });
});

exports.getTourResults = catchAsync(async (req, res, next) => {
    console.log(req.query);

    let searchTerm = req.query.searchTerm || '';

    let minPrice = req.query.minPrice || 0;

    let maxPrice = req.query.maxPrice || 0;

    let state = req.query.state || '';

    let tourType = req.query.tourType || '';

    const tourResults = await Tour.find({
        tourName: { $regex: searchTerm, $options: 'i' }, // i -> don't care about lower and upper case
        price: { $gte: minPrice, $lte: maxPrice },
        location: state,
        tourType: { $regex: tourType, $options: 'i' }
    });

    res.status(200).json({
        status: "success",
        results: tourResults.length,
        data: {
            tours: tourResults
        }
    });

});
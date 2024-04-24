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
})
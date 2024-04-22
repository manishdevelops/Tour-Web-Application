const catchAsync = require("../utils/catchAsync");
const Tour = require('../models/tourModel');

exports.createTour = catchAsync(async (req, res, next) => {
    console.log(req.body);

    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: newTour
        }
    })
    // next();
});
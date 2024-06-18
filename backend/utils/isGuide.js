const catchAsync = require("./catchAsync");
const AppError = require('./appError');
const User = require('../models/userModel');

exports.isGuide = catchAsync(async (req, res, next) => {

    const user = await User.findById({ _id: req.user.id });

    if (user.role !== 'guide') return next(new AppError('Unauthorized action. Please contact your administrator.'));

    next();
});
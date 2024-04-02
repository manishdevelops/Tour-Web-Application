const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            user: user
        }
    })
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});


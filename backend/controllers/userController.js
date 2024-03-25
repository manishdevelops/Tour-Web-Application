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
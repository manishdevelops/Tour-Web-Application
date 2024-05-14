const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const Contact = require('../models/contactModel');

exports.contact = catchAsync(async (req, res) => {
    const contact = await Contact.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            contact
        }
    })
});
const catchAsync = require("../utils/catchAsync");
const Contact = require('../models/contactUsModel');

exports.createContact = catchAsync(async (req, res) => {
    const contact = await Contact.create(req.body);

    res.status(201).json({
        status: "success",
        data: req.body
    })
});

exports.getContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return next(AppError('No contact found!'));

    res.status(200).json({
        status: "success",
        data: {
            contact
        }
    });
});
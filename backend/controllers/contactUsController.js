const catchAsync = require("../utils/catchAsync");
const Contact = require('../models/contactUsModel');

exports.createContact = catchAsync(async (req, res) => {
    const contact = await Contact.create(req.body);

    res.status(201).json({
        status: "success",
        data: req.body
    })
});
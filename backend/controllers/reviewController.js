const Review = require('../models/reviewModel');
const { status } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    let limit = parseInt(req.query.limit) || 5;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    limit = startIndex === 0 ? limit : null;

    const reviews = await Review.find(filter).sort({ [sort]: order }).limit(limit).skip(startIndex);

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: reviews
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    //Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;


    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});
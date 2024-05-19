const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    try {
        const tour = req.body.tour;

        const lineItem = [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: tour.tourName,
                    description: tour.tourDescription,
                    images: [tour.photos[0]]
                },
                unit_amount: tour.price * 100,
            },
            quantity: 1
        }];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItem,
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US'] // Specify a country outside India (e.g., United States)
            },
            success_url: `${req.body.frontendUrl}/my-bookings?tour=${tour._id}&user=${req.user.id}&price=${tour.price}`,
            cancel_url: `${req.body.frontendUrl}/tourOverview/${tour.slug}`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error)
    }

});

exports.bookMyTour = catchAsync(async (req, res, next) => {
    const { tour, user, price } = req.body;

    if (!tour && !user && !price) return next(AppError('Please provide all data.!', 400));

    await Booking.create({ tour, user, price });

    res.status(201).json({
        status: "succesS",
        data: "Tour booked successfully."
    });
});

exports.isTourBooked = catchAsync(async (req, res, next) => {
    const { tour, user } = req.body;

    const bookedAlready = await Booking.findOne({ user, tour });

    if (bookedAlready) {
        return next(AppError('Tour already booked.', 409));
    }

    res.status(200).json({
        status: 'success',
        data: 'not booked'
    })
})

exports.getMyTours = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id });

    const tourIDs = bookings.map(el => el.tour);

    const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200).json({
        status: "success",
        results: tours.length,
        tours
    });
});


// admin
exports.getAllTours = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find();

    res.status(200).json({
        status: "success",
        results: bookings.length,
        data: {
            bookings
        }
    })
})
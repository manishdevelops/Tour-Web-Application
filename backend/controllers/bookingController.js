const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const nodemailer = require('nodemailer');
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manishdevelops411@gmail.com',
        pass: 'giyr xepn lmyj sgbf'
    }
});

const sendEmail = async (options) => {
    const mailOptions = {
        from: 'manishdevelops411@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};


// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//     try {
//         const tour = req.body.tour;

//         const lineItem = [{
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: tour.tourName,
//                     description: tour.tourDescription,
//                     images: [tour.photos[0]]
//                 },
//                 unit_amount: tour.price * 100,
//             },
//             quantity: 1
//         }];

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItem,
//             mode: 'payment',
//             billing_address_collection: 'required',
//             shipping_address_collection: {
//                 allowed_countries: ['US'] // Specify a country outside India (e.g., United States)
//             },
//             success_url: `${req.body.frontendUrl}/my-bookings?name=${tour.tourName}&tour=${tour._id}&guide=${tour.tourGuide}&user=${req.user.id}&price=${tour.price}`,
//             cancel_url: `${req.body.frontendUrl}/tourOverview/${tour.slug}`,
//         });

//         res.json({ id: session.id });
//     } catch (error) {
//         console.log(error)
//     }

// });

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    try {
        const tour = req.body.tour;
        const product = await stripe.products.create({
            name: tour.tourName,
            description: tour.tourDescription,
            images: [tour.photos[0]]
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: tour.price * 100, // 100 INR
            currency: 'inr',
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: price.id,
                quantity: 1
            }],
            mode: 'payment',
            billing_address_collection: 'required',
            client_reference_id: req.user.id,
            metadata: {
                tour_id: tour._id, // Pass user ID in metadata
                tourGuide: tour.tourGuide,
                tourName: tour.tourName
            },
            // success_url: `${req.body.frontendUrl}/my-bookings?name=${tour.tourName}&tour=${tour._id}&guide=${tour.tourGuide}&user=${req.user.id}&price=${tour.price}`,
            success_url: `${req.protocol}://${req.get('host')}/my-bookings`,
            cancel_url: `${req.body.frontendUrl}/tourOverview/${tour.slug}`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error);
    }
});


//
// exports.bookMyTour = catchAsync(async (req, res, next) => {
//     const { tourName, tour, user, price, email, tourGuide } = req.body;

//     if (!tour && !user && !price && !tourGuide) return next(new AppError('Please provide all data.!', 400));

//     await Booking.create({ tour, user, price, tourGuide });

//     const message = `Dear Customer,\n\nYour booking for the tour has been confirmed.\n\nTour: ${tourName}\nPrice: Rs ${price}\n\nThank you for booking with us.\n\nBest regards,\nTourGuru`;

//     try {
//         await sendEmail({
//             email: email, // recipient email
//             subject: 'Tour Booking Confirmation',
//             message: message,
//         });

//         res.status(201).json({
//             status: 'success',
//             data: 'Tour booked successfully and confirmation email sent.',
//         });
//     } catch (err) {
//         return next(new AppError('Booking successful but email could not be sent.', 500));
//     }
// });

exports.isTourBooked = catchAsync(async (req, res, next) => {
    const { tour, user } = req.body;

    const bookedAlready = await Booking.findOne({ user, tour });

    if (bookedAlready) {
        return next(new AppError('Tour already booked.', 409));
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

const createBookingCheckout = catchAsync(async (session) => {
    console.log(4)

    const user = session.client_reference_id;
    const tour = session.metadata.tour_id;
    const price = session.amount_total;
    const tourGuide = session.metadata.tourGuide;

    console.log('booked');

    await Booking.create({ tour, user, price, tourGuide });

    const { email } = await User.find(user);

    const message = `Dear Customer,\n\nYour booking for the tour has been confirmed.\n\nTour: ${tourName}\nPrice: Rs ${price}\n\nThank you for booking with us.\n\nBest regards,\nTourGuru`;

    try {
        await sendEmail({
            email: email, // recipient email
            subject: 'Tour Booking Confirmation',
            message: message,
        });

        // res.status(201).json({
        //     status: 'success',
        //     data: 'Tour booked successfully and confirmation email sent.',
        // });
    } catch (err) {
        // return next(new AppError('Booking successful but email could not be sent.', 500));
        console.error('Booking successful but email could not be sent:', err.message);
    }


});

exports.webhookCheckout = (req, res, next) => {
    console.log(1)
    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        console.log(2)
    } catch (err) {
        return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        console.log(3)

        createBookingCheckout(event.data.object);
    }

    res.status(200).json({
        received: true
    });

};

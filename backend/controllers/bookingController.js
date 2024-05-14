const catchAsync = require("../utils/catchAsync");

const stripe = require("stripe")('sk_test_51PG2LpSJbNWF3NaIQi2QxrVdRIZ4FphVnXDr4Iku39d0UloPHOfejCP1T3x4NeGwqJG1k8QQ89xCr8OH6SbhuJrQ00NKSfkxjk');

exports.bookTour = catchAsync(async (req, res, next) => {
    const tour = req.body.tour;
    const lineItem = [{
        price_data: {
            currency: 'inr',
            product_data: {
                name: tour.tourName
            },
            unit_amount: tour.price * 100,
        },
        quantity: 1
    }]
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItem,
        mode: 'payment',
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['US'] // Specify a country outside India (e.g., United States)
        },
        success_url: `http://localhost:3000/profile`,
        cancel_url: `http://localhost:3000/tours`,
    });

    res.json({ id: session.id });
})
const catchAsync = require("../utils/catchAsync");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.bookTour = catchAsync(async (req, res, next) => {
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
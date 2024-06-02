const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Review must belong to a user']
    },
    photo: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
    },
    review: {
        type: String,
        required: [true, 'Review cannot be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'A review must have a rating']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user,']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//prevent duplicate reviews by the same user
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });


reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'tour',
        select: 'tourName'
    })
    // .populate({
    //     path: 'user',
    //     select: 'name photo'
    // });

    next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
    // this -> Model
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    // console.log(stats);
    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        // when no doc find so stats will be undefined
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }

};

//DOCUMENT MIDDLEWARE
//runs after creation and saving new review on tour
reviewSchema.post('save', function () {
    // this points to the current review doc
    // constructor -> it is the model who created that document
    this.constructor.calcAverageRatings(this.tour); // tour -> tour ID 
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
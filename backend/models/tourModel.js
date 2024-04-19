const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: [true, 'A tour must have a name!']
    },
    location: {
        type: String,
        required: [true, 'A tour must have a location!']
    },
    tourDescription: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description!']
    },
    tourDuration: {
        type: Number,
        required: [true, 'A tour must have a duration!']
    },
    price: {
        type: Number,
        required: [true, 'A tour must jave a price!']
    },
    departureDates: {
        type: [Date],
        required: [true, 'A tour must have a departure date!']
    },
    tourGuide: {
        type: String,
        required: [true, 'A tour must have a guide!']
    },
    groupSize: {
        type: Number,
        required: [true, 'A tour must a group size!']
    },
    inclusions: String,
    exclusions: String,
    photos: {
        type: Array,
        required: [true, 'A tour must have atmost 6 images']
    }
}, { timestamps: true });

const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;

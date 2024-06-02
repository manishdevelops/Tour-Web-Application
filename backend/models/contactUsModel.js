const mongoose = require('mongoose');
const validator = require('validator');


const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, 'Please tell us your first name!']
    },
    lastName: {
        type: String,
        required: [true, 'Please tell us your last name!']
    },
    email: {
        type: String,
        // unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    message: {
        type: String,
        required: [true, 'Please leave a message!']
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (value) {
                // Regular expression to match a valid phone number format
                return /^[+]?[0-9]{8,15}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Please tell us your phone number']
    }
}, { timestamps: true });


const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
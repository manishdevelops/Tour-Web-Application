const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    photo: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'please provide your password!'],
        minlength: 8,
        // select:false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not same!'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);
module.exports = User;
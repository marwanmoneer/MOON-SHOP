// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the user schema
const userSchema = new mongoose.Schema({
    // Name of the user (required)
    name: {
        type: String,
        required: true,
    },
    // Email of the user (required)
    email: {
        type: String,
        required: true,
    },
    // Password hash of the user (required)
    passwordHash: {
        type: String,
        required: true,
    },
    // Phone number of the user
    phone: {
        type: String,
    },
    // Boolean indicating whether the user is an admin, default is false
    isAdmin: {
        type: Boolean,
        default: false,
    },
    // Street address of the user, default is an empty string
    street: {
        type: String,
        default: ''
    },
    // Apartment number of the user, default is an empty string
    apartment: {
        type: String,
        default: ''
    },
    // ZIP code of the user, default is an empty string
    zip: {
        type: String,
        default: ''
    },
    // City of the user, default is an empty string
    city: {
        type: String,
        default: ''
    },
    // Country of the user, default is an empty string
    country: {
        type: String,
        default: ''
    }
});

// Adding virtual properties to the schema
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Configuring toJSON options for virtuals
userSchema.set('toJSON', {
    virtuals: true,
});

// Exporting the User model and userSchema
exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;

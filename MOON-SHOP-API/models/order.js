// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the order schema
const orderSchema = mongoose.Schema({
    // Array of order items with references to OrderItem model (required)
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    // Shipping addresses and details
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    // Order status, default is 'Pending'
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    // Total price of the order
    totalPrice: {
        type: Number,
    },
    // Payment method used (required)
    payment: {
        type: String,
        required: true,
    },
    // Reference to the user who placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // Date when the order was placed, default is the current date
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});

// Adding virtual properties to the schema
orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Configuring toJSON options for virtuals
orderSchema.set('toJSON', {
    virtuals: true,
});

// Exporting the Order model
exports.Order = mongoose.model('Order', orderSchema);

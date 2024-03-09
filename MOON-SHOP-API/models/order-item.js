// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the order item schema
const orderItemSchema = mongoose.Schema({
    // Quantity of the ordered item (required)
    quantity: {
        type: Number,
        required: true
    },
    // Reference to the associated product
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

// Exporting the OrderItem model
exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);

// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the product schema
const productSchema = mongoose.Schema({
    // Name of the product (required)
    name: {
        type: String,
        required: true,
    },
    // Description of the product (required)
    description: {
        type: String,
        required: true
    },
    // Rich description of the product, default is an empty string
    richDescription: {
        type: String,
        default: ''
    },
    // Image URL for the main product image, default is an empty string
    image: {
        type: String,
        default: ''
    },
    // Array of image URLs for additional product images
    images: [{
        type: String
    }],
    // Brand of the product, default is an empty string
    brand: {
        type: String,
        default: ''
    },
    // Price of the product, default is 0
    price: {
        type: Number,
        default: 0
    },
    // Reference to the product's category (required)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    // Count of available units in stock (required, min: 0, max: 255)
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    // Rating of the product, default is 0
    rating: {
        type: Number,
        default: 0,
    },
    // Number of reviews for the product, default is 0
    numReviews: {
        type: Number,
        default: 0,
    },
    // Boolean indicating whether the product is featured, default is false
    isFeatured: {
        type: Boolean,
        default: false,
    },
    // Date when the product was created, default is the current date
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// Adding virtual properties to the schema
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Configuring toJSON options for virtuals
productSchema.set('toJSON', {
    virtuals: true,
});

// Exporting the Product model
exports.Product = mongoose.model('Product', productSchema);

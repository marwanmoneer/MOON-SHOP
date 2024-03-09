// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the category schema
const categorySchema = mongoose.Schema({
    // Name of the category (required)
    name: {
        type: String,
        required: true,
    },
    // Icon associated with the category
    icon: {
        type: String,
    },
    // Color associated with the category
    color: {
        type: String,
    }
});

// Adding virtual properties to the schema
categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Configuring toJSON options for virtuals
categorySchema.set('toJSON', {
    virtuals: true,
});

// Exporting the Category model
exports.Category = mongoose.model('Category', categorySchema);

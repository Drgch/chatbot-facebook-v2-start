const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    mlsNumber: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property;
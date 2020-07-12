const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Service = mongoose.model('service', ServiceSchema)
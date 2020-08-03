const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time:{
        type: Number,
    },
    metrics: {
        type: String,
    },
    price:{
        type:Number,
    },
    description: {
        type: String,
        },
    active: {
        type: Boolean,
        default:false
    },
    timeActivated: {
        type: Number,
        default: 0
    },
    timeDeactivated: {
        type: Number,
        default: 0
    },
    debt: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Service = mongoose.model('service', ServiceSchema)
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Service model
const Service = require('../../models/Service');

// @route   GET api/service
// @desc    Get all services
// @access  Public
router.get('/', (req, res) => {
    Service.find()
        .sort({ date: -1 })
        .then(services => res.json(services))
})

// @route   POST api/service
// @desc    Create a post
// @access  Private
router.post('/', (req, res) => {
    const newService = new Service({
        name: req.body.name,
        time: req.body.time,
        metrics: req.body.metrics,
        price: req.body.price,
        description: req.body.description
    });

    newService.save().then(service => res.json(service));
});

// @route   POST api/service
// @desc    Delete a service
// @access  Private
router.delete('/:id', (req, res) => {
    Service.findById(req.params.id)
        .then(service => service.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
})


module.exports = router;
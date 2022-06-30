const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.getFlights);
router.post('/', controller.addFlights);
router.get('/:id', controller.findFlight);
router.put('/:id', controller.updateFlights);
router.delete('/:id', controller.deleteFlight);


module.exports = router;


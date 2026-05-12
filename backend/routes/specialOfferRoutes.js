const express = require('express');
const router = express.Router();
const { getSpecialOffers, createSpecialOffer } = require('../controllers/specialOfferController');

router.get('/', getSpecialOffers);
router.post('/', createSpecialOffer);

module.exports = router;

const asyncHandler = require('express-async-handler');
const SpecialOffer = require('../models/SpecialOffer');

// GET /api/special-offers
const getSpecialOffers = asyncHandler(async (req, res) => {
  const offers = await SpecialOffer.find({}).sort({ createdAt: -1 }).limit(8);
  res.json({
    success: true,
    data: offers
  });
});

// POST /api/special-offers (Optional: if they want to add via API)
const createSpecialOffer = asyncHandler(async (req, res) => {
  const offer = await SpecialOffer.create(req.body);
  res.status(201).json({
    success: true,
    data: offer
  });
});

module.exports = {
  getSpecialOffers,
  createSpecialOffer
};

const SpecialOffer = require('../models/SpecialOffer');

// GET /api/special-offers
const getSpecialOffers = async (req, res, next) => {
  try {
    const offers = await SpecialOffer.find({}).sort({ createdAt: -1 }).limit(8);
    res.json({
      success: true,
      data: offers
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/special-offers
const createSpecialOffer = async (req, res, next) => {
  try {
    const offer = await SpecialOffer.create(req.body);
    res.status(201).json({
      success: true,
      data: offer
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSpecialOffers,
  createSpecialOffer
};

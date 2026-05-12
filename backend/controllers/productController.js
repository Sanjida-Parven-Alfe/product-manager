const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'shelve/products' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    throw new ApiError(400, 'Please fill all fields');
  }

  let image = { url: '', publicId: '' };

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    image = { url: result.secure_url, publicId: result.public_id };
  }

  const product = await Product.create({
    name,
    price,
    description,
    image,
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: product });
});

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const search = req.query.search || '';
  const sort = req.query.sort || 'default';
  const skip = (page - 1) * limit;

  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  let sortQuery = { createdAt: -1 };
  if (sort === 'price-asc') sortQuery = { price: 1 };
  if (sort === 'price-desc') sortQuery = { price: -1 };
  if (sort === 'discount') sortQuery = { discount: -1 };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  res.json({ success: true, data: product });
});

// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  if (product.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized');
  }

  const { name, price, description } = req.body;
  let image = product.image;

  if (req.file) {
    if (product.image.publicId) {
      await cloudinary.uploader.destroy(product.image.publicId);
    }
    const result = await uploadToCloudinary(req.file.buffer);
    image = { url: result.secure_url, publicId: result.public_id };
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image;

  const updated = await product.save();
  res.json({ success: true, data: updated });
});

// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, 'Product not found');

  if (product.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized');
  }

  if (product.image.publicId) {
    await cloudinary.uploader.destroy(product.image.publicId);
  }

  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted' });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
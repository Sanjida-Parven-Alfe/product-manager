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
const createProduct = async (req, res, next) => {
  try {
    console.log('Creating product started...');
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      throw new ApiError(400, 'Please fill all fields');
    }

    let image = { 
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', 
      publicId: '' 
    };

    if (req.file) {
      console.log('Uploading image to Cloudinary...');
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        image = { url: result.secure_url, publicId: result.public_id };
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Cloudinary upload failed, using fallback image:', error.message);
      }
    }

    console.log('Saving product to database...');
    const product = await Product.create({
      name,
      price,
      description,
      image,
      user: req.user._id,
    });
    console.log('Product created successfully');

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error in createProduct:', error);
    next(error);
  }
};

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new ApiError(404, 'Product not found');

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new ApiError(404, 'Product not found');

    if (product.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized');
    }

    const { name, price, description } = req.body;
    let image = product.image;

    if (req.file) {
      try {
        if (product.image.publicId) {
          await cloudinary.uploader.destroy(product.image.publicId).catch(err => console.error('Cloudinary destroy failed:', err.message));
        }
        const result = await uploadToCloudinary(req.file.buffer);
        image = { url: result.secure_url, publicId: result.public_id };
      } catch (error) {
        console.error('Cloudinary update failed, keeping current or using fallback:', error.message);
      }
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image;

    const updated = await product.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');
const cloudinary = require('../config/cloudinary');

exports.getProducts = async (req, res) => {
  const features = new APIFeatures(Product.find({ isActive: true }).populate('category', 'name slug'), req.query)
    .filter()
    .search(['name', 'description', 'tags'])
    .sort()
    .limitFields()
    .paginate();

  const [products, total] = await Promise.all([
    features.query,
    Product.countDocuments({ isActive: true }),
  ]);

  res.json({
    success: true,
    total,
    page: features.page,
    pages: Math.ceil(total / features.limit),
    products,
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug');
  if (!product) return next(new AppError('Product not found', 404));
  res.json({ success: true, product });
};

exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true, isActive: true })
    .populate('category', 'name slug')
    .limit(8);
  res.json({ success: true, products });
};

exports.getRelatedProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true,
  }).limit(4);
  res.json({ success: true, products: related });
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

exports.updateProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return next(new AppError('Product not found', 404));
  res.json({ success: true, product });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));
  // Delete images from cloudinary
  for (const img of product.images) {
    if (img.public_id) await cloudinary.uploader.destroy(img.public_id);
  }
  await product.deleteOne();
  res.json({ success: true, message: 'Product deleted' });
};

exports.uploadProductImages = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));

  const uploadPromises = req.body.images.map((img) =>
    cloudinary.uploader.upload(img, { folder: 'bloomherbs/products', width: 800, crop: 'limit' })
  );
  const results = await Promise.all(uploadPromises);
  const images = results.map((r) => ({ public_id: r.public_id, url: r.secure_url }));
  product.images.push(...images);
  await product.save();
  res.json({ success: true, images: product.images });
};

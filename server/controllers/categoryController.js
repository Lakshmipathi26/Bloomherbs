const Category = require('../models/Category');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudinary');

exports.getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort('sortOrder name');
  res.json({ success: true, categories });
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) return next(new AppError('Category not found', 404));
  res.json({ success: true, category });
};

exports.createCategory = async (req, res) => {
  if (req.body.image) {
    const result = await cloudinary.uploader.upload(req.body.image, { folder: 'bloomherbs/categories' });
    req.body.image = { public_id: result.public_id, url: result.secure_url };
  }
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
};

exports.updateCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) return next(new AppError('Category not found', 404));
  res.json({ success: true, category });
};

exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new AppError('Category not found', 404));
  if (category.image?.public_id) await cloudinary.uploader.destroy(category.image.public_id);
  await category.deleteOne();
  res.json({ success: true, message: 'Category deleted' });
};

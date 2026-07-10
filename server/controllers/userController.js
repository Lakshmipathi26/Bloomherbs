const User = require('../models/User');
const Address = require('../models/Address');
const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudinary');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
};

exports.updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, phone }, { new: true, runValidators: true });
  res.json({ success: true, user });
};

exports.uploadAvatar = async (req, res, next) => {
  if (!req.body.avatar) return next(new AppError('No image provided', 400));
  const user = await User.findById(req.user.id);
  if (user.avatar?.public_id) await cloudinary.uploader.destroy(user.avatar.public_id);
  const result = await cloudinary.uploader.upload(req.body.avatar, { folder: 'bloomherbs/avatars', width: 200, crop: 'fill' });
  user.avatar = { public_id: result.public_id, url: result.secure_url };
  await user.save();
  res.json({ success: true, avatar: user.avatar });
};

exports.getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user.id });
  res.json({ success: true, addresses });
};

exports.addAddress = async (req, res) => {
  const address = await Address.create({ ...req.body, user: req.user.id });
  res.status(201).json({ success: true, address });
};

exports.updateAddress = async (req, res, next) => {
  const address = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!address) return next(new AppError('Address not found', 404));
  res.json({ success: true, address });
};

exports.deleteAddress = async (req, res, next) => {
  const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!address) return next(new AppError('Address not found', 404));
  res.json({ success: true, message: 'Address deleted' });
};

exports.setDefaultAddress = async (req, res, next) => {
  await Address.updateMany({ user: req.user.id }, { isDefault: false });
  const address = await Address.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { isDefault: true }, { new: true });
  if (!address) return next(new AppError('Address not found', 404));
  res.json({ success: true, address });
};

exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort('-createdAt'),
    User.countDocuments(),
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), users });
};

exports.getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.json({ success: true, user });
};

exports.updateUserStatus = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true });
  if (!user) return next(new AppError('User not found', 404));
  res.json({ success: true, user });
};

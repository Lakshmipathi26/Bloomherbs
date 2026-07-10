const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products', 'name images price slug ratings');
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user.id, products: [] });
  res.json({ success: true, wishlist });
};

exports.toggleWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) wishlist = new Wishlist({ user: req.user.id, products: [] });

  const productId = req.params.productId;
  const index = wishlist.products.indexOf(productId);
  let action;

  if (index === -1) {
    wishlist.products.push(productId);
    action = 'added';
  } else {
    wishlist.products.splice(index, 1);
    action = 'removed';
  }
  await wishlist.save();
  res.json({ success: true, action, productId });
};

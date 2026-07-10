import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success('Added to cart');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product._id));
  };

  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="product-card__badge">-{discount}%</span>}
        <button className="product-card__wishlist" onClick={handleToggleWishlist} aria-label="Add to wishlist">
          <FiHeart size={18} />
        </button>
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category?.name}</span>
        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__rating">
          <FiStar size={14} className="star" />
          <span>{product.ratings?.toFixed(1) || 'New'}</span>
        </div>
        <div className="product-card__footer">
          <div className="product-card__price">
            ${product.price?.toFixed(2)}
            {product.comparePrice && <span className="product-card__old-price">${product.comparePrice.toFixed(2)}</span>}
          </div>
          <button className="product-card__cart-btn" onClick={handleAddToCart} aria-label="Add to cart">
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

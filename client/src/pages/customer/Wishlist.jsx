import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { fetchWishlist } from '../../redux/slices/wishlistSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((s) => s.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (!wishlist?.products?.length) {
    return (
      <div className="container empty-state">
        <FiHeart size={48} />
        <h2>Your wishlist is empty</h2>
        <p>Save items you love for later.</p>
        <Link to="/shop" className="btn btn--primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container wishlist-page">
      <h1>My Wishlist</h1>
      <div className="wishlist-page__grid">
        {wishlist.products.map((product) => (
          <Link key={product._id} to={`/product/${product.slug}`} className="product-card">
            <div className="product-card__image-wrap">
              <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} />
            </div>
            <div className="product-card__body">
              <span className="product-card__category">{product.category?.name}</span>
              <h3 className="product-card__title">{product.name}</h3>
              <div className="product-card__footer">
                <div className="product-card__price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

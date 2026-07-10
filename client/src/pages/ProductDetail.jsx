import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchProducts } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import SEO from '../../components/common/SEO';

export default function ProductDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts({}));
    }
    window.scrollTo(0, 0);
  }, [dispatch, products.length, loading, slug]);

  if (loading) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Product not found.</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success('Added to cart');
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription || product.description?.slice(0, 160)}
        url={`/product/${product.slug}`}
      />
      <div className="container product-detail">
        <div className="product-detail__gallery">
          <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} />
        </div>
        <div className="product-detail__info">
          <span className="product-detail__category">{product.category?.name}</span>
          <h1 className="product-detail__title">{product.name}</h1>
          <div className="product-detail__rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar key={star} size={18} className={star <= (product.ratings || 0) ? 'star filled' : 'star'} />
            ))}
            <span>({product.numReviews || 0} reviews)</span>
          </div>
          <div className="product-detail__price-row">
            <span className="product-detail__price">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="product-detail__old-price">${product.comparePrice.toFixed(2)}</span>
            )}
            {product.comparePrice && (
              <span className="product-detail__discount">{Math.round((product.comparePrice - product.price) / product.comparePrice * 100)}% OFF</span>
            )}
          </div>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__stock">
            {product.stock > 0 ? (
              <><FiCheck size={16} /> In Stock ({product.stock} available)</>
            ) : (
              <span style={{ color: 'var(--error)' }}>Out of Stock</span>
            )}
          </p>
          {product.stock > 0 && (
            <div className="product-detail__actions">
              <div className="quantity">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><FiPlus size={16} /></button>
              </div>
              <button className="btn btn--primary" onClick={handleAddToCart}>
                <FiShoppingCart size={18} /> Add to Cart
              </button>
              <button className="btn btn--outline" aria-label="Add to wishlist"><FiHeart size={18} /></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

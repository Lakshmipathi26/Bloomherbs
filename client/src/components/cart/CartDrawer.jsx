import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus, FiTrash2, FiTag, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from '../../redux/slices/cartSlice';
import { closeCart } from '../../redux/slices/uiSlice';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const { isCartOpen } = useSelector((s) => s.ui);
  const { cart, loading } = useSelector((s) => s.cart);
  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (isCartOpen && !cart) {
      dispatch(fetchCart());
    }
  }, [isCartOpen, cart, dispatch]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleClose = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleClose();
  };

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCartOpen]);

  const handleQuantityChange = (productId, currentQuantity, stock, delta) => {
    const newQty = Math.max(1, Math.min(stock, currentQuantity + delta));
    if (newQty !== currentQuantity) {
      dispatch(updateCartItem({ productId, quantity: newQty }));
    }
  };

  const handleRemove = (productId, name) => {
    dispatch(removeFromCart(productId));
    toast.success(`${name} removed from cart`);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setApplying(true);
    try {
      await dispatch(applyCoupon(couponCode.trim())).unwrap();
      toast.success('Coupon applied');
      setCouponCode('');
    } catch (err) {
      toast.error(err || 'Invalid coupon');
    } finally {
      setApplying(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await dispatch(removeCoupon()).unwrap();
      toast.success('Coupon removed');
    } catch (err) {
      toast.error(err || 'Failed to remove coupon');
    }
  };

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
  const discount = cart?.discountAmount || 0;
  const total = subtotal + shipping - discount;
  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      {isCartOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick} aria-hidden="true" />
      )}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className={styles.header}>
          <h2>
            Shopping Cart
            {itemCount > 0 && <span className={styles.count}>({itemCount})</span>}
          </h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close cart">
            <FiX size={22} />
          </button>
        </div>

        <div className={styles.body}>
          {loading && !cart ? (
            <div className={styles.loading} aria-label="Loading cart">Loading...</div>
          ) : !cart?.items?.length ? (
            <div className={styles.empty}>
              <FiShoppingBag size={48} />
              <p>Your cart is empty</p>
              <button className={styles.continueBtn} onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <ul className={styles.items}>
                {cart.items.map((item) => (
                  <li key={item.product._id} className={styles.item}>
                    <Link to={`/product/${item.product.slug}`} className={styles.itemImage} onClick={handleClose}>
                      <img src={item.product.images?.[0]?.url || '/placeholder.png'} alt={item.product.name} />
                    </Link>
                    <div className={styles.itemDetails}>
                      <Link to={`/product/${item.product.slug}`} className={styles.itemName} onClick={handleClose}>
                        {item.product.name}
                      </Link>
                      <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                      <div className={styles.itemActions}>
                        <div className={styles.quantity}>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, item.product.stock, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, item.product.stock, 1)}
                            disabled={item.quantity >= item.product.stock}
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleRemove(item.product._id, item.product.name)}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.couponSection}>
                {cart.coupon?.code ? (
                  <div className={styles.appliedCoupon}>
                    <FiTag size={16} />
                    <span>{cart.coupon.code}</span>
                    <button onClick={handleRemoveCoupon} aria-label="Remove coupon">Remove</button>
                  </div>
                ) : cart.coupon ? (
                  <div className={styles.appliedCoupon}>
                    <FiTag size={16} />
                    <span>Coupon applied</span>
                    <button onClick={handleRemoveCoupon} aria-label="Remove coupon">Remove</button>
                  </div>
                ) : (
                  <form className={styles.couponForm} onSubmit={handleApplyCoupon}>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={applying}
                      aria-label="Coupon code"
                    />
                    <button type="submit" className={styles.applyBtn} disabled={applying || !couponCode.trim()}>
                      {applying ? 'Applying...' : 'Apply'}
                    </button>
                  </form>
                )}
              </div>

              <div className={styles.summary}>
                <div className={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className={styles.summaryRow}><span>Shipping</span><span>{shipping === 0 && subtotal > 0 ? 'FREE' : shipping > 0 ? '$' + shipping.toFixed(2) : '-'}</span></div>
                {discount > 0 && <div className={`${styles.summaryRow} ${styles.discount}`}><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
                <div className={`${styles.summaryRow} ${styles.total}`}><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>

              <div className={styles.footer}>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  Checkout <FiArrowRight size={18} />
                </button>
                <button className={styles.continueBtn} onClick={handleClose}>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

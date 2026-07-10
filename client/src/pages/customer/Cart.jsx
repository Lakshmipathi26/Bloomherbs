import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../../redux/slices/cartSlice';
import SEO from '../../components/common/SEO';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading || !cart) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>;

  if (!cart.items?.length) {
    return (
      <div className="container empty-state">
        <FiShoppingBag size={48} />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn btn--primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title="Shopping Cart" description="Review items in your BloomHerbs cart." />
      <div className="container cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-page__body">
          <div className="cart-page__items">
            {cart.items.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img src={item.product.images?.[0]?.url || '/placeholder.png'} alt={item.product.name} />
                <div className="cart-item__details">
                  <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item__actions">
                  <div className="quantity">
                    <button onClick={() => dispatch(updateCartItem({ productId: item.product._id, quantity: Math.max(1, item.quantity - 1) }))}><FiMinus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(updateCartItem({ productId: item.product._id, quantity: Math.min(item.product.stock, item.quantity + 1) }))}><FiPlus size={14} /></button>
                  </div>
                  <button className="cart-item__remove" onClick={() => dispatch(removeFromCart(item.product._id))}><FiTrash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-page__summary">
            <h3>Order Summary</h3>
            <div className="cart-summary__row"><span>Subtotal</span><span>${cart.itemsPrice?.toFixed(2)}</span></div>
            <div className="cart-summary__row"><span>Shipping</span><span>{cart.shippingPrice ? '$' + cart.shippingPrice.toFixed(2) : 'Calculated at checkout'}</span></div>
            {cart.discountAmount > 0 && <div className="cart-summary__row discount"><span>Discount</span><span>-${cart.discountAmount.toFixed(2)}</span></div>}
            <div className="cart-summary__row total"><span>Total</span><span>${cart.totalPrice?.toFixed(2)}</span></div>
            <Link to="/checkout" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>Proceed to Checkout</Link>
            <button className="btn btn--outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

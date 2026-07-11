import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiCreditCard } from 'react-icons/fi';
import { fetchOrderById, cancelOrder } from '../../redux/slices/orderSlice';
import SEO from '../../components/common/SEO';

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(id));
    }
  };

  if (loading) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading...</div>;
  if (!currentOrder) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Order not found.</div>;

  return (
    <>
      <SEO title={`Order ${currentOrder.orderNumber}`} description="Details of your BloomHerbs order." />
      <div className="container order-detail-page">
        <Link to="/orders" className="back-link"><FiArrowLeft /> Back to Orders</Link>
        <h1>Order #{currentOrder.orderNumber}</h1>
        <div className="order-detail__grid">
          <div className="order-detail__section">
            <h3>Items</h3>
            {currentOrder.items?.map((item, i) => (
              <div key={i} className="order-detail__item">
                <img src={item.product?.images?.[0]?.url || '/placeholder.png'} alt={item.product?.name} />
                <div>
                  <p>{item.product?.name || 'Product'}</p>
                  <span>${item.price.toFixed(2)} x {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="order-detail__section">
            <h3>Shipping Address</h3>
            <p>{currentOrder.shippingAddress?.fullName}</p>
            <p>{currentOrder.shippingAddress?.addressLine1}</p>
            <p>{currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state} - {currentOrder.shippingAddress?.pincode}</p>
            <p>{currentOrder.shippingAddress?.country}</p>

            <h3 style={{ marginTop: '1rem' }}>Payment</h3>
            <p className="payment-method"><FiCreditCard size={16} /> {currentOrder.paymentMethod}</p>
            <p className={currentOrder.isPaid ? 'success' : 'warning'}>{currentOrder.isPaid ? 'Paid' : 'Pending'}</p>

            <h3 style={{ marginTop: '1rem' }}>Order Summary</h3>
            <div className="summary-rows">
              <div><span>Subtotal</span><span>${currentOrder.itemsPrice.toFixed(2)}</span></div>
              <div><span>Shipping</span><span>${currentOrder.shippingPrice.toFixed(2)}</span></div>
              <div><span>Tax</span><span>${currentOrder.taxPrice.toFixed(2)}</span></div>
              {currentOrder.discountAmount > 0 && <div><span>Discount</span><span>-${currentOrder.discountAmount.toFixed(2)}</span></div>}
              <div className="total"><span>Total</span><span>${currentOrder.totalPrice.toFixed(2)}</span></div>
            </div>

            {['pending', 'confirmed'].includes(currentOrder.orderStatus) && (
              <button className="btn btn--outline cancel-btn" onClick={handleCancel}>Cancel Order</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

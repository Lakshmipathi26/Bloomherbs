import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import { fetchMyOrders } from '../../redux/slices/orderSlice';
import SEO from '../../components/common/SEO';

export default function Orders() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchMyOrders({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <div className="container orders-page"><p className="loading-text">Loading orders...</p></div>;

  return (
    <>
      <SEO title="My Orders" description="Track and manage your orders." />
      <div className="container orders-page">
        <h1>My Orders</h1>
        {myOrders.length === 0 ? (
          <div className="empty-state">
            <FiPackage size={48} />
            <h2>No orders yet</h2>
            <p>When you place an order, it will appear here.</p>
            <Link to="/shop" className="btn btn--primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {myOrders.map((o) => (
              <div key={o._id} className="order-card">
                <div className="order-card__header">
                  <span>#{o.orderNumber}</span>
                  <span className="badge success">{o.orderStatus}</span>
                </div>
                <p className="order-card__date">{new Date(o.createdAt).toLocaleDateString()}</p>
                <div className="order-card__items">
                  {o.items?.slice(0, 2).map((item, i) => (
                    <div key={i} className="order-item">
                      <img src={item.product?.images?.[0]?.url || '/placeholder.png'} alt={item.product?.name} />
                      <div>
                        <p>{item.product?.name || 'Product'}</p>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                  {o.items?.length > 2 && <span className="more-items">+{o.items.length - 2} more</span>}
                </div>
                <div className="order-card__footer">
                  <span>Total: ${o.totalPrice.toFixed(2)}</span>
                  <Link to={`/orders/${o._id}`} className="btn btn--outline">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

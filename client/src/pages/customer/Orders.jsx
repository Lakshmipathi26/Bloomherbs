import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function Orders() {
  return (
    <>
      <SEO title="My Orders" description="Track and manage your orders." />
      <div className="container orders-page">
        <h1>My Orders</h1>
        <div className="orders-list">
          <div className="order-card">
            <div className="order-card__header"><span>#BH202406010001</span><span className="badge success">Delivered</span></div>
            <p className="order-card__date">June 1, 2024</p>
            <div className="order-card__items">
              <div className="order-item"><img src="/placeholder.png" alt="" /><div><p>Herbal Tea Collection</p><span>Qty: 2</span></div></div>
            </div>
            <div className="order-card__footer"><span>Total: $49.98</span><Link to="/orders/1" className="btn btn--outline">View Details</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}

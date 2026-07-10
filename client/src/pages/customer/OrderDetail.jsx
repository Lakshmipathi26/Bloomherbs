import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function OrderDetail() {
  const { id } = useParams();
  return (
    <>
      <SEO title="Order Details" description="Details of your BloomHerbs order." />
      <div className="container order-detail-page">
        <Link to="/orders" className="back-link"><FiArrowLeft /> Back to Orders</Link>
        <h1>Order #{id}</h1>
        <div className="order-detail__grid">
          <div className="order-detail__section">
            <h3>Items</h3>
            <div className="order-detail__item">
              <img src="/placeholder.png" alt="" />
              <div><p>Herbal Tea Collection</p><span>$24.99 x 2</span></div>
            </div>
          </div>
          <div className="order-detail__section">
            <h3>Shipping Address</h3>
            <p>123 Main St, Apt 4B</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
            <h3 style={{ marginTop: '1rem' }}>Payment</h3>
            <p>Razorpay</p>
            <p className="success">Paid</p>
          </div>
        </div>
      </div>
    </>
  );
}

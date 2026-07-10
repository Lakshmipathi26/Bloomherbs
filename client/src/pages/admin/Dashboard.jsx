import { FiUsers, FiShoppingBag, FiDollarSign, FiPackage } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: <FiDollarSign /> },
    { label: 'Total Orders', value: '156', icon: <FiShoppingBag /> },
    { label: 'Total Products', value: '42', icon: <FiPackage /> },
    { label: 'Total Customers', value: '89', icon: <FiUsers /> },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" description="BloomHerbs admin dashboard." />
      <div className="admin-page">
        <h1>Dashboard</h1>
        <div className="admin-stats">
          {stats.map((s) => (
            <div key={s.label} className="admin-stat">
              <span className="admin-stat__icon">{s.icon}</span>
              <div><p>{s.value}</p><span>{s.label}</span></div>
            </div>
          ))}
        </div>
        <div className="admin-table-wrap">
          <h3>Recent Orders</h3>
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {[1,2,3].map((i) => (
                <tr key={i}><td>#BH{i}</td><td>Customer {i}</td><td>$49.99</td><td><span className="badge success">Delivered</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

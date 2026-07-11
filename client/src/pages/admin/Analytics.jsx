import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiPackage } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function Analytics() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: <FiDollarSign /> },
    { label: 'Total Orders', value: '1,234', change: '+15.3%', icon: <FiShoppingBag /> },
    { label: 'New Customers', value: '456', change: '+8.7%', icon: <FiUsers /> },
    { label: 'Avg Order Value', value: '$36.65', change: '+4.2%', icon: <FiTrendingUp /> },
  ];

  const monthlySales = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ];

  const topProducts = [
    { name: 'Herbal Tea Collection', sold: 234, revenue: 5826 },
    { name: 'Arabica Coffee Beans', sold: 189, revenue: 3771 },
    { name: 'Pure Wild Honey', sold: 156, revenue: 2028 },
    { name: 'Cinnamon Sticks', sold: 145, revenue: 1158 },
  ];

  const maxSales = Math.max(...monthlySales.map((m) => m.value));

  return (
    <>
      <SEO title="Analytics" description="BloomHerbs sales analytics and insights." />
      <div className="admin-page analytics-page">
        <h1>Analytics</h1>

        <div className="analytics-stats">
          {stats.map((s) => (
            <div key={s.label} className="admin-stat">
              <span className="admin-stat__icon">{s.icon}</span>
              <div>
                <p>{s.value}</p>
                <span>{s.label} <strong className="positive">{s.change}</strong></span>
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Monthly Sales</h3>
            <div className="chart">
              {monthlySales.map((item) => (
                <div key={item.month} className="chart-bar">
                  <div className="chart-bar__fill" style={{ height: `${(item.value / maxSales) * 100}%` }} />
                  <span className="chart-bar__label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3>Top Products</h3>
            <div className="top-products">
              {topProducts.map((p, i) => (
                <div key={p.name} className="top-product">
                  <span className="rank">#{i + 1}</span>
                  <div className="top-product__info">
                    <p>{p.name}</p>
                    <span>{p.sold} sold</span>
                  </div>
                  <span className="top-product__revenue">${p.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3>Customer Growth</h3>
            <div className="growth-chart">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <div key={month} className="growth-point">
                  <div className="growth-dot" style={{ left: `${((i + 1) / 6) * 100}%`, bottom: `${20 + i * 12}%` }} />
                  <span className="growth-label">{month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3>Order Status Distribution</h3>
            <div className="status-list">
              {[
                { label: 'Delivered', count: 452, color: 'var(--success)' },
                { label: 'Shipped', count: 123, color: 'var(--info)' },
                { label: 'Processing', count: 89, color: 'var(--warning)' },
                { label: 'Pending', count: 34, color: 'var(--text-muted)' },
              ].map((s) => (
                <div key={s.label} className="status-item">
                  <div className="status-item__bar">
                    <div className="status-item__fill" style={{ width: `${(s.count / 452) * 100}%`, background: s.color }} />
                  </div>
                  <span>{s.label}</span>
                  <strong>{s.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

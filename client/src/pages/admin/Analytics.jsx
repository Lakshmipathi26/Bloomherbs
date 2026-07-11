import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { fetchOrderStats } from '../../redux/slices/orderSlice';
import SEO from '../../components/common/SEO';

export default function Analytics() {
  const dispatch = useDispatch();
  const stats = useSelector((s) => s.orders.stats);

  useEffect(() => {
    dispatch(fetchOrderStats());
  }, [dispatch]);

  return (
    <>
      <SEO title="Analytics" description="BloomHerbs sales analytics and insights." />
      <div className="admin-page analytics-page">
        <h1>Analytics</h1>

        <div className="analytics-stats">
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiDollarSign /></span>
            <div>
              <p>{stats?.totalRevenue ? `$${stats.totalRevenue.toLocaleString()}` : '$0'}</p>
              <span>Total Revenue <strong className="positive">Live</strong></span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiShoppingBag /></span>
            <div>
              <p>{stats?.totalOrders || 0}</p>
              <span>Total Orders <strong className="positive">Live</strong></span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiUsers /></span>
            <div>
              <p>-</p>
              <span>New Customers <strong className="positive">Coming soon</strong></span>
            </div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiTrendingUp /></span>
            <div>
              <p>{stats?.avgOrderValue ? `$${stats.avgOrderValue.toFixed(2)}` : '$0'}</p>
              <span>Avg Order Value <strong className="positive">Live</strong></span>
            </div>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Monthly Sales</h3>
            <p className="placeholder-text">Monthly breakdown requires backend aggregation endpoint.</p>
          </div>
          <div className="analytics-card">
            <h3>Top Products</h3>
            <p className="placeholder-text">Top products ranking requires backend aggregation endpoint.</p>
          </div>
          <div className="analytics-card">
            <h3>Customer Growth</h3>
            <p className="placeholder-text">Customer growth requires backend aggregation endpoint.</p>
          </div>
          <div className="analytics-card">
            <h3>Order Status Distribution</h3>
            <p className="placeholder-text">Status distribution requires backend aggregation endpoint.</p>
          </div>
        </div>
      </div>
    </>
  );
}

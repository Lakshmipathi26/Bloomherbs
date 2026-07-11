import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers } from 'react-icons/fi';
import { fetchOrderStats, fetchAllOrders } from '../../redux/slices/orderSlice';
import { fetchAllUsers } from '../../redux/slices/userSlice';
import SEO from '../../components/common/SEO';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, allOrders } = useSelector((s) => s.orders);
  const users = useSelector((s) => s.user.users);
  const usersTotal = useSelector((s) => s.user.usersTotal || 0);
  const productsTotal = useSelector((s) => s.products.total || 0);
  const loading = useSelector((s) => s.orders.loading);

  useEffect(() => {
    dispatch(fetchOrderStats());
    dispatch(fetchAllOrders({ page: 1, limit: 5 }));
    dispatch(fetchAllUsers({ page: 1, limit: 1 }));
  }, [dispatch]);

  const recentOrders = allOrders.slice(0, 5);

  return (
    <>
      <SEO title="Admin Dashboard" description="BloomHerbs admin dashboard." />
      <div className="admin-page">
        <h1>Dashboard</h1>
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiDollarSign /></span>
            <div><p>{stats?.totalRevenue ? `$${stats.totalRevenue.toLocaleString()}` : '$0'}</p><span>Total Revenue</span></div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiShoppingBag /></span>
            <div><p>{stats?.totalOrders || 0}</p><span>Total Orders</span></div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiPackage /></span>
            <div><p>{productsTotal}</p><span>Total Products</span></div>
          </div>
          <div className="admin-stat">
            <span className="admin-stat__icon"><FiUsers /></span>
            <div><p>{usersTotal}</p><span>Total Customers</span></div>
          </div>
        </div>
        <div className="admin-table-wrap">
          <h3>Recent Orders</h3>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : recentOrders.length === 0 ? (
            <p className="empty-text">No orders yet.</p>
          ) : (
            <table className="admin-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td>{o.orderNumber}</td>
                    <td>{o.user?.name || 'Customer'}</td>
                    <td>${o.totalPrice.toFixed(2)}</td>
                    <td><span className="badge success">{o.orderStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

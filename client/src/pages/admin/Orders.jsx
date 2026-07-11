import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/orderSlice';
import SEO from '../../components/common/SEO';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((s) => s.orders);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAllOrders({ page: 1, limit: 20, status: statusFilter || undefined }));
  }, [dispatch, statusFilter]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateOrderStatus({ id, status, note: `Status updated to ${status}` }));
    toast.success('Order status updated');
  };

  return (
    <>
      <SEO title="Orders" description="Manage BloomHerbs orders." />
      <div className="admin-page">
        <div className="admin-header">
          <h1>Orders</h1>
          <div className="admin-header__actions">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : allOrders.length === 0 ? (
          <p className="empty-text">No orders found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {allOrders.map((o) => (
                  <tr key={o._id}>
                    <td>{o.orderNumber}</td>
                    <td>{o.user?.name || '-'}</td>
                    <td>${o.totalPrice.toFixed(2)}</td>
                    <td>
                      <select value={o.orderStatus} onChange={(e) => handleStatusUpdate(o._id, e.target.value)} className="status-select">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="actions"><button aria-label="View">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

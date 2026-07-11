import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchAllUsers, updateUserStatus } from '../../redux/slices/userSlice';
import SEO from '../../components/common/SEO';

export default function AdminCustomers() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((s) => s.user);

  useEffect(() => {
    dispatch(fetchAllUsers({ page: 1, limit: 50 }));
  }, [dispatch]);

  const handleToggleStatus = (id, currentStatus) => {
    dispatch(updateUserStatus({ id, isActive: !currentStatus }));
    toast.success('User status updated');
  };

  return (
    <>
      <SEO title="Customers" description="Manage BloomHerbs customers." />
      <div className="admin-page">
        <h1>Customers</h1>
        {loading ? (
          <p className="loading-text">Loading customers...</p>
        ) : users.length === 0 ? (
          <p className="empty-text">No customers found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || '-'}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td><span className={`badge ${u.isActive ? 'success' : 'error'}`}>{u.isActive ? 'Active' : 'Blocked'}</span></td>
                    <td className="actions">
                      <button onClick={() => handleToggleStatus(u._id, u.isActive)} aria-label="Toggle status">
                        <FiEdit size={16} />
                      </button>
                    </td>
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

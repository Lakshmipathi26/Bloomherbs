import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchAllReviews, deleteReview } from '../../redux/slices/reviewSlice';
import SEO from '../../components/common/SEO';

export default function AdminReviews() {
  const dispatch = useDispatch();
  const { allReviews, loading } = useSelector((s) => s.reviews);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) {
      dispatch(deleteReview(id));
      toast.success('Review deleted');
    }
  };

  return (
    <>
      <SEO title="Reviews" description="Manage BloomHerbs product reviews." />
      <div className="admin-page">
        <h1>Reviews</h1>
        {loading ? (
          <p className="loading-text">Loading reviews...</p>
        ) : allReviews.length === 0 ? (
          <p className="empty-text">No reviews yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Product</th><th>User</th><th>Rating</th><th>Comment</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>
                {allReviews.map((r) => (
                  <tr key={r._id}>
                    <td>{r.product?.name || '-'}</td>
                    <td>{r.user?.name || '-'}</td>
                    <td>{'★'.repeat(r.rating)}</td>
                    <td>{r.comment}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="actions"><button onClick={() => handleDelete(r._id)} aria-label="Delete"><FiTrash2 /></button></td>
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

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchCoupons, deleteCoupon } from '../../redux/slices/couponSlice';
import SEO from '../../components/common/SEO';

export default function AdminCoupons() {
  const dispatch = useDispatch();
  const { coupons, loading } = useSelector((s) => s.coupons);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleDelete = (id, code) => {
    if (window.confirm(`Delete coupon "${code}"?`)) {
      dispatch(deleteCoupon(id));
      toast.success('Coupon deleted');
    }
  };

  return (
    <>
      <SEO title="Coupons" description="Manage BloomHerbs coupons." />
      <div className="admin-page">
        <div className="admin-header"><h1>Coupons</h1><button className="btn btn--primary"><FiPlus /> Add Coupon</button></div>
        {loading ? (
          <p className="loading-text">Loading coupons...</p>
        ) : coupons.length === 0 ? (
          <p className="empty-text">No coupons found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Code</th><th>Discount</th><th>Type</th><th>Min Order</th><th>Expiry</th><th>Actions</th></tr></thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c._id}>
                    <td>{c.code}</td>
                    <td>{c.discountValue}{c.discountType === 'percentage' ? '%' : '$'}</td>
                    <td>{c.discountType}</td>
                    <td>${c.minOrderAmount}</td>
                    <td>{new Date(c.expiresAt).toLocaleDateString()}</td>
                    <td className="actions"><button aria-label="Edit"><FiEdit /></button><button onClick={() => handleDelete(c._id, c.code)} aria-label="Delete"><FiTrash2 /></button></td>
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

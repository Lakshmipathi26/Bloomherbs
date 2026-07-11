import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchProducts } from '../../redux/slices/productSlice';
import SEO from '../../components/common/SEO';

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      toast.success('Product deleted');
    }
  };

  return (
    <>
      <SEO title="Products" description="Manage BloomHerbs products." />
      <div className="admin-page">
        <div className="admin-header"><h1>Products</h1><button className="btn btn--primary"><FiPlus /> Add Product</button></div>
        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="empty-text">No products found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.category?.name || '-'}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td><span className="badge success">{p.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="actions"><button aria-label="Edit"><FiEdit /></button><button onClick={() => handleDelete(p._id)} aria-label="Delete"><FiTrash2 /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {products.length > 0 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        )}
      </div>
    </>
  );
}

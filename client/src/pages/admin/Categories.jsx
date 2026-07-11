import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchCategories, deleteCategory } from '../../redux/slices/categorySlice';
import SEO from '../../components/common/SEO';

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((s) => s.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      dispatch(deleteCategory(id));
      toast.success('Category deleted');
    }
  };

  return (
    <>
      <SEO title="Categories" description="Manage BloomHerbs product categories." />
      <div className="admin-page">
        <div className="admin-header"><h1>Categories</h1><button className="btn btn--primary"><FiPlus /> Add Category</button></div>
        {loading ? (
          <p className="loading-text">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="empty-text">No categories found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Slug</th><th>Products</th><th>Actions</th></tr></thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td><code>{c.slug}</code></td>
                    <td>{c.products?.length || 0}</td>
                    <td className="actions"><button aria-label="Edit"><FiEdit /></button><button onClick={() => handleDelete(c._id, c.name)} aria-label="Delete"><FiTrash2 /></button></td>
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

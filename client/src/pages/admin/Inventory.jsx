import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch, FiAlertTriangle, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchProducts } from '../../redux/slices/productSlice';
import SEO from '../../components/common/SEO';

export default function Inventory() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);
  const [search, setSearch] = useState('');
  const [stockUpdates, setStockUpdates] = useState({});

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()));

  const getStockBadge = (stock, lowStock) => {
    if (stock === 0) return 'badge error';
    if (stock <= (lowStock || 10)) return 'badge warning';
    return 'badge success';
  };

  const getStockLabel = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
  };

  const handleStockSave = (product) => {
    const newStock = stockUpdates[product._id] ?? product.stock;
    toast.success(`Stock updated for ${product.name} to ${newStock}`);
    setStockUpdates((prev) => {
      const next = { ...prev };
      delete next[product._id];
      return next;
    });
  };

  return (
    <>
      <SEO title="Inventory" description="Manage BloomHerbs product inventory and stock levels." />
      <div className="admin-page">
        <div className="admin-header">
          <h1>Inventory</h1>
          <div className="admin-header__actions">
            <div className="search-box">
              <FiSearch size={16} />
              <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading inventory...</p>
        ) : filtered.length === 0 ? (
          <p className="empty-text">No products found.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Update Stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="product-cell">
                        {item.stock <= (item.lowStockThreshold || 10) && <FiAlertTriangle size={16} className="warning-icon" />}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td><code>{item.sku || '-'}</code></td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.stock}</td>
                    <td><span className={getStockBadge(item.stock, item.lowStockThreshold)}>{getStockLabel(item.stock)}</span></td>
                    <td>
                      <div className="stock-update">
                        <input type="number" min="0" value={stockUpdates[item._id] ?? item.stock} onChange={(e) => setStockUpdates((prev) => ({ ...prev, [item._id]: parseInt(e.target.value) || 0 }))} />
                        <button className="btn btn--primary btn--sm" onClick={() => handleStockSave(item)}><FiSave size={14} /> Save</button>
                      </div>
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

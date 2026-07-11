import { useState } from 'react';
import { FiSearch, FiAlertTriangle, FiEdit, FiSave } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function Inventory() {
  const [inventory] = useState([
    { id: 1, name: 'Herbal Tea Collection', sku: 'BH-TEA-001', stock: 50, lowStock: 10, price: 24.99, status: 'In Stock' },
    { id: 2, name: 'Arabica Coffee Beans', sku: 'BH-COF-001', stock: 3, lowStock: 10, price: 19.99, status: 'Low Stock' },
    { id: 3, name: 'Green Tea Powder', sku: 'BH-TEA-002', stock: 0, lowStock: 10, price: 14.99, status: 'Out of Stock' },
    { id: 4, name: 'Black Pepper Whole', sku: 'BH-PEP-001', stock: 25, lowStock: 10, price: 9.99, status: 'In Stock' },
    { id: 5, name: 'Pure Wild Honey', sku: 'BH-HON-001', stock: 8, lowStock: 10, price: 12.99, status: 'Low Stock' },
    { id: 6, name: 'Cinnamon Sticks', sku: 'BH-SPI-001', stock: 40, lowStock: 10, price: 7.99, status: 'In Stock' },
    { id: 7, name: 'Cardamom Pods', sku: 'BH-SPI-002', stock: 15, lowStock: 10, price: 11.99, status: 'In Stock' },
    { id: 8, name: 'Cloves Whole', sku: 'BH-SPI-003', stock: 2, lowStock: 10, price: 8.99, status: 'Low Stock' },
  ]);

  const [search, setSearch] = useState('');
  const [stockUpdates, setStockUpdates] = useState({});

  const filtered = inventory.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase()));

  const handleStockChange = (id, value) => {
    setStockUpdates((prev) => ({ ...prev, [id]: value }));
  };

  const getStockBadge = (stock, lowStock) => {
    if (stock === 0) return 'badge error';
    if (stock <= lowStock) return 'badge warning';
    return 'badge success';
  };

  const getStockLabel = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
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
              <input type="text" placeholder="Search products or SKU..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

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
                <tr key={item.id}>
                  <td>
                    <div className="product-cell">
                      {item.stock <= item.lowStock && <FiAlertTriangle size={16} className="warning-icon" />}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td><code>{item.sku}</code></td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.stock}</td>
                  <td><span className={getStockBadge(item.stock, item.lowStock)}>{getStockLabel(item.stock)}</span></td>
                  <td>
                    <div className="stock-update">
                      <input type="number" min="0" value={stockUpdates[item.id] ?? item.stock} onChange={(e) => handleStockChange(item.id, parseInt(e.target.value) || 0)} />
                      <button className="btn btn--primary btn--sm"><FiSave size={14} /> Save</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function AdminProducts() {
  const [products] = useState([
    { id: 1, name: 'Herbal Tea Collection', category: 'Herbal Tea', price: 24.99, stock: 50, status: 'Active' },
    { id: 2, name: 'Arabica Coffee Beans', category: 'Coffee Beans', price: 19.99, stock: 30, status: 'Active' },
  ]);

  return (
    <>
      <SEO title="Products" description="Manage BloomHerbs products." />
      <div className="admin-page">
        <div className="admin-header"><h1>Products</h1><button className="btn btn--primary"><FiPlus /> Add Product</button></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td><td>{p.category}</td><td>${p.price.toFixed(2)}</td><td>{p.stock}</td>
                  <td><span className="badge success">{p.status}</span></td>
                  <td className="actions"><button><FiEdit /></button><button><FiTrash2 /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

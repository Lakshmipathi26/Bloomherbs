import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function AdminCategories() {
  const [categories] = useState([
    { id: 1, name: 'Herbal Tea', slug: 'herbal-tea', products: 12 },
    { id: 2, name: 'Coffee Beans', slug: 'coffee-beans', products: 8 },
    { id: 3, name: 'Spices', slug: 'spices', products: 15 },
  ]);

  return (
    <>
      <SEO title="Categories" description="Manage BloomHerbs product categories." />
      <div className="admin-page">
        <div className="admin-header"><h1>Categories</h1><button className="btn btn--primary"><FiPlus /> Add Category</button></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Slug</th><th>Products</th><th>Actions</th></tr></thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td><td>{c.slug}</td><td>{c.products}</td>
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

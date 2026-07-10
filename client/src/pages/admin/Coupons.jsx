import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function AdminCoupons() {
  const [coupons] = useState([
    { code: 'WELCOME10', discount: 10, type: 'Percentage', minOrder: 50, expiry: '2024-12-31' },
    { code: 'FLAT50', discount: 50, type: 'Fixed', minOrder: 200, expiry: '2024-11-30' },
  ]);

  return (
    <>
      <SEO title="Coupons" description="Manage BloomHerbs coupons." />
      <div className="admin-page">
        <div className="admin-header"><h1>Coupons</h1><button className="btn btn--primary"><FiPlus /> Add Coupon</button></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Code</th><th>Discount</th><th>Type</th><th>Min Order</th><th>Expiry</th></tr></thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code}><td>{c.code}</td><td>{c.discount}{c.type === 'Percentage' ? '%' : '$'}</td><td>{c.type}</td><td>${c.minOrder}</td><td>{c.expiry}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

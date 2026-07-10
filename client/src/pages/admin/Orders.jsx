import SEO from '../../components/common/SEO';

export default function AdminOrders() {
  const orders = [
    { id: 'BH202406010001', customer: 'John Doe', total: 49.99, status: 'Delivered' },
    { id: 'BH202406020002', customer: 'Jane Smith', total: 89.50, status: 'Shipped' },
    { id: 'BH202406030003', customer: 'Bob Lee', total: 24.00, status: 'Processing' },
  ];

  return (
    <>
      <SEO title="Orders" description="Manage BloomHerbs orders." />
      <div className="admin-page">
        <h1>Orders</h1>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{o.customer}</td><td>${o.total.toFixed(2)}</td>
                  <td><span className="badge success">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

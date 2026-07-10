import SEO from '../../components/common/SEO';

export default function AdminCustomers() {
  const customers = [
    { name: 'John Doe', email: 'john@example.com', joined: '2024-05-10', orders: 3 },
    { name: 'Jane Smith', email: 'jane@example.com', joined: '2024-04-22', orders: 7 },
  ];

  return (
    <>
      <SEO title="Customers" description="Manage BloomHerbs customers." />
      <div className="admin-page">
        <h1>Customers</h1>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Orders</th></tr></thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i}><td>{c.name}</td><td>{c.email}</td><td>{c.joined}</td><td>{c.orders}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

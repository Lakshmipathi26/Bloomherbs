import SEO from '../../components/common/SEO';

export default function Addresses() {
  return (
    <>
      <SEO title="My Addresses" description="Manage your shipping addresses." />
      <div className="container addresses-page">
        <h1>My Addresses</h1>
        <button className="btn btn--primary">+ Add New Address</button>
        <div className="addresses-grid">
          {['Home', 'Work'].map((label) => (
            <div key={label} className="address-card">
              <h3>{label}</h3>
              <p>123 Main St, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <div className="address-card__actions">
                <button className="btn btn--outline">Edit</button>
                <button className="btn btn--outline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

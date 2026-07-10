const stub = (name) => () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--primary)' }}>{name}</h1>
  </div>
);

export const Dashboard = stub('Admin Dashboard');
export const Products = stub('Admin Products');
export const Categories = stub('Admin Categories');
export const Orders = stub('Admin Orders');
export const Customers = stub('Admin Customers');
export const Reviews = stub('Admin Reviews');
export const Coupons = stub('Admin Coupons');

const stub = (name) => () => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--primary)' }}>{name}</h1>
  </div>
);

export const Dashboard = stub('My Dashboard');
export const Profile = stub('My Profile');
export const Wishlist = stub('My Wishlist');
export const Cart = stub('My Cart');
export const Checkout = stub('Checkout');
export const Orders = stub('My Orders');
export const OrderDetail = stub('Order Detail');
export const Addresses = stub('My Addresses');

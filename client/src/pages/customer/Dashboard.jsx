import { Link } from 'react-router-dom';
import { FiUser, FiPackage, FiMapPin, FiHeart, FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import SEO from '../../components/common/SEO';

export default function Dashboard() {
  const dispatch = useDispatch();

  const menu = [
    { to: '/profile', icon: <FiUser />, label: 'Profile' },
    { to: '/orders', icon: <FiPackage />, label: 'Orders' },
    { to: '/addresses', icon: <FiMapPin />, label: 'Addresses' },
    { to: '/wishlist', icon: <FiHeart />, label: 'Wishlist' },
  ];

  return (
    <>
      <SEO title="Dashboard" description="Your BloomHerbs account dashboard." />
      <div className="container dashboard-page">
        <h1>My Dashboard</h1>
        <div className="dashboard-grid">
          <div className="dashboard-menu">
            {menu.map((item) => (
              <Link key={item.to} to={item.to} className="dashboard-menu__item">{item.icon}<span>{item.label}</span></Link>
            ))}
            <button className="dashboard-menu__item logout" onClick={() => dispatch(logoutUser())}><FiLogOut /><span>Logout</span></button>
          </div>
          <div className="dashboard-content">
            <h2>Welcome back!</h2>
            <p>From your account dashboard you can view your orders, manage your addresses, and edit your account settings.</p>
          </div>
        </div>
      </div>
    </>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiBox, FiGrid, FiShoppingBag, FiUsers, FiStar, FiPercent, FiSettings } from 'react-icons/fi';
import styles from './AdminLayout.module.css';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: <FiHome />, end: true },
  { to: '/admin/products', label: 'Products', icon: <FiBox /> },
  { to: '/admin/categories', label: 'Categories', icon: <FiGrid /> },
  { to: '/admin/orders', label: 'Orders', icon: <FiShoppingBag /> },
  { to: '/admin/customers', label: 'Customers', icon: <FiUsers /> },
  { to: '/admin/reviews', label: 'Reviews', icon: <FiStar /> },
  { to: '/admin/coupons', label: 'Coupons', icon: <FiPercent /> },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>🌿 BloomHerbs</div>
      <nav>
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.bottom}>
        <NavLink to="/" className={styles.link}><FiSettings /><span>Back to Site</span></NavLink>
      </div>
    </aside>
  );
}

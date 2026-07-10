import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { toggleMobileMenu, closeMobileMenu, toggleCart } from '../../redux/slices/uiSlice';
import styles from './Header.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((s) => s.ui);
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const cartCount = useSelector((s) => s.cart.cart?.items?.length || 0);
  const wishlistCount = useSelector((s) => s.wishlist.wishlist?.products?.length || 0);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          <span>BloomHerbs</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search" onClick={() => dispatch(toggleCart())}>
            <FiSearch size={20} />
          </button>
          {isAuthenticated && (
            <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
              <FiHeart size={20} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>
          )}
          <button className={styles.iconBtn} aria-label="Cart" onClick={() => dispatch(toggleCart())}>
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>
          {isAuthenticated ? (
            <Link to="/dashboard" className={styles.iconBtn} aria-label="Account">
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} className={styles.avatar} />
              ) : (
                <FiUser size={20} />
              )}
            </Link>
          ) : (
            <Link to="/login" className={styles.loginBtn}>Sign In</Link>
          )}
          <button className={styles.menuBtn} onClick={() => dispatch(toggleMobileMenu())} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={styles.mobileLink} onClick={() => dispatch(closeMobileMenu())}>
              {label}
            </NavLink>
          ))}
          {!isAuthenticated && (
            <Link to="/login" className={styles.mobileLink} onClick={() => dispatch(closeMobileMenu())}>Sign In</Link>
          )}
        </nav>
      )}
    </header>
  );
}

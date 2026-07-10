import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import styles from './AdminLayout.module.css';

export default function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h2>Admin Panel</h2>
      <div className={styles.actions}>
        <button onClick={() => { dispatch(logoutUser()); navigate('/'); }}><FiLogOut size={18} /> Logout</button>
      </div>
    </header>
  );
}

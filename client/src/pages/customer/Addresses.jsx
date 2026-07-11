import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiMapPin, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { fetchAddresses, addAddress, updateAddress, deleteAddress } from '../../redux/slices/userSlice';
import SEO from '../../components/common/SEO';

export default function Addresses() {
  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((s) => s.user);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading) return <div className="container addresses-page"><p className="loading-text">Loading addresses...</p></div>;

  return (
    <>
      <SEO title="My Addresses" description="Manage your shipping addresses." />
      <div className="container addresses-page">
        <h1>My Addresses</h1>
        <button className="btn btn--primary" onClick={() => toast.info('Add address form coming soon')}><FiPlus /> Add New Address</button>
        {addresses.length === 0 ? (
          <p className="empty-text">No addresses saved yet.</p>
        ) : (
          <div className="addresses-grid">
            {addresses.map((addr) => (
              <div key={addr._id} className="address-card">
                <h3>{addr.label} {addr.isDefault && <span className="default-badge">Default</span>}</h3>
                <p>{addr.fullName}</p>
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                <p>{addr.country}</p>
                <div className="address-card__actions">
                  <button className="btn btn--outline" onClick={() => toast.info('Edit coming soon')}><FiEdit size={14} /> Edit</button>
                  <button className="btn btn--outline" onClick={() => { dispatch(deleteAddress(addr._id)); toast.success('Address deleted'); }}><FiTrash2 size={14} /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';

export default function Settings() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('store');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    storeName: 'BloomHerbs',
    storeEmail: 'support@bloomherbs.com',
    storePhone: '+91 98765 43210',
    storeAddress: '123 Green Street, Chennai, India',
    currency: 'USD',
    taxRate: '5',
    shippingMinOrder: '500',
    shippingFee: '50',
    razorpayKey: 'rzp_test_xxxxxxxx',
    smtpHost: 'smtp.gmail.com',
    smtpEmail: 'noreply@bloomherbs.com',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(/* saveSettings thunk */ { type: 'placeholder' });
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title="Settings" description="Manage BloomHerbs store settings." />
      <div className="admin-page settings-page">
        <h1>Settings</h1>
        <div className="settings-layout">
          <div className="settings-tabs">
            {['store', 'tax', 'shipping', 'payment', 'email', 'profile'].map((tab) => (
              <button key={tab} className={`settings-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'store' && 'Store Information'}
                {tab === 'tax' && 'Tax Settings'}
                {tab === 'shipping' && 'Shipping Settings'}
                {tab === 'payment' && 'Payment Settings'}
                {tab === 'email' && 'Email Settings'}
                {tab === 'profile' && 'Admin Profile'}
              </button>
            ))}
          </div>
          <form className="settings-content" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {activeTab === 'store' && (
              <div className="settings-section">
                <h3>Store Information</h3>
                <div className="form-row">
                  <div className="form-group"><label>Store Name</label><input value={form.storeName} onChange={(e) => update('storeName', e.target.value)} /></div>
                  <div className="form-group"><label>Store Email</label><input type="email" value={form.storeEmail} onChange={(e) => update('storeEmail', e.target.value)} /></div>
                </div>
                <div className="form-group"><label>Store Phone</label><input value={form.storePhone} onChange={(e) => update('storePhone', e.target.value)} /></div>
                <div className="form-group"><label>Store Address</label><textarea rows="3" value={form.storeAddress} onChange={(e) => update('storeAddress', e.target.value)} /></div>
                <div className="form-group"><label>Currency</label><select value={form.currency} onChange={(e) => update('currency', e.target.value)}><option value="USD">USD ($)</option><option value="INR">INR (₹)</option><option value="EUR">EUR (€)</option></select></div>
              </div>
            )}
            {activeTab === 'tax' && (
              <div className="settings-section">
                <h3>Tax Settings</h3>
                <div className="form-group"><label>Default Tax Rate (%)</label><input type="number" value={form.taxRate} onChange={(e) => update('taxRate', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="settings-section">
                <h3>Shipping Settings</h3>
                <div className="form-group"><label>Free Shipping Minimum Order ($)</label><input type="number" value={form.shippingMinOrder} onChange={(e) => update('shippingMinOrder', e.target.value)} /></div>
                <div className="form-group"><label>Default Shipping Fee ($)</label><input type="number" value={form.shippingFee} onChange={(e) => update('shippingFee', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'payment' && (
              <div className="settings-section">
                <h3>Payment Settings</h3>
                <div className="form-group"><label>Razorpay Key ID</label><input value={form.razorpayKey} onChange={(e) => update('razorpayKey', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'email' && (
              <div className="settings-section">
                <h3>Email Settings</h3>
                <div className="form-group"><label>SMTP Host</label><input value={form.smtpHost} onChange={(e) => update('smtpHost', e.target.value)} /></div>
                <div className="form-group"><label>SMTP Email</label><input type="email" value={form.smtpEmail} onChange={(e) => update('smtpEmail', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h3>Admin Profile</h3>
                <div className="form-group"><label>Name</label><input defaultValue="Admin User" /></div>
                <div className="form-group"><label>Email</label><input type="email" defaultValue="admin@bloomherbs.com" /></div>
                <div className="form-group"><label>Current Password</label><input type="password" placeholder="Enter current password" /></div>
                <div className="form-group"><label>New Password</label><input type="password" placeholder="Enter new password" /></div>
              </div>
            )}
            <div className="settings-actions">
              <button type="submit" className="btn btn--primary" disabled={saving}><FiSave size={16} /> {saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

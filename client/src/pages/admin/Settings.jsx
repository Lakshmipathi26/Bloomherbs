import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('store');
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

  const tabs = [
    { id: 'store', label: 'Store Information' },
    { id: 'tax', label: 'Tax Settings' },
    { id: 'shipping', label: 'Shipping Settings' },
    { id: 'payment', label: 'Payment Settings' },
    { id: 'email', label: 'Email Settings' },
    { id: 'profile', label: 'Admin Profile' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <SEO title="Settings" description="Manage BloomHerbs store settings." />
      <div className="admin-page settings-page">
        <h1>Settings</h1>
        <div className="settings-layout">
          <div className="settings-tabs">
            {tabs.map((tab) => (
              <button key={tab.id} className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <form className="settings-content" onSubmit={handleSubmit}>
            {activeTab === 'store' && (
              <div className="settings-section">
                <h3>Store Information</h3>
                <div className="form-row">
                  <div className="form-group"><label>Store Name</label><input value={form.storeName} onChange={(e) => updateField('storeName', e.target.value)} /></div>
                  <div className="form-group"><label>Store Email</label><input type="email" value={form.storeEmail} onChange={(e) => updateField('storeEmail', e.target.value)} /></div>
                </div>
                <div className="form-group"><label>Store Phone</label><input value={form.storePhone} onChange={(e) => updateField('storePhone', e.target.value)} /></div>
                <div className="form-group"><label>Store Address</label><textarea rows="3" value={form.storeAddress} onChange={(e) => updateField('storeAddress', e.target.value)} /></div>
                <div className="form-group"><label>Currency</label><select value={form.currency} onChange={(e) => updateField('currency', e.target.value)}><option value="USD">USD ($)</option><option value="INR">INR (₹)</option><option value="EUR">EUR (€)</option></select></div>
              </div>
            )}
            {activeTab === 'tax' && (
              <div className="settings-section">
                <h3>Tax Settings</h3>
                <div className="form-group"><label>Default Tax Rate (%)</label><input type="number" value={form.taxRate} onChange={(e) => updateField('taxRate', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="settings-section">
                <h3>Shipping Settings</h3>
                <div className="form-group"><label>Free Shipping Minimum Order ($)</label><input type="number" value={form.shippingMinOrder} onChange={(e) => updateField('shippingMinOrder', e.target.value)} /></div>
                <div className="form-group"><label>Default Shipping Fee ($)</label><input type="number" value={form.shippingFee} onChange={(e) => updateField('shippingFee', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'payment' && (
              <div className="settings-section">
                <h3>Payment Settings</h3>
                <div className="form-group"><label>Razorpay Key ID</label><input value={form.razorpayKey} onChange={(e) => updateField('razorpayKey', e.target.value)} /></div>
              </div>
            )}
            {activeTab === 'email' && (
              <div className="settings-section">
                <h3>Email Settings</h3>
                <div className="form-group"><label>SMTP Host</label><input value={form.smtpHost} onChange={(e) => updateField('smtpHost', e.target.value)} /></div>
                <div className="form-group"><label>SMTP Email</label><input type="email" value={form.smtpEmail} onChange={(e) => updateField('smtpEmail', e.target.value)} /></div>
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
              <button type="submit" className="btn btn--primary"><FiSave size={16} /> Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

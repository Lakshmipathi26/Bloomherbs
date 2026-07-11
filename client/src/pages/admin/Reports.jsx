import { useState } from 'react';
import { FiDownload, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-06-30');
  const [reportType, setReportType] = useState('orders');

  const handleExport = (type) => {
    toast.info(`Exporting ${type} report...`);
  };

  return (
    <>
      <SEO title="Reports" description="Export BloomHerbs business reports." />
      <div className="admin-page reports-page">
        <h1>Reports</h1>

        <div className="reports-filters">
          <div className="filter-group">
            <label>From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="orders">Orders</option>
              <option value="users">Users</option>
              <option value="products">Products</option>
            </select>
          </div>
          <button className="btn btn--primary" onClick={() => handleExport(reportType)}>
            <FiDownload size={16} /> Export
          </button>
        </div>

        <div className="reports-grid">
          <div className="report-card">
            <div className="report-card__icon"><FiDownload size={24} /></div>
            <h3>Orders Report</h3>
            <p>Complete order history with customer details, totals, and status.</p>
            <button className="btn btn--outline" onClick={() => handleExport('orders')}>Export Orders</button>
          </div>
          <div className="report-card">
            <div className="report-card__icon"><FiUsers size={24} /></div>
            <h3>Customers Report</h3>
            <p>Customer list with join dates, order counts, and spend.</p>
            <button className="btn btn--outline" onClick={() => handleExport('users')}>Export Customers</button>
          </div>
          <div className="report-card">
            <div className="report-card__icon"><FiPackage size={24} /></div>
            <h3>Products Report</h3>
            <p>Product catalog with stock levels, pricing, and sales data.</p>
            <button className="btn btn--outline" onClick={() => handleExport('products')}>Export Products</button>
          </div>
        </div>
      </div>
    </>
  );
}

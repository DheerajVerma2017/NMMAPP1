import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as XLSX from 'xlsx';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 11)));
  const [endDate, setEndDate] = useState(new Date());
  const [hoveredBar, setHoveredBar] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app you would fetch from your API
        const months = [
          'April', 'May', 'June', 'July', 'August', 'September',
          'October', 'November', 'December', 'January', 'February', 'March'
        ];
        
        const mockData = months.map((month, index) => ({
          month,
          value: 700000 - (index * 50000),
          sales: Math.floor(Math.random() * 200000) + 300000,
          purchases: Math.floor(Math.random() * 150000) + 200000
        }));
        
        setChartData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Re-fetch when dates change

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData.map(item => ({
      Month: item.month,
      Sales: item.sales,
      Purchases: item.purchases,
      Total: item.value
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseSalesData");
    XLSX.writeFile(wb, "PurchaseSalesReport.xlsx");
  };

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map(item => Math.max(item.value, item.sales, item.purchases)));

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="dashboard-title text-center mb-4">Purchase - Sales Dashboard</h1>
          
          {/* Date Range Selectors */}
          <h2 className="date-range-title h5 mb-3">Select Date Range</h2>
          <div className="date-range-selector d-flex flex-wrap align-items-center justify-content-center gap-3 mb-4">
            <div className="date-picker-group d-flex align-items-center gap-2">
              <label className="fw-bold">From:</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="form-control"
              />
            </div>
            <div className="date-picker-group d-flex align-items-center gap-2">
              <label className="fw-bold">To:</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="form-control"
              />
            </div>
            <button className="btn btn-success" onClick={exportToExcel}>
              Export to Excel
            </button>
          </div>
          
          {/* Chart Section */}
          <div className="chart-section mb-4">
            <h2 className="h5 mb-3">Purchase - Sales Analysis</h2>
            {loading ? (
              <div className="chart-loading">
                <div className="spinner"></div>
                <p>Loading chart data...</p>
              </div>
            ) : (
              <>
                <div className="chart-container">
                  <div className="chart-bars">
                    {chartData.map((item, index) => (
                      <div key={index} className="chart-bar-group">
                        <div 
                          className="chart-bar sales-bar"
                          style={{ height: `${(item.sales / maxValue) * 100}%` }}
                          onMouseEnter={() => setHoveredBar({ type: 'sales', ...item })}
                          onMouseLeave={() => setHoveredBar(null)}
                        ></div>
                        <div 
                          className="chart-bar purchases-bar"
                          style={{ height: `${(item.purchases / maxValue) * 100}%` }}
                          onMouseEnter={() => setHoveredBar({ type: 'purchases', ...item })}
                          onMouseLeave={() => setHoveredBar(null)}
                        ></div>
                        <div className="chart-month">{item.month}</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-y-axis">
                    {[ 0 , 100000, 200000, 300000, 400000, 500000, 600000, 700000].map((value) => (
                      <div key={value} className="y-axis-label">{value.toLocaleString()}</div>
                    ))}
                  </div>
                </div>
                
                {/* Tooltip */}
                {hoveredBar && (
                  <div 
                    className="chart-tooltip"
                    style={{
                      left: `${hoveredBar.index * (100 / chartData.length) + (50 / chartData.length)}%`
                    }}
                  >
                    <strong>{hoveredBar.month}</strong>
                    <div>{hoveredBar.type === 'sales' ? 'Sales' : 'Purchases'}: {hoveredBar[hoveredBar.type].toLocaleString()}</div>
                    <div>Total: {hoveredBar.value.toLocaleString()}</div>
                  </div>
                )}
                
                {/* Legend */}
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color sales-legend"></div>
                    <span>Sales</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color purchases-legend"></div>
                    <span>Purchases</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Buying Stock Items Section */}
          <div className="stock-section mb-4">
            <h2 className="h5 mb-3">Buying Stock Items</h2>
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-striped stock-table">
                <thead>
                  <tr>
                    <th>Low Stock Items</th>
                    <th>Guy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: 'ST TRACK SUITS', value: 10 },
                    { item: 'COURDUROY JACKETS', value: 1 },
                    { item: 'WRANGLER JACKETS', value: 6 },
                    { item: 'LU - Track Suits', value: 1 },
                    { item: 'T-Shirt Sale 199', value: -30 },
                    { item: 'T-SHIRT SALE 149', value: -10 },
                    { item: 'ST UPPER COLUM', value: -8 }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td>{row.item}</td>
                      <td className={row.value < 0 ? 'negative' : ''}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <hr className="dashboard-divider my-4" />
          <div className="dashboard-buttons d-flex gap-2 justify-content-center">
            <button className="btn btn-primary" onClick={() => navigate('/company')}>
              <i className="fas fa-building me-2"></i>Go to Company
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/login')}>
              <i className="fas fa-sign-in-alt me-2"></i>Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default DashboardPage;
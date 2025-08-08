import barcode from '../../assets/barcode.webp'
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import './Billprint.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Billprint = () => {
  return (
    <>
      <div className='nav-container d-flex flex-wrap justify-content-around bg-light p-2 mb-3 border'>
        <a href="#" className="nav-link">GST No.</a>
        <a href="#" className="nav-link">Address</a>
        <a href="#" className="nav-link">Discount</a>
        <a href="#" className="nav-link">Texable</a>
        <div className='taxes d-flex'>
          <a href="#" className="nav-link">IGST</a>
          <a href="#" className="nav-link">SGST</a>
        </div>
        <a href="#" className="nav-link">CESS</a>
        <a href="#" className="nav-link">Less</a>
        <a href="#" className="nav-link">Total</a>
        <a href="#" className="nav-link">Mode</a>
      </div>

      <div className="billContainer container border rounded p-4 bg-white shadow">
        {/* Action buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button className="btn btn-success"><i className="fas fa-file-excel me-1"></i>Export Excel</button>
          <button className="btn btn-primary"><i className="fas fa-file-pdf me-1"></i>Export PDF</button>
          <button className="btn btn-warning text-white"><i className="fas fa-print me-1"></i>Print</button>
          <button className="btn btn-secondary"><i className="fas fa-edit me-1"></i>Edit</button>
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-primary display-6 fw-bold">N</h1>
          <p className="fw-bold mb-1 fs-5">Noida Mini Mart</p>
          <p className="mb-1">09BHGPV3264H1ZX</p>
          <p className="mb-1">1-4 Sector-22 Noida</p>
          <p className="mb-1">Mobile: +91 9599954015</p>
          <p className="fw-semibold text-uppercase">(Tax Invoice)</p>
        </div>

        {/* Bill To Section */}
        <div className="row mb-3">
          <div className="col">
            <p className="mb-1"><strong>To:</strong> Mr Garvit</p>
            <p className="mb-0"><strong>Mob:</strong> 7835886111</p>
          </div>
          <div className="col text-end">
            <p className="mb-1"><strong>Bill No:</strong> 3366</p>
            <p className="mb-0"><strong>Date:</strong> 11-05-2025</p>
          </div>
        </div>

        <hr />

        {/* Product Header */}
        <div className="row fw-bold border-bottom pb-2 mb-2">
          <div className="col-5">Sr Product</div>
          <div className="col text-center">Qty</div>
          <div className="col text-center">MRP</div>
          <div className="col text-center">Rate</div>
          <div className="col text-end">Amt</div>
        </div>

        {/* Product Rows */}
        {[{
          id: 1,
          name: "FM MEN COTTON, Pcs",
          disc: 1503,
          qty: 1,
          mrp: 2049,
          rate: 599,
          amt: 599
        }, {
          id: 2,
          name: "LOWER SALE 499, Pcs",
          disc: 1503,
          qty: 1,
          mrp: 2049,
          rate: 599,
          amt: 599
        }].map(item => (
          <div key={item.id} className="mb-3 border-bottom pb-2">
            <div className="row">
              <div className="col-5">
                {item.id}. {item.name}
                <br />
                <small>Disc: {item.disc}</small>
              </div>
              <div className="col text-center">{item.qty}</div>
              <div className="col text-center">{item.mrp}</div>
              <div className="col text-center">{item.rate}</div>
              <div className="col text-end">{item.amt}</div>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="fw-bold"><u>Total</u></p>
          <p className="fw-bold">2</p>
        </div>
        <div className="text-end mb-3">
          <p className="fs-3 fw-bold mb-1">11,98.00</p>
          <p className="mb-0">Paid by UPI: 11,98.00</p>
        </div>

        {/* Summary */}
        <div className="border p-3 rounded mb-3 bg-light">
          <p className="mb-1">MRP Total: 4,098</p>
          <p className="mb-1">Bill Total: 11,98</p>
          <p className="mb-1">Total Discount: 0</p>
          <p className="mb-0">Time: 09:22 PM</p>
        </div>

        {/* Notes */}
        <div className="mb-3">
          <p className="mb-1">1. Goods sold can be replaced within 3 days.</p>
          <p className="mb-0">2. The items must be in their original condition and packaging.</p>
        </div>

        <hr />

        {/* Barcode & Footer */}
        <div className="text-center">
          <p>Operator: ADMIN</p>
          <img src={barcode} alt="barcode" className="img-fluid mb-2" />
          <p><strong>***Thank You***</strong><br />Visit Again</p>
        </div>

        {/* Navigation Buttons */}
        <div className="text-center mt-3">
          <Link to="/company" className="btn btn-outline-primary me-2">Go to Company</Link>
          <Link to="/Login" className="btn btn-outline-dark">Go to Login</Link>
        </div>
      </div>

    </>
  );
};

// BarcodeGenerator component (unchanged but reusable if you use JsBarcode)
function BarcodeGenerator({ text }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && text) {
      try {
        JsBarcode(svgRef.current, text, {
          format: "CODE128",
          lineColor: "#000",
          width: 2,
          height: 100,
          displayValue: true,
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  }, [text]);

  return (
    <div className="barcode-container text-center">
      <svg ref={svgRef}></svg>
    </div>
  );
}

import React from 'react';
import "./ServiceList.css"
import photo1 from "./photo1.png";

function ServiceList() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#fff' }}>
      <div style={{ flex: '1', border: '1px solid black', padding: '10px', textAlign: 'left', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>
          <h2 style={{ textAlign: 'left', marginLeft: "20px", marginTop: "15px"  }}>Area</h2>
          <ul style={{ listStyleType: 'none', margin: 10, padding: 0 }}>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>London</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>Southampton</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>Bath</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>All</li>
            {/* More items */}
          </ul>
        </div>
        <div>
          <h2 style={{ textAlign: 'left', marginLeft: "20px", marginTop: "25px" }}>Release Date</h2>
          <ul style={{ listStyleType: 'none', margin: 10, padding: 0 }}>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>Today</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>This week</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>This month</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>This year</li>
            <li style={{ marginTop: "5px", marginLeft: "40px" }}>All</li>
            {/* More items */}
          </ul>
        </div>
      </div>
      <div style={{ flex: '6', display: 'flex', flexWrap: 'wrap', border: '1px solid black', overflowY: 'scroll' }} className="service-list-container">
        {[...Array(20)].map((_, index) => (
          <div key={index} style={{ flex: '1 0 25%', padding: '10px', textAlign: 'center' }}>
            <img src={photo1} alt={`Product ${index+1}`} style={{ maxWidth: '100%' }} />
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p>Seller</p>
              <h3>Product Name</h3>
              <p>Price</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ marginRight: '5px'}}>★★★★★</p>
                <p>(10)</p> {/* 评价数量 */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: '1', border: '1px solid black', padding: '10px', textAlign: 'left', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'left', marginLeft: "15px", marginTop: "15px" }}>Sorted by</h2>
        <ul style={{ listStyleType: 'none', margin: 10, padding: 0 }}>
          <li style={{ marginTop: "5px", marginLeft: "35px" }}>Recommended</li>
          <li style={{ marginTop: "5px", marginLeft: "35px" }}>Recent</li>
          <li style={{ marginTop: "5px", marginLeft: "35px" }}>Price(low to high)</li>
          <li style={{ marginTop: "5px", marginLeft: "35px" }}>Price(high to low)</li>
        </ul>
      </div>
    </div>
  );
}

export default ServiceList;


import React from 'react';  
import './projet.css'
function Home() {  
  return (  
    <div className="home-container">  
      <div className="home-details">
        <div className="home-recentOrders">
          <div className="home-cardHeader">
            <h2>Projects</h2>
            <a href="#" className="home-btn">New Project</a>
          </div>

          <table className="home-table">
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td><span className="home-status home-delivered">Delivered</span></td>
              </tr>

              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td><span className="home-status home-pending">Pending</span></td>
              </tr>

              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td><span className="home-status home-return">Return</span></td>
              </tr>

              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td><span className="home-status home-inProgress">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
    </div>  
  );  
}  

export default Home;  

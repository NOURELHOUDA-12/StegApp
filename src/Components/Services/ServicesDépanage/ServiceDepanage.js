import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import styles from '../../ReclamationStyle'
function AdminApp() {
  const navigate = useNavigate();

  const handleAdminActionClick = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.adminHeader}>
        <div style={styles.logo}>
       
                    <img src={'/assets/imgs/STEG (2).png'} alt="My STEG Logo" style={styles.logoImageStyle} />
               
        </div>
        <h1 style={styles.adminTitle}>Service dépannage </h1>
        <nav style={styles.adminNav}>
          <a href="/ServiceDepannage/ReclamationDepanage" style={styles.adminNavLink}>Réclamation</a>
          
          <a href="/ServiceDepannage/ReclamationDepanage" style={styles.adminNavLink}>Rendez_vous</a>
          <button onClick={() => navigate('/')} style={styles.adminNavLink}>Se déconnecter</button>
        </nav>
      </div>

      <div className="content-area">
                    <Outlet />
                </div>
      {/* Footer */}
      <div style={styles.adminFooter}>
        <p style={styles.adminFooterText}>© 2025 Administration STEG. Tous droits réservés.</p>
      </div>
    </div>
  );
}


export default AdminApp;
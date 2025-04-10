import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminApp() {
  const navigate = useNavigate();

  const handleAdminActionClick = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>


      {/* Main Content */}
      <div style={styles.adminContent}>
        <h2 style={styles.sectionTitle}>Actions Rapides</h2>
        <div style={styles.adminActions}>
          <button style={styles.adminActionButton} onClick={() => handleAdminActionClick('/admin/users/add')}>Ajouter un Utilisateur</button>
          <button style={styles.adminActionButton} onClick={() => handleAdminActionClick('/AgentPage/ListeReclamation')}>Voir les Nouvelles Réclamations</button>
          <button style={styles.adminActionButton} onClick={() => handleAdminActionClick('/admin/billing/generate')}>Générer les Factures</button>
          <button style={styles.adminActionButton} onClick={() => handleAdminActionClick('/admin/meters/add')}>Ajouter un Compteur</button>
        </div>

        <h2 style={styles.sectionTitle}>Statistiques</h2>
        <div style={styles.adminStats}>
          <div style={styles.statCard}>
            <h3>Utilisateurs Actifs</h3>
            <p>1250</p>
          </div>
          <div style={styles.statCard}>
            <h3>Nouvelles Réclamations</h3>
            <p>35</p>
          </div>
          <div style={styles.statCard}>
            <h3>Factures Impayées</h3>
            <p>87</p>
          </div>
        </div>
      </div>

    
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#e9ecef',
    color: '#495057',
  },
  adminHeader: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  logo: {
    fontSize: '0.4rem',
  },
  logoImageStyle: {
    height: '60px', // Adjust the height as needed
    // You can add more styles here to control the image size and appearance
},
  adminTitle: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  adminNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
  },
  adminNavLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  adminContent: {
    flexGrow: 1,
    padding: '30px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#343a40',
    marginBottom: '20px',
    borderBottom: '2px solid #343a40',
    paddingBottom: '10px',
  },
  adminActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  adminActionButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  adminStats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '250px',
    textAlign: 'center',
  },
  statCardH3: {
    fontSize: '1.5rem',
    color: '#343a40',
    marginBottom: '10px',
  },
  statCardP: {
    fontSize: '1.2rem',
    color: '#6c757d',
    fontWeight: 'bold',
  },
  adminFooter: {
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '15px',
    textAlign: 'center',
  },
  adminFooterText: {
    fontSize: '0.9rem',
  },
  // Responsive adjustments
  '@media (max-width: 768px)': {
    adminHeader: {
      alignItems: 'stretch',
    },
    adminNav: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    adminNavLink: {
      margin: '5px 0',
    },
    adminActions: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    statCard: {
      width: '100%',
    },
  },
};

export default AdminApp;
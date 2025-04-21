import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";

function App() {
    const navigate = useNavigate()

    const handleCardClick = (route) => {
        navigate(route);
    };
    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.logo}>
                    <img src={'/assets/imgs/STEG (2).png'} alt="My STEG Logo" style={styles.logoImageStyle} />
                </div>
                <nav style={styles.nav}>
                    <a href="#" style={styles.navLink} onClick={() => handleCardClick('/HomePage/FirstPage')}>Accueil</a>
                    <a href="#" style={styles.navLink}>Actualités</a>
                    <a href="#" style={styles.navLink}>Rendez-vous</a>
                    <a href="#" style={styles.navLink}>Contact</a>
                    <a href="#" style={styles.navLink}>Satisfaction</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="content-area">
                    <Outlet />
                </div>
         

            {/* Footer */}
            <div style={styles.footer}>
                <p style={styles.footerText}>© 2025 My STEG. Tous droits réservés.</p>
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
        backgroundColor: '#f0f0f0',
        color: '#333',
        padding: '0 20px',
    },
    header: {
        backgroundColor: '#004481',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    logo: {
        marginBottom: '10px',
    },
    logoImageStyle: {
        height: '60px', // Adjust the height as needed
        // You can add more styles here to control the image size and appearance
    },
    nav: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        marginLeft: '20px',
        marginBottom: '10px',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '30px',
        color: '#004481',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#004481',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '5px',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        marginBottom: '15px',
        width: '100%',
        maxWidth: '300px',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#004481',
        color: '#fff',
        padding: '15px',
        textAlign: 'center',
    },
    footerText: {
        fontSize: '0.9rem',
    },
    '@media (max-width: 768px)': {
        header: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        navLink: {
            marginLeft: '0',
            marginRight: '15px',
        },
    },
    '@media (max-width: 480px)': {
        navLink: {
            fontSize: '0.9rem',
        },
    },
};

export default App;
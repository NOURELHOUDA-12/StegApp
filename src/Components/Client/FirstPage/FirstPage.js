import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate()

    const handleCardClick = (route) => {
        navigate(route);
    };
    return (
        <div style={styles.container}>
         
            <div style={styles.content}>
                <h2 style={styles.title}>Bienvenue dans votre espace</h2>
                <button style={styles.button} onClick={() => handleCardClick('/HomePage/Messages')}>Boite de réception</button>

                <button style={styles.button} onClick={() => handleCardClick('/HomePage/Réclamation')}>Réclamation</button>
                <button style={styles.button} onClick={() => handleCardClick('/HomePage/AutoReleve')}>Autorelevé</button>
                <button style={styles.button}onClick={() => handleCardClick('/HomePage/Facture')}>Payer la facture</button>
                <button style={styles.button}onClick={() => handleCardClick('/HomePage/RDV')}>Passer RDV</button>

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
        marginBottom: '50px',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center', // Consider keeping this or using flex-start
        
        padding: '70px 20px 0px 20px ',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '30px',
        marginTop: '20', // Added this line
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
        maxWidth: '1000px',
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
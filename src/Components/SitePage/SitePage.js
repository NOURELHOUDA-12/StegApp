

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import './STEGHomePage.css'

function App() {
  const navigate = useNavigate()
  // const videoUrl1 = "https://www.youtube.com/embed/7dc07PvvaWA?si=DBspSDDDflIx1ik5"
  const videoUrl1 ="https://www.youtube.com/embed/Ny-P9eNSGq0?si=KmaeygAm4ew_Js7g" 
  const videoUrl2="https://www.youtube.com/embed/zDZWzwdjxZ8?si=YzJ1KafGqlbrD8gm"
   const videoUrl3="https://www.youtube.com/embed/tzHrvTC4E_8?si=nVNE0x2nQmxf_0f2" 
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPdfVisible, setIsPdfVisible] = useState(false);

  const imagePath = '/assets/imgs/charte_citoyene.png';
  const pdfPath = '/assets/imgs/steg.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
 const handleViewPdf = () => {
    // Remplacez 'chemin/vers/votre/fichier.pdf' par le chemin réel de votre PDF
    // Assurez-vous que le fichier PDF est accessible publiquement (par exemple, dans le dossier 'public' de votre projet React)
    window.open('/assets/imgs/steg.pdf', '_blank');
  };

  function handleImageClick() {
    setIsPdfVisible(true);
  }

  function handleClosePdf() {
    setIsPdfVisible(false);
  }
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
          <a href="#" style={styles.navLink} onClick={() => handleCardClick('/')}>Accueil</a>
          <a href="#" style={styles.navLink}onClick={() => handleCardClick('/Contactez_nous')}>Satisfaction</a>
          <a href="#" style={styles.navLink} onClick={() => handleCardClick('/Contactez_nous')}>Contact</a>
          <a href="#" style={styles.navLink}onClick={() => handleCardClick('/Login')}>Espace client</a>
          <a href="#" style={styles.navLink}onClick={() => handleCardClick('/LoginAdministration')}>Espace administrateur</a>
             <a href="#" style={styles.navLink}onClick={() => handleCardClick('/PDF')}>PDF</a>
        </nav>
      </div>
      
      <div className="steg-homepage-container">


        <img
          src={imagePath}
          alt="Click to view PDF"
          style={{ cursor: 'pointer', maxWidth: '200px', maxHeight: '100px', width: 'auto', height: 'auto', direction: 'rtl' }}

          onClick={handleViewPdf}
        />

        {isPdfVisible && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', height: '80%', position: 'relative' }}>
              <button style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={handleClosePdf}>
                Fermer
              </button>
              <Document
                file={pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Chargement du PDF..."
              >
                <Page pageNumber={pageNumber} width={window.innerWidth * 0.7} />
              </Document>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Page {pageNumber} sur {numPages}
              </p>
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={() => setPageNumber(pageNumber - 1)}
                  style={{ marginRight: '10px' }}
                >
                  Précédent
                </button>
                <button
                  type="button"
                  disabled={pageNumber >= numPages}
                  onClick={() => setPageNumber(pageNumber + 1)}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}

       

        <section id="videos" className="videos-section">
          <h2>Actualités</h2>
          <div className="videos-grid">
            <div className="video-card embedded-video">
              {videoUrl1 ? (
                <iframe
                  width="100%"
                  height="315"
                  src={videoUrl1}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={'/assets/imgs/videoplaceholder.jpeg'} alt="Video Placeholder" style={{ width: '100%', display: 'block' }} />
              )}
              <h3>كيفاش تعمل تسجيل في موقع STEG بكل سهولة
              </h3>
            </div>

            <div className="video-card embedded-video">
              {videoUrl2 ? (
                <iframe
                  width="100%"
                  height="315"
                  src={videoUrl2}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={'/assets/imgs/videoplaceholder.jpeg'} alt="Video Placeholder" style={{ width: '100%', display: 'block' }} />
              )}
              <h3>استعدادات الشركة لصائفة 2024

              </h3>
            </div>
            {/* Add more video cards with embedded videos as needed */}

            <div className="video-card embedded-video">
              {videoUrl3 ? (
                <iframe
                  width="100%"
                  height="315"
                  src={videoUrl3}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={'/assets/imgs/videoplaceholder.jpeg'} alt="Video Placeholder" style={{ width: '100%', display: 'block' }} />
              )}
              <h3>نضام الفوترة
              </h3>
            </div>
          </div>
        </section>

        
      </div> 



      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}><p>&copy; {new Date().getFullYear()} STEG - Société Tunisienne de l'Electricité et du Gaz</p></p>
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
    height: '60px',  //
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
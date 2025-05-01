import React,{useState } from 'react';
import './STEGHomePage.css'; 
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const STEGHomePage = () => {
    const videoUrl1 = "https://www.youtube.com/embed/7dc07PvvaWA?si=DBspSDDDflIx1ik5"  
    const navigate = useNavigate()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isPdfVisible, setIsPdfVisible] = useState(false);
  
    // Replace with the actual path to your image and PDF file
    const imagePath = '/assets/imgs/charte_citoyene.png';
    const pdfPath = '/assets/imgs/steg.pdf';

   
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

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
    <div className="steg-homepage-container">
      <header className="steg-header">
        <div className="logo">
          <img src="/assets/imgs/STEG (2).png" alt="STEG Logo" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#annonces">Actualité</a></li>
            <li><a href="#videos">Satisfaction </a></li>
            <li><a href="#videos">Contact </a></li>
     
            <li><a  onClick={() => handleCardClick('/Login')}>Espace client </a></li>
            <li><a onClick={() => handleCardClick('/LoginAdministration')}>Espace administrateur </a></li>
          </ul>
        </nav>
      </header>

      <img
        src={imagePath}
        alt="Click to view PDF"
       style={{ cursor: 'pointer', maxWidth: '200px', maxHeight: '100px', width: 'auto', height: 'auto',direction:'rtl' }}

        onClick={handleImageClick}
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
 
      <section id="annonces" className="announcements-section">
        <h2>Annonces Importantes</h2>
        <div className="announcements-grid">
          <div className="announcement-card">
            <img src={'/assets/imgs/coupure.jpeg'} alt="Annonce 1" />
            <div className="announcement-details">
              <h3>Coupure de couront le 13 mai</h3>
              <p>a cause la température élevé</p>
              <a href="/annonce/1" className="read-more-link">Lire Plus</a>
            </div>
          </div>
          <div className="announcement-card">
            <img src={'/assets/imgs/greve.jpeg'} alt="Annonce 2" />
            <div className="announcement-details">
              <h3>Gréve</h3>
              <p>pour appliquer la loi AAA</p>
              <a href="/annonce/2" className="read-more-link">Lire Plus</a>
            </div>
          </div>
          {/* Add more announcement cards here */}
        </div>
      </section>

      <section id="videos" className="videos-section">
        <h2>Vidéos Utiles</h2>
        <div className="videos-grid">
          <div className="video-card embedded-video">
            {videoUrl1 ? (
              <iframe
                width="100%"
                height="315" // Adjust height as needed
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
            <p>Description courte de la vidéo 1 provenant d'une URL.</p>
          </div>
          {/* Add more video cards with embedded videos as needed */}
        </div>
      </section>

      <footer className="steg-footer">
        <p>&copy; {new Date().getFullYear()} STEG - Société Tunisienne de l'Electricité et du Gaz</p>
        {/* Add other footer information like contact details, social media links, etc. */}
      </footer>
    </div>
  );
};

export default STEGHomePage;
import React from 'react';
import './STEGHomePage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
// import Video1 from '../../assets/videos/video1.mp4'; // Example video path

const STEGHomePage = () => {
    const videoUrl1 = "https://www.youtube.com/embed/7dc07PvvaWA?si=DBspSDDDflIx1ik5"  
    const navigate = useNavigate()

    const handleCardClick = (route) => {
        navigate(route);
    };
  return (
    <div className="steg-homepage-container">
      <header className="steg-header">
        <div className="logo">
          {/* Replace with the actual STEG logo */}
          <img src="/assets/imgs/STEG (2).png" alt="STEG Logo" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#annonces">Annonces</a></li>
            <li><a href="#videos">Vidéos</a></li>
     
            <li><a  onClick={() => handleCardClick('/Login')}>Nos Services</a></li>
            <li><a onClick={() => handleCardClick('/LoginAdministration')}>Administration</a></li>
          </ul>
        </nav>
      </header>

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
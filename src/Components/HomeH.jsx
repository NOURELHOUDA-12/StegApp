import React from 'react';  
import './HomeH.css';  

function StegInterface() {  
  return (  
    <div className="steg-container">  
      <header className="steg-header">  
        <div className="logo-section">  
          {/* Vous pouvez ajouter votre logo ici */}  
          <div className="logo-icon"></div>  
        </div>  
        <nav className="main-menu">  
          <ul>  
            <li><a href="#">Accueil</a></li>  
            <li><a href="#">Actualités</a></li>  
            <li><a href="#">Rendez-vous</a></li>  
            <li><a href="#">Se connecter</a></li>  
            <li><a href="#">Contact</a></li>  
          </ul>  
        </nav>  
      </header>  

      <main className="steg-main">  
        <h1>Bienvenue dans votre espace</h1>  
        
        <div className="action-buttons">  
          <button className="btn-reclamation">Réclamation</button>  
          <button className="btn-autorelevé">Autorelevé</button>  
          <button className="btn-payer-facture">Payer la facture</button>  
        </div>  
      </main>  

      <footer className="steg-footer">  
        <p>© 2025 My STEG. Tous droits réservés.</p>  
      </footer>  
    </div>  
  );  
}  

export default StegInterface;  
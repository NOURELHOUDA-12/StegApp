import React from 'react';
import './Ticket.css'; // Importez le CSS pour le composant Ticket

function Ticket({ ticketData, onClose, qrCodeImage }) {
  if (!ticketData) {
    return null;
  }

  return (
    <div className="ticket-container">
      <h2 className="ticket-heading">Ticket de Rendez-vous</h2>
      <div className="ticket-details">
        <p><strong>District :</strong> {ticketData.district}</p>
        <p><strong>Service :</strong> {ticketData.service}</p>
        <p><strong>Date :</strong> {ticketData.date}</p>
        <p><strong>Heure :</strong> {ticketData.time}</p>
        {ticketData.clienteleOption && (
          <p><strong>Guichet :</strong> {ticketData.clienteleOption}</p>
        )}
        <p><strong>Numéro de ticket :</strong> {ticketData.ticketNumber}</p>
      </div>
      <div >
       <img src={"/assets/imgs/qrCode.PNG"} alt="QR Code" style={{ width: '100px', height: '100px' }}/> 
      </div>
      <button className="close-ticket-button" onClick={onClose}>Fermer</button>
    </div>
  );
}

export default Ticket;
import React from 'react';
import './Ticket.css';

function Ticket({ ticketData, onClose }) {
  if (!ticketData) {
    return null;
  }

 
  const waitingClients = Math.floor(Math.random() * 30) + 1;

  
  const guichets = ['Gichet 1', 'Gichet 2',"gichet 3"];
  const randomGuichet = ticketData.service === 'Service Clientéle'
    ? guichets[Math.floor(Math.random() * guichets.length)]
    : ticketData.clienteleOption; 

  return (
    <div className="ticket-container">
      <h2 className="ticket-heading">Ticket de Rendez-vous</h2>
      <div className="ticket-details">
        <p><strong>District :</strong> {ticketData.district}</p>
        <p><strong>Service :</strong> {ticketData.service}</p>
        <p><strong>Date :</strong> {ticketData.date}</p>
        <p><strong>Heure :</strong> {ticketData.time}</p>
        {ticketData.service === 'Service Clientéle' && (
          <p><strong>Guichet :</strong> {randomGuichet}</p>
        )}
        {ticketData.service !== 'Service Clientéle' && ticketData.clienteleOption && (
          <p><strong>Guichet :</strong> {ticketData.clienteleOption}</p>
        )}
        <p><strong>Numéro de ticket :</strong> {ticketData.ticketNumber}</p>
        <p><strong>Clients en attente :</strong> {waitingClients}</p>
      </div>
      <img src={"/assets/imgs/qrCode.PNG"} alt="QR Code" style={{ width: '100px', height: '100px' }}/> 

      <button className="close-ticket-button" onClick={onClose}>
        Fermer
      </button>
    </div>
  );
}

export default Ticket;
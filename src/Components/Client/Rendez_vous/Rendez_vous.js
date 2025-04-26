import React, { useState, useEffect } from 'react';
import './RDV.css'; 
import Ticket from './Tiket'; 

function AppointmentForm() {
  const initialServices = ['Service dépannage', 'Service Laboratoire', 'Service Traveaux', 'Service Clientéle', 'Service gaz', 'Service Financier', 'Service Etude', 'Service dépannage'];
  const [district, setDistrict] = useState('Hammamet');
  const [service, setService] = useState(initialServices[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Initialize time as empty
  const [clienteleOption, setClienteleOption] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const districts = ["Nabeul","Grand Tunis","Bizerte","Beja","Jendouba","Siliana","Le Kef","Zaghouan","Sousse","Kairouan","Monastir","Mahdia","Sfax","Sidi Bouzid","Kasserine","Gafsa","Gabes","Tozeur","Kebili","Medenine","Tataouine"]; 
  const [services] = useState(initialServices.filter((value, index, self) => self.indexOf(value) === index)); // Remove duplicates
  const times = generateTimeSlots(); // Generate time slots between 8:00 and 17:00
  const clienteleOptions = ['Gichet 1', 'Gichet 2'];

  useEffect(() => {
    // Set a random time when the component mounts or when a new appointment is being made
    setTime(getRandomTime(times));
  }, [showTicket]); // Re-run effect when showing a new ticket (implicitly after closing)

  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
      slots.push(`${String(hour).padStart(2, '0')}:30`);
    }
    slots.push('17:00'); // Include 17:00
    return slots;
  }

  function getRandomTime(timeArray) {
    const randomIndex = Math.floor(Math.random() * timeArray.length);
    return timeArray[randomIndex];
  }

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setClienteleOption(''); // Reset clientele option when service changes
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const dayOfWeek = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    if (dayOfWeek === 0) {
      // It's a Sunday, so prevent setting the date
      alert('Les rendez-vous ne sont pas disponibles le dimanche.');
      event.target.value = ''; // Clear the input
      setDate('');
    } else {
      setDate(event.target.value);
    }
  };

  // We are no longer using the time select input, so no handler is needed

  const handleClienteleOptionChange = (event) => {
    setClienteleOption(event.target.value);
  };

  const generateTicket = () => {
    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }
    if (service === 'Service Clientéle' && !clienteleOption) {
      alert('Veuillez choisir un guichet pour le Service Clientéle.');
      return;
    }

    const generatedTicketData = {
      district: district,
      service: service,
      date: date,
      time: time,
      ...(service === 'Service Clientéle' && clienteleOption && { clienteleOption: clienteleOption }),
      ticketNumber: `STEG-${Math.floor(Math.random() * 900000 + 100000)}`, // Example ticket number
      qrCode: 'example-qr-code-data', // Replace with actual QR code data
    };

    setTicketData(generatedTicketData);
    setShowTicket(true);
  };

  const handleCloseTicket = () => {
    setShowTicket(false);
    setTicketData(null);
    setTime(getRandomTime(times)); // Set a new random time when closing the ticket
  };

  return (
    <div className="appointment-form-container">
      {!showTicket ? (
        <>
          <h2 className="form-heading">Prendre un Rendez-vous</h2>

          <div className="form-group">
            <label htmlFor="district" className="form-label">District :</label>
            <select
              id="district"
              className="form-select"
              value={district}
              onChange={handleDistrictChange}
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="service" className="form-label">Service concerné :</label>
            <select
              id="service"
              className="form-select"
              value={service}
              onChange={handleServiceChange}
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {service === 'Service Clientéle' && (
            <div className="form-group">
              <label htmlFor="clienteleOption" className="form-label">Guichet :</label>
              <select
                id="clienteleOption"
                className="form-select"
                value={clienteleOption}
                onChange={handleClienteleOptionChange}
              >
                <option value="">Sélectionner un guichet</option>
                {clienteleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="date" className="form-label">Date :</label>
            <input
              id="date"
              className="form-date-input"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="time" className="form-label">Heure :</label>
            <input
              id="time"
              className="form-input"
              type="text"
              value={time}
              readOnly 
            />
          </div> */}

          <button className="generate-ticket-button" onClick={generateTicket} disabled={service === 'Service Clientéle' && !clienteleOption || !date}>
            Générer le ticket
          </button>
        </>
      ) : (
        <Ticket ticketData={ticketData} onClose={handleCloseTicket} qrCodeImage="


" />
      )}
    </div>
  );
}

export default AppointmentForm;
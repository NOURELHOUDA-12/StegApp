import React, { useState, useEffect } from 'react';
import './RDV.css';
import Ticket from './Tiket';
import { db, auth } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function AppointmentForm() {
  const initialServices = ['Service dépannage', 'Service Laboratoire', 'Service Traveaux', 'Service Clientéle', 'Service gaz', 'Service Financier', 'Service Etude', 'Service dépannage'];
  const villes = ["Nabeul", "Grand Tunis", "Bizerte", "Beja", "Jendouba", "Siliana", "Le Kef", "Zaghouan", "Sousse", "Kairouan", "Monastir", "Mahdia", "Sfax", "Sidi Bouzid", "Kasserine", "Gafsa", "Gabes", "Tozeur", "Kebili", "Medenine", "Tataouine"];
  const districtsParVille = {
    "Nabeul": ["District Hammamet", "District Nabeul", "District Menzel Bouzelfa", "District Menzel Tmim", "Agence Bouargoub", "Agence Korba", "Agence Klebia", "Agence Haouaria", "Agence El Mida", "Agence Grombalia", "Agence Soliman", "Agence Beni Khalled"],
    "Grand Tunis": ["District Tunis Ville", "District Le Kram", "District Bardo", "District Manouba", "District Ariana", "Agence Siege Social", "Agence La Marsa", "Agence Bab Souika", "Agence Bab El Jazira", "Agence El Ouardia-Ibn-Sina", "Agence Menzeh"],
    "Bizerte": ["District Bizerte", "District Menzel Bourguiba", "Agence Ras Jebal", "Agence Utique", "Agence Mateur", "Agence Joumine", "Agence Sejnane"],
    "Beja": ["District Zaghouane", "Agence El Fahs", "Agence Nadhour", "Agence Souaf"],
    "Jendouba": [
      "District Jendouba",
      "District Tabarka",
      "Agence Bousalem",
      "Agence Ghardimaou",
      "Agence Ain Drahem",
      "Agence Fernana"
    ],
    "Siliana": ["District Seliana", "Agence Makther", "Agence Gaafour", "Agence Krib", "Agence Rouhia"],
    "Le Kef": ["District Le Kef", "Agence Dahmani", "Agence Tajerouine", "Agence Sers"],
    "Zaghouan":["District Zaghouane","Agence El Fahs","Agence Nadhour","Agence Souaf"] ,
    "Sousse": ["District Sousse Ville", "District Sousse Nord", "District Enfidha", "District Msaken"],
    "Kairouan": ["District Kairouan", "District Kairouan Nord", "Agence oueslatia", "Agence Hajeb Layoun", "Agence Haffouz", "Agence Bouhajla", "Agence Sbikha"],
    "Monastir": [
      "District Moknine",
      "District Monastir",
      "Agence Jemmel",
      "Agence Ksar Helal",
      "Agence Moknine"
    ],
    "Mahdia": ["District Mahdia", "District El Jem", "Agence Chebba", "Agence Chorbane", "Agence Souassi", "Agence Sidi Alouane"],
    "Sfax": ["District Sfax Ville", "District Sfax Nord", "District Sfax Sud", "District Jebeniana", "District Mahres", "Agence Bir Ali", "Agence Skhira", "Agence Elhencha", "Agence cité El Habib", "Agence Kerkennah", "Agence Agareb"],
    "Sidi Bouzid": [
      "District Sidi Bouzid",
      "Agence Jelma",
      "District Meknassy",
      "Agence Ouled Haffouz",
      "Agence Regueb",
      "Agence Bir El Hfey"
    ],
    "Kasserine": [
      "District Kasserine",
      "District Sbeitla",
      "Agence Tala",
      "Agence Sbiba",
      "Agence Feriana"
    ],
    "Gafsa": [
      "District Gafsa",
      "Agence Mdhila",
      "Agence Sened",
      "Agence Guettar",
      "District Metlaoui",
      "Agence Moulares",
      "Agence Redeyef"
    ],
    "Gabes": [
      "District Gabes",
      "Agence Metouia",
      "Agence El Hamma",
      "Agence Matmata",
      "Agence Mareth",
      "District Gabes Nord",
      "Agence Ghanouch"
    ],

    "Tozeur": ["District Tozeur",
      "Agence Nafta",
      "Agence Tameghza"],
    "Kebili":[
      "District Kebili",
      "Agence Douz"
    ],

    "Medenine":  [
      "District Zarzis",
      "District Mednine",
      "District Jerba",
      "Agence Beni Khedache",
      "District Ben Guerdane",
      "Agence Midoun"
    ],
    "Tataouine": [
      "District Tataouine",
      "Agence Ghomrassen",
      "Agence Remada",
      "Agence Smar",
      "Agence Tataouine Centre Ville"
    ]
  };

  const [villeSelectionnee, setVilleSelectionnee] = useState('');
  const [district, setDistrict] = useState('');
  const [services] = useState(initialServices.filter((value, index, self) => self.indexOf(value) === index));
  const [service, setService] = useState(services[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clienteleOption, setClienteleOption] = useState('');
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [districtsAffiches, setDistrictsAffiches] = useState([]);
  const times = generateTimeSlots();
  const clienteleOptions = ['Gichet 1', 'Gichet 2'];
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté, récupérez son UID
        setUserId(user.uid);
      } else {
        // L'utilisateur est déconnecté
        setUserId(null);
        console.log("Utilisateur déconnecté.");
        // Gérer la redirection ou l'affichage d'un message
      }
    });

    // Se désabonner de l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTime(getRandomTime(times));
  }, [showTicket]);

  const handleVilleChange = (event) => {
    const villeChoisie = event.target.value;
    setVilleSelectionnee(villeChoisie);
    // Mettre à jour la liste des districts en fonction de la ville choisie
    setDistrictsAffiches(districtsParVille[villeChoisie] || []);
    // Réinitialiser le district sélectionné lorsqu'on change de ville
    setDistrict('');
  };
  const generateTicket = async () => {
    if (!villeSelectionnee) {
      alert('Veuillez sélectionner une ville.');
      return;
    }
    if (!district) {
      alert('Veuillez sélectionner un district.');
      return;
    }
    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }
    if (service === 'Service Clientéle' && !clienteleOption) {
      alert('Veuillez choisir un guichet pour le Service Clientéle.');
      return;
    }


    if (!userId) {
      alert('Vous devez être connecté pour prendre un rendez-vous.');
      return;
    }

    const generatedTicketData = {
      userId: userId, // Ajouter l'ID de l'utilisateur
      ville: villeSelectionnee,
      district: district,
      service: service,
      date: date,
      time: time,
      ...(service === 'Service Clientéle' && clienteleOption && { clienteleOption: clienteleOption }),
      ticketNumber: `STEG-${Math.floor(Math.random() * 900000 + 100000)}`,
      qrCode: 'example-qr-code-data',
      createdAt: new Date() // Ajouter un timestamp
    };

    try {
      const docRef = await addDoc(collection(db, "rendezVous"), generatedTicketData);
      console.log("Document written with ID: ", docRef.id);
      setTicketData(generatedTicketData);
      setShowTicket(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Une erreur s'est produite lors de l'enregistrement du rendez-vous.");
    }
  };



  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
    setClienteleOption('');
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) {
      alert('Les rendez-vous ne sont pas disponibles le dimanche.');
      event.target.value = '';
      setDate('');
    } else {
      setDate(event.target.value);
    }
  };

  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      slots.push(`${String(hour).padStart(2, '0')}:00`);
      slots.push(`${String(hour).padStart(2, '0')}:30`);
    }
    slots.push('17:00');
    return slots;
  }

  function getRandomTime(timeArray) {
    const randomIndex = Math.floor(Math.random() * timeArray.length);
    return timeArray[randomIndex];
  }

  const handleClienteleOptionChange = (event) => {
    setClienteleOption(event.target.value);
  };



  const handleCloseTicket = () => {
    setShowTicket(false);
    setTicketData(null);
    setTime(getRandomTime(times));
  };

  return (
    <div className="appointment-form-container">
      {!showTicket ? (
        <>
          <h2 className="form-heading">Prendre un Rendez-vous</h2>

          <div className="form-group">
            <label htmlFor="ville" className="form-label">Ville :</label>
            <select
              id="ville"
              className="form-select"
              value={villeSelectionnee}
              onChange={handleVilleChange}
            >
              <option value="">Sélectionner une ville</option>
              {villes.map((ville) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
            </select>
          </div>

          {villeSelectionnee && (
            <div className="form-group">
              <label htmlFor="district" className="form-label">District :</label>
              <select
                id="district"
                className="form-select"
                value={district}
                onChange={handleDistrictChange}
                disabled={districtsAffiches.length === 0} // Désactiver si aucune ville n'est sélectionnée
              >
                <option value="">Sélectionner un district</option>
                {districtsAffiches.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {districtsAffiches.length === 0 && <p className="form-message">Veuillez sélectionner une ville pour afficher les districts.</p>}
            </div>
          )}

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


          <button
            className="generate-ticket-button"
            onClick={generateTicket}
            disabled={!villeSelectionnee || !district || (service === 'Service Clientéle' && !clienteleOption) || !date}
          >
            Générer le ticket
          </button>
        </>
      ) : (
        <Ticket ticketData={ticketData} onClose={handleCloseTicket} qrCodeImage="" />
      )}
    </div>
  );
}

export default AppointmentForm;
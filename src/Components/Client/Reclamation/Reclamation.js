import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth,db } from "../../../firebase"; 
import './rec.css';
import { useNavigate } from 'react-router-dom';

const ReclamationForm = () => {
  const [formData, setFormData] = useState({
    reference: '',
    police: '',
    refType: '',
    energyType: '',
    demande: '',
    policeType: '',
    energyTypePolice: '',
    demandePolice: '',
    selectedInput: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0)
    const [districtsAffiches, setDistrictsAffiches] = useState([]);
  
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


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputSelection = (type) => {
    setFormData(prev => ({
      ...prev,
      selectedInput: type,
      reference: type === 'reference' ? prev.reference : '',
      police: type === 'police' ? prev.police : ''
    }));
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateInputs = () => {
    if (formData.selectedInput === 'reference' && formData.reference.length !== 9) {
      setErrorMessage('La référence doit contenir 9 chiffres');
      return false;
    }
    if (formData.selectedInput === 'police' && formData.police.length !== 7) {
      setErrorMessage('La police doit contenir 7 chiffres');
      return false;
    }
    if (!formData.selectedInput) {
      setErrorMessage('Veuillez choisir entre référence ou police');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }

      const reclamationData = {
        userId: user.uid,
        userEmail: user.email || '',
        createdAt: serverTimestamp(),
        ...formData
      };

      await addDoc(collection(db, "reclamations"), reclamationData);

      setSuccessMessage('Réclamation envoyée avec succès !');
      
      // Réinitialiser le formulaire
      setFormData({
        reference: '',
        police: '',
        refType: '',
        energyType: '',
        demande: '',
        policeType: '',
        energyTypePolice: '',
        demandePolice: '',
        selectedInput: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi: ", error);
      setErrorMessage(`Erreur lors de l'envoi: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVilleChange = (event) => {
    const villeChoisie = event.target.value;
    setVilleSelectionnee(villeChoisie);
    // Mettre à jour la liste des districts en fonction de la ville choisie
    setDistrictsAffiches(districtsParVille[villeChoisie] || []);
    // Réinitialiser le district sélectionné lorsqu'on change de ville
    setDistrict('');
  };
  
  return (
    <div className="reclamation-container">
      <h1 className="reclamation-title"> Réclamation</h1>
      {errorMessage && <div className="reclamation-error-message">{errorMessage}</div>}
        {successMessage && <div className="reclamation-success-message">{successMessage}</div>}


      <form className="reclamation-form" onSubmit={handleSubmit}>
        {/* Choix du type d'identification */}
        <div className="reclamation-input-group">
          <label>Choisissez votre mode d'identification :</label>
          <div className="reclamation-radio-group">
            <label className="reclamation-radio-label">
              <input
                type="radio"
                name="selectedInput"
                checked={formData.selectedInput === 'reference'}
                onChange={() => handleInputSelection('reference')}
                className="reclamation-radio"
              /> Par Référence
            </label>
            <label className="reclamation-radio-label">
              <input
                type="radio"
                name="selectedInput"
                checked={formData.selectedInput === 'police'}
                onChange={() => handleInputSelection('police')}
                className="reclamation-radio"
              /> Par N°dossier
            </label>
          </div>
        </div>

        {/* Champ Référence */}
        {formData.selectedInput === 'reference' && (
          <div className="reclamation-input-group">
            <label htmlFor="reference">Référence (9 chiffres)</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              placeholder="Ex : 123456789"
              maxLength="9"
              className="reclamation-input"
            />
          </div>
        )}
        
        {/* Champ Police */}
        {formData.selectedInput === 'police' && (
          <div className="reclamation-input-group">
            <label htmlFor="police">n° Dossier (7 chiffres)</label>
            <input
              type="text"
              id="police"
              name="police"
              value={formData.police}
              onChange={handleInputChange}
              placeholder="Ex : 1234567"
              maxLength="7"
              className="reclamation-input"
            />
          </div>
        )}
        
        

        {/* Section Réclamation COMPLÈTE */}
        {formData.selectedInput === 'reference' && formData.reference && (

          <div className="reclamation-section">
            <div className="reclamation-input-group">
            {/* <div className="form-group">
            <label htmlFor="ville" className="form-label">Region :</label>
            <select
              id="ville"
              className="form-select"
              // value={villeSelectionnee}
              // onChange={handleVilleChange}
            >
              <option value="">Sélectionner une Region</option>
              {villes.map((ville) => (
                <option key={ville} value={ville}>
                  {ville}
                </option>
              ))}
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="ville" className="form-label">Region :</label>
            <select
              id="ville"
              className="form-select"
              value={villeSelectionnee}
              onChange={handleVilleChange}
            >
              <option value="">Sélectionner une Region</option>
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
                // onChange={handleDistrictChange}
                disabled={districtsAffiches.length === 0} // Désactiver si aucune ville n'est sélectionnée
              >
                <option value="">Sélectionner un district</option>
                {districtsAffiches.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {districtsAffiches.length === 0 && <p className="form-message">Veuillez sélectionner une Region pour afficher les districts.</p>}
            </div>
          )}




              <label htmlFor="refType">Choisissez le type de réclamation</label>
              <select
                id="refType"
                name="refType"
                value={formData.refType}
                onChange={handleInputChange}
                className="reclamation-select"
                required
              >
                <option value="Manque de courant / Gaz">Manque de courant / Gaz </option>
                <option value="Verification compteur">Verification compteur</option>
                <option value="Erreur index">Erreur index</option>
                <option value="Afficheur éteint">Afficheur éteint</option>
                <option value="Remplacement compteur">Remplacement compteur</option>
                <option value="Compteur non déplacer">Compteur non déplacer</option>
                <option value="Compteur non déplacer">Remplacement disjoncteur</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div className="reclamation-input-group">
              <label>Type de réclamation :</label>
              <div className="reclamation-radio-group">
                <label className="reclamation-radio-label">
                  <input
                    type="radio"
                    name="energyType"
                    value="Électricité"
                    checked={formData.energyType === 'Électricité'}
                    onChange={handleInputChange}
                    className="reclamation-radio"
                    required
                  /> Électricité
                </label>
                <label className="reclamation-radio-label">
                  <input
                    type="radio"
                    name="energyType"
                    value="Gaz"
                    checked={formData.energyType === 'Gaz'}
                    onChange={handleInputChange}
                    className="reclamation-radio"
                    required
                  /> Gaz
                </label>
              </div>
            </div>
            
            <div className="reclamation-input-group">
              <label htmlFor="demande">Rédiger votre demande</label>
              <textarea
                id="demande"
                name="demande"
                value={formData.demande}
                onChange={handleInputChange}
                rows="4"
                placeholder="Décrivez votre problème en détail..."
                className="reclamation-textarea"
                required
              ></textarea>
            </div>
          </div>
        )}

        {/* Section Police COMPLÈTE */}
        {formData.selectedInput === 'police' && formData.police && (
          <div className="reclamation-section">

<div className="form-group">
            <label htmlFor="ville" className="form-label">Region :</label>
            <select
              id="ville"
              className="form-select"
              value={villeSelectionnee}
              onChange={handleVilleChange}
            >
              <option value="">Sélectionner une Region</option>
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
                // onChange={handleDistrictChange}
                disabled={districtsAffiches.length === 0} // Désactiver si aucune ville n'est sélectionnée
              >
                <option value="">Sélectionner un district</option>
                {districtsAffiches.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {districtsAffiches.length === 0 && <p className="form-message">Veuillez sélectionner une Region pour afficher les districts.</p>}
            </div>
          )}

            <div className="reclamation-input-group">
              <label htmlFor="policeType">Choisissez le type de demande</label>
              <select
                id="policeType"
                name="policeType"
                value={formData.policeType}
                onChange={handleInputChange}
                className="reclamation-select"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="miseService">Mise en service Électricité ou Gaz</option>
                <option value="nouveauBranchement">Nouveaux branchements</option>
                <option value="Relance Etude">Relance Etude</option>
                <option value="Relance Travaux">Relance Travaux</option>

                <option value="autres">Autres</option>
              </select>
            </div>
            
            <div className="reclamation-input-group">
              <label>Type de réclamation :</label>
              <div className="reclamation-radio-group">
                <label className="reclamation-radio-label">
                  <input
                    type="radio"
                    name="energyTypePolice"
                    value="Électricité"
                    checked={formData.energyTypePolice === 'Électricité'}
                    onChange={handleInputChange}
                    className="reclamation-radio"
                    required
                  /> Électricité
                </label>
                <label className="reclamation-radio-label">
                  <input
                    type="radio"
                    name="energyTypePolice"
                    value="Gaz"
                    checked={formData.energyTypePolice === 'Gaz'}
                    onChange={handleInputChange}
                    className="reclamation-radio"
                    required
                  /> Gaz
                </label>
              </div>
            </div>
            
            <div className="reclamation-input-group">
              <label htmlFor="demandePolice">Rédiger votre demande</label>
              <textarea
                id="demandePolice"
                name="demandePolice"
                value={formData.demandePolice}
                onChange={handleInputChange}
                rows="4"
                placeholder="Décrivez votre demande en détail..."
                className="reclamation-textarea"
                required
              ></textarea>
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="reclamation-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Envoi en cours...
            </>
          ) : (
            'Envoyez la demande'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReclamationForm;
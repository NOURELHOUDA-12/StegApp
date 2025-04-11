import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth,db } from "../../firebase"; 
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
  const navigate=useNavigate()
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


  const listeReclamations=()=>{
    navigate("/template/AgentRéclamation")
  }
  return (
    <div className="reclamation-container">
      <h1 className="reclamation-title">Application Réclamation</h1>
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
            <label htmlFor="police">Police (7 chiffres)</label>
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
              <label htmlFor="refType">Choisissez le type de réclamation</label>
              <select
                id="refType"
                name="refType"
                value={formData.refType}
                onChange={handleInputChange}
                className="reclamation-select"
                required
              >
                <option value="">-- Sélectionnez --</option>
                <option value="Manque de courant / Gaz">Manque de courant / Gaz
                </option>
                <option value="Verification compteur">Verification compteur</option>
                <option value="Erreur index">Erreur index</option>
                <option value="Afficheur éteint">Afficheur éteint</option>
                <option value="Remplacement compteur">Remplacement compteur</option>
                <option value="Correction de l'adresse ou Nom">Correction de l'adresse ou Nom</option>
                <option value="autres">Autres</option>
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
            'Envoyer la demande'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReclamationForm;
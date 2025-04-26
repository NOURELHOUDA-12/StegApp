
import React, { useState } from 'react';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Votre configuration Firebase  
import './Autoreleve.css'

function STEGInterface() {


  const [referenceInput, setReferenceInput] = useState('');
  const [selectedCompteur, setSelectedCompteur] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [nouvelIndex, setNouvelIndex] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageDiv, setShowImageDiv] = useState(false);


  const verifierReference = async () => {
    setSelectedCompteur(null); // Réinitialisez à null ou à un tableau vide selon votre besoin
    setErrorMessage('');
    setIsLoading(true);

    try {
      const compteurRef = collection(db, 'Compteurs');
      const q = query(compteurRef, where('reference', '==', referenceInput));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const compteursTrouves = []; // Tableau pour stocker les compteurs trouvés
        querySnapshot.forEach((doc) => {
          const compteurData = {
            id: doc.id,
            ...doc.data()
          };
          compteursTrouves.push(compteurData);
        });

        // Mettez à jour l'état pour stocker la liste des compteurs trouvés
        setSelectedCompteur(compteursTrouves);
        console.log(compteursTrouves);
        setErrorMessage('');
      } else {
        // Aucun compteur trouvé
        setErrorMessage('Aucun compteur trouvé avec cette référence.');
      }
    } catch (error) {
      // Gestion des erreurs
      console.error('Erreur lors de la vérification:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      // Arrêter le chargement
      setIsLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCompteur) {
      try {
        // Logique de mise à jour du nouvel index  
        const nouvelIndexDoc = {
          compteurId: selectedCompteur.id,
          reference: selectedCompteur.reference,
          nouvelIndex: nouvelIndex,
          dateReleve: new Date(),
          userId: 'ID_UTILISATEUR_CONNECTE' // À remplacer par l'ID de l'utilisateur connecté  
        };

        // Ajouter le nouvel index dans une collection 'Releves'  
        const relevesRef = collection(db, 'Releves');
        await addDoc(relevesRef, nouvelIndexDoc);

        // Réinitialisation après soumission  
        setReferenceInput('');
        setSelectedCompteur(null);
        setNouvelIndex('');
        setShowImageDiv(true);


      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        // alert('Erreur lors de l\'enregistrement du nouvel index');
        setShowImageDiv(true);

      }
    }
  };

  const handleCloseImageDiv = () => {
    setShowImageDiv(false);
  };
  return (
    <div className="steg-interface">


      <div className="auto-releve">
        <h2>Auto-Relève</h2>
        <p>
          L'auto-relève sur une facture intermédiaire ou estimée doit être
          effectuée dans un délai d'un mois à partir de la date figurant
          sur la facture.
        </p>
        <br></br>
        <p>Référence</p>

        <div className="reference-input">
          <input
            type="text"
            placeholder="Saisir la référence du compteur"
            value={referenceInput}
            onChange={(e) => setReferenceInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            onClick={verifierReference}
            disabled={isLoading || !referenceInput}
          >
            {isLoading ? 'Vérification...' : 'Vérifier'}
          </button>
        </div>

        {/* Affichage du message d'erreur */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}


        {Array.isArray(selectedCompteur) && selectedCompteur.length > 0 && (
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>N° de compteur</th>
                  <th>Libellé tarif</th>
                  <th>Ancien Index</th>
                  <th>Nouvel index</th>
                </tr>
              </thead>
              <tbody>
                {selectedCompteur.map((compteur) => (
                  <tr key={compteur.id}>
                    <td>{compteur.reference}</td>
                    <td>{compteur.libelle}</td>
                    <td>{compteur.ancienIndex}</td>
                    <td>
                      <input
                        type="number"
                        value={nouvelIndex}
                        onChange={(e) => setNouvelIndex(e.target.value)}
                        required
                        min={compteur.ancienIndex || 0}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="submit">Envoyer</button> {/* Comment gérez-vous l'envoi pour plusieurs compteurs ? */}
          </form>
        )}

        {showImageDiv && (
          <div className="image-overlay">
            <div className="image-container">
              <button className="close-button" onClick={handleCloseImageDiv}>X</button>
              <img src="/assets/imgs/Facture.PNG" alt="Confirmation" style={{ maxWidth: '100%', height: 'auto' }} />
              <p>Votre auto-relève a été enregistrée avec succès !</p>
              <p>{parseInt(nouvelIndex, 10)}</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default STEGInterface;  
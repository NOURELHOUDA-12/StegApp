import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; 
import { collection, query, onSnapshot, doc, getDoc, deleteDoc, limit, startAfter, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from '../../ReclamationStyle';
const ITEMS_PER_PAGE = 5;

const ListeReclamations = () => {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [userTypes, setUserTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalReponseOpen, setIsModalReponseOpen] = useState(false); // Nouvel état pour le modal de réponse
  const [reponseMessage, setReponseMessage] = useState('');

  useEffect(() => {
    const unsubscribe = fetchReclamations();
    return () => unsubscribe && unsubscribe(); // nettoyage propre
  }, [currentPage]);

  const fetchReclamations = () => {
    setLoading(true);
    setError(null);

    const reclamationsRef = collection(db, 'reclamations');
    let q;

    if (lastVisible && currentPage > 1) {
      q = query(reclamationsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(ITEMS_PER_PAGE));
    } else {
      q = query(reclamationsRef, orderBy('createdAt', 'desc'), limit(ITEMS_PER_PAGE));
    }

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const allDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const filtered = allDocs.filter(doc => doc.energyTypePolice === 'Électricité' ||doc.energyType === 'Électricité');
      setReclamations(filtered);

      if (snapshot.docs.length > 0) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasNextPage(snapshot.docs.length === ITEMS_PER_PAGE);
      } else {
        setHasNextPage(false);
      }

      const userIds = new Set(filtered.map(item => item.userId));
      const types = {};

      for (const userId of userIds) {
        if (!userTypes[userId]) {
          const userDocRef = doc(db, 'users', userId);
          const userDocSnap = await getDoc(userDocRef);
          types[userId] = userDocSnap.exists() ? userDocSnap.data().type || 'Inconnu' : 'Inconnu';
        }
      }

      setUserTypes(prev => ({ ...prev, ...types }));
      setLoading(false);
    });

    return unsubscribe;
  };

  const handleVoirDetails = (reclamation) => {
    setSelectedReclamation(reclamation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReclamation(null);
  };

  const handleDeleteReclamation = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
      try {
        await deleteDoc(doc(db, 'reclamations', id));
      } catch (error) {
        setError('Erreur lors de la suppression de la réclamation : ' + error.message);
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setLastVisible(null);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  if (loading) return <div>Chargement des réclamations...</div>;
  if (error) return <div>Erreur : {error}</div>;


  const handleOuvrirModalReponse = (reclamation) => {
    setSelectedReclamation(reclamation);
    setIsModalReponseOpen(true);
    setReponseMessage(''); // Réinitialiser le message à chaque ouverture
  };

  const handleCloseReponseModal = () => {
    setIsModalReponseOpen(false);
    setSelectedReclamation(null);
    setReponseMessage('');
  };

  const handleReponseChange = (event) => {
    setReponseMessage(event.target.value);
  };
 


  const handleCloseDetailsModal = () => {
    setIsModalDetailsOpen(false);
    setSelectedReclamation(null);
  };

  const envoyerReponse = async () => {
    if (selectedReclamation && reponseMessage.trim() !== '') {
      try {
        const messagesRef = collection(db, 'messages');
        await addDoc(messagesRef, {
          senderId: 'ADMIN_ID', // Vous devrez peut-être gérer l'ID de l'administrateur dynamiquement
          receiverId: selectedReclamation.userId,
          text: reponseMessage,
          createdAt: serverTimestamp(),
          reclamationId: selectedReclamation.id, // Optionnel : pour lier le message à la réclamation
        });
        alert('Réponse envoyée avec succès !');
        handleCloseReponseModal();
      } catch (error) {
        setError('Erreur lors de l\'envoi de la réponse : ' + error.message);
      }
    } else {
      alert('Veuillez écrire un message avant d\'envoyer.');
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.titre}>Liste des Réclamations</h2>

      {reclamations.length > 0 ? (
        <div style={styles.tableauContainer}>
          <table style={styles.tableau}>
            <thead style={styles.thead}>
              <tr style={styles.tr}>
                <th style={styles.th}>Référence</th>
                <th style={styles.th}>Type de Réclamation</th>
                {/* <th style={styles.th}>Service</th> */}
                <th style={styles.th}>Date de Création</th>
                <th style={styles.th}>Type d'Utilisateur</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {reclamations.map((reclamation) => (
                <tr key={reclamation.id} style={styles.tr}>
                  <td style={styles.td}>{reclamation.reference}</td>
                  {/* <td style={styles.td}>{reclamation.energyType}</td> */}
                  <td style={styles.td}>{reclamation.refType}</td>
                  <td style={styles.td}>
                    {new Date(reclamation.createdAt?.seconds * 1000).toLocaleString()}
                  </td>
                  <td style={styles.td}>{userTypes[reclamation.userId] || 'Chargement...'}</td>
                  <td style={styles.td}>
                    <button style={styles.boutonDetails} onClick={() => handleVoirDetails(reclamation)}>Voir</button>

                    <button style={styles.boutonSupprimer} onClick={() => handleDeleteReclamation(reclamation.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucune réclamation trouvée.</p>
      )}

      <div style={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Précédent</button>
        <span>Page {currentPage}</span>
        <button onClick={goToNextPage} disabled={!hasNextPage}>Suivant</button>
      </div>

      {isModalOpen && selectedReclamation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitre}>Détails de la Réclamation</h3>
            <p><strong>Référence:</strong> {selectedReclamation.reference}</p>
            <p><strong>Date:</strong> {new Date(selectedReclamation.createdAt?.seconds * 1000).toLocaleString()}</p>
            <p><strong>Statut:</strong> {selectedReclamation.status}</p>
            <p><strong>Type Utilisateur:</strong> {userTypes[selectedReclamation.userId] || 'Inconnu'}</p>
            <p><strong>Email:</strong> {selectedReclamation.userEmail}</p>
            <p><strong>ID Utilisateur:</strong> {selectedReclamation.userId}</p>
            <p><strong>Type de Référence:</strong> {selectedReclamation.refType}</p>
            <p><strong>Énergie:</strong> {selectedReclamation.energyType}</p>
            <p><strong>Police Énergie:</strong> {selectedReclamation.energyTypePolice}</p>
            <p><strong>Police:</strong> {selectedReclamation.police}</p>
            <p><strong>Type Police:</strong> {selectedReclamation.policeType}</p>
            <p><strong>Demande:</strong> {selectedReclamation.demande}</p>
            <p><strong>Demande Police:</strong> {selectedReclamation.demandePolice}</p>
            <p><strong>Champ Sélectionné:</strong> {selectedReclamation.selectedInput}</p>
            <button style={styles.boutonFermer} onClick={handleCloseModal}>Fermer</button>
            <button style={styles.boutonRepondre} onClick={() => handleOuvrirModalReponse(selectedReclamation)}>Répondre</button> 
            </div>
        </div>
      )}
    {isModalReponseOpen && selectedReclamation && (
  <div style={styles.modalOverlay}>
    <div style={styles.backdrop} />
    <div style={styles.modalContainer}>
      <div style={styles.modalContent}>
        <h3 style={styles.modalTitre}>Répondre à la Réclamation</h3>
        <p style={styles.modalRef}>
          <strong>Référence :</strong> {selectedReclamation.reference}
        </p>

        <label htmlFor="reponse" style={styles.label}>
          <strong>Votre Réponse :</strong>
        </label>
        <textarea
          id="reponse"
          value={reponseMessage}
          onChange={handleReponseChange}
          placeholder="Écrivez votre réponse ici..."
          style={styles.textarea}
        />

        <div style={styles.actions}>
          <button style={styles.boutonFermer} onClick={handleCloseReponseModal}>
            Annuler
          </button>
          <button style={styles.boutonEnvoyer} onClick={envoyerReponse}>
            Envoyer la Réponse
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};





  
  


export default ListeReclamations;
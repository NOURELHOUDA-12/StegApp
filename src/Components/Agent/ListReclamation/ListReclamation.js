import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; 
import { collection, query, onSnapshot, doc, getDoc, deleteDoc, limit, startAfter, orderBy } from 'firebase/firestore';

const ITEMS_PER_PAGE = 5; // Nombre d'éléments par page

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

  useEffect(() => {
    fetchReclamations();
  }, [currentPage]);

  const fetchReclamations = async () => {
    setLoading(true);
    setError(null);
    let reclamationsRef = collection(db, 'reclamations');
    let q;

    if (lastVisible) {
      q = query(reclamationsRef, orderBy('createdAt', 'desc'), startAfter(lastVisible), limit(ITEMS_PER_PAGE));
    } else {
      q = query(reclamationsRef, orderBy('createdAt', 'desc'), limit(ITEMS_PER_PAGE));
    }

    try {
      const snapshot = await onSnapshot(q, async (snapshot) => {
        const reclamationsData = [];
        const userIdsToFetch = new Set();
        let newLastVisible = null;
        snapshot.forEach((doc) => {
          const data = doc.data();
          reclamationsData.push({ id: doc.id, ...data });
          userIdsToFetch.add(data.userId);
          newLastVisible = doc;
        });

        setReclamations(reclamationsData);
        setLastVisible(newLastVisible);
        setHasNextPage(snapshot.docs.length === ITEMS_PER_PAGE);

        const types = {};
        for (const userId of userIdsToFetch) {
          if (!userTypes[userId]) {
            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              types[userId] = userDocSnap.data().type || 'Inconnu';
            } else {
              types[userId] = 'Inconnu';
            }
          }
        }
        setUserTypes((prevTypes) => ({ ...prevTypes, ...types }));
        setLoading(false);
      });

      // Cleanup the listener
      return () => snapshot();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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
        // La liste sera mise à jour automatiquement grâce à onSnapshot
      } catch (error) {
        setError('Erreur lors de la suppression de la réclamation : ' + error.message);
      }
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setLastVisible(null); // Reset lastVisible pour une nouvelle requête
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchReclamations(); // Fetch the next page
    }
  };

  const totalPages = Math.ceil(reclamations.length / ITEMS_PER_PAGE); // Not accurate with onSnapshot and pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReclamations = reclamations.slice(startIndex, endIndex); // Not needed with Firestore pagination

  if (loading) {
    return <div>Chargement des réclamations...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des réclamations : {error}</div>;
  }

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

                <th style={styles.th}>Date de Création</th>
                <th style={styles.th}>Type d'Utilisateur</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {reclamations.map((reclamation) => (
                <tr key={reclamation.id} style={styles.tr}>
                  <td style={styles.td}>{reclamation.reference}</td>
                  <td style={styles.td}>{reclamation.energyType}</td>
                  <td style={styles.td}>
                    {new Date(reclamation.createdAt?.seconds * 1000).toLocaleString()}
                  </td>
                  <td style={styles.td}>{userTypes[reclamation.userId] || 'Chargement...'}</td>
                  <td style={styles.td}>
                    <button style={styles.boutonDetails} onClick={() => handleVoirDetails(reclamation)}>
                      Voir
                    </button>
                    <button style={styles.boutonSupprimer} onClick={() => handleDeleteReclamation(reclamation.id)}>
                      Supprimer
                    </button>
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
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <span>Page {currentPage}</span>
        <button onClick={goToNextPage} disabled={!hasNextPage}>
          Suivant
        </button>
      </div>

      {isModalOpen && selectedReclamation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitre}>Détails de la Réclamation</h3>
            <p><strong>Référence:</strong> {selectedReclamation.reference}</p>
            <p><strong>Date de Création:</strong> {new Date(selectedReclamation.createdAt?.seconds * 1000).toLocaleString()}</p>
            <p><strong>Statut:</strong> {selectedReclamation.status}</p>
            <p><strong>Type d'Utilisateur:</strong> {userTypes[selectedReclamation.userId] || 'Inconnu'}</p>
            <p><strong>Email de l'Utilisateur:</strong> {selectedReclamation.userEmail}</p>
            <p><strong>ID de l'Utilisateur:</strong> {selectedReclamation.userId}</p>
            <p><strong>Type de Référence:</strong> {selectedReclamation.refType}</p>
            <p><strong>Type d'Énergie:</strong> {selectedReclamation.energyType}</p>
            <p><strong>Type de Police d'Énergie:</strong> {selectedReclamation.energyTypePolice}</p>
            <p><strong>Police:</strong> {selectedReclamation.police}</p>
            <p><strong>Type de Police:</strong> {selectedReclamation.policeType}</p>
            <p><strong>Demande:</strong> {selectedReclamation.demande}</p>
            <p><strong>Demande Police:</strong> {selectedReclamation.demandePolice}</p>
            <p><strong>Champ Sélectionné:</strong> {selectedReclamation.selectedInput}</p>
            <button style={styles.boutonFermer} onClick={handleCloseModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '960px',
    margin: '0 auto',
  },
  titre: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  tableauContainer: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  tableau: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
  },
  thead: {
    backgroundColor: '#f2f2f2',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
  },
  boutonDetails: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  boutonSupprimer: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
  },
  modalTitre: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    textAlign: 'center',
  },
  boutonFermer: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },

  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  'pagination button': {
    padding: '8px 15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '16px',
  },
  'pagination button:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};

export default ListeReclamations;
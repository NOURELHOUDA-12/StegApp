import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc ,getDocs} from 'firebase/firestore';
import {  db,auth } from '../../../firebase'; 

const ListeReponsesClient = () => {
  const [reponses, setReponses] = useState([]);
  const [selectedReponse, setSelectedReponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;
  
    const fetchReponses = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const user = auth.currentUser;
        console.log('Utilisateur connecté:', auth.currentUser);

        if (user) {
            console.log('Utilisateur connecté:--------------------------',user.uid);

          const messagesRef = collection(db, 'messages');
          const q = query(
            messagesRef,
            where('receiverId', '==', user.uid),

            orderBy('createdAt', 'desc')
          );
          
          const snapshot = await getDocs(q);
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });          
  
          unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedReponses = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setReponses(fetchedReponses);
            setLoading(false);
          });
        } else {
          setError('Utilisateur non authentifié.');
          setLoading(false);
        }
      } catch (e) {
        setError('Erreur lors de la récupération des réponses : ' + e.message);
        setLoading(false);
      }
    };
  
    fetchReponses();
  
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);
  

  const handleAfficherReponse = (reponse) => {
    setSelectedReponse(reponse);
  };

  const handleFermerReponse = () => {
    setSelectedReponse(null);
  };

  if (loading) {
    return <div>Chargement de vos réponses...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titre}>Vos Réponses</h2>

      {reponses.length > 0 ? (
        <div style={styles.listeReponses}>
          <ul>
            {reponses.map((reponse) => (
              <li key={reponse.id} style={styles.listItem}>
                <button style={styles.boutonAfficher} onClick={() => handleAfficherReponse(reponse)}>
                  Réponse du {new Date(reponse.createdAt?.seconds * 1000).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Vous n'avez pas encore reçu de réponses.</p>
      )}

      {selectedReponse && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalReponse}>
            <h3 style={styles.modalTitre}>Réponse du {new Date(selectedReponse.createdAt?.seconds * 1000).toLocaleString()}</h3>
            <p style={styles.messageText}>{selectedReponse.text}</p>
            <button style={styles.boutonFermer} onClick={handleFermerReponse}>Fermer</button>
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
    maxWidth: '800px',
    margin: '0 auto',
  },
  titre: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  listeReponses: {
    marginTop: '20px',
  },
  listItem: {
    marginBottom: '10px',
  },
  boutonAfficher: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    textAlign: 'left',
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
  modalReponse: {
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
  messageText: {
    marginBottom: '15px',
    lineHeight: '1.6',
  },
  boutonFermer: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
  },
};

export default ListeReponsesClient;
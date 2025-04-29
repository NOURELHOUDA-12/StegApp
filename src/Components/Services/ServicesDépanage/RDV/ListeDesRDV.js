import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../../firebase'
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './rdv.css';

function ListeRendezVous() {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userNames, setUserNames] = useState({}); 

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setRendezVous([]);
        setUserNames({}); 
        console.log("Utilisateur déconnecté sur la page de liste des rendez-vous.");
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {  
    setLoading(true);  
    const rendezVousRef = collection(db, 'rendezVous');  
    const q = query(rendezVousRef, where('service', '==', "Service dépannage"));  
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {  
      const listeRDV = [];  
      const names = {};  
      
      // Utilisez Promise.all pour gérer les requêtes asynchrones en parallèle  
      await Promise.all(snapshot.docs.map(async (docSnapshot) => {  
        const rdvData = { id: docSnapshot.id, ...docSnapshot.data(), status: docSnapshot.data().status || 'En attente' };  
        listeRDV.push(rdvData);  
        
        const uid = rdvData.userId;  
        
        if (uid && !names[uid]) {  
          
          try {  
            console.log("Recherche de l'utilisateur avec UID:", uid);  
            
            const userDocRef = doc(db, 'users', uid);  
            const userDoc = await getDoc(userDocRef);  
            
            console.log("Document utilisateur existe ?", userDoc.exists());  
            
            if (userDoc.exists()) {  
              const userData = userDoc.data();  
              console.log("Données utilisateur:", userData);  
              
              // Vérifiez le champ exact du nom  
              names[uid] = userData.name || userData.displayName || userData.fullName || 'Nom inconnu';  
            } else {  
              names[uid] = 'Utilisateur inconnu';  
            }  
          } catch (error) {  
            console.error(`Erreur pour l'utilisateur ${uid}:`, error);  
            names[uid] = 'Erreur de récupération';  
          }  
        }  
      }));  
  
      setRendezVous(listeRDV);  
      setUserNames(names);  
      setLoading(false);  
      setError(null);  
    }, (err) => {  
      console.error("Erreur lors de la récupération des rendez-vous : ", err);  
      setError("Impossible de récupérer la liste des rendez-vous.");  
      setLoading(false);  
    });  
  
    return () => unsubscribe();  
  }, []);  


  const handleMarquerCommeTermine = async (rdvId) => {
    try {
      const rdvDocRef = doc(db, 'rendezVous', rdvId);
      await updateDoc(rdvDocRef, {
        status: 'Terminé',
      });
      setRendezVous(prevRendezVous =>
        prevRendezVous.map(rdv =>
          rdv.id === rdvId ? { ...rdv, status: 'Terminé' } : rdv
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut du rendez-vous : ", error);
      alert("Impossible de mettre à jour le statut du rendez-vous.");
    }
  };

  if (loading) {
    return <div>Chargement de la liste des rendez-vous...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="liste-rdv-container">
      <h2>Liste des Rendez-vous (Service Dépannage)</h2>
      <ul>
        {rendezVous.map((rdv) => (
          <li key={rdv.id} className={`rdv-item ${rdv.status === 'Terminé' ? 'termine' : ''}`}>
            <p><strong>ID du Rendez-vous :</strong> {rdv.id}</p>
            <p><strong>Nom de l'utilisateur :</strong> {userNames[rdv.userId] || 'Chargement du nom...'}</p>
            <p><strong>Ville :</strong> {rdv.ville}</p>
            <p><strong>District :</strong> {rdv.district}</p>
            <p><strong>Date :</strong> {rdv.date}</p>
            <p><strong>Heure :</strong> {rdv.time}</p>
            <p><strong>Statut :</strong> {rdv.status}</p>
            <button onClick={() => handleMarquerCommeTermine(rdv.id)} disabled={rdv.status === 'Terminé'}>
              Marquer comme Terminé
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeRendezVous;
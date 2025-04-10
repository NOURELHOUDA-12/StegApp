import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../../firebase"; 
import './rec.css';

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

  const [reclamations, setReclamations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReclamations = async () => {
      const querySnapshot = await getDocs(collection(db, "reclamations"));
      const reclams = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReclamations(reclams);
    };
    fetchReclamations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        status: 'Non traitée',
        ...formData
      };

      const docRef = await addDoc(collection(db, "reclamations"), reclamationData);
      setSuccessMessage('Réclamation envoyée avec succès !');
      setReclamations([...reclamations, { id: docRef.id, ...reclamationData }]);

      setFormData({
        reference: '', police: '', refType: '', energyType: '', demande: '', policeType: '', energyTypePolice: '', demandePolice: '', selectedInput: ''
      });
    } catch (error) {
      setErrorMessage(`Erreur lors de l'envoi: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Non traitée' ? 'Traitée' : 'Non traitée';
    await updateDoc(doc(db, "reclamations", id), { status: newStatus });
    setReclamations(reclamations.map(reclam => 
      reclam.id === id ? { ...reclam, status: newStatus } : reclam
    ));
  };

  return (
    <div className="reclamation-container">
      <h1 className="reclamation-title">Liste des Réclamations</h1>
      
      <table className="reclamation-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Police</th>
            <th>Type</th>
            <th>Demande</th>
            <th>Email Utilisateur</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {reclamations.map((reclam, index) => (
            <tr key={index}>
              <td>{reclam.reference || 'N/A'}</td>
              <td>{reclam.police || 'N/A'}</td>
              <td>{reclam.refType || reclam.policeType || ''}</td>
              <td>{reclam.demande || reclam.demandePolice || ''}</td>
              <td>{reclam.userEmail}</td>
              <td>{reclam.createdAt?.toDate().toLocaleString() || ''}</td>
              <td>
                <button 
                  className={`status-btn ${reclam.status === 'Traitée' ? 'treated' : 'pending'}`} 
                  onClick={() => toggleStatus(reclam.id, reclam.status)}
                >
                  {reclam.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReclamationForm;

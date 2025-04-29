import React, { useState, useEffect ,useRef } from 'react';
import { db } from '../../../../firebase'; // Importez votre instance db
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Chart, registerables } from 'chart.js';

import './dashbord.css'; 
Chart.register(...registerables);

function DashboardAdmin() {
  const [reclamations, setReclamations] = useState([]);
  const [rendezVousTraites, setRendezVousTraites] = useState([]);
  const [rendezVousEnAttente, setRendezVousEnAttente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reclamationsChartRef = useRef(null);
  const rdvAttenteChartRef = useRef(null);
  const rdvTraitesChartRef = useRef(null);

  useEffect(() => {
    if (reclamationsChartRef.current && reclamations.length > 0) {
      const ctx = reclamationsChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total'],
          datasets: [{
            label: 'Réclamations',
            data: [reclamations.length],
            backgroundColor: ['#ff6384'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Total des Réclamations',
            },
          },
        },
      });
    }

    if (rdvAttenteChartRef.current && rendezVousEnAttente.length >= 0) {
      const ctx = rdvAttenteChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['En Attente'],
          datasets: [{
            label: 'Rendez-vous',
            data: [rendezVousEnAttente.length],
            backgroundColor: ['#ff9f40'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Rendez-vous en Attente',
            },
          },
        },
      });
    }

    if (rdvTraitesChartRef.current && rendezVousTraites.length >= 0) {
      const ctx = rdvTraitesChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Traités'],
          datasets: [{
            label: 'Rendez-vous',
            data: [rendezVousTraites.length],
            backgroundColor: ['#4bc0c0'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Rendez-vous Traités',
            },
          },
        },
      });
    }
  }, [reclamations.length, rendezVousEnAttente.length, rendezVousTraites.length]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchReclamations = onSnapshot(collection(db, 'reclamations'), (snapshot) => {
      setReclamations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      console.error("Erreur lors de la récupération des réclamations : ", err);
      setError("Erreur lors de la récupération des réclamations.");
    });

    const fetchRendezVousTraites = onSnapshot(
      query(collection(db, 'rendezVous'), where('status', '==', 'Terminé')),
      (snapshot) => {
        setRendezVousTraites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Erreur lors de la récupération des rendez-vous traités : ", err);
        setError("Erreur lors de la récupération des rendez-vous traités.");
      }
    );

    const fetchRendezVousEnAttente = onSnapshot(
      query(collection(db, 'rendezVous'), where('status', '==', 'En attente')),
      (snapshot) => {
        setRendezVousEnAttente(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.error("Erreur lors de la récupération des rendez-vous en attente : ", err);
        setError("Erreur lors de la récupération des rendez-vous en attente.");
      }
    );

    setLoading(false);

    return () => {
      fetchReclamations();
      fetchRendezVousTraites();
      fetchRendezVousEnAttente();
    };
  }, []);

  if (loading) {
    return <div>Chargement du tableau de bord...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de Bord Administrateur</h1>
      </header>

      <main className="dashboard-main">
      <section className="dashboard-section chart-container">
          <h2>Réclamations</h2>
          <div className="chart-wrapper">
            <canvas ref={reclamationsChartRef} />
          </div>
          <div className="item-count">Total : {reclamations.length}</div>
        </section>

        <section className="dashboard-section chart-container">
          <h2>Rendez-vous en Attente</h2>
          <div className="chart-wrapper">
            <canvas ref={rdvAttenteChartRef} />
          </div>
          <div className="item-count">Total : {rendezVousEnAttente.length}</div>
        </section>

        <section className="dashboard-section chart-container">
          <h2>Rendez-vous Traités</h2>
          <div className="chart-wrapper">
            <canvas ref={rdvTraitesChartRef} />
          </div>
          <div className="item-count">Total : {rendezVousTraites.length}</div>
        </section>

        <section className="dashboard-section reclamations">
          <h2>Réclamations</h2>
          {reclamations.length > 0 ? (
            <ul className="item-list">
              {reclamations.map((reclamation) => (
                <li key={reclamation.id} className="item">
                  <p><strong>ID :</strong> {reclamation.id}</p>
                  <p><strong>Sujet :</strong> {reclamation.energyTypePolice || 'Non spécifié'}</p>
                  <p><strong>Date de création :</strong> {reclamation.createdAt ? new Date(reclamation.createdAt.seconds * 1000).toLocaleString() : 'Inconnue'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune réclamation pour le moment.</p>
          )}
          <div className="item-count">Total : {reclamations.length}</div>
        </section>

        <section className="dashboard-section rdv-en-attente">
          <h2>Rendez-vous en Attente</h2>
          {rendezVousEnAttente.length > 0 ? (
            <ul className="item-list">
              {rendezVousEnAttente.map((rdv) => (
                <li key={rdv.id} className="item">
                  <p><strong>ID :</strong> {rdv.id}</p>
                  <p><strong>Service :</strong> {rdv.service}</p>
                  <p><strong>Date :</strong> {rdv.date} à {rdv.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun rendez-vous en attente.</p>
          )}
          <div className="item-count">Total : {rendezVousEnAttente.length}</div>
        </section>

        <section className="dashboard-section rdv-traites">
          <h2>Rendez-vous Traités</h2>
          {rendezVousTraites.length > 0 ? (
            <ul className="item-list">
              {rendezVousTraites.map((rdv) => (
                <li key={rdv.id} className="item termine"> 
                  <p><strong>ID :</strong> {rdv.id}</p>
                  <p><strong>Service :</strong> {rdv.service}</p>
                  <p><strong>Date :</strong> {rdv.date} à {rdv.time}</p>
                  <p><strong>Statut :</strong> {rdv.status}</p>
                 
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun rendez-vous traité.</p>
          )}
          <div className="item-count">Total : {rendezVousTraites.length}</div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Votre Nom d'Application</p>
      </footer>
    </div>
  );
}

export default DashboardAdmin;
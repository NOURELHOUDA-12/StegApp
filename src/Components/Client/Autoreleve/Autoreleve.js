
// // import React, { useState } from 'react';
// // import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
// // import { db } from '../../../firebase'; // Votre configuration Firebase  
// // import './Autoreleve.css'

// // function STEGInterface() {


// //   const [referenceInput, setReferenceInput] = useState('');
// //   const [selectedCompteur, setSelectedCompteur] = useState(null);
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [nouvelIndex, setNouvelIndex] = useState({});

// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showImageDiv, setShowImageDiv] = useState(false);
// //   const [imagePath, setImagePath] = useState('');



// //   const verifierReference = async () => {
// //     setSelectedCompteur(null); // Réinitialisez à null ou à un tableau vide selon votre besoin
// //     setErrorMessage('');
// //     setIsLoading(true);

// //     try {
// //       const compteurRef = collection(db, 'Compteurs');
// //       const q = query(compteurRef, where('reference', '==', referenceInput));
// //       const querySnapshot = await getDocs(q);

// //       if (!querySnapshot.empty) {
// //         const compteursTrouves = []; // Tableau pour stocker les compteurs trouvés
// //         querySnapshot.forEach((doc) => {
// //           const compteurData = {
// //             id: doc.id,
// //             ...doc.data()
// //           };
// //           compteursTrouves.push(compteurData);
// //         });

// //         // Mettez à jour l'état pour stocker la liste des compteurs trouvés
// //         setSelectedCompteur(compteursTrouves);
// //         console.log(compteursTrouves);
// //         setErrorMessage('');
// //       } else {
// //         // Aucun compteur trouvé
// //         setErrorMessage('Aucun compteur trouvé avec cette référence.');
// //       }
// //     } catch (error) {
// //       // Gestion des erreurs
// //       console.error('Erreur lors de la vérification:', error);
// //       setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
// //     } finally {
// //       // Arrêter le chargement
// //       setIsLoading(false);
// //     }
// //   };

// // const handleNouvelIndexChange = (compteurId, value) => {
// //   setNouvelIndex(prevState => ({
// //     ...prevState,
// //     [compteurId]: value
// //   }));
// // };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (Array.isArray(selectedCompteur) && selectedCompteur.length > 0) {
// //     try {
// //       const relevesRef = collection(db, 'Releves');

// //       for (const compteur of selectedCompteur) {
// //         const nouvelIndexValue = nouvelIndex[compteur.id];
// //         if (!nouvelIndexValue) continue;

// //         const nouvelIndexDoc = {
// //           compteurId: compteur.id,
// //           reference: compteur.reference,
// //           nouvelIndex: nouvelIndexValue,
// //           dateReleve: new Date(),
// //           userId: 'ID_UTILISATEUR_CONNECTE'
// //         };

// //         await addDoc(relevesRef, nouvelIndexDoc);
// //       }

// //       // Choisir l'image à afficher
// //       if (referenceInput === "322583221") {
// //         setImagePath("/assets/imgs/FactureHamdi.PNG");
// //       } else if (referenceInput === "336084740") {
// //         setImagePath("/assets/imgs/FactureAmeni.PNG");
// //       }

// //       setReferenceInput('');
// //       setSelectedCompteur([]);
// //       setNouvelIndex({});
// //       setShowImageDiv(true);

// //     } catch (error) {
// //       console.error('Erreur lors de l\'envoi:', error);
// //       setShowImageDiv(true);
// //     }
// //   }
// // };


// //   const handleCloseImageDiv = () => {
// //     setShowImageDiv(false);
// //   };
// //   return (
// //     <div className="steg-interface">


// //       <div className="auto-releve">
// //         <h2>Auto-Relève</h2>
// //         <p>
// //           L'auto-relève sur une facture intermédiaire ou estimée doit être
// //           effectuée dans un délai d'un mois à partir de la date figurant
// //           sur la facture.
// //         </p>
// //         <br></br>
// //         <p>Référence</p>

// //         <div className="reference-input">
// //           <input
// //             type="text"
// //             placeholder="Saisir la référence du compteur"
// //             value={referenceInput}
// //             onChange={(e) => setReferenceInput(e.target.value)}
// //             disabled={isLoading}
// //           />
// //           <button
// //             onClick={verifierReference}
// //             disabled={isLoading || !referenceInput}
// //           >
// //             {isLoading ? 'Vérification...' : 'Vérifier'}
// //           </button>
// //         </div>

// //         {/* Affichage du message d'erreur */}
// //         {errorMessage && (
// //           <div className="error-message">
// //             {errorMessage}
// //           </div>
// //         )}


// // {Array.isArray(selectedCompteur) && selectedCompteur.length > 0 && (
// //   <form onSubmit={handleSubmit}>
// //     <table>
// //       <thead>
// //         <tr>
// //           <th>N° de compteur</th>
// //           <th>Libellé tarif</th>
// //           <th>Ancien Index</th>
// //           <th>Nouvel index</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {/* Trier le tableau pour mettre "Electricité" en premier */}
// //         {selectedCompteur
// //           .slice() // Créer une copie du tableau pour éviter de modifier l'original
// //           .sort((a, b) => {
// //             if (a.libelle.trim() === "Eclairage".trim() && b.libelle.trim() !== "Eclairage".trim()) {
// //               return -1;
// //             }
// //             if (a.libelle.trim() !== "Eclairage".trim() && b.libelle.trim() === "Eclairage".trim()) {
// //               return 1;
// //             }
// //             return 0; // L'ordre relatif ne change pas pour les autres éléments
// //           })
// //           .map((compteur) => (
// //             <tr key={compteur.id}>
// //               <td>{compteur.reference}</td>
// //               <td>{compteur.libelle}</td>
// //               <td>{compteur.ancienIndex}</td>
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={nouvelIndex[compteur.id] || ''}
// //                   onChange={(e) => handleNouvelIndexChange(compteur.id, e.target.value)}
// //                   required
// //                   min={compteur.ancienIndex || 0}
// //                 />
// //               </td>
// //             </tr>
// //           ))}
// //       </tbody>
// //     </table>
// //     <button type="submit">Envoyer</button>
// //   </form>
// // )}
// //         {showImageDiv && (
// //           <div className="image-overlay">
// //             <div className="image-container">
// //               <button className="close-button" onClick={handleCloseImageDiv}>X</button>
// //               <img src={imagePath} alt="Confirmation" style={{ maxWidth: '80%', height: 'auto' }} />
// //               <p>Votre auto-relève a été enregistrée avec succès !</p>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //     </div>
// //   );
// // }

// // export default STEGInterface;  




// import React, { useState } from 'react';
// import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebase'; // Votre configuration Firebase
// import './Autoreleve.css';

// function STEGInterface() {
//     const [referenceInput, setReferenceInput] = useState('');
//     const [selectedCompteur, setSelectedCompteur] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [nouvelIndex, setNouvelIndex] = useState({});

//     const [isLoading, setIsLoading] = useState(false);
//     const [showPdfLink, setShowPdfLink] = useState(false); // Changé de 'showImageDiv'
//     const [pdfPath, setPdfPath] = useState(''); // Changé de 'imagePath' pour stocker l'URL du PDF

//     const verifierReference = async () => {
//         setSelectedCompteur(null);
//         setErrorMessage('');
//         setIsLoading(true);

//         try {
//             const compteurRef = collection(db, 'Compteurs');
//             const q = query(compteurRef, where('reference', '==', referenceInput));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const compteursTrouves = [];
//                 querySnapshot.forEach((doc) => {
//                     const compteurData = {
//                         id: doc.id,
//                         ...doc.data()
//                     };
//                     compteursTrouves.push(compteurData);
//                 });

//                 setSelectedCompteur(compteursTrouves);
//                 console.log(compteursTrouves);
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage('Aucun compteur trouvé avec cette référence.');
//             }
//         } catch (error) {
//             console.error('Erreur lors de la vérification:', error);
//             setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleNouvelIndexChange = (compteurId, value) => {
//         setNouvelIndex(prevState => ({
//             ...prevState,
//             [compteurId]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (Array.isArray(selectedCompteur) && selectedCompteur.length > 0) {
//             try {
//                 const relevesRef = collection(db, 'Releves');

//                 for (const compteur of selectedCompteur) {
//                     const nouvelIndexValue = nouvelIndex[compteur.id];
//                     if (!nouvelIndexValue) continue;

//                     const nouvelIndexDoc = {
//                         compteurId: compteur.id,
//                         reference: compteur.reference,
//                         nouvelIndex: nouvelIndexValue,
//                         dateReleve: new Date(),
//                         userId: 'ID_UTILISATEUR_CONNECTE'
//                     };

//                     await addDoc(relevesRef, nouvelIndexDoc);
//                 }

//                 // Choisir l'URL du PDF à ouvrir
//                 if (referenceInput === "322583221") {
//                     // Remplacez par l'URL réelle de votre PDF
//                     setPdfPath("./assets/pdf/facture hamdi.pdf"); 
//                 } else if (referenceInput === "336084740") {
//                     // Remplacez par l'URL réelle de votre PDF
//                     setPdfPath("./assets/pdfs/facture ameni.pdf");
//                 }

//                 setReferenceInput('');
//                 setSelectedCompteur([]);
//                 setNouvelIndex({});
//                 setShowPdfLink(true); // Afficher le lien vers le PDF

//             } catch (error) {
//                 console.error('Erreur lors de l\'envoi:', error);
//                 // Si une erreur se produit, vous pourriez vouloir afficher un message d'erreur
//                 // ou gérer l'affichage du lien PDF différemment
//                 setShowPdfLink(true); // Toujours afficher le lien même en cas d'erreur si désiré
//             }
//         }
//     };

//     // Cette fonction ne ferme plus une div, mais peut réinitialiser l'état si nécessaire
//     const handleClosePdfLink = () => {
//         setShowPdfLink(false);
//         setPdfPath(''); // Réinitialiser le chemin du PDF
//     };

//     return (
//         <div className="steg-interface">
//             <div className="auto-releve">
//                 <h2>Auto-Relève</h2>
//                 <p>
//                     L'auto-relève sur une facture intermédiaire ou estimée doit être
//                     effectuée dans un délai d'un mois à partir de la date figurant
//                     sur la facture.
//                 </p>
//                 <br></br>
//                 <p>Référence</p>

//                 <div className="reference-input">
//                     <input
//                         type="text"
//                         placeholder="Saisir la référence du compteur"
//                         value={referenceInput}
//                         onChange={(e) => setReferenceInput(e.target.value)}
//                         disabled={isLoading}
//                     />
//                     <button
//                         onClick={verifierReference}
//                         disabled={isLoading || !referenceInput}
//                     >
//                         {isLoading ? 'Vérification...' : 'Vérifier'}
//                     </button>
//                 </div>

//                 {errorMessage && (
//                     <div className="error-message">
//                         {errorMessage}
//                     </div>
//                 )}

//                 {Array.isArray(selectedCompteur) && selectedCompteur.length > 0 && (
//                     <form onSubmit={handleSubmit}>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>N° de compteur</th>
//                                     <th>Libellé tarif</th>
//                                     <th>Ancien Index</th>
//                                     <th>Nouvel index</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {selectedCompteur
//                                     .slice()
//                                     .sort((a, b) => {
//                                         if (a.libelle.trim() === "Eclairage".trim() && b.libelle.trim() !== "Eclairage".trim()) {
//                                             return -1;
//                                         }
//                                         if (a.libelle.trim() !== "Eclairage".trim() && b.libelle.trim() === "Eclairage".trim()) {
//                                             return 1;
//                                         }
//                                         return 0;
//                                     })
//                                     .map((compteur) => (
//                                         <tr key={compteur.id}>
//                                             <td>{compteur.reference}</td>
//                                             <td>{compteur.libelle}</td>
//                                             <td>{compteur.ancienIndex}</td>
//                                             <td>
//                                                 <input
//                                                     type="number"
//                                                     value={nouvelIndex[compteur.id] || ''}
//                                                     onChange={(e) => handleNouvelIndexChange(compteur.id, e.target.value)}
//                                                     required
//                                                     min={compteur.ancienIndex || 0}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     ))}
//                             </tbody>
//                         </table>
//                         <button type="submit">Envoyer</button>
//                     </form>
//                 )}

//                 {/* Condition pour afficher le lien PDF */}
//                 {showPdfLink && pdfPath && (
//                     <div className="confirmation-message-pdf">
//                         <p>Votre auto-relève a été enregistrée avec succès !</p>
//                         <a
//                             href={pdfPath}
//                             target="_blank" // Ouvre dans un nouvel onglet/fenêtre
//                             rel="noopener noreferrer" // Bonne pratique de sécurité
//                             className="pdf-button" // Appliquez un style si nécessaire
//                             style={{
//                                 display: 'inline-block',
//                                 backgroundColor: '#28a745', // Couleur verte pour le bouton
//                                 color: 'white',
//                                 padding: '10px 20px',
//                                 textDecoration: 'none',
//                                 borderRadius: '5px',
//                                 marginTop: '15px'
//                             }}
//                         >
//                             Afficher la Facture (PDF)
//                         </a>
//                         <button
//                             onClick={handleClosePdfLink}
//                             style={{
//                                 backgroundColor: '#dc3545', // Couleur rouge pour le bouton Fermer
//                                 color: 'white',
//                                 padding: '10px 20px',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: 'pointer',
//                                 marginLeft: '10px',
//                                 marginTop: '15px'
//                             }}
//                         >
//                             Fermer
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default STEGInterface;

import React, { useState } from 'react';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Votre configuration Firebase
import './Autoreleve.css';

function STEGInterface() {
    const [referenceInput, setReferenceInput] = useState('');
    const [selectedCompteur, setSelectedCompteur] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [nouvelIndex, setNouvelIndex] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    // showPdfLink indique si le bouton d'ouverture du PDF doit être affiché
    const [showPdfLink, setShowPdfLink] = useState(false);
    // pdfPath stocke l'URL du PDF à ouvrir
    const [pdfPath, setPdfPath] = useState('');

    const verifierReference = async () => {
        setSelectedCompteur(null);
        setErrorMessage('');
        setIsLoading(true);

        try {
            const compteurRef = collection(db, 'Compteurs');
            const q = query(compteurRef, where('reference', '==', referenceInput));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const compteursTrouves = [];
                querySnapshot.forEach((doc) => {
                    const compteurData = {
                        id: doc.id,
                        ...doc.data()
                    };
                    compteursTrouves.push(compteurData);
                });

                setSelectedCompteur(compteursTrouves);
                console.log(compteursTrouves);
                setErrorMessage('');
            } else {
                setErrorMessage('Aucun compteur trouvé avec cette référence.');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
            setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNouvelIndexChange = (compteurId, value) => {
        setNouvelIndex(prevState => ({
            ...prevState,
            [compteurId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Array.isArray(selectedCompteur) && selectedCompteur.length > 0) {
            try {
                const relevesRef = collection(db, 'Releves');

                for (const compteur of selectedCompteur) {
                    const nouvelIndexValue = nouvelIndex[compteur.id];
                    if (!nouvelIndexValue) continue;

                    const nouvelIndexDoc = {
                        compteurId: compteur.id,
                        reference: compteur.reference,
                        nouvelIndex: nouvelIndexValue,
                        dateReleve: new Date(),
                        userId: 'ID_UTILISATEUR_CONNECTE' ,
                        PDFUrl:pdfPath
                    };

                    await addDoc(relevesRef, nouvelIndexDoc);
                }

                // --- LOGIQUE POUR DÉFINIR LE CHEMIN DU PDF ---
                // Assurez-vous que ces chemins sont corrects par rapport à votre dossier 'public'
                // ou que ce sont des URLs complètes si les PDFs sont hébergés ailleurs (ex: Firebase Storage)
                if (referenceInput === "331524521") {
                    setPdfPath("/assets/pdf/facture hamdi.pdf"); // Exemple : le fichier doit être dans public/assets/pdfs/
                } else if (referenceInput === "336084740") {
                    setPdfPath("/assets/pdf/facture ameni.pdf"); // Exemple : le fichier doit être dans public/assets/pdfs/
                } else {
                    // Optionnel : Gérer le cas où aucune référence connue n'est saisie
                    setPdfPath(""); // Aucune facture PDF à afficher
                }
                // --- FIN DE LA LOGIQUE PDF ---

                setReferenceInput('');
                setSelectedCompteur([]);
                setNouvelIndex({});
                setShowPdfLink(true); // Afficher le lien pour le PDF après la soumission réussie

            } catch (error) {
                console.error('Erreur lors de l\'envoi:', error);
                // Vous pouvez gérer l'affichage d'un message d'erreur ici
                setErrorMessage('Une erreur est survenue lors de l\'enregistrement de l\'auto-relève.');
                // setShowPdfLink(false); // Ne pas afficher le lien PDF en cas d'erreur si vous préférez
            }
        }
    };

    // Cette fonction sert à masquer le message de confirmation et le lien PDF
    const handleClosePdfLink = () => {
        setShowPdfLink(false);
        setPdfPath(''); // Réinitialise le chemin du PDF pour les soumissions futures
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
                                {selectedCompteur
                                    .slice()
                                    .sort((a, b) => {
                                        // Tri pour mettre "Eclairage" en premier
                                        if (a.libelle.trim() === "Eclairage".trim() && b.libelle.trim() !== "Eclairage".trim()) {
                                            return -1;
                                        }
                                        if (a.libelle.trim() !== "Eclairage".trim() && b.libelle.trim() === "Eclairage".trim()) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                                    .map((compteur) => (
                                        <tr key={compteur.id}>
                                            <td>{compteur.reference}</td>
                                            <td>{compteur.libelle}</td>
                                            <td>{compteur.ancienIndex}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={nouvelIndex[compteur.id] || ''}
                                                    onChange={(e) => handleNouvelIndexChange(compteur.id, e.target.value)}
                                                    required
                                                    min={compteur.ancienIndex || 0}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <button type="submit">Envoyer</button>
                    </form>
                )}

                {/* --- AFFICHAGE DU LIEN PDF APRÈS SOUMISSION --- */}
                {showPdfLink && ( // N'afficher ce bloc que si showPdfLink est vrai
                    <div className="confirmation-message-pdf">
                        <p>Votre auto-relève a été enregistrée avec succès !</p>
                        {pdfPath ? ( // N'afficher le lien que si un chemin PDF a été défini
                            <a
                                href={pdfPath}
                                target="_blank" // Ouvre dans un nouvel onglet/fenêtre
                                rel="noopener noreferrer" // Bonne pratique de sécurité
                                className="pdf-button"
                                style={{
                                    display: 'inline-block',
                                    backgroundColor: '#28a745', // Couleur verte pour le bouton
                                    color: 'white',
                                    padding: '10px 20px',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    marginTop: '15px',
                                    marginRight: '10px' // Ajout d'une marge à droite
                                }}
                            >
                                Afficher la Facture 
                            </a>
                        ) : (
                            // Message si aucun PDF n'est associé à cette référence
                            <p style={{ color: '#6c757d', marginTop: '10px' }}>
                                Aucune facture PDF n'est disponible pour cette référence.
                            </p>
                        )}
                        <button
                            onClick={handleClosePdfLink}
                            style={{
                                backgroundColor: '#dc3545', // Couleur rouge pour le bouton Fermer
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '15px'
                            }}
                        >
                            Fermer
                        </button>
                    </div>
                )}
                {/* --- FIN DE L'AFFICHAGE DU LIEN PDF --- */}
            </div>
        </div>
    );
}

export default STEGInterface;
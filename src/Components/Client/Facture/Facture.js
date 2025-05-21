// // import React, { useState } from 'react';
// // import { collection, query, where, getDocs } from 'firebase/firestore';
// // import { db } from '../../../firebase';
// // import './Facture.css'; // Importez le fichier CSS

// // function Facture() {
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [referenceInput, setReferenceInput] = useState('');
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const [factureDetails, setFactureDetails] = useState(null);
// //     const [showPayment, setShowPayment] = useState(false);
// //     const [showImage, setShowImage] = useState(false);


    
// //     const verifierReference = async () => {
// //         setFactureDetails(null);
// //         setShowImage(false); // Cacher l'image lors d'une nouvelle vérification
// //         setErrorMessage('');
// //         setIsLoading(true);

// //         try {
// //             const factureRef = collection(db, 'Facture');
// //             const q = query(factureRef, where('reference', '==', referenceInput));
// //             const querySnapshot = await getDocs(q);

// //             if (!querySnapshot.empty) {
// //                 const factureData = querySnapshot.docs[0].data();
// //                 setFactureDetails(factureData);
// //                 setErrorMessage('');
// //             } else {
// //                 setErrorMessage('Aucune facture trouvée avec cette référence.');
// //             }
// //         } catch (error) {
// //             console.error('Erreur lors de la vérification:', error);
// //             setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     const handlePayerClick = () => {
// //         setShowPayment(true);
// //     };

// //     const handleAfficherImageClick = () => {
// //         setShowImage(true);
// //     };

// //     const renderPaymentInterface = () => {
// //         const currentMinutes = new Date().getMinutes();
// //         const currentSeconds = new Date().getSeconds();
// //         const remainingMinutes = 14 - (currentMinutes % 15); 
// //         const remainingSeconds = 60 - currentSeconds;

// //         return (
// //             <div className="payment-interface">
// //                 <h2>Paiement Sécurisé</h2>
// //                 <p className="order-number">Numéro de la commande: N°8036742</p>
// //                 <p className="session-timer">Il reste jusqu'à la fin de la session {remainingMinutes} min. {remainingSeconds} sec.</p>

// //                 <div className="payment-form">
// //                     <div className="form-group">
// //                         <label htmlFor="cardNumber">Numéro de la carte</label>
// //                         <input type="text" id="cardNumber" placeholder="Numéro de la carte" />
// //                     </div>
// //                     <div className="form-row">
// //                         <div className="form-group">
// //                             <label htmlFor="expiryMonth">Mois</label>
// //                             <select id="expiryMonth">
// //                                 <option value="">--</option>
// //                                 {Array.from({ length: 12 }, (_, i) => (
// //                                     <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
// //                                         {(i + 1).toString().padStart(2, '0')}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className="form-group">
// //                             <label htmlFor="expiryYear">Année</label>
// //                             <select id="expiryYear">
// //                                 <option value="">--</option>
// //                                 {Array.from({ length: 10 }, (_, i) => (
// //                                     <option key={new Date().getFullYear() + i} value={new Date().getFullYear() + i}>
// //                                         {new Date().getFullYear() + i}
// //                                     </option>
// //                                 ))}
// //                             </select>
// //                         </div>
// //                         <div className="form-group">
// //                             <label htmlFor="cvv">Code de sécurité</label>
// //                             <input type="text" id="cvv" placeholder="CVV" />
// //                         </div>
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="cardHolderName">Le nom du détenteur</label>
// //                         <input type="text" id="cardHolderName" placeholder="Nom sur la carte" />
// //                     </div>
// //                     <div className="form-group">
// //                         <label htmlFor="email">Adresse e-mail</label>
// //                         <input type="email" id="email" placeholder="Votre adresse e-mail" />
// //                     </div>
// //                     <button className="pay-button">Paiement {factureDetails?.montant || '85.000'} TND</button>
// //                 </div>

// //                 <button className="cancel-button" onClick={() => setShowPayment(false)}>Annuler</button>
// //                 <p className="secure-payment">Paiement sécurisé</p>
// //                 <div className="payment-methods">
// //                     <span className="method-icon">Visa</span>
// //                     <span className="method-icon">Mastercard</span>
// //                 </div>
// //             </div>
// //         );
// //     };

// //     const renderImageDisplay = () => {
// //         if (factureDetails && factureDetails.imageUrl) {
// //             console.log(factureDetails.imageUrl)
// //             return (
// //                 <div className="image-display">
// //                     <h3>Image de la Facture</h3>
                    
// //                     <button >Imprimer</button>
// //                     <img src={factureDetails.imageUrl} alt="Facture" style={{ maxWidth: '100%', height: '100%' }} />
// //                     <button onClick={() => setShowImage(false)}>Fermer </button>
// //                 </div>
// //             );
// //         }
// //         return null;
// //     };

// //     return (
// //         <div className="steg-interface">
// //             <div className="auto-releve">
// //                 <p className="reference-label">Référence de la Facture</p>
// //                 <div className="reference-input">
// //                     <input
// //                         type="text"
// //                         placeholder="Saisir la référence de la facture"
// //                         value={referenceInput}
// //                         onChange={(e) => setReferenceInput(e.target.value)}
// //                         disabled={isLoading || showPayment || showImage}
// //                     />
// //                     <button
// //                         onClick={verifierReference}
// //                         disabled={isLoading || !referenceInput || showPayment || showImage}
// //                     >
// //                         {isLoading ? 'Vérification...' : 'Vérifier'}
// //                     </button>
// //                 </div>

// //                 {errorMessage && (
// //                     <div className="error-message">
// //                         {errorMessage}
// //                     </div>
// //                 )}

// //                 {factureDetails && !showPayment && !showImage && (
// //                     <div className="facture-details">
// //                         <h3>Détails de la Facture</h3>
// //                         <p>Référence: {factureDetails.reference}</p>
// //                         <p>Montant: {factureDetails.montant} DT</p>
// //                         <div className="facture-actions">
// //                             <button onClick={handlePayerClick}>Payer</button>
// //                             {factureDetails.imageUrl && (
// //                                 <button onClick={handleAfficherImageClick} style={{ backgroundColor: '#007bff', color: 'black', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '1em', marginLeft: '10px' }}>Afficher la Facture</button>
// //                             )}
// //                         </div>
// //                     </div>
// //                 )}

// //                 {showPayment && factureDetails && renderPaymentInterface()}

// //                 {showImage && factureDetails && renderImageDisplay()}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Facture;




// import React, { useState } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebase';
// import './Facture.css'; // Importez le fichier CSS

// function Facture() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [referenceInput, setReferenceInput] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [factureDetails, setFactureDetails] = useState(null);
//     const [showPayment, setShowPayment] = useState(false);
//     const [showPdf, setShowPdf] = useState(false); // Renommé de 'showImage' à 'showPdf'

    
//     const verifierReference = async () => {
//         setFactureDetails(null);
//         setShowPdf(false); // Cacher le PDF lors d'une nouvelle vérification
//         setErrorMessage('');
//         setIsLoading(true);

//         try {
//             const factureRef = collection(db, 'Facture');
//             const q = query(factureRef, where('reference', '==', referenceInput));
//             const querySnapshot = await getDocs(q);

//             if (!querySnapshot.empty) {
//                 const factureData = querySnapshot.docs[0].data();
//                 setFactureDetails(factureData);
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage('Aucune facture trouvée avec cette référence.');
//             }
//         } catch (error) {
//             console.error('Erreur lors de la vérification:', error);
//             setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePayerClick = () => {
//         setShowPayment(true);
//     };

//     // Renommé de handleAfficherImageClick à handleAfficherPdfClick
//     const handleAfficherPdfClick = () => {
//         setShowPdf(true);
//     };

//     const renderPaymentInterface = () => {
//         const currentMinutes = new Date().getMinutes();
//         const currentSeconds = new Date().getSeconds();
//         const remainingMinutes = 14 - (currentMinutes % 15); 
//         const remainingSeconds = 60 - currentSeconds;

//         return (
//             <div className="payment-interface">
//                 <h2>Paiement Sécurisé</h2>
//                 <p className="order-number">Numéro de la commande: N°8036742</p>
//                 <p className="session-timer">Il reste jusqu'à la fin de la session {remainingMinutes} min. {remainingSeconds} sec.</p>

//                 <div className="payment-form">
//                     <div className="form-group">
//                         <label htmlFor="cardNumber">Numéro de la carte</label>
//                         <input type="text" id="cardNumber" placeholder="Numéro de la carte" />
//                     </div>
//                     <div className="form-row">
//                         <div className="form-group">
//                             <label htmlFor="expiryMonth">Mois</label>
//                             <select id="expiryMonth">
//                                 <option value="">--</option>
//                                 {Array.from({ length: 12 }, (_, i) => (
//                                     <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
//                                         {(i + 1).toString().padStart(2, '0')}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="expiryYear">Année</label>
//                             <select id="expiryYear">
//                                 <option value="">--</option>
//                                 {Array.from({ length: 10 }, (_, i) => (
//                                     <option key={new Date().getFullYear() + i} value={new Date().getFullYear() + i}>
//                                         {new Date().getFullYear() + i}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="cvv">Code de sécurité</label>
//                             <input type="text" id="cvv" placeholder="CVV" />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="cardHolderName">Le nom du détenteur</label>
//                         <input type="text" id="cardHolderName" placeholder="Nom sur la carte" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Adresse e-mail</label>
//                         <input type="email" id="email" placeholder="Votre adresse e-mail" />
//                     </div>
//                     <button className="pay-button">Paiement {factureDetails?.montant || '85.000'} TND</button>
//                 </div>

//                 <button className="cancel-button" onClick={() => setShowPayment(false)}>Annuler</button>
//                 <p className="secure-payment">Paiement sécurisé</p>
//                 <div className="payment-methods">
//                     <span className="method-icon">Visa</span>
//                     <span className="method-icon">Mastercard</span>
//                 </div>
//             </div>
//         );
//     };

//   const renderPdfDisplay = () => { // Renommé de renderImageDisplay à renderPdfDisplay
//         // Assurez-vous que factureDetails.pdfUrl existe et contient l'URL de votre PDF
//         if (factureDetails && factureDetails.pdfUrl) { 
//             console.log(factureDetails.pdfUrl)
//             return (
//                 <div className="pdf-display"> {/* Changé la classe CSS si nécessaire */}
//                     <h3>Facture PDF</h3>
//                     {/* Utilisation de la balise iframe pour afficher le PDF */}
//                     <iframe 
//                         src={factureDetails.pdfUrl} 
//                         // AJUSTEZ CES VALEURS POUR AUGMENTER LA TAILLE DU PDF
//                         width="100%"   // Vous pouvez mettre une valeur en pixels ou en pourcentage
//                         height="800px" // Augmenté la hauteur, par exemple
//                         title="Facture PDF"
//                         style={{ border: 'none' }} // Style optionnel pour enlever la bordure de l'iframe
//                     ></iframe>
//                     <button onClick={() => setShowPdf(false)}>Fermer </button>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="steg-interface">
//             <div className="auto-releve">
//                 <p className="reference-label">Référence de la Facture</p>
//                 <div className="reference-input">
//                     <input
//                         type="text"
//                         placeholder="Saisir la référence de la facture"
//                         value={referenceInput}
//                         onChange={(e) => setReferenceInput(e.target.value)}
//                         disabled={isLoading || showPayment || showPdf} // Mis à jour pour showPdf
//                     />
//                     <button
//                         onClick={verifierReference}
//                         disabled={isLoading || !referenceInput || showPayment || showPdf} // Mis à jour pour showPdf
//                     >
//                         {isLoading ? 'Vérification...' : 'Vérifier'}
//                     </button>
//                 </div>

//                 {errorMessage && (
//                     <div className="error-message">
//                         {errorMessage}
//                     </div>
//                 )}

//                 {factureDetails && !showPayment && !showPdf && ( // Mis à jour pour showPdf
//                     <div className="facture-details">
//                         <h3>Détails de la Facture</h3>
//                         <p>Référence: {factureDetails.reference}</p>
//                         <p>Montant: {factureDetails.montant} DT</p>
//                         <div className="facture-actions">
//                             <button onClick={handlePayerClick}>Payer</button>
//                             {/* Assurez-vous que votre document Firebase contient 'pdfUrl' */}
//                             {factureDetails.pdfUrl && ( 
//                                 <button onClick={handleAfficherPdfClick} 
//                                 style={{ backgroundColor: '#007bff', color: 'black',
//                                      border: 'none', borderRadius: '4px',
//                                       padding: '8px 12px', cursor: 'pointer',
//                                        fontSize: '1em', marginLeft: '10px' }}>Afficher la Facture (PDF)</button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {showPayment && factureDetails && renderPaymentInterface()}

//                 {showPdf && factureDetails && renderPdfDisplay()} {/* Afficher le PDF si showPdf est true */}
//             </div>
//         </div>
//     );
// }

// export default Facture;
import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import './Facture.css'; // Importez le fichier CSS

function Facture() {
    const [isLoading, setIsLoading] = useState(false);
    const [referenceInput, setReferenceInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [factureDetails, setFactureDetails] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    // Plus besoin de l'état showPdf car nous ouvrons dans une nouvelle fenêtre

    
    const verifierReference = async () => {
        setFactureDetails(null);
        // setShowPdf(false); // Plus nécessaire
        setErrorMessage('');
        setIsLoading(true);

        try {
            const factureRef = collection(db, 'Facture');
            const q = query(factureRef, where('reference', '==', referenceInput));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const factureData = querySnapshot.docs[0].data();
                setFactureDetails(factureData);
                setErrorMessage('');
            } else {
                setErrorMessage('Aucune facture trouvée avec cette référence.');
            }
        } catch (error) {
            console.error('Erreur lors de la vérification:', error);
            setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePayerClick = () => {
        setShowPayment(true);
    };

    // Cette fonction n'est plus nécessaire car le lien gère l'ouverture
    // const handleAfficherPdfClick = () => {
    //     setShowPdf(true);
    // };

    const renderPaymentInterface = () => {
        const currentMinutes = new Date().getMinutes();
        const currentSeconds = new Date().getSeconds();
        const remainingMinutes = 14 - (currentMinutes % 15); 
        const remainingSeconds = 60 - currentSeconds;

        return (
            <div className="payment-interface">
                <h2>Paiement Sécurisé</h2>
                <p className="order-number">Numéro de la commande: N°8036742</p>
                <p className="session-timer">Il reste jusqu'à la fin de la session {remainingMinutes} min. {remainingSeconds} sec.</p>

                <div className="payment-form">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Numéro de la carte</label>
                        <input type="text" id="cardNumber" placeholder="Numéro de la carte" />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expiryMonth">Mois</label>
                            <select id="expiryMonth">
                                <option value="">--</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                                        {(i + 1).toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryYear">Année</label>
                            <select id="expiryYear">
                                <option value="">--</option>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={new Date().getFullYear() + i} value={new Date().getFullYear() + i}>
                                        {new Date().getFullYear() + i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">Code de sécurité</label>
                            <input type="text" id="cvv" placeholder="CVV" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardHolderName">Le nom du détenteur</label>
                        <input type="text" id="cardHolderName" placeholder="Nom sur la carte" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adresse e-mail</label>
                        <input type="email" id="email" placeholder="Votre adresse e-mail" />
                    </div>
                    <button className="pay-button">Paiement {factureDetails?.montant || '85.000'} TND</button>
                </div>

                <button className="cancel-button" onClick={() => setShowPayment(false)}>Annuler</button>
                <p className="secure-payment">Paiement sécurisé</p>
                <div className="payment-methods">
                    <span className="method-icon">Visa</span>
                    <span className="method-icon">Mastercard</span>
                </div>
            </div>
        );
    };

    // Cette fonction n'est plus nécessaire car le PDF s'ouvre dans une nouvelle fenêtre/onglet
    // const renderPdfDisplay = () => {
    //     return null;
    // };

    return (
        <div className="steg-interface">
            <div className="auto-releve">
                <p className="reference-label">Référence de la Facture</p>
                <div className="reference-input">
                    <input
                        type="text"
                        placeholder="Saisir la référence de la facture"
                        value={referenceInput}
                        onChange={(e) => setReferenceInput(e.target.value)}
                        // showPdf n'est plus un critère de désactivation
                        disabled={isLoading || showPayment}
                    />
                    <button
                        onClick={verifierReference}
                        // showPdf n'est plus un critère de désactivation
                        disabled={isLoading || !referenceInput || showPayment}
                    >
                        {isLoading ? 'Vérification...' : 'Vérifier'}
                    </button>
                </div>

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                {factureDetails && !showPayment && ( // Mis à jour pour ne pas dépendre de showPdf
                    <div className="facture-details">
                        <h3>Détails de la Facture</h3>
                        <p>Référence: {factureDetails.reference}</p>
                        <p>Montant: {factureDetails.montant} DT</p>
                        <div className="facture-actions">
                            <button onClick={handlePayerClick}>Payer</button>
                            {factureDetails.pdfUrl && ( 
                                  <a
                                    href={factureDetails.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-link"
                                    style={{ backgroundColor: '#007bff', color: 'black', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer', fontSize: '1em', marginLeft: '10px', textDecoration: 'none' }}
                                >
                                    Afficher la Facture (PDF)
                                </a>
                            
                            )}
                        </div>
                    </div>
                )}

                {showPayment && factureDetails && renderPaymentInterface()}

                {/* Plus besoin d'appeler renderPdfDisplay ici */}
                {/* {showPdf && factureDetails && renderPdfDisplay()} */}
            </div>
        </div>
    );
}

export default Facture;
import React from 'react';

const MyPdfViewer = () => {
  const handleViewPdf = () => {
    // Remplacez 'chemin/vers/votre/fichier.pdf' par le chemin réel de votre PDF
    // Assurez-vous que le fichier PDF est accessible publiquement (par exemple, dans le dossier 'public' de votre projet React)
    window.open('/assets/imgs/steg.pdf', '_blank');
  };

  return (
    <div>
      <h1>Afficher un PDF</h1>
      <button onClick={handleViewPdf}>
        Voir le PDF
      </button>
    </div>
  );
};

export default MyPdfViewer;
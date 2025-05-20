// SatisfactionPage.jsx
import React, { useState } from 'react';
import styles from './SatisfactionPage.module.css'; // Pour les CSS Modules, ou './SatisfactionPage.css' pour CSS classique

const SatisfactionPage = () => {
  const [rating, setRating] = useState(0); // 0 = pas encore noté
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous enverriez les données de satisfaction à votre backend
    // Par exemple, en utilisant fetch ou axios
    console.log('Satisfaction soumise :', { rating, comment });
    setIsSubmitted(true);
    // Dans une vraie application, vous enverriez ces données et géreriez la réponse du serveur.
    // Pour cet exemple, nous simulons juste la soumission.
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i <= rating ? styles.filledStar : ''}`}
          onClick={() => handleRatingClick(i)}
          aria-label={`${i} étoiles sur 5`}
          role="button"
          tabIndex="0"
        >
          &#9733; {/* Unicode star character */}
        </span>
      );
    }
    return stars;
  };

  if (isSubmitted) {
    return (
      <div className={styles.satisfactionContainer}>
        <div className={styles.thankYouMessage}>
          <h2 className={styles.thankYouTitle}>Merci pour votre feedback !</h2>
          <p className={styles.thankYouText}>Votre avis est précieux et nous aide à nous améliorer.</p>
          <button
            className={styles.resetButton}
            onClick={() => {
              setIsSubmitted(false);
              setRating(0);
              setComment('');
            }}
          >
            Donner un autre avis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.satisfactionContainer}>
      <h1 className={styles.title}>Votre avis compte !</h1>
      <p className={styles.introText}>
        Aidez-nous à améliorer nos services en nous donnant votre feedback.
      </p>

      <form onSubmit={handleSubmit} className={styles.satisfactionForm}>
        <div className={styles.ratingSection}>
          <p className={styles.ratingLabel}>Comment évalueriez-vous votre satisfaction ?</p>
          <div className={styles.starsContainer}>
            {renderStars()}
          </div>
          {rating > 0 && <p className={styles.currentRatingText}>Vous avez donné {rating} étoile{rating > 1 ? 's' : ''}.</p>}
        </div>

        <div className={styles.commentSection}>
          <label htmlFor="comment" className={styles.commentLabel}>
            Avez-vous des commentaires supplémentaires ? (Facultatif)
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.commentField}
            placeholder="Écrivez votre message ici..."
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={rating === 0} // Désactiver le bouton si aucune note n'est sélectionnée
        >
          Envoyer mon avis
        </button>
      </form>
    </div>
  );
};

export default SatisfactionPage;
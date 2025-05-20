// ContactUs.jsx
import React, { useState } from 'react';
import styles from './ContactUs.module.css'; // Pour les CSS Modules, ou './ContactUs.css' pour CSS classique

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous enverriez les données du formulaire à votre backend
    // Par exemple, en utilisant fetch ou axios
    console.log('Données du formulaire soumises :', formData);
    alert('Message envoyé ! Nous vous contacterons bientôt.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Réinitialiser le formulaire
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contactez-nous</h1>
      <p className={styles.introText}>
        Nous sommes là pour vous aider ! Remplissez le formulaire ci-dessous ou utilisez les informations de contact directes.
      </p>

      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nom :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Votre nom"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Votre email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>Sujet :</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Sujet de votre message"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message :</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textareaField}
                placeholder="Écrivez votre message ici..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>Envoyer le message</button>
          </form>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Nos coordonnées</h2>
          <p className={styles.contactInfoItem}>
            <strong>Email :</strong> <a href="mailto:contact@votreentreprise.com">dpsc@steg.com.tn</a>
          </p>

          


          <p className={styles.contactInfoItem}>
            <strong>Téléphone 1:</strong> <a href="tel:+21612345678">(+216) 71 349 981</a>
          </p>
           <p className={styles.contactInfoItem}>
            <strong>Téléphone 2:</strong> <a href="tel:+21612345678">(+216) 71 341 401</a>
          </p>
           <p className={styles.contactInfoItem}>
            <strong>Fax:</strong> <a href="tel:+21612345678">(+216) 71 330 174</a>
          </p>
          <p className={styles.contactInfoItem}>
            <strong>Adresse :</strong> Tunis ,Adresse : 38 rue Kamel Ataturk 1080 Tunis ,Adresse Postale : BP 190, 1080 Tunis cedex
          </p>
          <p className={styles.contactInfoItem}>
            <strong>Horaires :</strong> Du lundi au vendredi, 9h00 - 17h00
          </p>
          {/* Optionnel: Ajoutez une carte Google Maps */}
          
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.279767936662!2d10.183786015291418!3d36.80649497994648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f5a6f2b0d2d3d3%3A0x6b0d2d3d3d3d3d3d!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2stn!4v1678901234567!5m2!1sen!2stn"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Notre emplacement sur Google Maps"
            ></iframe>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
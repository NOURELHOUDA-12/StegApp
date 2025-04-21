import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("client ordinaire"); // Default value

  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      // Créer l'utilisateur avec Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Ajouter les données dans Firestore avec l'UID comme ID du document
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        type: userType,
      });
  
      console.log("Utilisateur créé avec UID : ", user.uid);
      alert("Inscription réussie !");
      navigate("/"); // Redirection après l'inscription
    } catch (e) {
      console.error("Erreur lors de l'inscription : ", e);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert("Les mots de passe ne correspondent pas.");
  //     return;
  //   }

  //   try {
  //     // Ajout des données dans Firestore
  //     const docRef = await addDoc(collection(db, "users"), {
  //       name: name,
  //       email: email,
  //       password: password,
  //       type: userType, 
  //     });
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     console.log("Document written with ID: ", docRef.id);
  //     alert("Inscription réussie!");
  //     navigate("/"); // Redirect to login after successful signup
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     alert("Erreur lors de l'inscription. Veuillez réessayer.");
  //   }
  // };

  return (
    <section className="signup-container">
      <div className="radius-shape-1"></div>
      <div className="radius-shape-2"></div>

      <div className="bg-glass">
        <div className="login-header">
          <img src={'./assets/imgs/STEG (2).png'} alt="Logo de la société" className="login-logo" />
        </div>
        <h2>Inscription</h2>
        <br />
        <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="userType">Type d'utilisateur :</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="client ordinaire">client ordinaire</option>
              <option value="Service dépannage ">Service dépannage </option>
              <option value="Service Etude">Service Etude</option>
              <option value="Service gaz">Service gaz</option>
              <option value="Service Clientéle">Service Clientéle</option>
              <option value="Service Traveaux">Service Traveaux</option>
              <option value="Service Laboratoire">Service Laboratoire</option>
              <option value="Service dépannage ">Service dépannage </option>

              {/* <option value="Agent">Agent</option> */}
              
             
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="name">Nom :</label>
            <input
              type="text"
              id="name"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            S'inscrire
          </button>
        </form>
        <p className="login-link-text">
          Vous avez déjà un compte ?{" "}
          <Link to="/" className="login-link">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
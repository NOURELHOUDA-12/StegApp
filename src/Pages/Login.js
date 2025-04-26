import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Import db as well
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      // 1. Authenticate user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.email)
      console.log(user.name)

    
      console.log("UID utilisateur :", user.uid);

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);


      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log("Coordonnées de l'utilisateur connecté:");
        console.log("Nom:", userData.name); 
        console.log("Email:", userData.email);
        console.log("Type:", userData.type); 
     
        if(( userData.type=="client pro")||( userData.type=="client Professionnel")){
          navigate("/HomePage/FirstPage");
        }
        else{
          setError("vous n'etes pas un client")
        }

      } else {
        console.log("Erreur: Les informations de l'utilisateur n'ont pas été trouvées dans Firestore.");
        setError("Erreur lors de la récupération des informations utilisateur.");
        
      }

    

    } catch (error) {
      setError("Email ou mot de passe incorrect");
      console.error("Erreur d'authentification :", error.message);
    }
  };
 ;

  return (
    <section className="login-container">
      <div className="steg-slogan">
        <h1>
          <span style={{ color: '#0066cc' }}> Le monde change,</span>
          <span style={{ color: '#ff0000' }}> la STEG évolue</span>
        </h1>
      </div>

     

      <div className="bg-glass">
        <div className="login-header">
          <img src={'./assets/imgs/STEG (2).png'} alt="Logo de la société" className="login-logo" />
          <h2>Connexion</h2>
        </div>

        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="login-button">
            Se connecter
          </button>
          <p className="signup-text">
            Vous n'avez pas de compte ?{" "}
            <Link to="/Signup" className="signup-link">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
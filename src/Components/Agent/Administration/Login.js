// import React, { useState } from "react";
// import "../../../Pages/Login.css";
// import "./LoginAdministration.css"

// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../../firebase"; // Import db as well
// import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

  
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Veuillez remplir tous les champs");
//       return;
//     }

//     try {
//       // 1. Authenticate user with email and password
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       console.log(user.email)
//       console.log(user.name)

      
//       console.log("UID utilisateur :", user.uid);

//       const userDocRef = doc(db, "users", user.uid);
//       const userDocSnapshot = await getDoc(userDocRef);


//       if (userDocSnapshot.exists()) {
//         const userData = userDocSnapshot.data();
//         console.log("Coordonnées de l'utilisateur connecté:");
//         console.log("Nom:", userData.name); 
//         console.log("Email:", userData.email);
//         console.log("Type:", userData.type); 
        
//         if( userData.type=="Service dépannage "){
//           navigate("/ServiceDepannage/ReclamationDepanage");
//         }
//         if( userData.type=="Service gaz"){
//           navigate("/ServiceGaz/ReclamationGaz");
//         }
//         else{
//           setError("vous n'etes pas un Agent")
//         }

        
//       } else {
//         console.log("Erreur: Les informations de l'utilisateur n'ont pas été trouvées dans Firestore.");
//         setError("Erreur lors de la récupération des informations utilisateur.");
      
//       }

    

//     } catch (error) {
//       setError("matricule ou mot de passe incorrect");
//       console.error("Erreur d'authentification :", error.message);
//     }
//   };
 
//   return (
//     <section className="loginAdmin-container">
//       <div className="steg-slogan">
//         <h1>
//           <span style={{ color: '#0066cc' }}> Le monde change,</span>
//           <span style={{ color: '#ff0000' }}> la STEG évolue</span>
//         </h1>
//       </div>

     

//       <div className="bg-glass">
//         <div className="login-header">
//           <img src={'./assets/imgs/STEG (2).png'} alt="Logo de la société" className="login-logo" />
//           <h2>Connexion</h2>
//         </div>

//         <form onSubmit={handleLogin}>
//           {error && <p className="error-message">{error}</p>}
//           <div className="input-group">
//             <label htmlFor="email">matricule :</label>
//             <input
//               type="text"
//               id="email"
//               placeholder="Entrez votre matricule"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Mot de passe :</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Entrez votre mot de passe"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">
//             Se connecter
//           </button>
//           <p className="signup-text">
//             Vous n'avez pas de compte ?{" "}
//             <Link to="/SignupAdministration" className="signup-link">
//               Créer un compte
//             </Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useState } from "react";
import "../../../Pages/Login.css";
import "./LoginAdministration.css"

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; // <-- Import Firestore query functions

const Login = () => {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!matricule || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      // 1. Rechercher l'email correspondant au matricule dans Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("matricule", "==", matricule));
setMatricule(q)
console.log(matricule)


      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Matricule introuvable.");
        return;
      }

      // Supposons que le matricule est unique, donc on prend le premier résultat
      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      // 2. Authentifier avec l'email trouvé et le mot de passe entré
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;





      console.log("Utilisateur connecté:", user.email);
      
      if( userData.matricule ==="80100"){
        navigate("/AdminDashbord");
      }

      if (userData.type === "Service dépannage ") {
        navigate("/ServiceDepannage/ReclamationDepanage");
      } 
      else if (userData.type === "Service gaz") {
        navigate("/ServiceGaz/ReclamationGaz");
       
      }
      else if (userData.type === "Service Clientéle") {
        navigate("/ServiceClientele/ReclamationCLientele");
       
      }
       else {
        setError("Vous n'êtes pas un agent autorisé./ ou votre service n'est pas en cours mis à jour");
      }

    } catch (error) {
      setError("Matricule ou mot de passe incorrect.");
      console.error("Erreur d'authentification :", error.message);
    }
  };

  return (
    <section className="loginAdmin-container">
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
            <label htmlFor="matricule">Matricule :</label>
            <input
              type="text"
              id="matricule"
              placeholder="Entrez votre matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
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
            <Link to="/SignupAdministration" className="signup-link">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;

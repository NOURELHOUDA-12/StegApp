import React from 'react';  
import { Routes, Route } from 'react-router-dom';  
import Template from './Pages/Template22';  
import Home from './Pages/Home';  
import About from './Pages/About';  
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Contactez_nous from './Pages/Contact/Contactez'
import Réclamation from './Components/Client/Reclamation/Reclamation'
import ListeRéclamation from './Components/Client/Reclamation/RéclamationAgent'
import AgentTemplate from './Pages/Template/AgentTemplate'


import AccueilAgent2 from './Pages/Agent/Accueil/accueil'
import Projects from'./Pages/Project/Project'
 import TemplateHamdi from './Pages/Template/TemplateHamdi'
 import HomePage from './Components/Client/HomePage/HomePage'
 import FirstPage from './Components/Client/FirstPage/FirstPage'
 import AgentPage from './Components/Agent/Agent'
 import AccueilAgent  from'./Components/Agent/AccueilAdgent'
 import ListeReclamation from'./Components/Agent/ListReclamation/ListReclamation'
import  StegHome from './Components/SitePage/SitePage'
import LoginAdministration from './Components/Agent/Administration/Login'
import ServiceDepannage from "./Components/Services/ServicesDépanage/ServiceDepanage"
import ReclamationDepanage from './Components/Services/ServicesDépanage/ListeReclamation'
 import Messages from './Components/Client/Message/Message'
 import SignupAdministration from './Components/Agent/Administration/SignUpAdministration'
 import AutoReleve from './Components/Client/Autoreleve/Autoreleve'
 import Facture from './Components/Client/Facture/Facture'
 import ServiceGaz from'./Components/Services/ServiceGaz/ServiceGaz'
 import ReclamationGaz from './Components/Services/ServiceGaz/ReclamationsGaz'
 import RDV from './Components/Client/Rendez_vous/Rendez_vous'
function App() {  
  return (  
    <Routes>  
       <Route path="/" element={<StegHome />}></Route>
       <Route path="/Login" element={<Login />}></Route>
       <Route path="/LoginAdministration" element={<LoginAdministration />}></Route>
       <Route path="/Signup" element={<SignUp />}></Route>
       <Route path="/SignupAdministration" element={<SignupAdministration />}></Route>
      


       <Route path="/AgentPage" element={<AgentPage />}>
       <Route path="AccueilAgent" element={<AccueilAgent />} /> 
       <Route path="ListeReclamation" element={<ListeReclamation />} /> 
       </Route>

       {/* Service Depannage */}
       <Route path="/ServiceDepannage" element={<ServiceDepannage />}>
       <Route path="ReclamationDepanage" element={<ReclamationDepanage />} /> 
       </Route>

      {/* Service Gaz */}
      <Route path="/ServiceGaz" element={<ServiceGaz/>}>
      <Route path="ReclamationGaz" element={<ReclamationGaz />} /> 
       </Route>

       <Route path="/HomePage" element={<HomePage />}>
       <Route path="FirstPage" element={<FirstPage />} /> 
       <Route path="FirstPageeeeeeeeeeeeeeeeeeeeeeeee" element={<FirstPage />} /> 
       <Route path="Réclamation" element={<Réclamation />} />  
       <Route path="Messages" element={<Messages />} />  
       <Route path="AutoReleve" element={<AutoReleve />} /> 
       <Route path="Facture" element={<Facture />} /> 
       <Route path="RDV" element={<RDV />} /> 
       </Route>
     




      <Route path="/template" element={<Template />}>  
        <Route path="home" element={<Home />} />  
        <Route path="Contactez_nous" element={<Contactez_nous />} />  
        <Route path="about" element={<About />} /> 
        <Route path="Projects" element={<Projects />} /> 
        <Route path="Réclamation" element={<Réclamation />} />  
        
      </Route>  
      <Route path="/TemplateHamdi" element={<TemplateHamdi />}>  
      </Route>

      <Route path="/AgentTemplate" element={<AgentTemplate />}>  
      <Route path="AccueilAgent2" element={<AccueilAgent2 />} />  
      <Route path="ListeRéclamation" element={<ListeRéclamation />} />  
      </Route> 
    </Routes>  


  );  
}  

export default App;  

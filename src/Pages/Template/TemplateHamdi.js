import React from 'react';
import { Activity } from 'lucide-react';
import './TemplateHamdi.css'
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-[#002B5C] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Activity size={40} className="text-red-500" />
          </div>
          <nav className="space-x-6 text-right">
            <a href="#" className="hover:text-gray-300">Accueil</a>
            <a href="#" className="hover:text-gray-300">Actualités</a>
            <a href="#" className="hover:text-gray-300">Rendez-vous</a>
            <a href="#" className="hover:text-gray-300">Se connecter</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
            <a href="#" className="hover:text-gray-300">Satisfaction</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#002B5C] mb-12">
          Bienvenue dans votre espace
        </h1>

        <div className="space-y-4 max-w-2xl">
          <button className="w-full bg-[#002B5C] text-white py-4 px-6 rounded-lg text-left text-xl hover:bg-[#003872]">
            Réclamation
          </button>
          <button className="w-full bg-[#002B5C] text-white py-4 px-6 rounded-lg text-left text-xl hover:bg-[#003872]">
            Autorelevé
          </button>
          <button className="w-full bg-[#002B5C] text-white py-4 px-6 rounded-lg text-left text-xl hover:bg-[#003872]">
            Payer la facture
          </button>
        </div>
      </main>

      <footer className="bg-[#002B5C] text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2025 My STEG. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
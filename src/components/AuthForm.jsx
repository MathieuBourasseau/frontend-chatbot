import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function AuthForm() {

    // --- DEFINE STATES --- 
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className="flex items-start justify-center bg-[#003c57] min-h-screen w-full pt-20">

            {/* SHOW REGISTER OR LOGIN FORM */}
            <form 
                action="" 
                className="flex flex-col items-center h-auto bg-transparent border-1 border-gray-300 p-6 rounded-xl gap-4">
                <legend className="text-lg font-bold text-white">Connexion</legend>
                <fieldset className="flex flex-col gap-4">

                    {/* USERNAME INPUT */}
                    <div className="flex items-center p-2 justify-between border-2 border-gray-300 rounded-xl text-sm bg-transparent">
                        <input 
                            type="text" 
                            placeholder="Nom d'utilisateur" 
                            className="placeholder-white outline-none"
                        />
                        <FaUserCircle className="text-white" />
                    </div>

                    {/* EMAIL INPUT */}
                    <div className="flex items-center p-2 justify-between border-2 border-gray-300 bg-transparent rounded-xl text-sm">
                        <input 
                            type="email" 
                            placeholder="monadresse@mail.com" 
                            className="placeholder-white outline-none"
                        />
                        <FaAt className="text-white" />
                    </div>

                    {/* PASSWORD INPUT */}
                   <div className="flex items-center p-2 justify-between border-2 border-gray-300 bg-transparent rounded-xl text-sm">
                        <input 
                            type="password" 
                            placeholder="Mot de passe" 
                            className="placeholder-white outline-none"
                        />
                        <FaEye className="text-white" />
                    </div>

                    {/* SAVE USER INFORMATION OR FORGOT PASSWORD */}
                    <div className="flex gap-2 text-sm text-white">
                        <input type="checkbox" /> Se souvenir de moi
                        <button
                            className="cursor-pointer font-bold"
                        >Mot de passe oublié ?</button>
                    </div>

                    {/* CONNECTION */}
                    <button
                        className="bg-gray-300 p-2 font-bold rounded-full"
                    >
                        Se connecter
                    </button>

                    {/* REGISTER */}
                    <button
                        className="text-white"
                    >
                        Pas encore de compte ? {''} 
                        <span className="font-bold cursor-pointer">
                           S'inscrire
                        </span>
                    </button>

                </fieldset>
            </form>
        </div>
    )
}



// Objectif : créer un composant authForm.jsx qui est capable de détecter s'il s'agit d'une connexion ou d'une inscription et qui s'affiche uniquement si la personne n'est pas connectée.

// Logique à suivre pour développer cette fonctionnalité : 

// 1 - Créer les formulaires :

// Affichage conditionnel du formulaire d'inscription :

// On définit un état const [isRegister, setIsRegister] = useState(false);
// Si l'utilisateur clique sur s'inscrire : setIsRegister(!isRegister)
// On affiche alors le formulaire d'inscription.
// On récupère les valeurs saisies par l'utilisateur dans les inputs (onChange)
// Au submit du formulaire on fait un fetch vers la route d'inscription du backend (http://localhost:3001/api/signup)
// Puis on redirige l'utilisateur vers la page de connexion

// Affichage par défaut du formulaire de connexion (avec un message qui permet de s'inscrire si on n'est pas inscrit) :

// Si isRegister vaut false, alors on affiche par défaut le formulaire de connexion.
// On récupère les données saisies par l'utilisateur
// Au submit on fait un fetch vers la bonne url du backend (http://localhost:3001/api/login)
// L'objet JSON récupéré contiendra le payload (données utilisateur) + le token


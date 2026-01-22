import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";


export default function AuthForm() {

    // --- DEFINE STATES --- 
    const [isRegister, setIsRegister] = useState(false); // User is not connected by default
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    }) // Form is empty by default

    // --- SHOW REGISTER FORM ---
    const handleRegister = () => {
        setIsRegister(!isRegister)
    };

    // --- HANDLE CHANGE IN FORM INPUT --- 
    const handleChange = (e) => {

        // Get name and value from the targeted element
        const { name, value } = e.target;

        // Update the form with these new data
        setFormData(formData => ({
            ...formData, // previous form with data
            [name]: value, // add key with value
        }));

    }

    return (
        <div className="relative flex items-start justify-center min-h-screen w-full pt-20">

            <ParticlesBackground />

            {/* SHOW REGISTER OR LOGIN FORM */}
            <form
                action=""
                className="z-10 flex flex-col items-center h-auto bg-transparent backdrop-blur-xs border-1 border-gray-300 p-6 rounded-xl gap-4 ">
                <legend className="text-lg font-bold text-white">{isRegister ? "Inscription" : "Connexion"}</legend>
                <fieldset className="flex flex-col gap-4">

                    {/* USERNAME INPUT */}
                    <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="placeholder-white text-white outline-none"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <FaUserCircle className="text-white" />
                    </div>

                    {/* EMAIL INPUT */}
                    {isRegister && (
                        <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent">
                            <input
                                type="email"
                                placeholder="monadresse@mail.com"
                                className="placeholder-white text-white outline-none"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <FaAt className="text-white" />
                        </div>
                    )}


                    {/* PASSWORD INPUT */}
                    <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="placeholder-white text-white outline-none"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FaEye className="text-white" />
                    </div>

                    {/* SAVE USER INFORMATION OR FORGOT PASSWORD */}
                    {!isRegister && (
                        <div className="flex items-center gap-4 text-[12px] text-white">
                            <label htmlFor="" className="flex items-center gap-1">
                                <input type="checkbox" className="cursor-pointer" />
                                <span>Se souvenir de moi</span>
                            </label>
                            <button
                                type="button"
                                className="cursor-pointer font-bold"
                            >Mot de passe oublié ?</button>
                        </div>
                    )}


                    {/* SWITCH TO CONNECTION OR REGISTER */}
                    <button
                        className="bg-gray-300 text-[#003c57] p-2 border-1 border-transparent font-bold rounded-full cursor-pointer hover:bg-transparent hover:border-gray-300 hover:text-white"
                    >
                        {isRegister ? "S'inscrire" : "Se connecter"}
                    </button>
                    <button
                        className="text-white text-sm"
                        type="button"
                        onClick={handleRegister}
                    >
                        {isRegister ? "Vous avez déjà un compte ? " : "Pas encore de compte ? "}
                        {''}
                        <span className="font-bold cursor-pointer">
                            {isRegister ? "Se connecter" : "S'inscrire"}
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


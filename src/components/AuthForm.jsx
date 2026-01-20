import React, { useState } from 'react'

export default function AuthForm() {

    // --- DEFINE STATES --- 
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div>
            Je suis un formulaire
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


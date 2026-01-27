import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";
import { useNavigate } from "react-router-dom";


export default function AuthForm({onLogin}) {

    // --- DEFINE STATES --- 
    const [isRegister, setIsRegister] = useState(false); // User is not connected by default
    const [selectedFile, setSelectedFile] = useState(null); // By default none file is selected
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    }) // Form is empty by default
    const [successMessage, setSuccessMessage] = useState(''); // Success message is empty by default
    
    const navigate = useNavigate()

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
    };

    // --- HANDLE FILE TO LOAD IMAGE ---
    const handleFile = (e) => {

        // Get the file selected by user
        const file = e.target.files[0];

        // Update the state 
        setSelectedFile(file);
    }

    // --- HANDLE SUBMIT IN FORM --- 
    const handleSubmit = async (e) => {

        e.preventDefault() // Prevent the default reset action of form 

        // url variable
        const url = isRegister ? "http://localhost:3001/api/signup" : "http://localhost:3001/api/login";

        // Variables in case of login or signup
        let bodyContent;
        let headersContent;

        // If the user wants to sign up 
        if(isRegister) {

            const registerData = new FormData(); // Create an instance of FormData to send file to backend

            // Add all data put in the form input 
            registerData.append('username', formData.username);
            registerData.append('email', formData.email);
            registerData.append('password', formData.password);

            // If user has selected a file as avatar we send it to backend 
            if(selectedFile) {
                registerData.append('avatar', selectedFile);
            };

            bodyContent = registerData; // registerData is bounded to bodyContent
            headersContent = {}; // We let the browser identify by itself the good content to put in headers

        } else {

            // If the user wants to login
            bodyContent = JSON.stringify(formData); // Get all the value put in formData
            headersContent = { "Content-Type" : "application/json" };

        }
        
        // Fetch data to the backend
        const response = await fetch (url, {
            method: "POST",
            headers: headersContent,
            body: bodyContent,
        });

        const data = await response.json();

        // Verify if the fetch is working
        if(!response.ok) {
            console.log("Erreur :", data.message);
            return;
        }
        
        setSuccessMessage(data.message);

        if(isRegister) {

            // Reset success message and redirect toward login form
            setTimeout(() => {
                setIsRegister(false);
                setSuccessMessage('');
            }, 2000);

        } else {
            // Save token to localStorage, reset the success message and redirect toward user Chat
            
            setTimeout(() => {
                localStorage.setItem("token", data.token);
                onLogin(data.user);
                setSuccessMessage('');
                navigate('/')
            }, 2000);
        }

    }

    return (
        <div className="relative flex flex-col gap-4 items-center justify-start min-h-screen w-full pt-20">

            <ParticlesBackground />

            {/* SHOW REGISTER OR LOGIN FORM */}
            <form
                onSubmit={handleSubmit}
                className="z-10 flex flex-col items-center h-auto bg-transparent backdrop-blur-xs border-1 border-gray-300 p-6 rounded-xl gap-4 ">
                <legend className="text-lg font-bold text-white">{isRegister ? "Inscription" : "Connexion"}</legend>
                <fieldset className="flex flex-col gap-4">

                    {/* USERNAME INPUT */}
                    <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="bg-transparent placeholder-white text-white outline-none"
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
                                className="bg-transparent placeholder-white text-white outline-none"
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
                            className="bg-transparent placeholder-white text-white outline-none"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FaEye className="text-white" />
                    </div>

                    {/* AVATAR INPUT */}
                    {isRegister && (
                        <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent">
                        <input
                            type="file"
                            placeholder="Choisir une image de profil"
                            className="bg-transparent placeholder-white text-white outline-none"
                            name="avatar"
                            onChange={handleFile}
                        />
                        <FaEye className="text-white" />
                    </div>
                    )}
                    

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
            
            {/* SUCCESS MESSAGE */}
            {successMessage && (
                <span 
                    className="flex items-center border-1 border-gray-300 text-gray-300 gap-2 rounded-full text-sm p-2"
                >
                        {successMessage}
                        <FaCheckCircle />
                </span>
            )}
        </div>
    )
}



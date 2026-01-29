import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import ParticlesBackground from "./ParticlesBackground";
import { useNavigate } from "react-router-dom";
import { AiOutlinePicture } from "react-icons/ai";
import { LuTriangleAlert } from "react-icons/lu";

export default function AuthForm({ setUser }) {

    // --- DEFINE STATES --- 
    const [isRegister, setIsRegister] = useState(false); // User is not connected by default
    const [selectedFile, setSelectedFile] = useState(null); // By default none file is selected
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    }) // Form is empty by default
    const [successMessage, setSuccessMessage] = useState(''); // Success message is empty by default
    const [isChecked, setIsChecked] = useState(false); // Remember me is not checked by default
    const [showPassword, setShowPassword] = useState(false); // Password is not shown by default 
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Forgot password is falsy by default
    const [errorMessage, setErrorMessage] = useState(''); // Display error message

    // --- NAVIGATION ---
    const navigate = useNavigate()

    // --- SHOW REGISTER FORM ---
    const handleRegister = () => {
        setIsRegister(!isRegister)
    };

    // --- HANDLE CHECKED --- 
    const handleChecked = (e) => {
        setIsChecked(e.target.checked);
    }

    // --- SHOW PASSWORD --- 
    const displayPassword = () => {
        setShowPassword(!showPassword)
    }

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

        // Create preview url and update states
        if (file) {
            // Update the state 
            setSelectedFile(file);

            // Create preview url
            const imageUrl = URL.createObjectURL(file);

            // update preview state
            setPreviewUrl(imageUrl)
        }
    };

    // --- HANDLE SUBMIT IN FORM --- 
    const handleSubmit = async (e) => {

        e.preventDefault() // Prevent the default reset action of form 

        const API_BASE_URL = import.meta.env.VITE_API_URL;

        // Variables in case of login or signup or forgot password
        let url
        let bodyContent;
        let headersContent;

        // If password is forgotten 
        if (isForgotPassword) {

            // fetching towards password route
            url = `${API_BASE_URL}/forgot-password`;

            // Send JSON
            headersContent = { "Content-Type": "application/json" };

            // Send the email 
            bodyContent = JSON.stringify({ email: formData.email });

        } else if (isRegister) {

            // If user wants to sign up

            // Fetching towards sign up route
            url = `${API_BASE_URL}/signup`;

            const registerData = new FormData(); // Create an instance of FormData to send file to backend

            // Add all data put in the form input 
            registerData.append('username', formData.username);
            registerData.append('email', formData.email);
            registerData.append('password', formData.password);

            // If user has selected a file as avatar we send it to backend 
            if (selectedFile) {
                registerData.append('avatar', selectedFile);
            };

            bodyContent = registerData; // registerData is bounded to bodyContent
            headersContent = {}; // We let the browser identify by itself the good content to put in headers

        } else {

            // If the user wants to login

            // Fetch towards login route
            url = `${API_BASE_URL}/login`;

            // isChecked state is added a this moment
            const loginData = {
                ...formData,
                rememberMe: isChecked,
            };

            bodyContent = JSON.stringify(loginData); // Get all the value put in formData
            headersContent = { "Content-Type": "application/json" };
        };


        // Fetch data to the backend
        const response = await fetch(url, {
            method: "POST",
            headers: headersContent,
            body: bodyContent,
        });

        const data = await response.json();

        // Verify if the fetch is working
        if (!response.ok) {

            setErrorMessage(data.error || "Une erreur est survenue.");
            setTimeout(() => setErrorMessage(''), 4000);

            return;
        }

        setSuccessMessage(data.message);

        if (isRegister) {

            // Reset success message and redirect toward login form
            setTimeout(() => {
                setIsRegister(false);
                setSuccessMessage('');
            }, 2000);

        } else {
            // Save token to localStorage, reset the success message and redirect toward user Chat

            setTimeout(() => {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setSuccessMessage('');
                navigate('/')
            }, 2000);
        }

    }

    return (
        <div className="relative flex flex-col gap-4 items-center justify-start min-h-screen w-full pt-20 md:justify-center md:pt-0">

            <ParticlesBackground />

            {/* SHOW REGISTER OR LOGIN FORM */}
            <form
                onSubmit={handleSubmit}
                className="z-10 flex flex-col items-center h-fit bg-transparent backdrop-blur-xs border-1 border-gray-300 p-6 rounded-xl gap-4 md:max-w-[450px] md:w-full "
            >

                {/* CASE 1 : FORGOT PASSWORD // CASE 2 : NORMAL LOGIN OR REGISTER */}
                {isForgotPassword ? (
                    <>
                        <legend className="text-lg font-bold text-white md:text-2xl lg:text-3xl">Récupérer mot de passe</legend>
                        <fieldset className="flex flex-col gap-4 md:justify-center md:max-w-[350px] md:w-full">
                            <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent  md:text-base lg:text-lg">
                                <input
                                    type="email"
                                    placeholder="monadresse@mail.com"
                                    className="bg-transparent placeholder-white text-white outline-none w-full autofill:bg-transparent transition-colors duration-[5000000s]"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <FaAt className="text-white" />
                            </div>
                            <button
                                className="bg-gray-300 text-[#003c57] p-2 border-1 border-transparent font-bold rounded-full cursor-pointer hover:bg-transparent hover:border-gray-300 hover:text-white md:text-base lg:text-lg"
                                type="submit"
                            >
                                envoyer un lien
                            </button>
                            <button
                                className="text-white text-sm cursor-pointer"
                                onClick={() => setIsForgotPassword(false)}
                                type="button"
                            >
                                Retour à la connexion
                            </button>
                        </fieldset>
                    </>

                ) : (
                    <>
                        <legend className="text-lg font-bold text-white md:text-2xl lg:text-3xl">{isRegister ? "Inscription" : "Connexion"}</legend>
                        <fieldset className="flex flex-col gap-4 md:justify-center md:max-w-[350px] md:w-full">

                            {/* PREVIEW URL */}
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt=""
                                    className="w-20 h-20 rounded-full object-cover border-1 self-center"
                                />
                            )}

                            {/* USERNAME INPUT */}
                            <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent md:text-base lg:text-lg">
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    className="bg-transparent placeholder-white text-white outline-none w-full autofill:bg-transparent transition-colors duration-[5000000s] ease-in-out"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <FaUserCircle className="text-white" />
                            </div>

                            {/* EMAIL INPUT */}
                            {isRegister && (
                                <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent md:text-base lg:text-lg">
                                    <input
                                        type="email"
                                        placeholder="monadresse@mail.com"
                                        className="bg-transparent placeholder-white text-white outline-none w-full"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <FaAt className="text-white" />
                                </div>
                            )}

                            {/* PASSWORD INPUT */}
                            <div className="flex items-center p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent  md:text-base lg:text-lg">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    className="bg-transparent placeholder-white text-white outline-none w-full"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                {showPassword ? (
                                    <IoMdEyeOff
                                        className="cursor-pointer text-white"
                                        onClick={displayPassword}
                                    />
                                ) : (

                                    <FaEye
                                        className="cursor-pointer text-white"
                                        onClick={displayPassword}
                                    />
                                )}
                            </div>

                            {/* AVATAR INPUT */}
                            {isRegister && (
                                <div className="flex items-center w-full">
                                    <input
                                        type="file"
                                        className="hidden"
                                        name="avatar"
                                        onChange={handleFile}
                                        id="avatar-upload"
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="cursor-pointer flex items-center w-full p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent md:text-base lg:text-lg"
                                    >
                                        <span className="text-white">
                                            {selectedFile ? selectedFile.name : "Ajouter une photo de profil"}
                                        </span>

                                        <AiOutlinePicture className="text-white" />
                                    </label>
                                </div>
                            )}


                            {/* SAVE USER INFORMATION OR FORGOT PASSWORD */}
                            {!isRegister && (
                                <div className="flex items-center  gap-4 text-[12px] text-white md:text-base md:gap-6">
                                    <label htmlFor="" className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            className="cursor-pointer"
                                            onChange={handleChecked}
                                            value={isChecked}
                                        />
                                        <span>Se souvenir de moi</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="cursor-pointer font-bold"
                                        onClick={() => setIsForgotPassword(!isForgotPassword)}
                                    >Mot de passe oublié ?
                                    </button>
                                </div>
                            )}


                            {/* SWITCH TO CONNECTION OR REGISTER */}
                            <button
                                className="bg-gray-300 text-[#003c57] p-2 border-1 border-transparent font-bold rounded-full cursor-pointer hover:bg-transparent hover:border-gray-300 hover:text-white md:text-base lg:text-lg"
                            >
                                {isRegister ? "S'inscrire" : "Se connecter"}
                            </button>
                            <button
                                className="text-white text-sm  md:text-base lg:text-lg"
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
                    </>
                )}
            </form>

            {/* SUCCESS OR ERROR MESSAGE */}

            {(successMessage || errorMessage) && (
                <span
                    className="flex items-center border-1 border-gray-300 text-gray-300 gap-2 rounded-full text-sm p-2"
                >
                    {successMessage ? (
                        <>
                            {successMessage}
                            < FaCheckCircle />
                        </>

                    ) : (
                        <>
                            {errorMessage}
                            <LuTriangleAlert />
                        </>
                    )}
                </span>
            )}
        </div>
    )
}



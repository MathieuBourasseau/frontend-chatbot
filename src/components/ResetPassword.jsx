import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://backend-chatbot-v3xr.onrender.com/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Mot de passe changé avec succès");
                setTimeout(() => {
                    setPassword('');
                    setMessage('');
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(data.error || "Une erreur est survenue");
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="relative flex flex-col gap-4 items-center justify-start min-h-screen w-full pt-20 md:justify-center md:pt-0">

            <ParticlesBackground />

            <form
                onSubmit={handleSubmit}
                className="z-10 flex flex-col items-center h-fit bg-transparent backdrop-blur-xs border-1 border-gray-300 p-6 rounded-xl gap-4 md:max-w-[450px] md:w-full"
            >
                <legend className="text-lg font-bold text-white md:text-2xl lg:text-3xl">
                    Nouveau mot de passe
                </legend>

                <fieldset className="flex flex-col gap-4 md:justify-center md:max-w-[350px] md:w-full">

                    <div className="flex items-center gap-4 p-4 justify-between border-1 border-gray-300 rounded-full text-sm bg-transparent md:gap-2 md:text-base lg:text-lg">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nouveau mot de passe"
                            className="bg-transparent placeholder-white text-white outline-none w-full"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="cursor-pointer text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <IoMdEyeOff /> : <FaEye />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-300 text-[#003c57] text-sm p-2 border-1 border-transparent font-bold rounded-full cursor-pointer hover:bg-transparent hover:border-gray-300 hover:text-white md:text-base lg:text-lg transition-all"
                    >
                        Changer le mot de passe
                    </button>

                </fieldset>
            </form>

            {message && (
                <span className="z-10 flex items-center border-1 border-gray-300 text-gray-300 gap-2 rounded-full text-sm p-2">
                    {message}
                    {message.includes("succès") && <FaCheckCircle />}
                </span>
            )}
        </div>
    );
}
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

export default function ResetPassword() {

    const { token } = useParams(); // get the :token in the request
    const [password, setPassword] = useState(''); // By default the password is empty
    const [message, setMessage] = useState(''); // By default no message


    return (
        <form>
            <div>
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                />
                <span
                    className="cursor-pointer text-white"
                    onClick={displayPassword}
                >
                    {showPassword ? (
                        <IoMdEyeOff />
                    ) : (
                        <FaEye onClick={displayPassword} />
                    )}
                </span>
            </div>
            <button
                type="submit"
            >

            </button>
        </form>
    )
}

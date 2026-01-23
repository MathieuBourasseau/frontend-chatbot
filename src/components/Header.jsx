import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="p-4">

            {/* MOBILE NAV */}
            <nav
                className="flex items-center justify-between lg:hidden">
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer"
                >  
                    {isOpen ? <ImCross className="text-[#003C57]" /> : <GiHamburgerMenu className="text-[#003C57]" />  }
                </button>
                <h1 className="font-bold">Projet LLM</h1>
                <span>user data</span>
            </nav>
        </header>
    )
}

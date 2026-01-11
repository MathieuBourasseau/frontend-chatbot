import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";


export default function Panel() {

    // Menu is closed by default
    const [isOpen, setIsOpen] = useState(false);

    // Open and close the panel
    const togglePanel = () => {
        setIsOpen(!isOpen)
    };


    return (
        <aside className={`h-screen flex flex-col gap-8 bg-teal-200 p-4 ${isOpen ? "max-w-[300px]" : "max-w-[50px]"}`}>

            {/* OPEN/CLOSE PANEL */}
            <div className="flex justify-between items-center">

                <button 
                    onClick={togglePanel}
                    className="cursor-pointer"
                >
                    {isOpen ? <ImCross /> : <GiHamburgerMenu />}
                </button>

                {/* SEARCH FORMER CHATS */}
                <button>
                    <FaSearch className={isOpen ? "block" : "hidden"} />
                </button>
            </div>

            {/* NEW CHAT */}
            <div>
                <button
                    onClick={togglePanel}
                >
                    <CiCirclePlus className="text-lg cursor-pointer" strokeWidth={2} />
                    {isOpen}
                </button>
            </div>

            {/* CHATS BLOC*/}
            <div>
                <h2 className="font-semibold">Chats</h2>
                <div>
                    <h2>Titre</h2>
                    <h2>Titre</h2>
                    <h2>Titre</h2>
                    <h2>Titre</h2>
                    <h2>Titre</h2>
                    <h2>Titre</h2>
                </div>
            </div>
        </aside>
    )
}

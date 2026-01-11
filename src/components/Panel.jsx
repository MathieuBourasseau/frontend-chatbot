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
        <aside className={
            `h-screen flex flex-col gap-8 bg-teal-200 p-4 transition-all duration-200 ease-in-out
            ${isOpen ? "max-w-[300px]" : "max-w-[50px]"}`}>

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
                    <FaSearch className={isOpen ? "opacity-100" : "opacity-0"} />
                </button>
            </div>

            {/* NEW CHAT */}
            <div>
                <button
                    onClick={togglePanel}
                    className="flex items-center gap-4 cursor-pointer font-bold whitespace-nowrap overflow-hidden"
                >
                    <CiCirclePlus className="text-lg" strokeWidth={2} />
                    {isOpen && 
                        <span className="">Lancer un nouveau chat</span>
                    }
                </button>
            </div>

            {/* CHATS BLOC*/}
            <div className={isOpen ? "opacity-100 whitespace-nowrap" : "opacity-0"}>
                <h2 className="font-semibold">Chats</h2>
                <div>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                    <h2>Lorem ipsum dolor sit amet.</h2>
                </div>
            </div>
        </aside>
    )
}

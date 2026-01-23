import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import PanelButton from "./PanelButton";


export default function Panel({ setCurrentChatId, chatsList, setChatsList, user, className }) {

    // Menu is closed by default
    const [isOpen, setIsOpen] = useState(false);

    // Open and close the panel
    const togglePanel = () => {
        setIsOpen(!isOpen)
    };

    return (
        <aside
            className={
                `${className} h-screen flex flex-col gap-8 bg-[#003c57] p-4 transition-all duration-200 ease-in-out
            ${isOpen ? "w-[350px]" : "w-[50px]"}`}
        >

            {/* OPEN/CLOSE PANEL */}
            <div className="flex justify-between items-center">

                <PanelButton
                    onClick={togglePanel}
                    icon={isOpen ? <ImCross className="text-white" /> : <GiHamburgerMenu className="text-white" />}
                    show={true}
                />

                {/* SEARCH FORMER CHATS */}

                <PanelButton
                    show={isOpen}
                    icon={<FaSearch className="text-white" />}
                    delay="delay-100"
                />
            </div>

            {/* NEW CHAT */}
            <div>
                <button
                    onClick={() => {
                        togglePanel();
                        setCurrentChatId(null) // Put ID to null to start a new chat
                    }}
                    className="flex items-center gap-4 cursor-pointer font-bold whitespace-nowrap overflow-hidden "
                >
                    <CiCirclePlus className="text-xl text-white" strokeWidth={2} />
                    <span className={`
                        transition-all 
                        ${isOpen ? "duration-200 delay-30 opacity-100 text-white" :
                            "opacity-0  delay-0 duration-0"}
                        `}
                    >Lancer un nouveau chat</span>

                </button>
            </div>

            {/* CHATS BLOC*/}
            <div className={`
                custom-scrollbar
                transition-all flex flex-col gap-4 overflow-y-auto pr-2
                ${isOpen ? "duration-200 delay-10 opacity-100 whitespace-nowrap text-white" :
                    "opacity-0 delay-0 duration-0"}
                `}>
                <h2 className="font-bold text-xl">Chats</h2>
                <div
                    className="flex flex-col gap-4 items-start"
                >

                    {/* FETCH CHATS TO THE FRONT */}
                    {chatsList && chatsList.map(chat => (
                        <button
                            key={chat.id}
                            onClick={() => setCurrentChatId(chat.id)}
                            className="rounded-lg w-full text-left cursor-pointer font-semibold hover:bg-[#F8532A] py-2 pl-2"
                        >
                            <span className="block truncate text-white">{chat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}

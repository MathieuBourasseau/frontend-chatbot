import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import PanelButton from "./PanelButton";


export default function Panel({ setCurrentChatId, chatsList, setChatsList, user, isOpen, setIsOpen, className }) {

    return (
        <aside
            className={`
                ${className} 
                h-full flex flex-col gap-8 bg-[#003c57]
                w-[350px] shrink-0 p-4 transition-none
                absolute top-0 left-0 z-0
                lg:relative lg:z-auto lg:block
            `}
        >

            {/* OPEN/CLOSE PANEL */}
            <div className="flex justify-between items-center">

                <PanelButton
                    onClick={() => setIsOpen(!isOpen)}
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
                        setIsOpen(!isOpen)
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

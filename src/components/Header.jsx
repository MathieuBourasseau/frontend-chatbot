import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";

export default function Header({ isOpen, setIsOpen, currentChatId, chatsList, user }) {

    // --- DEFINE STATE ---
    const [isDisconnected, setIsDisconnected] = useState(false);


    // --- FIND CURRENTCHAT AND ITS TITLE
    const currentChat = chatsList ? chatsList.find(c => c.id === currentChatId) : null;
    const currentTitle = currentChat ? currentChat.name : "Projet LLM";

    return (
        <header className="p-4">

            {/* MOBILE NAV */}
            <nav
                className="flex items-center justify-between lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer"
                >
                    {!isOpen && (
                        <GiHamburgerMenu className="text-[#003C57]" />
                    )}
                </button>
                <h1 className="font-bold text-[#003c57]">{currentTitle}</h1>
            </nav>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:block lg:flex lg:justify-between lg:items-center lg:relative">
                <h1 className="text-[#003c57]">Projet portfolio LLM</h1>

                {/* SHOW CHAT TITLE IF EXISTING */}
                {currentChat && (
                    <h2 className="font-bold truncate">{currentTitle}</h2>
                )}

                {/* SHOW USER AVATAR */}
                {user.avatar ? (
                    <span
                        className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-[#003C57] shadow-sm"
                        onClick={() => setIsDisconnected(!isDisconnected)}
                    >
                        <img src={user.avatar} alt="Avatar de l'utilisateur" />
                    </span>
                ) : (
                    <span
                        className="cursor-pointer w-10 h-10 rounded-full font-bold flex items-center justify-center border-3 border-[#003C57] shadow-sm"
                        onClick={() => setIsDisconnected(!isDisconnected)}
                    >
                        {user.username[0].toUpperCase()}
                    </span>
                )}

                {/* DISCONNECTION DESKTOP */}
                <div
                    className={
                        `z-50 bg-[#003C57] p-2 absolute lg:right-0 lg:top-full rounded-lg text-white transition-all duration-300
                        ${isDisconnected ? "translate-y-2 opacity-100 pointer-events-auto" : "translate-y-0 opacity-0 pointer-events-none"}
                        `}
                >
                    <button
                        type="button"
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        Déconnexion
                        <span><CiLogout /></span>
                    </button>
                </div>


            </nav>
        </header>
    )
}

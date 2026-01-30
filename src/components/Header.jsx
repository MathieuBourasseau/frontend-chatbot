import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ isOpen, setIsOpen, currentChatId, chatsList, user, setUser }) {

    // --- DEFINE STATE ---
    const [isDisconnected, setIsDisconnected] = useState(false);

    const navigate = useNavigate();

    // --- FIND CURRENT CHAT AND ITS TITLE
    const currentChat = chatsList ? chatsList.find(c => c.id === currentChatId) : null;
    const currentTitle = currentChat ? currentChat.name : "Projet LLM";

    // --- HANDLE LOG OUT ---
    const handleLogOut = () => {

        setTimeout(() => {
            setIsDisconnected(false);
            localStorage.removeItem("token");
            sessionStorage.removeItem("currentChatId");
            setUser(null);

        }, 1000)
    };

    return (
        <header className="p-4">

            {/* MOBILE NAV */}

            <nav
                className="flex items-center justify-between relative lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer"
                >
                    {!isOpen && (
                        <GiHamburgerMenu className="text-[#003C57]" />
                    )}
                </button>

                {/* CHAT TITLE */}
                <h1 className="font-bold text-[#003c57]">{currentTitle}</h1>

                 {/* SHOW USER AVATAR */}
                {user.avatar ? (
                    <span
                        className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-[#003C57] shadow-sm overflow-hidden"
                        onClick={() => setIsDisconnected(!isDisconnected)}
                    >
                        <img 
                            src={user.avatar} 
                            alt="Avatar de l'utilisateur" 
                            className="w-full h-full object-cover"
                        />
                    </span>
                ) : (
                    <span
                        className="cursor-pointer w-10 h-10 rounded-full font-bold flex items-center justify-center border-3 border-[#003C57] shadow-sm"
                        onClick={() => setIsDisconnected(!isDisconnected)}
                    >
                        {user.username[0].toUpperCase()}
                    </span>
                )}

                {/* DISCONNECTION MOBILE */}
                <div
                    className={
                        `z-50 bg-[#003C57] p-2 absolute right-0 top-full rounded-lg text-white transition-all duration-300
                        ${isDisconnected ? "translate-y-2 opacity-100 hover:bg-[#F8532A] pointer-events-auto" : "translate-y-0 opacity-0 pointer-events-none"}
                        `}
                >
                    <button
                        type="button"
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={handleLogOut}
                    >
                        Déconnexion
                        <span><CiLogout /></span>
                    </button>
                </div>
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
                        ${isDisconnected ? "translate-y-2 opacity-100 hover:bg-[#F8532A] pointer-events-auto" : "translate-y-0 opacity-0 pointer-events-none"}
                        `}
                >
                    <button
                        type="button"
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={handleLogOut}
                    >
                        Déconnexion
                        <span><CiLogout /></span>
                    </button>
                </div>


            </nav>
        </header>
    )
}

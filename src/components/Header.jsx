import { h1 } from "framer-motion/client";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

export default function Header({ isOpen, setIsOpen, currentChatId, chatsList, user  }) {

    // Find the current chat 
    const currentChat = chatsList ? chatsList.find(c => c.id === currentChatId) : null;

    // Find the title
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
                    {isOpen ? <ImCross className="text-[#003C57]" /> : <GiHamburgerMenu className="text-[#003C57]" />  }
                </button>
                <h1 className="font-bold">{currentTitle}</h1>
                <span>{user.username}</span>
            </nav>
        </header>
    )
}

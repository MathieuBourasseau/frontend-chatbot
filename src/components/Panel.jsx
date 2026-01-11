import React from 'react'
import { ImCross } from "react-icons/im";

export default function Panel() {
    return (
        <aside className="h-screen flex flex-col gap-4 bg-teal-200 max-w-[300px] p-4">

            {/* OPEN/CLOSE PANEL */}
            <div className="flex justify-between items-center">

                {/* OPEN OR CLOSE PANEL */}
                <ImCross />

                {/* SEARCH FORMER CHATS */}
                <span>Recherche</span>
            </div>

            {/* NEW CHAT */}
            <div>
                <button>
                    <span>+</span>
                    Nouveau chat
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

import React from 'react'

export default function PanelButton({ onClick, icon, show, delay }) {
    return (
        <button
            onClick={onClick}
            className={`
                cursor-pointer text-lg ${show ? `opacity-100 duration-200 ${delay}`:
                "opacity-0 delay-0 duration-0 pointer-events-none"}
                `}
        >
            {icon}
        </button>
    )
}

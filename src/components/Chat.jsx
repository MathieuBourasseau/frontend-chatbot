import React, { useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

export default function Chat() {

  // Data simulation : 
  const chatTest = [
    { sender: "ai", text: "Bonjour, comment puis-je vous aider aujourd'hui ? 😊" },
    { sender: "user", text: "Quelle météo fait-il à Clisson ?" },
    { sender: "ai", text: "Il fait aujourd'hui 10°C dans la ville de Clisson." },
    { sender: "user", text: "Va-t-il pleuvoir aujourd'hui ?" },
  ]

 // Define a state to get a simulation of chat by default 
 const [messages, setMessages] = useState(chatTest);

 // Define a state to get an empty textarea by default
  const [message, setMessage] = useState(''); 

 // Update value in the textarea
  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  // Handle key down function 
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  // Handle new message sent in the form 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form event by default

    if(message.trim() === "") return; // Prevent the user to send empty message

    const newMessage = { sender: "user", text: message }; // Get the user message from the textarea
    
    setMessages([...messages, newMessage]); // Create a copy from existing array and add the new message 

    setMessage(''); // Textarea is cleared of its content

    
  }

  return (
    <main className="flex flex-col flex-1 h-screen items-center p-4">

      {/* CHAT TITLE */}
      <header className="p-4 border-b">
        <h1 className="font-bold shrink-0">Météo à Clisson 🌤️</h1>
      </header>

      {/* CHAT MESSAGES */}
      <div className="flex flex-1 flex-col max-w-[850px] w-full overflow-y-auto mx-auto gap-6">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 max-w-[70%] shadow-sm rounded-lg
              ${msg.sender === "user"
                ? "self-end bg-[#003c57] text-white"
                : "self-start border-gray-200"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* CHAT INPUT */}
      <form
        action=""
        onSubmit={handleSubmit}
        className="max-w-[850px] h-[150px] w-full border-2 border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex h-full">

          {/* USER MESSAGES */}
          <textarea
            type="text"
            placeholder="Ecrivez votre question."
            className="h-full flex-1 outline-none resize-none pt-0"
            value={message}
            onChange={handleMessage}
            onKeyDown={handleKeyDown}
          />

          {/* BUTTON TO SEND MESSAGE */}
          <button 
            className="self-end cursor-pointer bg-[#f8532a] p-2"
            type="submit"
          >
            <FaArrowUp className="text-white" />
          </button>
        </div>
      </form>
    </main>
  )
}

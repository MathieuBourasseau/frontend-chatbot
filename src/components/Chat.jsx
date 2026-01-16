import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";

export default function Chat() {

  // Data simulation : 
  const chatTest = [
    { sender: "ai", text: "Bonjour, comment puis-je vous aider aujourd'hui ? 😊" },
  ]

  // --- DEFINE THE STATES --- 
  const [title, setTitle] = useState("Nouveau chat"); // Title by default for a new chat 
  const [messages, setMessages] = useState(chatTest);
  const [message, setMessage] = useState(''); // Message is empty by default
  const [currentChatId, setCurrentChatId] = useState(1);

  // --- SHOW THE CHAT HISTORY WHEN ID CHANGES ---
  useEffect(() => {

    // Function to execute when the chat ID is changing
    const fetchChatHistory = async () => {

      try {
        const response = await fetch(`http://localhost:3001/api/chats/${currentChatId}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
          }
        });

        const data = await response.json();

        // Formatting the data to match with front keys
        const formattedMessages = data.map(msg => ({
          sender: msg.role === "assistant" ? "ai" : "user",
          text: msg.content
        }));

        // Show the messages in the chat
        setMessages(formattedMessages);

      } catch (error) {
        console.error("Erreur lors de la récupération des messages de la conversation.", error);
      }
    };

    // Execute this function only if currentChatId is true
    if (currentChatId) {
      fetchChatHistory();
    }
  }, [currentChatId]); // // Watch currentChatId and re-run the effect on change

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
    // URL by default
    let url = 'http://localhost:3001/api/chats';

    // Bodydata by default 
    let bodyData = { firstMessage: message, user_id: 1 }

    e.preventDefault(); // Prevent the form event by default



    if (message.trim() === "") return; // Prevent the user to send empty message

    const newMessage = { sender: "user", text: message }; // Get the user message from the textarea

    setMessages([...messages, newMessage]); // Create a copy from existing array and add the new message 

    setMessage(''); // Textarea is cleared of its content

    // FETCHING TO THE GOOD URL WITH GOOD CONTENT
    if (currentChatId) {
      url = `http://localhost:3001/api/chats/${currentChatId}/messages`;
      bodyData = { newUserMessage: message };
    }

    // FETCHING message to Mistral API 
    const response = await fetch(url,
      {
        method: "POST", // Add message to database
        headers: {
          'Content-Type': 'application/json', // JSON content sent 
        },
        body: JSON.stringify(bodyData)
      });

    const data = await response.json();

    console.log(data);
    const mistralAnswer = { sender: "ai", text: data.aiReply.content }; // Response from the backend

    // Update the list of messages 
    setMessages((prev) => [...prev, mistralAnswer]);

    // Identify the chat of the current conversation
    if (data.chat) {
      setCurrentChatId(data.chat.id);
      setTitle(data.chat.name);
    };

  }

  return (
    <main className="flex flex-col flex-1 h-screen items-center p-4">

      {/* CHAT TITLE */}
      <header className="p-4 border-b">
        <h1 className="font-bold shrink-0">{title}</h1>
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

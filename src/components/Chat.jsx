import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import mbLogo from '../assets/mbLogo.png'

export default function Chat({ currentChatId, setCurrentChatId, setChatsList, chatsList, user }) {

    // Data simulation : 
    const chatTest = [
        { sender: "ai", text: "Bonjour, comment puis-je vous aider aujourd'hui ? 😊" },
    ]

    // --- DEFINE THE STATES --- 
    const [messages, setMessages] = useState(chatTest);
    const [message, setMessage] = useState(''); // Message is empty by default

    // --- DEFINE THE REF ---
    const messagesEndRef = useRef(null)

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

        // Reset the chat if currentChatId is null
        if (!currentChatId) {
            setMessages([]); // Empty the list of messages
        }
    }, [currentChatId]); // // Watch currentChatId and re-run the effect on change


    // --- SCROLL EFFECT WHEN MISTRAL IS ANSWERING --- 

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    }, [messages])



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

    // --- HANDLE MESSAGES SENT BY USER ---

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

        // FETCHING TO THE GOOD URL WITH GOOD CHAT CONTENT
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

            // Create title in panel only if it's the first message and a new chat
            if (!currentChatId) {
                setChatsList((prev) => [data.chat, ...prev]);
            };

            setCurrentChatId(data.chat.id);
        };

    }

    // --- SHOW THE TITLE CHAT ---

    const currentChatTitle = chatsList.find(chat => chat.id === currentChatId);
    const currentTitle = currentChatTitle ? currentChatTitle.name : "Nouveau chat";

    return (

        <main className={`flex flex-col gap-8 h-full relative w-full items-center ${!currentChatId ? "justify-center" : ""} p-4`}>

            {/* CHAT TITLE */}
            {currentChatId && (
                <header className="p-4 border-b">
                    <h1 className="font-bold shrink-0">{currentTitle}</h1>
                </header>
            )}

            {/* CHAT MESSAGES OR WELCOME MESSAGE */}
            <div className="flex-1 overflow-y-auto">

                {currentChatId ? (
                    <div className="flex flex-1 flex-col max-w-[850px] w-full overflow-y-auto mx-auto gap-6">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-4
                  ${msg.sender === "user"
                                        ? "self-end bg-[#003c57] shadow-sm text-white rounded-lg rounded-tr-none max-w-[70%]"
                                        : "self-start w-full"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="flex h-full justify-center items-center">
                        <h2 className="hidden md:block text-[20px] md:text-[35px] text-[#003C57]">Bonjour {user.username}, comment puis-je vous aider aujourd'hui ?</h2>
                        <img 
                            src={mbLogo} 
                            alt="Logo mb com" 
                            className="max-w-[120px] md:hidden"
                        />
                    </motion.div>
                )}
            </div>

            {/* CHAT INPUT */}
            <form
                action=""
                onSubmit={handleSubmit}
                className="max-w-[850px]  h-[80px] md:h-[150px] w-full border-2 border-gray-200 p-4 rounded-3xl shadow-sm"
            >
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
        </main >
    )
}

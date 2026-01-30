import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import mbLogo from '../assets/mbLogo.png'
import ReactMarkdown from 'react-markdown'

export default function Chat({ currentChatId, setCurrentChatId, setChatsList, chatsList, user }) {

    // Use env variable 
    const API_URL = import.meta.env.VITE_API_URL

    // --- DEFINE STATES ---
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Screen goes to the last message of the chat
    const messagesEndRef = useRef(null)

    // --- LOAD CHAT HISTORY ---
    useEffect(() => {

        const fetchChatHistory = async () => {

            // Get the token
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${API_URL}/chats/${currentChatId}/messages`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                // Verify that the response is ok and an array
                if (response.ok && Array.isArray(data)) {
                    const formattedMessages = data.map(msg => ({
                        sender: msg.role === "assistant" ? "ai" : "user",
                        text: msg.content
                    }));

                    setMessages(formattedMessages);

                } else {
                    // If there is an error we empty messages
                    console.error("Erreur ou format invalide :", data);
                    setMessages([]);

                }
            } catch (error) {
                console.error("Erreur lors de la récupération des messages de la conversation.", error);
            }
        };

        if (currentChatId) {
            fetchChatHistory();
        }

        if (!currentChatId) {
            setMessages([]);
        }
    }, [currentChatId]);


    // Scroll to the last message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    const handleMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    // --- HANDLE SUBMIT FORM ---
    const handleSubmit = async (e) => {

        let url = `${API_URL}/chats`;
        let bodyData = { firstMessage: message, user_id: user.id }

        e.preventDefault();
        if (message.trim() === "") return;

        setIsLoading(true);

        const newMessage = { sender: "user", text: message };

        setMessages([...messages, newMessage]);
        setMessage('');

        try {
            if (currentChatId) {
                url = `${API_URL}/chats/${currentChatId}/messages`;
                bodyData = { newUserMessage: message };
            }

            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(bodyData)
                });

            const data = await response.json();

            if (data.aiReply && data.aiReply.content) {
                const mistralAnswer = { sender: "ai", text: data.aiReply.content };
                setMessages((prev) => [...prev, mistralAnswer]);
            }

            if (data.chat) {

                if (!currentChatId) {
                    setChatsList((prev) => [data.chat, ...prev]);
                };

                setTimeout(() => {

                    setCurrentChatId(data.chat.id);

                }, 500);

            };

        } catch (error) {

            console.error("Erreur :", error);

        } finally {

            setIsLoading(false);

        }
    };

    const currentChatTitle = chatsList.find(chat => Number(chat.id) === Number(currentChatId));
    const currentTitle = currentChatId
        ? (currentChatTitle ? currentChatTitle.name : "Chargement du titre...")
        : "Nouveau chat";

        
    return (
        <main className={`flex flex-col h-full relative w-full items-center p-4 ${messages?.length === 0 ? "justify-center gap-4" : "gap-8"}`}>

            <div className={`w-full max-w-[850px] flex flex-col items-center ${messages?.length ? "flex-1 overflow-y-auto" : "flex-none"}`}>

                {messages?.length ? (
                    <div className="flex flex-col w-full gap-6">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-4 text-sm md:text-base
                                ${msg.sender === "user"
                                        ? "self-end bg-[#003c57] shadow-sm text-white rounded-lg rounded-tr-none max-w-[70%]"
                                        : "self-start w-full"
                                    }`}
                            >
                                {msg.sender === "ai" ? (
                                    <ReactMarkdown className="prose prose-slate max-w-none prose-p:my-4 prose-headings:mt-6 prose-headings:mb-2 prose-li:my-1 whitespace-pre-wrap">
                                        {msg.text}
                                    </ReactMarkdown>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="self-start p-4 bg-gray-100 rounded-lg text-gray-500 italic flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                                />
                                Mistral est en train de réfléchir...
                            </div>
                        )}

                        <div ref={messagesEndRef}></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="flex flex-col items-center">
                        <h2 className="text-center text-[20px] md:text-[28px] text-[#003C57]">Bonjour {user.username}, comment puis-je vous aider aujourd'hui ?</h2>
                        <img
                            src={mbLogo}
                            alt="Logo mb com"
                            className="max-w-[120px] lg:hidden"
                        />
                    </motion.div>
                )}
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-[850px] h-[80px] md:h-[150px] w-full border-2 border-gray-200 p-4 rounded-3xl shadow-sm bg-white"
            >
                <div className="flex h-full">
                    <textarea
                        placeholder="Ecrivez votre question."
                        className="h-full flex-1 outline-none resize-none pt-0"
                        value={message}
                        onChange={handleMessage}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="self-end cursor-pointer bg-[#f8532a] p-2"
                        type="submit"
                    >
                        <FaArrowUp className="text-[12px] text-white md:text-base" />
                    </button>
                </div>
            </form>
        </main >
    )
}
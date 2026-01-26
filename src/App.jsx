import { useEffect, useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
function App() {

  // --- DEFINE THE STATES ---
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatsList, setChatsList] = useState([]);
  const [user, setUser] = useState(null); // No user by default
  const [isOpen, setIsOpen] = useState(false);  // Menu is closed by default

  // --- SHOW ALL THE CHATS HISTORY ---
  useEffect(() => {

    const fetchChatsHistory = async () => {

      try {
        const response = await fetch('http://localhost:3001/api/chats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        setChatsList(data); // Show all the conversation in the panel

      } catch (error) {
        console.error("Erreur lors de l'affichage de la liste des chats.", error);
      }
    }

    fetchChatsHistory();

  }, []);

  return (
    <div className={`relative flex flex-row h-screen overflow-hidden ${user ? "bg-[#003c57] lg:bg-black" : ""}`}>
      {/* DISPLAY FORM IF USER IS NOT CONNECTED */}
      {!user ? (
        <AuthForm onLogin={setUser} />
      ) : (
        <>
          <Panel setCurrentChatId={setCurrentChatId} chatsList={chatsList} setChatsList={setChatsList} user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className={`transition-transform duration-300 bg-white flex flex-col flex-1 h-full z-10 ${isOpen ? "translate-x-[350px]" : "translate-x-0"}`}>
            <Header isOpen={isOpen} setIsOpen={setIsOpen} currentChatId={currentChatId} chatsList={chatsList} user={user} />
            <div className="flex flex-1 overflow-hidden relative">
              <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} setChatsList={setChatsList} chatsList={chatsList} user={user} />
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default App

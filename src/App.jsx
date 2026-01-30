import { useEffect, useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ResetPassword from "./components/ResetPassword";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {

  // --- DEFINE THE STATES ---
  const [chatsList, setChatsList] = useState([]);
  const [user, setUser] = useState(null); // No user by default
  const [isOpen, setIsOpen] = useState(false);  // Menu is closed by default
  const [currentChatId, setCurrentChatId] = useState(() => {
    return sessionStorage.getItem('currentChatId') || null;
  });

  // --- SAVE CURRENT CHAT ID IN SESSION ---
  useEffect(() => {
    if (currentChatId) {
      sessionStorage.setItem('currentChatId', currentChatId);
    } else {
      sessionStorage.removeItem('currentChatId');
    }
  }, [currentChatId]);


  const API_URL = import.meta.env.VITE_API_URL

  // --- VERIFY IF A TOKEN EXISTS AND IF IT IS NOT EXPIRED ---
  useEffect(() => {

    const checkToken = async () => {

      // Read token save in local storage
      const token = localStorage.getItem('token');

      // Stop here if token does not exist
      if (!token) return;



      // Fetch to verify the token
      try {

        const response = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // 
        if (response.ok) {

          const data = await response.json();
          setUser(data.user);

        } else {
          localStorage.removeItem('token');
        }

      } catch (error) {
        console.error("Impossible de contacter le serveur pour vérifier le token", error);
      }
    }

    checkToken();
  }, [])


  // --- SHOW ALL THE CHATS HISTORY ---
  useEffect(() => {

    const fetchChatsHistory = async () => {

      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/chats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        // Verify that answer is an array before updating the state
        if (response.ok && Array.isArray(data)) {

          setChatsList(data);

        } else {
          // if there is an arror we update chat lists to empty
          console.error("Erreur API ou format de données incorrect :", data);
          setChatsList([]);
        }

      } catch (error) {
        console.error("Erreur réseau lors de l'affichage de la liste des chats.", error);
        setChatsList([]);
      }
    }

    if (user) {
      fetchChatsHistory();
    }


  }, [user]);

  return (

    <div className={`relative flex flex-row h-screen overflow-hidden ${user ? "bg-[#003c57] lg:bg-black" : ""}`}>

      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<AuthForm setUser={setUser} />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/chats"
              element={
                <>
                  <Panel setCurrentChatId={setCurrentChatId} chatsList={chatsList} setChatsList={setChatsList} user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
                  <div className={`transition-transform duration-300 bg-white flex flex-col flex-1 h-full z-10 ${isOpen ? "translate-x-[350px]" : "translate-x-0"} lg:translate-x-0`}>
                    <Header isOpen={isOpen} setIsOpen={setIsOpen} currentChatId={currentChatId} chatsList={chatsList} user={user} setUser={setUser} />
                    <div className="flex flex-1 overflow-hidden relative">
                      <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} setChatsList={setChatsList} chatsList={chatsList} user={user} />
                    </div>
                  </div>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/chats" />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App

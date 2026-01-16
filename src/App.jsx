import { useEffect, useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"

function App() {

  // --- DEFINE THE STATES ---
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatsList, setChatsList] = useState([]);

  // --- SHOW ALL THE CHATS HISTORY ---
  useEffect(() => {

    const fetchChatsHistory = async () => {

      try {
        const response = await fetch('http://localhost:3001/api/chats', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json'
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
    <div className="flex">
      <Panel setCurrentChatId={setCurrentChatId} chatsList={chatsList} setChatsList={setChatsList} /> 
      <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} setChatsList={setChatsList} />
    </div>
  )
}

export default App

import { useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"


function App() {

  // --- DEFINE THE STATES ---
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatsList, setChatsList] = useState([]);

  // --- SHOW ALL THE CHATS HISTORY ---

  return (
    <div className="flex">
      <Panel setCurrentChatId={setCurrentChatId} chatsList={chatsList} setChatsList={setChatsList} /> 
      <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} setChatsList={setChatsList} />
    </div>
  )
}

export default App

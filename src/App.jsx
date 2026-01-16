import { useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"


function App() {

  // --- STATE FOR THE CURRENT CHAT ---
  const [currentChatId, setCurrentChatId] = useState(null);

  return (
    <div className="flex">
      <Panel setCurrentChatId={setCurrentChatId} /> 
      <Chat currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
    </div>
  )
}

export default App

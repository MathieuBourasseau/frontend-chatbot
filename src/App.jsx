import { useState } from 'react'
import Panel from './components/Panel'
import Chat from "./components/Chat"


function App() {

  return (
    <div className="flex">
      <Panel />
      <Chat className="flex-1" />
    </div>
  )
}

export default App

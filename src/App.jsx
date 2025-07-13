import { useState } from 'react'
import './App.css'
import { useTheme } from '../src/component/Theme.jsx'
import RouterReact from './component/RouterReact.jsx'
function App() {
  const { toggleTheme } = useTheme();
  return (
   <>
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} />
      </label>

      <RouterReact />
    </>
      
  )
}

export default App

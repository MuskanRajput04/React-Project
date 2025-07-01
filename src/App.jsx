import { useState } from 'react'
import './App.css'
import FormValidation from './component/FormValidation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FormValidation />
  )
}

export default App

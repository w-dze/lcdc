import { useState } from 'react'
import DragDropFiles from './components/DragDropFiles'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>LCDC</h1>
      <DragDropFiles/>
      </div>
    </>
  )
}

export default App

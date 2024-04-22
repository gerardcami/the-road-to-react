import * as React from 'react'
import './App.css'

// Global variable will not be reloaded when the component is re-rendered
const title = 'React'

function App() {
  

  return (
    <div>
      <h1>Hello {title}</h1>
    </div>
  )
}

export default App

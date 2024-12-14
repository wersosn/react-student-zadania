import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Students from './Students'
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
     <Students />
    </>
  )
}

export default App

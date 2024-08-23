import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import FOOOD from "./pages/FOOOD"
import Login from "./pages/Login"

function App() {

  return (
    <div className = "main">
      <BrowserRouter>
        <Routes>
          <Route path="/food" element={<FOOOD/>}/>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App

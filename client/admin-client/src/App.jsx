import { BrowserRouter, Routes, Route } from "react-router-dom"
import TestPage from "./pages/TestPage"
import LandingPage from "./pages/TestPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage/>}/>

        <Route path="/" element={<LandingPage/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App

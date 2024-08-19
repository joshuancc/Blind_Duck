import { BrowserRouter, Routes, Route } from "react-router-dom"
import TestPage from "./pages/TestPage"
import LandingPage from "./pages/TestPage"
import SideBar from "./components/SideBar"

function App() {

  return (
    <main className=" flex-container">
    <SideBar className= "flex-item-left"/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage/>}/>

        <Route path="/" element={<LandingPage/>}/>

      </Routes>
    </BrowserRouter>
    </main>
  )
}

export default App

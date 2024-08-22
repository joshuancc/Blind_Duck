import { BrowserRouter, Routes, Route } from "react-router-dom"
import TestPage from "./pages/TestPage"
import LandingPage from "./pages/LandingPage"
import LandingPage2 from "./components/DashboardLayout"
import DashboardLayout from "./components/DashboardLayout"
import FoodApp from "./pages/FoodAppPage"

function App() {

  return (
    <main className=" flex-container">
    {/*<SideBar className= "flex-item-left"/> */}

    <BrowserRouter>
      <Routes>
        
        <Route path="/TestPage" element={<TestPage/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/FoodApp" element={<FoodApp/>}/>
        <Route path="/Dashboardlayout" element={<DashboardLayout/>}/>


      </Routes>
    </BrowserRouter>
    </main>
  )
}

export default App

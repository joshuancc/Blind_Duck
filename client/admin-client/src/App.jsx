import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./components/DashboardLayout"
import AdminPage from "./pages/AdminPage"

function App() {

  return (
    <main className="flex-container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin-page" element={<AdminPage/>}/>
        <Route path="/dashboard-layout" element={<DashboardLayout/>}/>
      </Routes>
    </BrowserRouter>
    </main>
  )
}

export default App

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/RegisterPage.css"

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3000/api/v1/admins/login", {
      email: email,
      password: password
    })
    .then(response => {
      if (response.status === 200) {
        navigate("/admin-page", { state: { token: response.data.accessToken } })
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        alert("Incorrect password")
      } else if (error.response.status === 404) {
        alert("Admin with email not found")
      }
    })
  }

  return (
    <>
      <div className="centered-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div style={{display: "flex"}}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div style={{display: "flex"}}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input>
          </div>
        <button>Sign in</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../styles/RegisterPage.css"

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (event) => {
    event.preventDefault()
    axios.post("http://localhost:3000/api/v1/admins", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    })
    .then(response => {
      if (response.status === 201) {
        navigate("/login")
      }
    })
    .catch(error => {
      if (error.response.status === 409) {
        alert("Admin with email already exists")
      }
    })
  }

  return (
    <>
      <div className="centered-form">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div style={{display: "flex"}}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div style={{display: "flex"}}>
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" onChange={(e) => setFirstName(e.target.value)} required></input>
          </div>
          <div style={{display: "flex"}}>
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" onChange={(e) => setLastName(e.target.value)} required></input>
          </div>
          <div style={{display: "flex"}}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input>
          </div>
        <button>Sign up</button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage

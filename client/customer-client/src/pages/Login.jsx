
import title from "../assets/title.png"
import axios from 'axios'
import React from "react"
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const Login = () => {

    {/* Variable For Register Error Display */} 
    const [errMsg, setErrMsg] = useState("agag")

    const headers = {
        'Content-Type': 'application/json',
    }

    const navigate = useNavigate()


   const [postEmail, setPostEmail] = useState("")
   const [postPassword, setPostPassword] = useState("")


   const handleEmail = (event) => {
        setPostEmail(event.target.value)
   }
   const handlePassword = (event) => {
        setPostPassword(event.target.value)
   }
  

   function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3000/api/v1/customers/login', {
        email: postEmail,
        password: postPassword
    }, {
        headers: headers
    })
    .then(response => {
        console.log(response)
        if (response.status === 200){
            {/* success msg*/} 
            setErrMsg("We're in Baby! ")
            navigate("/food", {state: {token: response.data.accessToken}})
        }

    })
    .catch(err => {
        console.log(err)
        if (err.response.status === 404){
            {/* exsits msg*/} 
            console.log("aslkgdjasg")
            setErrMsg("Wrong email buddy")
        } else if (err.response.status === 401 ) {
            setErrMsg("Error: Wrong password buddy")
            console.log("asdlg;jas;ksjfl;as")
        } else if (err.response.status === 400 ) {
            setErrMsg("Error: Wrong everything buddy")
        }
    })
   }

    return (
        
        <div className="container">
            <div className="column">
                <img className = "title" src={title}></img>
            </div> 
            
            <div className="column">
                <div className="form">
                    <div className = "formInside">
                        <h1>Login :D</h1>
                        <form onSubmit={handleSubmit} >
                            <label >Email:</label><br></br>
                            <input type="email" htmlFor="email" required onChange={handleEmail} id="email" name="email"></input><br></br>
                            <label> Password:</label><br></br>
                            <input type="password" htmlFor="password"required onChange={handlePassword} id="password" name="password"></input><br></br>
                            <input type="submit" value="Log In"></input>
                        </form>
                        <hr></hr>
                        Don't have an account??? <a href="https://www.w3schools.com/">Sign in</a>
                    </div>
                    <p>{errMsg}</p>
                </div> 
            </div>
            
            <div className="column" >

            </div>
        </div>
    
    )
}

export default Login

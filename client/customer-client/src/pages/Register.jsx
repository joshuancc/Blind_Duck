
import title from "../assets/title.png"
import axios from 'axios'
import React from "react"
import { useState, useEffect } from 'react';

const Register = () => {

    {/* Variable For Register Error Display */} 
    const [errMsg, setErrMsg] = useState("agag")

    const headers = {
        'Content-Type': 'application/json',
    }



   const [postEmail, setPostEmail] = useState("")
   const [postPassword, setPostPassword] = useState("")
   const [postUsername, setPostUsername] = useState("")


   const handleEmail = (event) => {
        setPostEmail(event.target.value)
   }
   const handleUsername = (event) => {
        setPostUsername(event.target.value)
   }
   const handlePassword = (event) => {
        setPostPassword(event.target.value)
   }
  

   function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3000/api/v1/customers', {
        email: postEmail,
        username: postUsername,
        password: postPassword
    }, {
        headers: headers
    })
    .then(response => {
        console.log(response)
        if (response.status === 201){
            {/* success msg*/} 
            setErrMsg("Account Created!")
        }

    })
    .catch(err => {
        console.log(err)
        if (err.response === 409){
            {/* exsits msg*/} 
            setErrMsg("Error: customer with the given email or username already exists.")
        } else if (err.response === 400 ) {
            setErrMsg("Error: Bad Request.")
            console.log("asdlg;jas;ksjfl;as")
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
                        <h1>Register :D</h1>
                        <form onSubmit={handleSubmit} >
                            <label >Email:</label><br></br>
                            <input type="email" htmlFor="email" required onChange={handleEmail} id="email" name="email"></input><br></br>
                            <label> Username:</label><br></br>
                            <input type="text" htmlFor="username"required onChange={handleUsername} id="username" name="username"></input><br></br>
                            <label> Password:</label><br></br>
                            <input type="password" htmlFor="password"required onChange={handlePassword} id="password" name="password"></input><br></br>
                            <input type="submit" value="Create Account"></input>
                        </form>
                        <hr></hr>
                        Already have an account? <a href="http://localhost:5173/login">Sign in</a>
                        Want food?!?11 <a href="http://localhost:5173/food"> FOOOOOOOOOOOOD</a>
                    </div>
                    <p>{errMsg}</p>
                </div> 
            </div>
            
            <div className="column" >

            </div>
        </div>
    
    )
}

export default Register

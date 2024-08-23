import TestComponent from "../components/TestComponent"
import title from "../assets/title.png"
import rice from "../assets/rice.png"
import coffee from "../assets/coffee.png"
import salad from "../assets/salad.png"
import noodles from "../assets/noodles.png"
import axios from 'axios'
import React from "react"
import { useState } from 'react';
import SideBar from "../components/SideBar";



const FOOOD = () => {

  
    return (
        
        <div className="foodContainer">
            <div className="column">
                
                
            </div> 

            <div className="column">

                <h2>Menu</h2>
            </div> 
            
            <div className="foodColumn">
               
               <div className = "foodButton">
                    <p className="foodImage">Rice</p>
                    <img className = "rice" src={rice}></img>
               </div>
               <div className = "foodButton">
                    <p className="foodImage">Nuds</p>
                    <img className = "rice" src={noodles}></img>
               </div>
               <div className = "foodButton">
                    <p className="foodImage">Grass</p>
                    <img className = "salad" src={salad}></img>
               </div>
               <div className = "foodButton">
                    <p className="foodImage">Drugs</p>
                    <img className = "rice" src={coffee}></img>
               </div>
            </div>
            
            <div className="column" >
                <h2>Popular Now</h2>
            </div>
        </div>
    
    )
}

export default FOOOD

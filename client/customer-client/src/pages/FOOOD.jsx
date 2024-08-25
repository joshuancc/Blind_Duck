
import back from "../assets/back.png"
import emptyHeart from "../assets/emptyHeart.png"
import Slide from '@mui/material/Slide';
import axios from 'axios'
import React from "react"
import MenuItem from  "../components/MenuItem";
import { useState } from 'react';
import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom"

const FOOOD = () => {


    const [popupVisible, setPopupVisible] = React.useState(false);

    const headers = {
        'accessToken': 'eyJhbGciOiJIUzhB8yep4yFMYl0yEk-uVYdq6D6jhb63QmQE',
        'Content-Type': 'application/json',
    }

    const location = useLocation();

    const navigate = useNavigate()

    const [quantMap, setQuantMap] = React.useState(new Map())
  

    const [menu, setMenu] = React.useState([])

    const [image, setImage] = React.useState()

    const[des, setDes] = React.useState('')


    const [amount, setAmount] = React.useState(0)

    const [total, setTotal] = React.useState(0)

    const navToCheckout = () =>{
        navigate("/checkout", {state: {token: location.state.token}})
    }

    const amountUp = () => {
        if (quantMap.has(popupName)){
            quantMap.set(popupName, quantMap.get(popupName) + 1)
        } else {      
            quantMap.set(popupName, 1)

        }
      
        setAmount(quantMap.get(popupName))
        setTotal(total + popupPrice)

        axios.post('http://localhost:3000/api/v1/customers/addItem', {
            item: popupName
        }, {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(response => {
            console.log(response)
    
        })

    }

    const amountDown = () => {
        if (quantMap.has(popupName)){
            if (quantMap.get(popupName) > 0 ){
                quantMap.set(popupName, quantMap.get(popupName) - 1)
                setTotal(total - popupPrice)
                setAmount(quantMap.get(popupName))

                axios.post('http://localhost:3000/api/v1/customers/removeItem', {
                    item: popupName
                }, {
                    headers: {
                        Authorization: `Bearer ${location.state.token}`
                    }
                })
                .then(response => {
                    console.log(response)
            
                })
            }
        }
    }


    const [popupPrice, setPopupPrice] = React.useState(0)

    const [popupName, setPopupName] = React.useState('')
    
    const getAmount = () =>{

    }

    const setPopup = (name, price) => {
        
        setPopupPrice({price})
        setPopupName({name})
        setAmount(quantMap.get({popupName}))
        handleChangePopup()
    }

    const handleChangePopup = (name) => {
        
        setPopupVisible((prev) => !prev);
       
        
     
        
    }


    function getFood() {
        axios.get('http://localhost:3000/api/v1/customers/getAllMenuItems')
        .then(response => {
            console.log(response)
            if (response.status === 200){
                {/* success msg*/} 
                console.log(response.data.menuItems)
                setMenu(response.data.menuItems)

            }
    
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 409){
                {/* exsits msg*/} 
            
            } else if (err.response.status === 400 ) {
                console.log("asdlg;jas;ksjfl;as")
            }
        })
    }

  
    const [foodImages, setFoodImages] = useState([]);

    async function getFoodImages(imageNameList) {
        const foodImages = []
        for (const imageName of imageNameList) {
            const response = await fetch(`http://localhost:3000/food-images/${imageName}`)
            if (response.status === 200) {
                const imageBlob = await response.blob()
                const imageObjectURL = URL.createObjectURL(imageBlob)
                foodImages.push(imageObjectURL)
            }
        }
        setFoodImages(foodImages)
    }

    useEffect(() => {
        getFoodImages(["coffee.png", "noodles.png"]);
    }, [])

    useEffect(() => {
        getFood();
    },[])
  
    return (
        
        <div className="foodContainer">
            
            <div className="column">
            
            </div> 

            <div className="column">

                <h2 style = {{fontSize:"90px", fontFamily:"Arial, Helvetica, sans-serif", position:"absolute", top: "-000px"}}>Menu</h2>
                
                <button className = "checkoutButton" onClick={navToCheckout}>
                    <p style = {{color:"white",fontSize:"25px", fontFamily:"Arial, Helvetica, sans-serif", position:"relative", top: "-10px", right: "-5px"}}>Checkout</p>
                </button>

                <div className = "total">
                    <p style = {{color:"white",fontSize:"25px", fontFamily:"Arial, Helvetica, sans-serif", position:"relative", top: "-10px", right: "-15px"}}>Total: ${total}</p>
                </div>
                
            </div> 
            
            <div className="foodColumn">

                {menu.map((menuItem,index) =>(
                    <span key = {index}>
                        <MenuItem desc={menuItem.name} spicy={true} handler = {handleChangePopup} price ={menuItem.price} setName = {setPopupName} setPrice = {setPopupPrice} setAmount={setAmount} amount = {quantMap.get(menuItem.name)} setImage = {setImage} description = {menuItem.description} setDesc={setDes} />
                    </span>
                )) }

                

            </div>

            <Slide direction="up" in={popupVisible} mountOnEnter unmountOnExit>
                <div className="foodPopup">
                    <div className = "buttons">
                        <button style={{backgroundColor: "transparent", border: "none"}} onClick={handleChangePopup} >
                            <img style={{left: "5px", top: "15px",  position: "relative", height: "75%", width: "95%", flex:"1"}} src={back}></img>
                        </button>
                        <button style={{backgroundColor: "transparent", border: "none"}}>
                            <img style={{left: "370px", top: "15px",  position: "relative", height: "75%", width: "95%", flex:"1"}} src={emptyHeart}></img>
                        </button>
                    </div>
                    <div className="foodPopupInside">
                        <img className = "popupImage" src={image}></img>
                        <div style={{textAlign: "center", fontFamily:"Arial, Helvetica, sans-serif", fontSize: "30px"}}>
                            <h3 style={{top: "-170px",  position: "relative", marginLeft: "90px", marginRight: "90px"}}>{popupName}</h3>
                            
                        </div>
                        <div style={{textAlign: "left", fontFamily:"Arial, Helvetica, sans-serif"}}>
                            <p style={{fontSize:"20px",top: "-170px",  position: "relative", marginLeft:"50px", marginRight:"50px"}}>{des}</p>
                        </div>
                        {/*adding to checkout buttons */}
                        <div className="buttons">
                            <div className = "counter">
                                <button style={{background:"transparent", border:"none", fontSize:"25px", marginLeft:"10px"}}onClick={amountDown}>- </button>
                                <p style={{color:"black", fontFamily:"Arial, Helvetica, sans-serif", top: "-15px", left:"35px",  position: "relative", fontSize:"25px"}}>{amount}</p>
                                <button style={{background:"transparent", border:"none", fontSize:"25px", position:"absolute", left:"115px", top:"10px"}} onClick={amountUp}>+</button>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </Slide>
            
            

            
        </div>
    
    )
}

export default FOOOD

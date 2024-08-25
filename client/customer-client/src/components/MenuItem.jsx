import "../styles/styles.css"
import React from "react"
import { useState } from 'react';
import { useEffect } from 'react';

const MenuItem = ({ desc, price, image, handler, setName, setPrice, setAmount, amount, setImage, description, setDesc}) => {

    const [foodImages, setFoodImages] = useState([]);
    const png = '.png'

    const descript = description

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
        getFoodImages([`${desc}${png}`]);
        console.log(`${desc}${png}`)
    }, [])
  
    const usedHandler = () => {

        setDesc(descript)
        setImage(foodImages[0])
        setAmount(amount)
        setName(desc)
        setPrice(price)
 
        handler()
        

        
    }


    return (
        <button className = "foodButton"onClick={usedHandler}>
            <img className = "rice" src={foodImages[0]}></img>
            <p className="foodImage">{desc}</p>
            <h2 className="foodPrice">${price}</h2>
        </button>
    )
}

export default MenuItem

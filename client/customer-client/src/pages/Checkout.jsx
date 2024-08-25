import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import {useLocation} from 'react-router-dom';

const Checkout = () => {
    const [items, setItems] = useState({});
    const [prices, setPrices] = useState({}); // State for storing item prices
    const [checkoutprice, settotalPrices] = useState(0);
    const location = useLocation();

    useEffect(() => {
        checkItem();
    }, []);


useEffect(() => {
    // Calculate total price whenever items or prices change
    const total = Object.entries(items).reduce((acc, [item, quantity]) => {
        const itemPrice = prices[item] || 0;
        return acc + (itemPrice * quantity);
    }, 0);
    settotalPrices(total);
}, [items, prices]);


  
    function checkingOut() {
        console.log("Button clicked, sending POST request...");
        axios.post('http://localhost:3000/api/v1/customers/checkout', {}, {
            headers: {
                authorization: `Bearer ${location.state.token}`
            }
        })
        .then(function (response) {
            console.log("Response received:", response);
        })
        .catch(function (error) {
            console.error("Error during POST request:", error);
        });
    }

    function addItem() {
        axios.post('http://localhost:3000/api/v1/customers/addItem', {
            item: "apple"
        }, {
            headers: {
                authorization: `Bearer ${location.state.token}`
            }
        })
        .then(function (response) {
            console.log("Response received:", response);
        })
        .catch(function (error) {
            console.error("Error during POST request:", error);
        });
    }


    function addItem2() {
        axios.post('http://localhost:3000/api/v1/customers/addItem', {
            item: "bubble tea"
        }, {
            headers: {
                authorization: `Bearer ${location.state.token}`
            }
        })
        .then(function (response) {
            console.log("Response received:", response);
        })
        .catch(function (error) {
            console.error("Error during POST request:", error);
        });
    }

    

    function addItem3() {
        axios.post('http://localhost:3000/api/v1/customers/addItem', {
            item: "orange"
        }, {
            headers: {
                authorization: `Bearer ${location.state.token}`
            }
        })
        .then(function (response) {
            console.log("Response received:", response);
        })
        .catch(function (error) {
            console.error("Error during POST request:", error);
        });
    }


    function checkItem() {
        axios.get('http://localhost:3000/api/v1/customers/checkoutBucket', {
            headers: {
                Authorization: `Bearer ${location.state.token}`
            }
        })
        .then(function (response) {
            console.log("Response received:", response);
            const { customerBucket, price } = response.data;
            setItems(customerBucket.items || {});
            setPrices(price || {});
           
        })
        .catch(function (error) {
            console.error("Error during GET request:", error);
        });
    }




    return (
        <div  >
            <div className='Checkout'>
              
                <div className="header-menu2">

             
            <a href="/food">Home</a>
              
                
                </div>
            </div>
            <h1 className='ChckoutTitle'>Checkout </h1>
            
            <div>
                {//checkItem()
                }



                <FoodCard 
                    text="Your order :" 
                    subtext={Object.entries(items).map(([item, quantity]) => {
                        const itemPrice = prices[item] || 0; // Get the price for the item
                        const totalPrice = itemPrice * quantity; // Calculate total price
                       
                        return (
                            <div className='checkoutItem' key={item}>
                                Item name: {item} x {quantity} = ${totalPrice}
                            </div>
                        );
                    })}
                />
            </div>
          
            <button onClick={checkItem}>My items $</button> 
            <button onClick={addItem}>ADDD $</button>
            <button onClick={addItem2}>ADDD 2$</button>
            <button onClick={addItem3}>ADDD 3$</button>

           
            <button className='custom-btn1  btn-1' onClick={checkingOut}>Checkout &nbsp;  ${checkoutprice} </button>
        </div>
    );
}

export default Checkout;

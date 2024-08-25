import React from 'react'

const FoodCard = ({text,subtext}) => {
  return (
    <div className='FoodCard'>
     <h1>{text}</h1>
     <h3>{subtext}</h3>
    </div>
  )
}

export default FoodCard
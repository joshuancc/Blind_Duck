import React from 'react'

const LandingCard = ({text,subtext}) => {
  return (
    <div className='Landing-Card'>
     <h1>{text}</h1>
     <h3>{subtext}</h3>
    </div>
  )
}

export default LandingCard

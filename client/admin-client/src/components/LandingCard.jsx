import React from 'react'

const LandingCard = ({text,subtext,imageSrc }) => {
  return (
    <div className='Landing-Card'>     
    <h1>{text}</h1>
     <h3>{subtext}</h3>
     {imageSrc && <img src={imageSrc} alt="Decorative" className="card-image" />}

    </div>
  )
}

export default LandingCard

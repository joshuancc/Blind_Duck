import React from 'react'
import HackedEffectWord from './HackedEffectWord'
const HeaderBox = ({type= 'title', title, subtext, firstName, lastName}  ) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
        {title}
        {type === 'greeting' && (
            <span style={{ color: '#DAA276' }}>
                &nbsp; 
                <HackedEffectWord firstName={firstName} lastName={lastName} />
                </span>

        )}
            </h1>
      <p className="header-box-subtext"> {subtext}</p>
    </div>
  )
}

export default HeaderBox

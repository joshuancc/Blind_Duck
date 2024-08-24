import React from 'react'
import HackedEffectWord from './HackedEffectWord'
const HeaderBox = ({type= 'title', title, subtext, user}  ) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
        {title}
        {type === 'greeting' && (
            <span style={{ color: '#DAA276' }}>
                &nbsp; <HackedEffectWord/>
            </span>

        )}
            </h1>
      <p className="header-box-subtext"> {subtext}</p>
    </div>
  )
}

export default HeaderBox

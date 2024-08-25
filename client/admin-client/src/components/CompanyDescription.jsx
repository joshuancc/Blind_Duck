import React from 'react'

const CompanyDescription = () => {
  const descriptionStyle = {
    padding: '20px',
    margin: '20px auto',
    lineHeight: '1.6',
    minWidth: '1600px',
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#333',
    fontFamily: 'Montserrat', 
    backgroundColor: '#FDFDFF',
    borderRadius: '8px',
  };

  const highlightStyle = {
    color: '#DAA276', // Highlight color
    fontWeight: 'bold', // Bold font
  };

  const PaddingStyle = {
    padding: '0px 30px 320px 0px', 
  };

  return (
    <div style={PaddingStyle}>
      <h2 style={descriptionStyle}>
        Data Lab Alexander is a platform for analyzing customer data in a way that is simple to use and pleasing to look at. 
      </h2>
      <h2 style={descriptionStyle}>
        We use multiple graphs to <span style={highlightStyle}>highlight</span> various aspects of your data so that you can quickly identify what matters and make the right decisions. 
      </h2>
    </div>
  );
}

export default CompanyDescription;

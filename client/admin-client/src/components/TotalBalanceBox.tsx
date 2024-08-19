import React from 'react'

const TotalBalanceBox = ({accounts =[], totalBanks, totalBalance}) => {
  return ( 
    <section className='total-balance'>
      <div className='total-balance-chart'>
        {/*chart*/}
      </div>
      <div className='flex flex col gap-6'>
        <h2 className='header-2'>
            Bank account{totalBanks}
            </h2>
        </div>

        <div className="flex flex-col gap-2">
            <p className='total-balance-label'>
            totals balance 
            </p>
            <p className='total-balance-amount flex-center-gap-2'>
                {totalBalance}
                </p>


        </div>
    </section>
  )
}

export default TotalBalanceBox

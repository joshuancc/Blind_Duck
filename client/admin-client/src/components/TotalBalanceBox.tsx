import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import DoughnutChart from './DoughnutChart';

const TotalBalanceBox = ({ accounts = [], totalBanks, totalBalance }) => {
  return (
    <section className="total-balance flex">
      {/* Chart on the left */}
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      {/* Details on the right */}
      <div className="total-balance-details flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>

        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Balance</p>
          <p className="total-balance-amount flex-center-gap-2">
            <AnimatedCounter amount={totalBalance} />

          </p>
          
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;

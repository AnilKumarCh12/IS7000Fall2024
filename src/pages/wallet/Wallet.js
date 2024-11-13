import React, { useState } from 'react';

const dummyData = [
  { company: 'Microsoft', amount: 100, date: '2023-01-01' },
  { company: 'Apple', amount: 200, date: '2023-01-02' },
  { company: 'Amazon', amount: 300, date: '2023-01-03' },
  { company: 'Google', amount: 400, date: '2023-01-04' },
  { company: 'Facebook', amount: 500, date: '2023-01-05' },
  { company: 'IBM', amount: 600, date: '2023-01-06' },
  { company: 'Oracle', amount: 700, date: '2023-01-07' },
  { company: 'SAP', amount: 800, date: '2023-01-08' },
  { company: 'Salesforce', amount: 900, date: '2023-01-09' },
  { company: 'Adobe', amount: 1000, date: '2023-01-10' },
  { company: 'Intel', amount: 1100, date: '2023-01-11' },
  { company: 'Cisco', amount: 1200, date: '2023-01-12' },
  { company: 'HP', amount: 1300, date: '2023-01-13' },
  { company: 'Dell', amount: 1400, date: '2023-01-14' },
  { company: 'VMware', amount: 1500, date: '2023-01-15' },
  { company: 'Intuit', amount: 1600, date: '2023-01-16' },
  { company: 'ServiceNow', amount: 1700, date: '2023-01-17' },
  { company: 'Square', amount: 1800, date: '2023-01-18' },
  { company: 'Shopify', amount: 1900, date: '2023-01-19' },
  { company: 'Workday', amount: 2000, date: '2023-01-20' },
];

function Wallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = dummyData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='text-white flex flex-col items-center w-full h-screen p-4'>
      <h1 className='text-4xl mb-4'>Wallet Transactions</h1>
      <div className='w-full max-w-4xl'>
        {currentTransactions.map((transaction, index) => (
          <div key={index} className='bg-gray-800 p-4 mb-2 rounded'>
            <p>Company: {transaction.company}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {transaction.date}</p>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {[...Array(Math.ceil(dummyData.length / transactionsPerPage)).keys()].map(number => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-500' : 'bg-gray-700'} rounded`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Wallet;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddSpent() {
  const [spendings, setSpendings] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchSpendings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/spending');
      // format the date
      response.data.forEach((spending) => {
        spending.date = new Date(spending.date).toISOString().slice(0, 10);
      });
      setSpendings(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    fetchSpendings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date && amount && category) {
      try {
        // Send a post request to your API endpoint
        const response = await axios.post('http://localhost:3001/api/spending', { date, amount, category });

        // If the request was successful, update your state
        if (response.status === 200) {
          setSpendings([...spendings, { date, amount, category }]);
          setDate(new Date().toISOString().slice(0, 10));
          setAmount('');
          setCategory('');
        }
      } catch (error) {
        // Handle the error
        console.error('There was an error!', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spendings.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(spendings.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }



  return (
    <div className="md:flex md:justify-between gap-20">
      <div className="w-full p-4 md:w-1/2">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Track Spend
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((spending, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{spending.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{spending.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{spending.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
        <nav className="flex items-center justify-between">
          <ul className="flex items-center">
            {pageNumbers.map(number => (
              <li key={number} className={currentPage === number ? "mx-1 px-3 py-2 bg-blue-500 text-white rounded-full" : "mx-1 px-3 py-2 bg-white border border-gray-300 rounded-full"}>
                <button onClick={() => handlePageChange(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      </div>  
      <div className="w-full p-4 md:w-1/2">
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="category"
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <button
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
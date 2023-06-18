/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SpendingForm = ({ onSubmit, selectedRecords, setSelectedRecords }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, amount: Number(amount) , category });
    setDate(new Date().toISOString().slice(0, 10));
    setAmount('');
    setCategory('');
  };

  const handleDelete = async () => {
    try {
      // Assuming selectedRecords is an array of selected record ids
      for (const id of selectedRecords) {
        const response = await axios.delete(`http://localhost:3001/api/spending/${id}`);
        if (response.status === 200) {
          console.log('Spending deleted.');
        }
      }
      // Clear selected records state
      setSelectedRecords([]);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
      <button
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </form>
  );
};

SpendingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedRecords: PropTypes.array.isRequired,
  setSelectedRecords: PropTypes.func.isRequired,
};

export default SpendingForm;

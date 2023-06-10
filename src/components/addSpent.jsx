/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import SpendingsTable from './SpendingsTable';
import SpendingForm from './SpendingForm';
import SpendingsPagination from './SpendingsPagination';

const AddSpent = () => {
  const [spendings, setSpendings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRecords, setSelectedRecords] = useState([]);

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

  useEffect(() => {
    if (selectedRecords.length === 0) {
      fetchSpendings();
    }
  }, [selectedRecords]);

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/spending', data);
      console.log(typeof data.amount);
      // If the request was successful, update your state
      if (response.status === 200) {
        // You may need to handle id here if your spendings require one
        setSpendings(prevSpendings => [...prevSpendings, data]);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spendings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(spendings.length / itemsPerPage);

  return (
    <div className="md:flex md:justify-between gap-20">
      <div className="w-full p-4 md:w-1/2">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Track Spend
        </h1>
        <SpendingsTable spendings={currentItems} selectedRecords={selectedRecords} setSelectedRecords={setSelectedRecords} />
        <SpendingsPagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
      </div>
      <div className="w-full p-4 md:w-1/2">
        <SpendingForm onSubmit={handleFormSubmit} selectedRecords={selectedRecords} setSelectedRecords={setSelectedRecords} />
      </div>
    </div>
  );
};

export default AddSpent;
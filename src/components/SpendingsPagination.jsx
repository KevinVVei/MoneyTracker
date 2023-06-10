/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const SpendingsPagination = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? "mx-1 px-3 py-2 bg-blue-500 text-white rounded-full" : "mx-1 px-3 py-2 bg-white border border-gray-300 rounded-full"}>
              <button onClick={() => onPageChange(number)}>{number}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

SpendingsPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default SpendingsPagination;

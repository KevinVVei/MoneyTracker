/* eslint-disable no-unused-vars */
// import React from 'react';
// import PropTypes from 'prop-types';

// const SpendingsTable = ({ spendings }) => (
//   <table className="min-w-full divide-y divide-gray-200">
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Date
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Amount
//         </th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//           Category
//         </th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {spendings.map((spending, index) => (
//         <tr key={index}>
//           <td className="px-6 py-4 whitespace-nowrap">{spending.date}</td>
//           <td className="px-6 py-4 whitespace-nowrap">{spending.amount}</td>
//           <td className="px-6 py-4 whitespace-nowrap">{spending.category}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// SpendingsTable.propTypes = {
//   spendings: PropTypes.arrayOf(
//     PropTypes.shape({
//       date: PropTypes.string.isRequired,
//       amount: PropTypes.number.isRequired,
//       category: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

// export default SpendingsTable;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SpendingsTable = ({ spendings, selectedRecords, setSelectedRecords }) => {

  const handleRecordClick = (id) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((recordId) => recordId !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  return (
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
        {spendings.map((spending) => (
          <tr
            key={spending._id}
            onClick={() => handleRecordClick(spending._id)}
            className={selectedRecords.includes(spending._id) ? 'selected' : ''}
          >
            <td className="px-6 py-4 whitespace-nowrap">{spending.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{spending.amount}</td>
            <td className="px-6 py-4 whitespace-nowrap">{spending.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SpendingsTable.propTypes = {
  spendings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRecords: PropTypes.array.isRequired,
  setSelectedRecords: PropTypes.func.isRequired,
};

export default SpendingsTable;

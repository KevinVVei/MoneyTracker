/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const SpendingsTable = ({ spendings, selectedRecords, setSelectedRecords }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedSpendings = useMemo(() => {
    let sortableItems = [...spendings];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [spendings, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


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
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => handleSort('date')}>
            Date
            {sortConfig && sortConfig.key === 'date' &&
              (sortConfig.direction === 'ascending'
                ? <FontAwesomeIcon key="dateUp" icon={faArrowUp} />
                : <FontAwesomeIcon key="dateDown" icon={faArrowDown} />)
            }
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={() => handleSort('amount')}>
            Amount
            {sortConfig && sortConfig.key === 'amount' &&
              (sortConfig.direction === 'ascending'
                ? <FontAwesomeIcon key="amountUp" icon={faArrowUp} />
                : <FontAwesomeIcon key="amountDown" icon={faArrowDown} />)
             }
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedSpendings.map((spending) => (
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

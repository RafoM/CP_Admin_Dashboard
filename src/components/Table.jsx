import React from 'react';
import './Table.scss';

const Table = ({ columns = [], data = [] }) => (
  <table className="table">
    <thead>
      <tr>
        {columns.map(col => <th key={col}>{col}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          {columns.map(col => <td key={col}>{row[col]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;

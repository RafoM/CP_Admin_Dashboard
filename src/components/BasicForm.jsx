import React from 'react';

const BasicForm = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="basic-form">
    {children}
  </form>
);

export default BasicForm;

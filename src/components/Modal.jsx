import React from 'react';
import './Modal.scss';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

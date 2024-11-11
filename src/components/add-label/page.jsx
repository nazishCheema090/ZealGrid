// src/components/add-label/AddLabelModal.jsx

import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const AddLabelModal = ({ open, onClose, onAddLabel }) => {
  const [labelName, setLabelName] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = () => {
    if (!labelName || !labelValue) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    onAddLabel({ name: labelName, value: labelValue });
    setLabelName('');
    setLabelValue('');
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="flex flex-col items-center justify-center bg-white p-6 rounded-lg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
        }}
      >
        <h2 className="text-2xl mb-4">Add New Label</h2>
        <TextField
          label="Label Name"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        <TextField
          label="Label Value"
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <Button variant="contained" color="primary" onClick={handleAdd} fullWidth>
          Add Label
        </Button>
      </div>
    </Modal>
  );
};

export default AddLabelModal;

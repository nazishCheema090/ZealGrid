import React, { useState } from 'react';
import { Modal, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const AddToggleModal = ({ open, onClose, onAddToggle }) => {
  const [toggleName, setToggleName] = useState('');
  const [toggleValue, setToggleValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = () => {
    if (!toggleName || !toggleValue) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    onAddToggle({ toggleName, toggleValue, isActive });
    setToggleName('');
    setToggleValue('');
    setIsActive(false);
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
        <h2 className="text-2xl mb-4">Add New Toggle</h2>
        <TextField
          label="Toggle Name"
          value={toggleName}
          onChange={(e) => setToggleName(e.target.value)}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        <TextField
          label="Toggle Value"
          value={toggleValue}
          onChange={(e) => setToggleValue(e.target.value)}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              color="primary"
            />
          }
          label="Is Active"
        />
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          fullWidth
        >
          Add Toggle
        </Button>
      </div>
    </Modal>
  );
};

export default AddToggleModal;

// src/components/add-page/AddPageModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@mui/material';

const AddPageModal = ({ open, onClose, onAddPage, existingPageNames }) => {
  const [pageName, setPageName] = useState('');
  const [pagePath, setPagePath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset the form when the modal is opened or closed
    if (!open) {
      setPageName('');
      setPagePath('');
      setErrorMessage('');
    }
  }, [open]);

  const handleAdd = () => {
    if (!pageName || !pagePath) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (existingPageNames.includes(pageName)) {
      setErrorMessage(`Page "${pageName}" already exists.`);
      return;
    }

    onAddPage({ pageName, pagePath });
    onClose();
  };

  const handlePageNameChange = (e) => {
    const value = e.target.value;
    setPageName(value);

    if (existingPageNames.includes(value)) {
      setErrorMessage(`Page "${value}" already exists.`);
    } else {
      setErrorMessage('');
    }
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
          minWidth: '300px',
        }}
      >
        <h2 className="text-2xl mb-4">Add New Page</h2>
        <TextField
          label="Page Name"
          value={pageName}
          onChange={handlePageNameChange}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        <TextField
          label="Page Path"
          value={pagePath}
          onChange={(e) => setPagePath(e.target.value)}
          variant="outlined"
          className="mb-4"
          fullWidth
        />
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          fullWidth
          disabled={!!errorMessage}
        >
          Add Page
        </Button>
      </div>
    </Modal>
  );
};

export default AddPageModal;

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddLabelModal = ({ open, onClose, onAddLabel }) => {
  const [labelName, setLabelName] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [error, setError] = useState('');

  const handleAddLabel = () => {
    if (labelName && labelValue) {
      onAddLabel({ name: labelName, value: labelValue });
      setLabelName('');
      setLabelValue('');
      setError('');
      onClose();
    } else {
      setError('Both fields are required.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Add Label</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          label="Label Name"
          variant="outlined"
          fullWidth
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Label Value"
          variant="outlined"
          fullWidth
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
          margin="normal"
        />
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddLabel}
          fullWidth
          sx={{ mt: 2 }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddLabelModal;

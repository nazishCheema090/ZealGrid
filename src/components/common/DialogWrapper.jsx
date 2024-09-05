import React, { Children } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const DialogWrapper = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default DialogWrapper;

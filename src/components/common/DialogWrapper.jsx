import React, { Children } from "react";
import { Dialog } from "@mui/material";

const DialogWrapper = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default DialogWrapper;

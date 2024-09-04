import React from "react";
import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

const PhoneNumberInput = ({
  name,
  control,
  label = "Phone Number",
  onChange: externalOnChange, // Accept external onChange
  ...props
}) => {
  const {
    field: { onChange: internalOnChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const formatPhoneNumber = (value) => {
    // Basic phone number formatting (e.g., (123) 456-7890)
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = formatPhoneNumber(numericValue);

    // Only update if length is within the formatted length
    if (numericValue.length <= 10) {
      internalOnChange(formattedValue);
      if (externalOnChange) {
        externalOnChange(formattedValue); // Pass formatted value to external onChange
      }
    }
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error ? error.message : ""}
      {...props}
    />
  );
};

export default PhoneNumberInput;

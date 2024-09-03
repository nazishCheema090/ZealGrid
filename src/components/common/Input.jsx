import { TextField } from '@mui/material'
import React from 'react'

const Input = ({type, value, label, onChange, autoFocus = false, fullWidth = false , ...props}) => {
  return (
    <TextField
        fullWidth = {fullWidth}
        type = {type}
        value = {value}
        label = {label}
        onChange={onChange}
        autoFocus = {autoFocus}
        {...props}
    />
  )
}

export default Input
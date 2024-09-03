import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const  Loading= ({size, color = 'inherit', ...props}) => {
  return (
    <CircularProgress 
      size={size}
      style={{color : color}}
      {...props}
    />
  )
}

export default Loading;
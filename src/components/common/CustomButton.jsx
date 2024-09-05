import React from 'react'
import {Button} from '@mui/material'

const CustomButton = ({children,onClick,color='inherit',background='',width = '150px',height='50px',rounded='25px', variant='contained', disabled = false,...props}) => {
  return (
    <Button
        variant={variant}
        disabled = {disabled}
        onClick={onClick}
        color={color}
        style={{
            background : background,
            width : width,
            height : height,
            borderRadius : rounded,
            ...props.style,
        }}
        {...props}
    >
        {children}
    </Button>
  )
}

export default CustomButton
import React from 'react'
import { TextField,Grid,InputAdornment,IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/Visibility';

const Input = ({ name, label, handleChange, autoFocus, half,type,handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant='outlined'
        required
        autoFocus={autoFocus}
        fullWidth
        type={type}
        InputProps={ name === 'password' ?{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        } :null }
      />
    </Grid>
  )
}

export default Input
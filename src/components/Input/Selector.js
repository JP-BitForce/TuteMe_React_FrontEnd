import React from 'react'

//Material-UI
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const Selector = ({value, onChange, helperText, options}) => {
    return (
        <TextField
            id="standard-select-currency"
            select
            label="Select"
            value={value}
            onChange={onChange}
            helperText={helperText}
        >
        {options.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        ))}
        </TextField>
    )
}

export default Selector

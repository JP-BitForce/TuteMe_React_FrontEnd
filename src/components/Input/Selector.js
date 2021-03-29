import React from 'react'

//Material-UI
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    menuItem: {
        fontSize: "0.78rem",
        textTransform: "uppercase",
    }
}));

const Selector = ({value, onChange, options, label}) => {
    const styles = useStyles()
    return (
        <FormControl variant="outlined" className = {styles.formControl} size="small">
            <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={onChange}
                label = {label}
            >
                {options && options.map((option, index) => (
                    <MenuItem key={index} value={option} className = {styles.menuItem}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Selector

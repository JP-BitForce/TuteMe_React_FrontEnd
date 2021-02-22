import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 35,
    padding: '0 30px',
    margin: 8,
  },
});


const CustomButton = ({label, ...props}) => {
    const classes = useStyles();
    return (
        <Button className={classes.root} {...props}>{label}</Button>
    )
}

export default CustomButton

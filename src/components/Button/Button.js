import React from 'react'

import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const StyledButton = withStyles((theme) => ({
    root: {
        backgroundColor: 'lightseagreen',
        height: theme.spacing(5),
        color: 'white',
        fontWeight: 'bold',
        '&:hover, &:focus': {
          backgroundColor: 'white',
          color:'lightseagreen',
          boxShadow: theme.shadows[2],
        },
        '&:active': {
          boxShadow: theme.shadows[2],
          backgroundColor: emphasize(theme.palette.grey[300], 0.12),
          flexGrow: 1,
        },
        marginTop:'1%',
        marginBottom: '1%',
        width: "100%"
      },
}))(Chip);

const Button = ({label,handleClick,icon}) => {
    return (
        <StyledButton
            label= {label}
            deleteIcon={icon}
            onClick={handleClick}
        />
    )
}

export default Button

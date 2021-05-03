import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const StyledButton = withStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: theme.spacing(5),
        color: 'white',
        fontWeight: 'bold',
        '&:hover, &:focus': {
          color:'white',
          boxShadow: theme.shadows[2],
        },
        marginTop:'1%',
        marginBottom: '1%',
        width: "100%",
        cursor:'pointer'
      },
}))(Chip);

const ChipButton = ({label,handleClick,icon}) => {
    return (
        <StyledButton
            label= {label}
            onClick={handleClick}
            icon={icon}
        />
    )
}

export default ChipButton

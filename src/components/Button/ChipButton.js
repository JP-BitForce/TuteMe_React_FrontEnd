import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const StyledButton = withStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        height: theme.spacing(5),
        color: 'white',
        fontWeight: 'bold',
        '&:hover, &:focus': {
          color:'white',
          boxShadow: theme.shadows[2],
        },
        marginTop:'1%',
        marginBottom: '1%',
        width: "100%"
      },
}))(Chip);

const ChipButton = ({label,handleClick,icon}) => {
    return (
        <StyledButton
            label= {label}
            deleteIcon={icon}
            onClick={handleClick}
        />
    )
}

export default ChipButton

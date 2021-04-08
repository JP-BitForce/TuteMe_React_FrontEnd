import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Paginator = ({total, current, handleOnChange}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination 
                count={total} 
                page = {current}
                color="primary" 
                showFirstButton 
                showLastButton
                onChange = {handleOnChange}
            />
        </div>
    )
}

export default Paginator

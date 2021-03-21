import React from 'react'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({open}) => {
    return (
        <Backdrop open={open} style = {{backgroundColor:"white"}}>
             <CircularProgress color="secondary"/>
        </Backdrop>
    )
}

export default Loading

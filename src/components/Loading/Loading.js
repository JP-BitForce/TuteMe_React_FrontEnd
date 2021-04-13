import React from 'react'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({open}) => {
    return (
        <Backdrop open={open} style = {{backgroundColor:"white", zIndex: 1}}>
             <CircularProgress color="secondary"/>
        </Backdrop>
    )
}

export default Loading

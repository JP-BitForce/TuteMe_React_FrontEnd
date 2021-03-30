import React from 'react'

//Material-UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({open, autoHideDuration, handleClose, message, severity, align}) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration} 
            onClose={handleClose}
            anchorOrigin={align}
        >
            <Alert onClose={handleClose} severity={severity}>
                { message }
            </Alert>
        </Snackbar>
    )
}

export default SnackBar

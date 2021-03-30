import React from 'react'

//Material-UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = ({open, autoHideDuration, handleClose, message, severity}) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                { message }
            </Alert>
        </Snackbar>
    )
}

export default SnackBar

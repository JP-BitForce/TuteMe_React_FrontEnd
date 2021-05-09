import React from 'react'

//Material-UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const Connecting = ({open}) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Connecting</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default Connecting

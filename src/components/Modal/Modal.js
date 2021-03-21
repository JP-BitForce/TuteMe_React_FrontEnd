import React from 'react'

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({open, handleClose, title, children, handleCancel, handleOk}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent> {children} </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary"> Cancel </Button>
                <Button onClick={handleOk} color="primary"> Ok </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal

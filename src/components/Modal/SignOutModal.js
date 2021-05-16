import React from 'react';

//Material-UI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  btn: {
      backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      color: "white"
  },
  text: {
    fontWeight: "600"
  }
}))

const SignOutModal = ({open, handleClose, title, content, handleCancel, handleOk}) => {
  const styles = useStyles()
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" className = {styles.text}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className = {styles.text}>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} className = {styles.btn}> No </Button>
          <Button onClick={handleOk} className = {styles.btn}> yes </Button>
        </DialogActions>
    </Dialog>
  )
}

export default SignOutModal
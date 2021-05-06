import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditMyInterest from '../../screens/Profile/MyInterestCard/EditMyInterestForm';

export default function EditButtonPopup(props) {
    const {title, openEditPopup, setOpenEditPopup} = props;

  const [open, setOpen] = React.useState(false);
  const [scroll] = React.useState('paper');

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={openEditPopup}
        onClose={handleClose}
        maxWidth="md"
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
             <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        onClick={()=>{setOpenEditPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <EditMyInterest/>
        </DialogContent>
        <DialogActions>
            <Button  style={{color:"white",backgroundColor:"#2578F5", margin:10}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

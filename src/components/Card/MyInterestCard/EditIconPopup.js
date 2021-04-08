import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import  EditMyInterest from './EditInterestForm/EditMyInterestForm'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    backgroundColor: theme.palette.background.paper,    
  },
}));

export default function EditIconPopup() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div align='right'>
        <IconButton >
          <CloseIcon onClick={handleClose}/>
        </IconButton>
      </div>
      <EditMyInterest/>
    </div>
  );
  return (
    <div>
        <div>
            <IconButton>
                <EditIcon fontSize="small" onClick={handleOpen}/>
            </IconButton>
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      {body}
      </Modal>
    </div>
  );
}

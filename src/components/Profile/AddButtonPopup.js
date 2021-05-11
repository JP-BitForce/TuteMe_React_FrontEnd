import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddMyInterest from '../../screens/Profile/MyInterestCard/AddMyInterestForm';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function AddButtonPopup(props) {
    const [selectData, setSelectData] = useState([]);
    const { title, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    const config = {
        title : title,
        selectdata : selectData,
        setselectdata : setSelectData
    }
    const handleAdd = () => {
        props.addData(selectData);
        setSelectData([]);
        setOpenPopup(false);
    }
    const checkSkills = (title) => {
        switch (title) {
            case 'Add Subjects': 
            return title

            case 'Add Top Skills': 
            return title

            case 'Add Tools & Technologies': 
            return title

            default: 
            return title
        }
    }
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>    
                        {checkSkills(title)}
                    </Typography>
                    <Button
                        onClick={()=>{
                            setSelectData([])
                            setOpenPopup(false)
                            }}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <AddMyInterest {...config} />
            </DialogContent>
            <DialogActions>
          <Button onClick={handleAdd} style={{color:"white",backgroundColor:"#2578F5", margin:10}}>
            Add
          </Button>
        </DialogActions>
        </Dialog>
    )
}

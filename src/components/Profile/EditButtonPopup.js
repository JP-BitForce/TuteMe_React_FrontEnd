import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditMyInterest from "../../screens/Profile/MyInterestCard/EditMyInterestForm";


function EditButtonPopup(props) {
    const {title, openEditPopup, setOpenEditPopup,editData,setSubjectData,setTopSkillData,setToolsTechSkillData} = props;
    const [scroll] = React.useState('paper');

    const handleDelete = (data) => {
        switch (title) {
            case 'Edit Subjects':
                setSubjectData(data);
                break;

            case 'Edit Top Skills':
                setTopSkillData(data);
                break;

            case 'Edit Tools & Technologies':
                setToolsTechSkillData(data);
                break;

            default:
                return '';
        }

    }


    return (
        <div>
            <Dialog
                open={openEditPopup}
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
                        <Button onClick={()=>{setOpenEditPopup(false)}}>
                            <CloseIcon />
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <EditMyInterest editData={editData} title={title} editItem={handleDelete} />
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white",backgroundColor:"#2578F5", margin:10}} onClick={() => setOpenEditPopup(false)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default React.memo(EditButtonPopup);

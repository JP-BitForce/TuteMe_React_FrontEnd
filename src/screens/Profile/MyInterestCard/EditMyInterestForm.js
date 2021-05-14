import React, { useState } from 'react';
import {Paper,IconButton,Grid,Box} from "@material-ui/core"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

function EditMyInterest(props){
const {title,editData} = props;
const [modifyItem,setModifyItem] = useState(editData);

const deleteData = (select)=> {
const data = editData.filter((i)=>(i !== select));
setModifyItem(data)
props.editItem(data);
}

const checkSkills = (title) => {
switch (title) {
case 'Edit Subjects':
return modifyItem;

case 'Edit Top Skills':
return modifyItem;

case 'Edit Tools & Technologies':
return modifyItem;

default:
return modifyItem;
}
}

return(
    <Paper style={{minWidth:600, margin:"auto", }}>
        <Grid item container direction="column">
            <Grid item xs={12} >
                <List >
                {modifyItem && checkSkills(title).map((data) => (
                    <ListItem style={{backgroundColor:'#f5f5f5',width:'95%' ,margin:15, marginBottom:20}}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" >
                            <ListItemText primary={data} />
                            <ListItemSecondaryAction align='right'>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteData(data)} >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </Box>
                    </ListItem>
                ))}
                </List>
            </Grid>
        </Grid>
    </Paper>
);
}

export default React.memo(EditMyInterest);
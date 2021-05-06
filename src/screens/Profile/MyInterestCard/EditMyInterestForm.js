import React from 'react';
import {Paper,IconButton,Grid, Divider,Box} from "@material-ui/core"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
  
function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}
export default function EditMyInterest(props){
    return(
        <Paper style={{minWidth:600, margin:"auto", }}>
             <Grid item container direction="column">
                <Grid item xs={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>SUBJECTS</h6>
                  <Divider/>                 
                </Grid>
                <Grid item xs={12} >
                        <List >
                            {generate(
                                <ListItem>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <ListItemText
                                            primary="Single-line item" />
                                        <ListItemSecondaryAction align='right'>
                                            <IconButton edge="end" aria-label="delete" >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Box>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
                <Grid item xs={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>TOP SKILLS</h6>
                  <Divider/>                 
                </Grid>
                <Grid item xs={12} >
                        <List >
                            {generate(
                                <ListItem>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <ListItemText
                                            primary="Single-line item" />
                                        <ListItemSecondaryAction align='right'>
                                            <IconButton edge="end" aria-label="delete" >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Box>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
                <Grid item xs={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>TOOLS & TECHNOLOGIES</h6>
                  <Divider/>                 
                </Grid>
                <Grid item xs={12} >
                        <List >
                            {generate(
                                <ListItem>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <ListItemText
                                            primary="Single-line item" />
                                        <ListItemSecondaryAction align='right'>
                                            <IconButton edge="end" aria-label="delete" >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </Box>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
            </Grid>
        </Paper>  
    );
}
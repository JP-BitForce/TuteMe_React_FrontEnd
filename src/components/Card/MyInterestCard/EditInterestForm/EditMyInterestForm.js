import React from 'react';
import {Paper,Button,IconButton,Grid, Divider} from "@material-ui/core"
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
export default function EditMyInterest(){
    return(
        <Paper style={{maxWidth:800, margin:"auto"}}>
             <Grid item container direction="column">
                <Grid item container direction="row">
                    <Grid item xs={12} sm={12} align= "left">
                        <h5 style={{marginLeft:10, marginTop:10}}>Edit Skills</h5>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>SUBJECTS</h6>
                  <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                        <List >
                            {generate(
                                <ListItem>
                                    <ListItemText
                                        primary="Single-line item" />
                                    <ListItemSecondaryAction align='right'>
                                        <IconButton edge="end" aria-label="delete" >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
                <Grid item xs={12} sm={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>TOP SKILLS</h6>
                  <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                        <List >
                            {generate(
                                <ListItem>
                                    <ListItemText
                                        primary="Single-line item" />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
                <Grid item xs={12} sm={12} align= "left" style={{backgroundColor:'#e8f7fc',height:28}}>
                  <h6 style={{margin:10}}>TOOLS & TECHNOLOGIES</h6>
                  <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                        <List >
                            {generate(
                                <ListItem>
                                    <ListItemText
                                        primary="Single-line item" />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>,
                            )}
                        </List>
                </Grid>
                <Grid item xs={12} sm={12} align= "right">
                    <Button style={{color:"white",backgroundColor:"#2578F5", margin:10}}> Save </Button>
                </Grid>
            </Grid>
        </Paper>  
    );
}
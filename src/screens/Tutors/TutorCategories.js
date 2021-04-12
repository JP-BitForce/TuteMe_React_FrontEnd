import React from 'react'

//Material-UI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const TutorCategories = ({handleClick, items}) => {
    return (
        <List component="div" role="list"> 
            <Grid container spacing={3}>
            {
                items.map(item => {
                    return (
                        <Grid item xs={6} sm={4}>
                            <Paper elevation = {3}>
                            <ListItem
                                button
                                divider
                                onClick={() => handleClick(item)}
                                role="listitem"
                            >
                                <ListItemIcon>
                                    <Avatar src = {item.src}/>
                                </ListItemIcon>
                                <span>{item.title}</span>
                            </ListItem>
                            </Paper>
                        </Grid>
                    )
                })
            }
            </Grid>
        </List>
    )
}

export default TutorCategories

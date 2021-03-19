import React from 'react'

//Material-UI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

const TutorCategories = ({handleClick, items}) => {
    return (
        <List component="div" role="list"> 
            <Grid container spacing={3}>
            {
                items.map(item => {
                    return (
                        <Grid item xs={6} sm={4}>
                            <ListItem
                                button
                                divider
                                onClick={() => handleClick(item)}
                                role="listitem"
                            >
                                <ListItemIcon>
                                    <Avatar src = {item.src}/>
                                </ListItemIcon>
                                <ListItemText primary = {item.title} />
                            </ListItem>
                        </Grid>
                    )
                })
            }
            </Grid>
        </List>
    )
}

export default TutorCategories

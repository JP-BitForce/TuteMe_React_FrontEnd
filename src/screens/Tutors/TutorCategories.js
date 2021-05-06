import React from 'react'

//React-Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

const TutorCategories = ({handleClick, items}) => {

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    return (
        <List component="div" role="list"> 
            <Grid container spacing={3}>
            {
                items.map(item => {
                    return (
                        <Grid item xs={6} sm={4}>
                            <Card>
                                <ListItem button divider onClick={() => handleClick(item)} role="listitem">
                                    <ListItemIcon>
                                        <Avatar src = {getImageSource(item.src)}/>
                                    </ListItemIcon>
                                    <span>{item.category}</span>
                                </ListItem>
                            </Card>
                        </Grid>
                    )
                })
            }
            </Grid>
        </List>
    )
}

export default TutorCategories

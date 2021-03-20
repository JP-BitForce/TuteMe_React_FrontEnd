import React from 'react'

//Material-UI
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 360,
  },
}));

const People = ({name}) => {
    const style = useStyles();
    return (
        <ListItem button className={style.root}>
          <ListItemAvatar>
            <Avatar className={style.color}>{name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary="Iam a ..." />
        </ListItem>
    )
}

export default People

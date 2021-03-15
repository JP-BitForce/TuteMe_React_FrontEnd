import React from 'react'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:"10px",
    backgroundColor:"rgba(0,0,0,0.05)",
    border: 0,
    borderRadius: 10,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  color:{
    backgroundColor:"#2c333a"
  }
}));


const ChatCard = ({item}) => {
    const style = useStyles();
    return (
        <ListItem button className={style.root}>
            <Grid container>
                <Grid item>
                    <ListItemAvatar>
                        <Avatar className={style.color}>{item.title.charAt(0)}</Avatar>
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">{item.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{item.lastText}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="body2" color="textSecondary">{item.time}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ChatCard

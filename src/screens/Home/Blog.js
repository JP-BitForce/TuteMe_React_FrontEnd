import React from 'react'

//Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './Home.css'

const useStyles = makeStyles({
    root: props => ({
        backgroundImage: `url(${props.img})`,
    }),
})

const Blog = ({details, onClick}) => {
    const {date, month, year, title, content, src} = details;
    const classes = useStyles({img: src});

    return (
        <Grid item xs={12} sm={12} md={4}>
            <Paper elevation = {8}>
                <div className = {["blog_img_div",classes.root].join(' ')}>
                    <div className = "blog_schedule">
                        <span className = "blog_date">{date}</span>
                        <span className = "blog_month">{month}</span>
                        <span className = "blog_year">{year}</span>
                    </div>
                </div>
                <div className = "blog_description">
                    <span>{title}</span>
                    <p>{content}</p>
                </div>
                <CardActions>
                    <Button size="small" color="primary" onClick = {onClick}>View</Button>
                </CardActions>
            </Paper>
        </Grid>
    )
}

export default Blog

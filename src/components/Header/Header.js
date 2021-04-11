import React from 'react'

//Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './Header.css'

const useStyles = makeStyles({
    root: props => ({
        width: "100%",
        height: "45vh",
        backgroundImage: `url(${props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }),
    headerContent: {
        padding: '7%',
        textAlign: 'left',
    }
})

const Header = ({title, src}) => {
    const styles = useStyles({img:src})

    return (
        <Paper elevation = {2}>
            <div className = {styles.root}>
                <div className = "header_overlay" />
                <Grid container>
                    <Grid item md={12} xs = {12} sm={12}>
                    <div className = {styles.headerContent}>
                        <Typography component="h1" variant="h3" gutterBottom color="textSecondary">
                            {title}
                        </Typography>
                    </div>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}

export default Header

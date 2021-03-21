import React from 'react'

//Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: props => ({
        width: "100%",
        height: "60vh",
        backgroundImage: `url(${props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }),
    headerContent: {
        padding: '10%',
        textAlign: 'left',
    }
})

const Header = ({title, src, cards}) => {
    const styles = useStyles({img:src})

    const renderHeaderCard = (src, title, description) => {
        return (
            <Grid item xs={12} md={4} sm={12}>
                <Paper elevation = {3} style = {{padding:"3%", borderRadius:"10px"}}>
                    <div className = "header_card_container">
                        <div className = "img_container">
                            <img src = {src} alt = {title} className = "card_img"/>
                        </div>
                        <div className = "descriptive_container">
                            <span className="textPrimary">{title}</span>
                            <span className="textSecondary">{description}</span>
                        </div>
                    </div>
                </Paper>
            </Grid>
        )
    }

    return (
        <Paper elevation = {2}>
            <div className = {styles.root}>
                <div className = "header_overlay" />
                <Grid container>
                    <Grid item md={12}>
                    <div className = {styles.headerContent}>
                        <Typography component="h1" variant="h3" gutterBottom color="textSecondary">
                            {title}
                        </Typography>
                    </div>
                    </Grid>
                    <Grid container spacing={4} style={{padding:"3%"}} item md={12}>
                        {
                            cards && cards.map(item => {
                                const {src, title, description} = item
                                return renderHeaderCard(src, title, description)
                            })
                        }
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}

export default Header

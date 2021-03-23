import React from 'react'

import RoundedCategory from '../../components/RoundedCategory/RoundedCategory'

//Material-UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';


import './Home.css'

const FeatureCard = ({src, title, description}) => {
    return (
        <Grid item xs={6} sm={6} md={4}>
            <Paper elevation = {0}>
                <CardContent style = {{textAlign:"left"}}>
                    <div className = "feature_card_head">
                        <RoundedCategory src = {src}/>
                        <span>{title}</span>
                    </div>
                    <Typography color = "textSecondary">{description}</Typography>
                </CardContent>
            </Paper> 
        </Grid>
    )
}

export default FeatureCard

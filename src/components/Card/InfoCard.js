import React from 'react'

import Card from 'react-bootstrap/Card'
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './InfoCard.css'

const InfoCard = ({media, title, des}) => {
    return (
    <Card className="text-center card">
        <Card.Img variant="top" src={media}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Typography variant="body2" color="textSecondary" component="p">
                {des}
          </Typography>
        </Card.Body>  
        <CardActions>
            <Button size="small" color="primary">Share</Button>
            <Button size="small" color="primary">Learn More</Button>
        </CardActions>
    </Card>
    )
}

export default InfoCard

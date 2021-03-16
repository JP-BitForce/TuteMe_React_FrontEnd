import React from 'react'

import ReadOnlyRating from '../Rating/ReadOnlyRating'

import Card from 'react-bootstrap/Card'

//Material-UI
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './InfoCard.css'

const TutorCard = ({media, title, description, onClick, rate}) => {
    return (
        <Card className="card">
            <Card.Img variant="top" src={media}/>
            <Card.Body className = "card_body_contents">
                <Typography variant="body2" color="textPrimary" component="p">{title}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </Card.Body>
            <CardActions className = "card_footer">
                <ReadOnlyRating rate={rate}/>
                <Button size="small" color="primary" onClick={onClick}>More</Button>
            </CardActions>
        </Card>
    )
}

export default TutorCard

import React from 'react'

//Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import Typography from '@material-ui/core/Typography';

import './InfoCard.css'

const InfoCard = ({media, title, des}) => {
    return (
    <Card className="text-center card" key = {title}>
        <Card.Img variant="top" src={media}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Typography variant="body2" color="textSecondary" component="p">
                {des}
            </Typography>
        </Card.Body>  
    </Card>
    )
}

export default InfoCard

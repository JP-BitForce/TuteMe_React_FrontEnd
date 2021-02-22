import React from 'react'

import Card from 'react-bootstrap/Card'
import Paper from '@material-ui/core/Paper';

import './CardView.css'

const CardView = ({header, img, text}) => {
    return (
        <Paper className = "paper" elevation={5}>
            <Card.Body>
                <Card.Title className = "card_content">{header}</Card.Title>
                <Card.Img variant="top" src={img} />
                <Card.Text className = "card_content">{text}</Card.Text>
            </Card.Body>
        </Paper>
    )
}

export default CardView

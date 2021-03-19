import React from 'react';

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import './InfoCard.css'

const CourseCard = ({src, title, by, rating, onClick}) => {
  return (
    <Card className="text-center card">
         <Card.Body>
            <div className = "course_card_body">
                <img src={src} alt={title} className = "category_icon_src"/>
                <div className = "course_card_body_column">
                    <span className = "card_title">{title}</span>
                    <span className = "card_sub_content">by {by}</span>
                    <ReadOnlyRating rate = {rating}/>
                </div>
            </div>
         </Card.Body>
        <CardActions>
            <Button size="small" color="primary" onClick={onClick}>View</Button>
        </CardActions> 
    </Card>
  );
}

export default CourseCard
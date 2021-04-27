import React from 'react';

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import './InfoCard.css'

const CourseCard = ({src, item, onClick}) => {
  const {name, rating, price, description, tutorName, duration, id} = item
    return (
        <div className = "course_enrolled_item">
            <Grid conatiner>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_thumnail">
                      <img src = {src} alt = {name} className = "course_thumnail_img"/>
                      <div className = "course_price">Rs.{price}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div className = "course_enrolled_content">
                    <div className = "course_meta">
                        <span>{duration}...</span>
                        <span>by {tutorName}</span>
                    </div>
                    <Divider/>
                    <h5>{name}</h5>
                    <h6>{description.slice(0, 100)}...</h6>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={6}>
                        <ReadOnlyRating rate = {rating}/>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Button size="small" onClick = {() => onClick(id)} variant="contained">View & Enroll</Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
          </Grid>
    </div>
  );
}

export default CourseCard
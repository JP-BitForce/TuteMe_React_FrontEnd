import React from 'react';

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import './InfoCard.css'

const CourseCard = ({src, title, by, rating, onClick, price}) => {
    return (
        <div className = "course_enrolled_item">
            <Grid conatiner>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_thumnail">
                      <img src = {src} alt = {title} className = "course_thumnail_img"/>
                      <div className = "course_price">$ 150</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div className = "course_enrolled_content">
                    <div className = "course_meta">
                        <span>1hr 24m</span>
                        <span>by {by}</span>
                    </div>
                    <Divider/>
                    <h5>{title}</h5>
                    <p>Donec molestie tincidunt tellus sit amet aliquet. Proin auctor nisi ut purus eleifend, et auctor lorem hendrerit.</p>
                    <div className = "online_course_footer">
                      <ReadOnlyRating rate = {rating}/>
                      <Button size="small" onClick = {onClick}>Enroll now</Button>
                    </div>
                  </div>
                </Grid>
          </Grid>
    </div>
  );
}

export default CourseCard
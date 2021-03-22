import React from 'react'

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import './InfoCard.css'

const CourseEnrolled = ({src, title, by, rating}) => {
    return (
        <div className = "course_enrolled_item">
            <Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_thumnail">
                        <img src = {src} alt = {title} className = "course_thumnail_img"/>
                        <div className = "course_author">By {by}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <div className = "course_enrolled_content">
                        <div className = "course_meta">
                            <span>1hr 24m</span>
                            <span>Advanced</span>
                            <span>june 18 2021</span>
                        </div>
                        <Divider/>
                        <h5>{title}</h5>
                        <p>Donec molestie tincidunt tellus sit amet aliquet. Proin auctor nisi ut purus eleifend, et auctor lorem hendrerit.</p>
                        <div className = "course_enrolled_rating">
                            <ReadOnlyRating rate = {rating}/>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CourseEnrolled

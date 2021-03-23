import React from 'react'

//Material-UI
import Grid from '@material-ui/core/Grid';

import './Home.css'

const Event = ({details, onClick}) => {
    const {src, date, month, time, location, description} = details
    return (
        <Grid item xs={12} sm={12} md={6}>
            <div className = "event_card">
                <img src={src} alt="Avatar" className="event_image"/>
                <div className="event_overlay">
                    <div className = "event_schedule">
                        <div className = "event_date">
                            <span>{date}</span>
                            {month}
                        </div>
                        <div className = "event_time">
                            <p>
                                <span>
                                    {time}
                                </span>
                            </p>
                            <p>
                                <span>{location}</span>
                            </p>
                        </div>
                    </div>
                    <div className = "event_des">
                        <span>
                            {description}
                        </span>
                    </div>
                    <div className = "event_view_details" onClick = {onClick}>
                        <span>View Details</span>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default Event

import React from 'react'

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import './InfoCard.css'

const TutorCard = ({media, title, onClick, rate, subject, id}) => {
    const socials = [
        {
            content:"Facebook", 
            style: "fab  fa-facebook"
        },
        {
            content:"Twitter", 
            style: "fab  fa-twitter"
        },
        {
            content:"Instagram", 
            style: "fab fa-instagram"
        },
        {
            content:"linkedIn", 
            style: "fab  fa-linkedin"
        }
    ]

    return (
        <div className = "tutor_div_root">
            <div className = "tutor_card_top">
                <Avatar src = {media} style = {{width : "120px", height: "120px"}}/>
                <div className = "tutor_card_top_info">
                    <link rel = "stylesheet" type = "text/css" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
                    <h3>{title}</h3>
                    <span className = "tutor_position">{subject}</span>
                    <p className = "tutor_socials">
                        {
                            socials.map(item => {
                                const {content, style} = item
                                return(
                                    <a href = {content}><span className = {style}></span></a>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
            <div className = "tutor_des_container">
                <div className = "online_course_footer">
                    <span>
                        Rating : <ReadOnlyRating rate = {rate}/>
                    </span>
                    <Button size="small" onClick = {() => onClick(id)} variant = "contained">View More</Button>
                </div>
            </div>
        </div>
    )
}

export default TutorCard

import React from 'react'

import ReadOnlyRating from '../Rating/ReadOnlyRating'

//Material-UI
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import './InfoCard.css'

const TutorCard = ({media, title, description, onClick, rate}) => {
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
                <Avatar src = {media} style = {{width : "100px", height: "100px"}}/>
                <div className = "tutor_card_top_info">
                    <link rel = "stylesheet" type = "text/css" href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
                    <h3>{title}</h3>
                    <span className = "tutor_position">CSE Teacher</span>
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
                <p>
                    Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic 
                    life One day however a small line of blind text by the name.
                </p>
                <div className = "online_course_footer">
                      <ReadOnlyRating rate = {rate}/>
                      <Button size="small" onClick = {onClick}>View More</Button>
                </div>
            </div>
        </div>
    )
}

export default TutorCard

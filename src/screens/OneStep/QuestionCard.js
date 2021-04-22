import React from 'react'

//Material-UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import './OneStep.css'

const QuestionCard = () => {

    const renderCountables = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={4} sm={4} md={12}>
                   <div className = "question_card__countables">
                        <span>0</span>
                        <span>votes</span>
                   </div>
                </Grid>
                <Grid item xs={4} sm={4} md={12}>
                    <div className = "question_card__countables">
                        <span>0</span>
                        <span>answers</span>
                    </div>
                </Grid>
                <Grid item xs={4} sm={4} md={12}>
                    <div className = "question_card__countables">
                        <span>0</span>
                        <span>views</span>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderMainContent = () => {
        return (
            <div className = "question_card__main">
                <div className = "question_card__main_info">
                    <span className = "question_card__main_info_title">
                    Bootstrap dropdown not working with shadow root
                    </span>
                    <p>
                    I was trying to create a navbar component in a .js file so I can use it on multiple pages
                    (not allowed to use react or other libraries for this project). I copied the navbar from bootstrap and pasted ...
                    </p>
                </div>
                <div className = "question_card__main_tags">
                    {
                        ["React", "Boostrap", "Navbar"].map(item => {
                            return <Chip label = {item} key = {item} style = {{marginRight: "4px"}}/>
                        })
                    }
                </div>
                <div className = "question_card__main_user">
                    <Avatar>A</Avatar>
                    <div>
                        <span>Allan</span>
                        <span>2 days ago</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "question_card_root">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={2}>
                    { renderCountables() }
                </Grid>
                <Divider orientation="vertical" flexItem style = {{marginTop: "1%", marginBottom: "1%"}}/>
                <Grid item xs={12} sm={12} md={9}>
                    { renderMainContent() }
                </Grid>
            </Grid>
        </div>
    )
}

export default QuestionCard

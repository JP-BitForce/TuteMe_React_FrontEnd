import React from 'react'
import moment from 'moment';

//Material-UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import './OneStep.css'

const QuestionCard = ({item, handleQuestionCardOnClick}) => {
    const {title, content, userName, userImg, answers, votes, tags, createdAt} = item

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const renderCountables = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={6} sm={6} md={12}>
                   <div className = "question_card__countables">
                        <span>{votes}</span>
                        <span>votes</span>
                   </div>
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                    <div className = "question_card__countables">
                        <span>{answers}</span>
                        <span>answers</span>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderMainContent = () => {
        return (
            <div className = "question_card__main">
                <div className = "question_card__main_info">
                    <span className = "question_card__main_info_title">{title}</span>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
                <div className = "question_card__main_tags">
                    {
                        tags.map(item => {
                            return <Chip label = {item.title} key = {item.id} style = {{marginRight: "4px"}}/>
                        })
                    }
                </div>
                <div className = "question_card__main_user">
                    <Avatar src = {getImageSource(userImg)}/>
                    <div>
                        <span>{userName}</span>
                        <span className = "question_card__main_user_created">
                            created: {moment(createdAt).format("DD-MM-YYYY, hh:mm:ss a")}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "question_card_root" onClick = {() => handleQuestionCardOnClick(item)}>
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

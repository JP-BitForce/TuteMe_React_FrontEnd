import React from 'react'

import QuestionCard from './QuestionCard'
import Pagination from '../../components/Pagination/Paginator'

//Material-UI
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import './OneStep.css'

const Questions = ({
    handleAskOnClick, 
    handleFilterOnClick, 
    handlePaginationOnChange, 
    total, 
    current, 
    data,
    handleQuestionCardOnClick
}) => {

    const filters = ["All", "Newest", "Active", "Unanswered", "frequent", "Votes"]

    const renderHead = () => {
        return (
            <div>
                <div className = "question_tab_head">
                    <span className = "question_tab_head_title">All Questions</span>
                    <Button 
                        variant="outlined" 
                        style = {{backgroundColor: "rgb(0, 171, 85)", color: "white", borderColor: "white"}}
                        onClick = {handleAskOnClick}
                    > 
                        Ask Question 
                    </Button>
                </div>
                <div className = "question_tab_head_sub">
                    <span>Total questions : ( {data.length} )</span>
                </div>
                <Divider/>
            </div>
        )
    }

    const renderFilterContainer = () => {
        return (
            <div className = "question_filter_container">
                {
                    filters.map((item, idx) => {
                        return (
                            <div 
                                className = "question_filter_card" 
                                onClick = {() => handleFilterOnClick(item)}
                                key = {idx}
                            >{item}</div>
                        )
                    })
                }
            </div>
        )
    }

    const renderMainContainer = () => {
        return (
            <div className = "question_main_container">
                {
                    data.map(item => {
                        return (
                            <div className = "question_main_cards">
                                <QuestionCard item = {item} handleQuestionCardOnClick = {handleQuestionCardOnClick}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            { renderHead() }
            <div className = "question_tab_container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        { renderFilterContainer() }
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        {
                            data.length > 0 ?
                            <>
                            { renderMainContainer() }
                            <div className = "pagination_div">
                                <Pagination 
                                    total = {total}
                                    current = {current}
                                    handleOnChange = {handlePaginationOnChange}
                                />
                            </div>
                            </>
                            :
                            <div className = "no_data_available">
                                <span>No Questions available</span>
                            </div>
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Questions

import React from 'react'

import Pagination from '../../components/Pagination/Paginator'

//React-Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import './OneStep.css'

const Tag = ({values, handleTagSearch, handleInputOnChange, handleTagsPagination, handleTagOnClick, handleFilterTagsByAlphabet}) => {

    const renderHeader = () => {
        return (
            <div className = "onestep_tag_head">
                <h4>Tags</h4>
                <p>
                    A tag is a keyword or label that categorizes your question with other, similar questions. <br></br>
                    Using the right tags makes it easier for others to find and answer your question.
                </p>
                <div className = "onestep_tag_head__search_area">
                    <form noValidate autoComplete="off" onSubmit = {handleTagSearch}>
                        <TextField
                            id="standard-basic" 
                            label="tag" 
                            onChange = {handleInputOnChange} 
                            variant = "outlined"
                            error = {values["searchValueError"]}
                            value = {values["searchValue"]}
                            helperText = {values["searchValueError"] && "Incorrect entry"}
                            name = "searchValue"
                            size = "small"
                        />
                        <Button 
                            variant="contained" 
                            style = {{marginLeft: "5px"}} 
                            type = "submit"
                        >
                        { values["searchTag"] ? "Cancel": "Search" }
                        </Button>
                    </form>
                    <div className = "filter_by_alp" onClick = {handleFilterTagsByAlphabet}>
                        <span>
                            {
                                values["filtered"] ? "Re-align" : "Filter by alphabet"
                            }                            
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const renderMainContainer = () => {
        return (
            <div className = "onestep_tag_main">
                <Grid container spacing={4}>
                {
                    values["tagFilterList"].map((item)=> {
                        return (
                            <Grid item xs={6} sm={6} md={3} key = {item.id}>
                                { renderCard(item) }
                            </Grid>
                        )
                    })
                }
                </Grid>
                <div className = "pagination_div">
                    {
                        values["tagList"].length > 0 &&
                        <Pagination 
                            total = {values["tagTotal"]}
                            current = {values["tagCurrent"]}
                            handleOnChange = {handleTagsPagination}
                        />
                    }
                </div>
            </div>
        )
    }

    const renderCard = (item) => {
        const {title, description, noOfQuestions} = item
        return (
            <Card className = "onestep_tag_main__card" onClick = {handleTagOnClick}>
                <Card.Body>
                    <Card.Title><Chip label = {title} style = {{fontWeight: "bold"}}/></Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <footer className="blockquote-footer">
                        No of related questions <cite title="Source Title">{noOfQuestions}</cite>
                    </footer>
                </Card.Body>
            </Card>
        )
    }

    return (
        <div>
            { renderHeader() }
            {  
                values["searchLoading"] ? 
                <div className = "onestep_tag_loading">
                    <div className = "loading_div">
                        <CircularProgress/>
                    </div>
                </div>
                :
                renderMainContainer() 
            }
        </div>
    )
}

export default Tag

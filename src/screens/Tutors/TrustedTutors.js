import React, { Component } from 'react'

import TutorCard from '../../components/Card/TutorCard'

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import all from '../../assets/images/courses/all.png'
import javascript from '../../assets/images/courses/javascript.png'
import reactnative from '../../assets/images/courses/react-native.png'
import maths from '../../assets/images/courses/maths.png'
import bio from '../../assets/images/courses/bio.png'
import musical from '../../assets/images/courses/musical.png'
import accounting from '../../assets/images/courses/accounting.png'
import tutor1 from '../../assets/images/dummy tutors/1.jpg'
import tutor2 from '../../assets/images/dummy tutors/2.jpg'
import tutor3 from '../../assets/images/dummy tutors/3.jpg'
import tutor4 from '../../assets/images/dummy tutors/4.jpg'
import './TrustedTutors.css'

class TrustedTutors extends Component {
    state = {
        selected: {key:"0", src:all, alt:"all", title:"All"},
        tutorSearch: "",
        categoryOptions:["All"],
        categoryOption:"All"
    }

    list = [
        {key:"0", src:all, alt:"all", title:"All"},
        {key:"1", src:javascript, alt:"javascript", title:"Javascript"},
        {key:"2", src:reactnative, alt:"reactnative", title:"React-Native"},
        {key:"3", src:maths, alt:"maths", title:"Mathematics"},
        {key:"4", src:bio, alt:"bio", title:"Biology"},
        {key:"5", src:musical, alt:"musical", title:"Musical"},
        {key:"5", src:accounting, alt:"accounting", title:"Accounting"},
    ]

    dummyTutors = [
        {src:tutor1, des:"lorem ipsum", title:"Allan Nickman"},
        {src:tutor2, des:"lorem ipsum", title:"Emma Watson"},
        {src:tutor3, des:"lorem ipsum", title:"Daniel Nickman"},
        {src:tutor4, des:"lorem ipsum", title:"Bob right"},
    ]

    handleTutorSearch = (event) => {
        event.preventDefault()
        console.log(this.state.tutorSearch)
    }

    handleTutorSearchOnChange = (event) => {
        this.setState({
            tutorSearch: event.target.value
        })
    }

    onCategorySelect = (item) => {
        this.setState({
            selected: item
        })
    }

    renderCategories = () => {
        return (
            this.list.map(item => this.renderCategoryItem(item))
        )
    }

    renderCategorySelctor = () => {
        return (
            <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={this.state.categoryOption}
                onChange={this.handleOptionChange}
                helperText="You can select other categories here"
                >
                {this.state.categoryOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        )
    }

    renderCategoryItem = (item) => {
        const {title, src} = item
        return (
            <div className = "category_icon_wrapper">
                <div
                    onClick={()=>this.onCategorySelect(item)}
                    className={[
                    "category_icon",
                    this.state.selected.title === title ? "selected_category_icon" : {},
                    ].join(" ")}
                >
                    <img src={src} alt={title}  className = "category_icon_src"/>
                </div>
                <span>{title}</span>
            </div>
        )
    }

    renderTutorListHead = () => {
        const selected = this.state.selected
        return (
            <div className = "trusted_tutors_list_head">
                <div className = "header_category">
                    <div className = "category_icon_small">
                        <Avatar src = {selected.src}/>
                    </div>
                    <span>
                        {selected.title}
                    </span>
                </div>
                <form noValidate autoComplete="off" onSubmit = {this.handleTutorSearch}>
                    <TextField id="standard-basic" label="serach" onChange = {this.handleTutorSearchOnChange}/>
                </form>
            </div>
        )
    }

    renderTutorList = () => {
        return (
            <div className = "trusted_tutors_list">
                <Grid container spacing={3}>
                    {
                        this.dummyTutors.map((item,index) => {
                            return (
                                <Grid item xs={6} sm={2}>
                                    <Paper elevation = {3}>
                                        <TutorCard 
                                            media={item.src} 
                                            title={item.title.toUpperCase()} 
                                            description = {item.des}
                                            rate = {index+1}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }

    render() {
        return (
            <div className = "trusted_tutors_root">
                <div className = "trusted_tutors_category">
                    <div className = "trusted_tutors_category_title_container">
                        <span className = "trusted_tutors_category_title">TOP CATEGORIES</span>
                        { this.renderCategorySelctor() }
                    </div>
                    <div className = "trusted_tutors_category_container">
                        { this.renderCategories() }
                    </div>
                    <Divider/>
                </div>
                <div className = "trusted_tutors_list_root">
                    { this.renderTutorListHead() }
                    { this.renderTutorList() }
                </div>
            </div>
        )
    }
}


export default TrustedTutors
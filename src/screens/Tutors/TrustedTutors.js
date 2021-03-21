import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import TutorCard from '../../components/Card/TutorCard'
import Modal from '../../components/Modal/Modal'
import TutorCategories from './TutorCategories'
import Header from '../../components/Header/Header'

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import all from '../../assets/images/courses/all.png'
import javascript from '../../assets/images/courses/javascript.png'
import maths from '../../assets/images/courses/maths.png'
import bio from '../../assets/images/courses/bio.png'
import musical from '../../assets/images/courses/musical.png'
import accounting from '../../assets/images/courses/accounting.png'
import tutor1 from '../../assets/images/dummy tutors/1.jpg'
import tutor2 from '../../assets/images/dummy tutors/2.jpg'
import tutor3 from '../../assets/images/dummy tutors/3.jpg'
import tutor4 from '../../assets/images/dummy tutors/4.jpg'
import headerImg from '../../assets/images/tutors/header.jpg'
import instructor from '../../assets/images/tutors/instructor.svg'
import './TrustedTutors.css'

class TrustedTutors extends Component {
    state = {
        loading: false,
        selected: {key:"0", src:all, alt:"all", title:"All"},
        tutorSearch: "",
        categoryOptions: ["All"],
        categoryOption: "All",
        moreCategories: false,
    }

    list = [
        {key:"0", src:all, alt:"all", title:"All"},
        {key:"1", src:javascript, alt:"javascript", title:"Javascript"},
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

    cards = [
        {src : instructor, title : "Learn with Experts", description :"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."},
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

    handleMoreCategories = () => {
        this.setState({
            moreCategories: !this.state.moreCategories
        })
    }

    handleCategoryModalOk = () => {

    }

    renderCategoryModal = () => {
        return (
            <Modal
                open = {this.state.moreCategories}
                handleClose = {this.handleMoreCategories}
                title = "Select Tutor Category Here!"
                handleCancel = {this.handleMoreCategories}
                handleOk = {this.handleCategoryModalOk}
            >
                <TutorCategories items = {this.list} handleClick = {this.onCategorySelect}/>
            </Modal>
        )
    }


    renderCategories = () => {
        return (
            this.list.map(item => this.renderCategoryItem(item))
        )
    }


    renderCategoryItem = (item) => {
        const {title,src} = item
        return (
            <Grid item xs={6} sm={6} md={3}>
                <Paper elevation = {5}>
                    <div 
                        onClick={()=>this.onCategorySelect(item)}
                        className = {[
                            "category_item_wrapper",
                            this.state.selected.title === title && "selected_category"
                        ].join(" ")}
                    >
                        <img src={src} alt={title} className = "category_icon_src"/>
                        <span>{title}</span>
                    </div>
                </Paper>
            </Grid>
        )
    }

    renderTutorListHead = () => {
        const selected = this.state.selected
        return (
            <div className = "trusted_tutors_list_head">
                <div className = "header_category">
                    <div className = "category_icon_small selected_category">
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
                { this.renderTutorListHead() }
                <Grid container spacing={3}>
                    {
                        this.dummyTutors.map((item,index) => {
                            return (
                                <Grid item xs={6} sm={6} md={3}>
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

    renderTutorsRoot = () => {
        return (
            <>
                <div className = "trusted_tutors_category">
                    <div className = "trusted_tutors_category_title_container">
                        <span className = "trusted_tutors_category_title">TOP CATEGORIES</span>
                    </div>
                    <div className = "trusted_tutors_category_container">
                        <Grid container spacing={3}>
                            { this.renderCategories() }
                        </Grid>
                    </div>
                    <div className = "more_category">
                        <span onClick = {this.handleMoreCategories}>More Categories</span>
                    </div>
                    <Divider/>
                </div>
                <div className = "trusted_tutors_list_root">
                    { this.renderTutorList() }
                </div>
            </>
        )
    }

    render() {
        const {loading} = this.state
        return (
            <div className = "trusted_tutors_root">
                <Header 
                    title = "COMUNITY EXPERTS"
                    subTitle = ""
                    src = {headerImg} 
                    cards = {this.cards}   
                />
                {
                    loading ? 
                    <Loading open = {loading} />
                    :
                    this.renderTutorsRoot()
                }
                { this.renderCategoryModal() }
            </div>
        )
    }
}


export default TrustedTutors
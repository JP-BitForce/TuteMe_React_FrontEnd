import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import TutorCard from '../../components/Card/TutorCard'
import Modal from '../../components/Modal/Modal'
import TutorCategories from './TutorCategories'
import Header from '../../components/Header/Header'
import CategoryGrid from '../../components/ImageGrid/CategoryBase'

//Material-UI
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import all from '../../assets/images/courses/all.png'
import tutor1 from '../../assets/images/dummy tutors/1.jpg'
import tutor2 from '../../assets/images/dummy tutors/2.jpg'
import tutor3 from '../../assets/images/dummy tutors/3.jpg'
import tutor4 from '../../assets/images/dummy tutors/4.jpg'
import headerImg from '../../assets/images/tutors/headerImg.jpg'
import certified from '../../assets/images/tutors/certified.png'
import experiencedAdvice from '../../assets/images/tutors/advice.png'
import design from '../../assets/images/shared/design.jpg'
import development from '../../assets/images/shared/development.jpg'
import ordinary_level from '../../assets/images/shared/maths.jpg'
import medical from '../../assets/images/shared/medical.jpg'
import musics from '../../assets/images/shared/music.jpg'
import './TrustedTutors.css'

class TrustedTutors extends Component {
    state = {
        loading: false,
        selected: { src:all, title:"ALL" },
        tutorSearch: "",
        categoryOptions: ["All"],
        categoryOption: "All",
        moreCategories: false,
    }

    dummyTutors = [
        {src:tutor1, des:"lorem ipsum", title:"Allan Nickman"},
        {src:tutor2, des:"lorem ipsum", title:"Emma Watson"},
        {src:tutor3, des:"lorem ipsum", title:"Daniel Nickman"},
        {src:tutor4, des:"lorem ipsum", title:"Bob right"},
    ]

    cards = [
        {src : certified, title : "Certified Instructors", description :"Far from the countries Vokalia and Consonantia, there live the blind texts."},
        {src : experiencedAdvice, title : "Experienced Advice", description :"Far from the countries Vokalia and Consonantia, there live the blind texts."},
    ]

    categories = [
        { src: design, title: 'Design', width: '100%' },
        { src: development, title: 'Development', width: '100%' },
        { src: ordinary_level, title: 'Ordinary Level', width: '100%' },
        { src: musics, title: 'Musical', width: '100%' },
        { src: medical, title: 'Medical', width: '100%' },
    ]

    handleTutorSearch = (event) => {
        event.preventDefault()
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

    handleAllOnClick = () => {
        this.setState({
            selected: { src:all, title:"ALL" }
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
                <TutorCategories items = {this.categories} handleClick = {this.onCategorySelect}/>
            </Modal>
        )
    }

    renderCourseCategory = () => {
        return this.categories.map(image => {
            return (
             <Grid item xs={6} sm={6} md={3}>
                <Paper elevation = {3}>
                    <CategoryGrid image = {image}/>
                </Paper>
             </Grid>
            )
        })
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
                                <Grid item xs={12} sm={6} md={4}>
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
                            { this.renderCourseCategory() }
                        </Grid>
                    </div>
                    <div className = "more_category">
                        <span onClick = {this.handleAllOnClick}>All</span>
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
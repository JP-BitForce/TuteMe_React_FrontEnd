import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import TutorCard from '../../components/Card/TutorCard'
import Modal from '../../components/Modal/Modal'
import TutorCategories from './TutorCategories'
import Header from '../../components/Header/Header'
import Pagination from '../../components/Pagination/Paginator'
import { getTutors } from '../../api/tutor'

//Material-UI
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import all from '../../assets/images/courses/all.png'
import tutor3 from '../../assets/images/dummy tutors/3.jpg'
import headerImg from '../../assets/images/tutors/headerImg.jpg'
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
        searchValueError: false,
        total: 1,
        current: 1,
        tutorData: [],
        fetchError: null
    }

    categories = [
        { src: all, title: 'ALL', width: '100%' },
        { src: design, title: 'Designs', width: '100%' },
        { src: development, title: 'Development', width: '100%' },
        { src: ordinary_level, title: 'Ordinary Level', width: '100%' },
        { src: musics, title: 'Musical', width: '100%' },
        { src: medical, title: 'Medical', width: '100%' },
        { src: design, title: 'Design', width: '100%' },
        { src: development, title: 'Developments', width: '100%' },
        { src: ordinary_level, title: 'Ordinary Levels', width: '100%' },
        { src: musics, title: 'Musicals', width: '100%' },
        { src: medical, title: 'Medicalss', width: '100%' },
    ]

    componentDidMount() {
        this.getTutorsApi(0)
    }

    getTutorsApi = (page) => {
        const auth = this.props.auth
        getTutors(auth.accessToken, page).then(response => {
            this.setState({
                total: response.total,
                current: response.current + 1,
                tutorData: response.data
            })
        }).catch(err => {
            this.setState({
                fetchError: err.message
            })
        })
    }

    handleTutorSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.tutorSearch) {
            this.setState({ searchValueError: true })
        } else {
            this.setState({ searchValueError: false })
        }
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false
        })
    }

    onCategorySelect = (item) => {
        this.setState({
            selected: item
        })
    }

    handleMoreCategories = () => {
        this.setState({
            moreCategories: !this.state.moreCategories,
            selected: { src:all, title:"ALL" },
        })
    }

    handleCategoryModalOk = () => {
        this.setState({
            moreCategories: false
        })
    }

    onCategorySelect = (item) => {
        this.setState({ selected: item })
    }

    handlePaginationOnChange = (page) => {
        this.getTutorsApi(page)
    }

    getTutorName = (user) => {
        return `${user.firstName} ${user.lastName}`
    }

    handleViewMore = (idx) => {
        console.log(this.state.tutorData[idx])
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
        return this.categories.slice(0,8).map(image => {
            return (
             <Grid item xs={6} sm={6} md={3}>
                { this.renderCategoryItem(image) }
             </Grid>
            )
        })
    }

    renderCategoryItem = (item) => {
        const {title, src} = item
        return (
            <div className = "tutor_category_icon_wrapper">
                <div
                    onClick={()=> this.onCategorySelect(item)}
                    className={[
                    "tutor_category_icon",
                    this.state.selected.title === title ? "tutor_selected_category_icon" : {},
                    ].join(" ")}
                >
                    <img src={src} alt={title}  className = "tutor_category_icon_src"/>
                </div>
                <span>{title}</span>
            </div>
        )
    }

    renderTutorListHead = () => {
        const {selected, tutorSearch, searchValueError} = this.state
        return (
            <div className = "trusted_tutors_list_head">
                <div className = "header_category">
                    <div className = "category_icon_small tutor_selected_category_icon">
                        <Avatar src = {selected.src}/>
                    </div>
                    <span>
                        {selected.title}
                    </span>
                </div>
                <form noValidate autoComplete="off" onSubmit = {this.handleTutorSearch}>
                    <TextField 
                        id="standard-basic" 
                        label = "tutor" 
                        onChange = {this.handleInputOnChange}
                        variant = "outlined"
                        error = {searchValueError}
                        value = {tutorSearch}
                        helperText = {searchValueError && "Incorrect entry"}
                        name = "tutorSearch"
                        size = "small"
                    />
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">Search</Button>
                </form>
            </div>
        )
    }

    renderTutorList = () => {
        const {loading, total, current, tutorData} = this.state
        return (
            <div className = "trusted_tutors_list">
                { this.renderTutorListHead() }
                <Grid container spacing={3}>
                    {
                        tutorData.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={12} md={4} key = {item.id}>
                                    <Paper elevation = {3}>
                                        <TutorCard 
                                            media={tutor3} 
                                            title={this.getTutorName(item.user).toUpperCase()} 
                                            rate = {item.rating}
                                            subject = "Advanced level Mathematics"
                                            onClick = {this.handleViewMore}
                                            id = {index}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <div className = "pagination_div">
                    {
                        !loading &&
                        <Pagination 
                            total = {total}
                            current = {current}
                            handleOnChange = {this.handlePaginationOnChange}
                        />
                    }
                </div>
            </div>
        )
    }

    renderTutorsRoot = () => {
        return (
            <>
                <div className = "trusted_tutors_category">
                    <div className = "trusted_tutors_category_container">
                        <span className = "trusted_tutors_category_title">TOP CATEGORIES</span>
                        <Grid container spacing={3} style = {{marginTop: "10px"}}>
                            { this.renderCourseCategory() }
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
                    src = {headerImg}
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(TrustedTutors)
import React, { Component } from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'
import Pagination from '../../components/Pagination/Paginator'
import {getTutors, searchTutorByValue} from '../../api/landing'

//Material-UI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'

import avatar from '../../assets/images/shared/avatar.png'
import './Links.css'

class Staffs extends Component {
    state = {
        loading :false,
        tutorData: [],
        total: 0,
        current: 0,
        fetchError: null,
        searchValueError: null, 
        searchValue: "", 
        searchTutor: false,
        searchLoading: false
    }

    componentDidMount() {
        this.getTutorsApi(0)
    }

    getTutorsApi = (page) => {
        this.setState({ loading: true })
        getTutors(page).then(response => {
            this.setState({
                loading: false,
                tutorData: response.tutorList,
                total: response.total,
                current: response.current+1,
                fetchError: null,
            })
        }).catch(err => {
            this.setState({
                fetchError: "server error, please try again later",
                loading: false,
                tutorData: []
            })
        })
    }

    searchTutorByValueApi = (page) => {
        this.setState({ searchLoading: true })
        searchTutorByValue(page, this.state.searchValue).then(response=> {
            this.setState({
                searchLoading: false,
                tutorData: response.tutorList,
                total: response.total,
                current: response.current+1,
                fetchError: null,
                searchTutor: true
            })
        }).catch(err => {
            this.setState({
                fetchError: "server error, please try again later",
                searchLoading: false,
                tutorData: [],
                searchTutor: true
            })
        })
    }
    
    handleTutorSearch = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const {searchValue, searchTutor} = this.state
        if (!searchTutor) {
            if (!searchValue) {
                this.setState({ searchValueError: true })
            } else {
                this.searchTutorByValueApi(0)
                this.setState({ searchValueError: false })
            }
        } else {
            this.setState({ searchValue: "", searchTutor: false})
            this.getTutorsApi(0)
        }
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false,
            emptyError: null
        })
    }

    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    handlePagination = (event, page) => {
        if (!this.state.searchTutor) {
            this.searchTutorByValueApi(page-1)
        } else {
            this.getTutorsApi(page-1)
        }
    }

    renderTutorCard = (item) => {
        const {id, firstName, lastName, src, rating, subject, description} = item
        return (
            <Grid item xs={6} sm={6} md={3} key = {id}>
                <div className = "public_card_item">
                    <Grid conatiner spacing={4}>
                        <Grid item>
                            <div className = "course_enrolled_content">
                                <Avatar src = {src ? this.getImageSource(src) : avatar} style = {{width : "80px", height: "80px"}}/>
                                <h5>{`${firstName} ${lastName}`}</h5>
                                <h6>{description.slice(0, 100)}...</h6>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <ReadOnlyRating rate = {rating}/>
                                    </Grid>
                                </Grid>
                                <div className = "course_card__meta">
                                    <span>subject: {subject}</span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        )
    }

    renderTutorList = () => {
        const {tutorData} = this.state
        return (
            <Grid container spacing={4}>
                { tutorData.map(item => this.renderTutorCard(item)) }
            </Grid>
        )
    }

    renderStaffsListHead = () => {
        return (
            <div className = "row">
                <div class="col">
                    <div class="section_title text-center">
                        <h1>Popular Tutors</h1>
                    </div>
                </div>
            </div>
        )
    }

    renderTutorSearch = () => {
        const {searchValueError, searchValue, searchTutor} = this.state
        return (
            <div className = "courses_list_head">
                <form noValidate autoComplete="off" onSubmit = {this.handleTutorSearch}>
                    <TextField 
                        id = "standard-basic" 
                        label = "tutor" 
                        onChange = {this.handleInputOnChange}
                        variant = "outlined"
                        error = {searchValueError}
                        value = {searchValue}
                        helperText = {searchValueError && "Incorrect entry"}
                        name = "searchValue"
                        size = "small"
                    />
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">{searchTutor ? "Cancel": "Search"}</Button>
                </form>
            </div>
        )
    }

    renderPagination = () => {
        const {total, current, tutorData} = this.state
        return (
            <div className = "pagination_div">
                {
                    tutorData.length > 0 &&
                    <Pagination
                        total = {total}
                        current = {current}
                        handleOnChange = {this.handlePagination}
                    />
                }
            </div>
        )
    }

    renderNoTutorsAvailable = () => {
        <Grid item xs={12} sm={12} md={12}>
            <div className = "no_courses_available_container">
                <span className = "no_courses_available">NO TUTORS FOUND</span>
            </div>
        </Grid>
    }

    renderMainContent = () => {
        const {tutorData, searchLoading} = this.state
        return (
            <div className = "public_staffs_main_root">
                { this.renderStaffsListHead() }
                { this.renderTutorSearch() }
                { 
                    searchLoading ? <CircularProgress/> 
                    :
                    tutorData.length > 0 ? this.renderTutorList() 
                    :
                    this.renderNoTutorsAvailable()
                }
                { this.renderPagination() }
            </div>
        )
    }

    renderTopContent = () => {
        return (
            <div className = "staffs_content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4">Community Experts are here</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderMainContainer = () => {
        return (
            <div>
                { this.renderTopContent() }
                { this.renderMainContent() }
            </div>
        )
    }

    render() {
        const history = this.props.history
        const {loading} = this.state
        return (
            <div>
                <AppBar history = {history}/>
                { 
                    loading ? <Loading open = {loading}/> : this.renderMainContainer() 
                }
                <Footer history = {history}/>
            </div>
        )
    }
}

export default Staffs
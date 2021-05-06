import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import TutorCard from '../../components/Card/TutorCard'
import Modal from '../../components/Modal/Modal'
import TutorCategories from './TutorCategories'
import Header from '../../components/Header/Header'
import Pagination from '../../components/Pagination/Paginator'
import TutorModal from '../../components/Modal/TutorModal'
import CategoryBase from '../../components/ImageGrid/CategoryBase'
import { getTutors, searchTutorByValue, filterTutorsByCategories } from '../../api/tutor'
import { getCourseCategories } from '../../api/course'

//Material-UI
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import all from '../../assets/images/shared/all.png'
import headerImg from '../../assets/images/tutors/headerImg.jpg'
import avatar from '../../assets/images/shared/avatar.png'
import './TrustedTutors.css'

class TrustedTutors extends Component {
    state = {
        loading: false,
        categoryLoading: false,
        selected: { src: all, category: "ALL" },
        tutorSearch: "",
        categoryOptions: ["All"],
        categoryOption: "All",
        moreCategories: false,
        searchValueError: false,
        total: 1,
        current: 1,
        tutorData: [],
        fetchError: null,
        openTutorModal: false,
        selectedTutor: null,
        categoriesdata: [],
        tutorSearched: false,
        searchLoading: false,
        filterLoading: false,
        tutorFiltered: false
    }

    componentDidMount() {
        this.getCourseCategoriesApi(0)
        this.getTutorsApi(0)
    }

    getTutorsApi = (page) => {
        const auth = this.props.auth
        this.setState({loading: true})
        getTutors(auth.accessToken, page).then(response => {
            this.setState({
                total: response.total,
                current: response.current + 1,
                tutorData: response.tutorList,
                loading: false
            })
        }).catch(err => {
            this.setState({
                fetchError: err.message,
                loading: false
            })
        })
    }

    getCourseCategoriesApi = (page) => {
        const auth = this.props.auth
        this.setState({categoryLoading: true})
        getCourseCategories(auth.accessToken, page).then(response => {
            this.setState({
                categoriesdata: response.courseCategoryList,
                categoryLoading: false
            })
        }).catch(err => {
            this.setState({
                fetchError: err.message,
                categoryLoading: false
            })
        })
    }

    searchTutorApi = (page) => {
        const auth = this.props.auth
        this.setState({searchLoading: true})
        searchTutorByValue(auth.accessToken, page, this.state.tutorSearch).then(response => {
            this.setState({
                total: response.total,
                current: response.current + 1,
                tutorData: response.tutorList,
                searchLoading: false
            })
        }).catch(err => {
            this.setState({ searchLoading: false })
        })
    }

    filterTutorsApi = (page, selected) => {
        const auth = this.props.auth
        this.setState({ filterLoading: true, tutorFiltered: true })
        const body = {
            page,
            category: selected.category
        }
        filterTutorsByCategories(auth.accessToken, body).then(response => {
            this.setState({ 
                filterLoading: false,
                total: response.total,
                current: response.current + 1,
                tutorData: response.tutorList,
             })
        }).catch(err => {
            this.setState({ filterLoading: false })
        })
    }

    handleTutorSearch = (event) => {
        event.preventDefault()
        event.stopPropagation()
        const {tutorSearch, tutorSearched} = this.state
        if (!tutorSearched) {
            if (tutorSearch) {
                this.setState({ 
                    searchValueError: false,
                    tutorSearched: true 
                })
                this.searchTutorApi(0)
            } else {
                this.setState({ searchValueError: true })
            }
        } else {
            this.setState({ 
                tutorSearched: false,
                tutorSearch: "",
                searchValueError: false,
            })
            this.getTutorsApi(0)
        }
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false
        })
    }

    handleMoreCategories = () => {
        this.setState({
            moreCategories: !this.state.moreCategories,
            selected: { src: all, category: "ALL" },
        })
    }

    handleCategoryModalOk = () => {
        this.setState({
            moreCategories: false
        })
    }

    onCategorySelect = (item) => {
        this.setState({ selected: item })
        this.filterTutorsApi(0, item)
    }

    handlePaginationOnChange = (event, value) => {
        const {tutorSearched, tutorFiltered, selected} = this.state
        if (tutorSearched) {
            this.searchTutorApi(value-1)
        } else if (tutorFiltered) {
            this.filterTutorsApi(value-1, selected)
        } else {
            this.getTutorsApi(value-1)
        }
    }

    getTutorName = (user) => {
        return `${user.firstName} ${user.lastName}`
    }

    handleViewMore = (id) => {
        this.setState({
            openTutorModal: true,
            selectedTutor: this.state.tutorData.filter(item => item.id === id )[0]
        })
    }

    handleTutorModalClose = () => {
        this.setState({
            openTutorModal: false,
            selectedTutor: null
        })
    }

    handleAllOnClick = () => {
        this.setState({
            selected: { src: all, category: "ALL" },
            tutorFiltered: false
        })
        this.getTutorsApi(0)
    }

    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    renderCategoryModal = () => {
        const {moreCategories, categoriesdata} = this.state
        return (
            <Modal
                open = {moreCategories}
                handleClose = {this.handleMoreCategories}
                title = "Select Tutor Category Here!"
                handleCancel = {this.handleMoreCategories}
                handleOk = {this.handleCategoryModalOk}
            >
                <TutorCategories items = {categoriesdata} handleClick = {this.onCategorySelect}/>
            </Modal>
        )
    }

    renderCourseCategory = () => {
        return this.state.categoriesdata.slice(0,8).map(image => {
            return (
             <Grid item xs={6} sm={6} md={3}>
                {
                    this.state.categoryLoading ? 
                    <div className = "loading_div">
                        <CircularProgress/>
                    </div>
                    :
                    <CategoryBase image = {image} handleOnClick = {this.onCategorySelect}/>
                }
             </Grid>
            )
        })
    }

    renderTutorListHead = () => {
        const {selected, tutorSearch, searchValueError, tutorSearched} = this.state
        return (
            <div className = "trusted_tutors_list_head">
                <div className = "header_category">
                    <div className = "category_icon_small tutor_selected_category_icon">
                        <Avatar src = {
                            selected.category === "ALL" ?  selected.src : this.getImageSource(selected.src)
                        }
                        />
                    </div>
                    <span>
                        {selected.category}
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
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">
                        { tutorSearched ? "Cancel" : "Search" }
                    </Button>
                </form>
            </div>
        )
    }

    renderTutorList = () => {
        const {loading, total, current, tutorData, searchLoading, filterLoading} = this.state
        return (
            <div className = "trusted_tutors_list">
                { this.renderTutorListHead() }
                <Grid container spacing={3}>
                    {
                        searchLoading || filterLoading ? 
                        <Grid item xs={12} sm={12} md={12}>
                            <CircularProgress/> 
                        </Grid>
                        :
                        tutorData.length === 0 ?
                        <Grid item xs={12} sm={12} md={12}>
                            <span className = "no_courses_available">NO TUTORS AVAILABLE</span>
                        </Grid>
                        :
                        tutorData.map((item) => {
                            const {src} = item
                            return (
                                <Grid item xs={12} sm={12} md={4} key = {item.id}>
                                    <TutorCard 
                                        media={ src ? this.getImageSource(src) : avatar} 
                                        title={this.getTutorName(item).toUpperCase()} 
                                        onClick = {this.handleViewMore}
                                        item = {item}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <div className = "pagination_div">
                    {
                        !loading && tutorData.length > 0 &&
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
        const {loading, openTutorModal, selectedTutor} = this.state
        return (
            <div className = "trusted_tutors_root">
                <Header 
                    title = "COMUNITY EXPERTS"
                    src = {headerImg}
                />
                {
                    loading ? <Loading open = {loading} />
                    :
                    this.renderTutorsRoot()
                }
                { this.renderCategoryModal() }
                {
                    selectedTutor && <TutorModal 
                        open = {openTutorModal}
                        handleClose = {this.handleTutorModalClose}
                        selectedTutor = {selectedTutor}
                    />
                }
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
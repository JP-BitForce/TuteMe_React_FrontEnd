import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment';

import Loading from '../../components/Loading/Loading'
import CourseCard from '../../components/Card/CourseCard'
import Header from '../../components/Header/Header'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Pagination from '../../components/Pagination/Paginator'
import Checkout from './Checkout'
import SnackBar from '../../components/SnackBar/SnackBar'
import { 
    getCourses, 
    getFilterCategories, 
    searchCourseByValue,
    filterCourses,
    enrollmentByBankPay,
    enrollmentByPaypalPay 
} from '../../api/course'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import headerImg from '../../assets/images/Course/online_headerImg.jpg'
import altImage from '../../assets/images/Course/alt.jpg'
import './Courses.css'

class OnlineCourses extends Component {
    state = {
        loading: false,
        moreCategories: false,
        checked: [0],
        searchValue: "",
        searchValueError: false,
        categoryChecked: [0],
        tutorChecked: [0],
        typeChecked: [0],
        priceChecked: [0],
        allCoursecategories: [],
        slicedCourseCategories: [],
        allCourseInstructors: [],
        slicedCourseInstructors: [],
        allCourseType: [],
        slicedCourseType: [],
        allCoursePrice: [],
        slicedCoursePrice: [],
        total: 1,
        current: 1,
        fetchError: null,
        coursesData: [],
        selectedCourse: null,
        openCheckoutModal: false,
        paymentMethod: "paypal",
        paymentValidated: false,
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        mobile: "",
        email: "",
        cvv: "",
        exp: null,
        cardNo: "",
        depositedAt: new Date(),
        scanCopy: null,
        emptyError: null,
        step: 1,
        subscription: "Premium",
        searchCourse: false,
        searchFilterLoading: false,
        filterCourse: false,
        file: null,
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        payLoading: false
    }

    componentDidMount() {
        this.getCategoriesApi()
        this.getCoursesApi(0)
    }

    getCategoriesApi = () => {
        const auth = this.props.auth
        getFilterCategories(auth.accessToken).then(response => {
            if (response) {
                this.setState({
                    slicedCourseCategories: response.courseCategoryList.slice(0,5),
                    slicedCourseInstructors: response.tutorList.slice(0,5),
                    slicedCourseType: response.courseLevelList.slice(0,5),
                    slicedCoursePrice: response.coursePriceCategoryList.slice(0,5),
                    allCoursecategories: response.courseCategoryList,
                    allCourseInstructors: response.tutorList,
                    allCourseType: response.courseLevelList,
                    allCoursePrice: response.coursePriceCategoryList
                })
            }
        }).catch(err => {
            this.setState({
                fetchError: err.message
            })
        })
    }

    getCoursesApi = (page) => {
        const auth = this.props.auth
        this.setState({ loading: true, searchCourse: false })
        getCourses(auth.accessToken, page, auth.userId).then(response => {
            this.setState({ 
                loading: false,
                coursesData: response.data,
                total: response.total,
                current: response.current+1,
                fetchError: null,
            })
        }).catch(err => {
            this.setState({ 
                loading: false,
                fetchError: err.message 
            })
        })
    }

    searchCourseByValueApi = (page) => {
        const auth = this.props.auth
        const request = {
            page,
            value: this.state.searchValue,
            userId: auth.userId
        }
        this.setState({ searchCourse: true, searchFilterLoading: true })
        searchCourseByValue(auth.accessToken, request).then(response => {
            this.setState({ 
                searchFilterLoading: false,
                coursesData: response.data,
                total: response.total,
                current: response.current+1,
                fetchError: null,
            })
        }).catch(err => {
            this.setState({ 
                searchFilterLoading: false,
                fetchError: err.message 
            })
        })
    }

    handleFilterApi = (page, list) => {
        if(!this.state.filterCourse) {
            const auth = this.props.auth
            const body = {
                categoryList: list.categoryList,
                tutorList: list.tutorList,
                typeList: list.typeList,
                priceList: list.priceList,
                page: page,
                userId: auth.userId
            }
            this.setState({ filterCourse: true,  searchFilterLoading: true })
            filterCourses(auth.accessToken, body).then(response => {
                this.setState({ 
                    searchFilterLoading: false,
                    coursesData: response.data,
                    total: response.total,
                    current: response.current+1,
                    fetchError: null,
                })
            }).catch(err => {
                this.setState({ 
                    searchFilterLoading: false,
                    fetchError: err.message 
                })
            })
        } else {
            this.setState({ 
                filterCourse: false,
                categoryChecked: [0],
                tutorChecked: [0],
                typeChecked: [0],
                priceChecked: [0], 
            })
            this.getCoursesApi(0)
        }
    }

    handleConfirmAndPay = () => {
        const auth = this.props.auth
        const {
            firstName, lastName, address, city, zip, mobile, email,
            cvv, cardNo, paymentMethod, selectedCourse, subscription, file
        } = this.state

        if (paymentMethod === "paypal") {
            const body = {
                firstName, lastName, address, city, zip, mobile, email,
                cvv, cardNo,
                userId: auth.userId,
                courseId: selectedCourse.id,
                paymentType: subscription,
                exp: moment(this.state.exp).format('YYYY-MM-DDT00:00:00')
            }
            this.setState({ payLoading: true })
            enrollmentByPaypalPay(auth.accessToken, body).then(response => {
                this.setFormStateAfterSucessEnroll(response)
                this.getCoursesApi(0)
            }).catch(err => {
                this.setState({
                    snackBarOn: true,
                    severity: "error",
                    snackBarMessage: err.message,
                    payLoading: false
                })
            })
        }

        if (paymentMethod === "bank") {
            const body = {
                firstName, 
                lastName, 
                email,
                userId: auth.userId,
                courseId: selectedCourse.id,
                paymentType: subscription,
                depositedAt:  moment(this.state.depositedAt).format('YYYY-MM-DDT00:00:00'),
            }
            const formData = new FormData()
            const json = JSON.stringify(body)
            const blob = new Blob([json], {
                type: 'application/json'
            })
            formData.append("request", blob)
            formData.append("file", file)
            this.setState({ payLoading: true })
            enrollmentByBankPay(auth.accessToken, formData).then(response => {
                this.setFormStateAfterSucessEnroll(response)
                this.getCoursesApi(0)
            }).catch(err => {
                this.setState({
                    snackBarOn: true,
                    severity: "error",
                    snackBarMessage: err.message,
                    payLoading: false
                })
            })
        }
    }

    setFormStateAfterSucessEnroll = (response) => {
        this.setState({
            snackBarOn: true,
            severity: "success",
            snackBarMessage: response.message,
            payLoading: false,
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            zip: "",
            mobile: "",
            email: "",
            cvv: "",
            exp: null,
            cardNo: "",
            depositedAt: new Date(),
            scanCopy: null,
            emptyError: null,
            step: 1,
            subscription: "Premium",
            openCheckoutModal: false,
            selectedCourse: null,
            paymentMethod: "paypal",
            paymentValidated: false,
            file: null,
        })
    }

    handleFilter = () => {
        this.handleFilterApi(0, this.getFiltersList())
    }

    getFiltersList = () => {
        const {
            categoryChecked, typeChecked, tutorChecked, priceChecked,
            allCoursecategories, allCourseType, allCourseInstructors, allCoursePrice
        } = this.state

        let categoryList = []
        categoryChecked.filter(idx => {
            categoryList.push(allCoursecategories[idx])
            return 0
        })

        let tutorList = []
        tutorChecked.filter(idx => {
            tutorList.push(allCourseInstructors[idx])
            return 0
        })

        let typeList = []
        typeChecked.filter(idx => {
            typeList.push(allCourseType[idx])
            return 0
        })

        let priceList = []
        priceChecked.filter(idx => {
            priceList.push(allCoursePrice[idx])
            return 0
        })

        const list = { categoryList, tutorList, typeList, priceList}
        return list
    }

    handleCourseSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {searchValue, searchCourse} = this.state
        if(!searchCourse) {
            if (!searchValue) {
                this.setState({ searchValueError: true })
            } else {
                this.searchCourseByValueApi(0)
                this.setState({ searchValueError: false })
            }
        } else {
            this.setState({ 
                searchValue: "",
                searchCourse: false
            })
            this.getCoursesApi(0)
        }
    }

    handlePaymentTypeOnSelect = (type) => {
        this.setState({ subscription: type })
    }

    handleFileOnChange = (file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ 
                scanCopy: reader.result,
                file 
            });
        }
        reader.readAsDataURL(file)
    }

    handleDateOnchange = (type, val) => {
        this.setState({ [type]: val })
    }

    handleCheckFieldEmpty = () => {
        const {
            firstName,
            lastName,
            address,
            city,
            zip,
            mobile,
            email,
            cvv,
            exp,
            cardNo,
            depositedAt,
            scanCopy,
            paymentMethod
        } = this.state

        if(paymentMethod === "paypal") {
            if(firstName && lastName && address && city && zip && mobile && email && cvv && exp && cardNo) {
                this.setState({ emptyError: null })
                return true
            } else {
                this.setState({ emptyError: "Fields cannot be empty" })
                return false
            }
        } else {
            if(firstName && lastName && email && depositedAt && scanCopy) {
                this.setState({ emptyError: null })
                return true
            } else {
                this.setState({ emptyError: "Fields cannot be empty" })
                return false
            }
        }
    }

    handleNext = () => {
        let step = this.state.step
        if (step === 1) {
            this.setState({ step : step + 1 })
        }
        if (step === 2) {
            if(this.handleCheckFieldEmpty()) {
                this.setState({ step : step + 1 })
            }
        }
    }

    handlePrev = () => {
        this.setState({ emptyError: null })
        let step = this.state.step
        if (step !== 1) {
            this.setState({step : step - 1 })
        }
        if (step === 1) {
            this.handleEnrollNowCancel()
        }
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            severity: "",
            snackBarMessage: "",
        })
    }

    handleEnrollNowCancel = () => {
        this.setState({ 
            openCheckoutModal: false,
            selectedCourse: null
        })
    }

    handleViewEnrollOnClick = (id) => {
        const course = this.state.coursesData.filter(item => item.id === id)[0]
        this.setState({
            openCheckoutModal: true,
            selectedCourse: course
        })
    }

    handleInputOnChange = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value,
            searchValueError: false,
            emptyError: null
        })
    }

    handleToggle = (type, index) => {
        switch(type) {
            case "Course Category": this.handleCheck("categoryChecked", index)
                                    break;
            case "Course Instructors": this.handleCheck("tutorChecked", index)
                                       break;
            case "Course Type": this.handleCheck("typeChecked", index)
                                break;
            case "Course Price": this.handleCheck("priceChecked", index)
                                break;
            default: return
        }
    }

    handleCheck = (type, index) => {
        const checked = this.state[type]
        const currentIndex = checked.indexOf(index);
        const newChecked = [...checked];

        if (currentIndex === -1) {
          newChecked.push(index);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        this.setState({ [type]: newChecked })
    }

    handleLoadMore = (type) => {
        const {
            allCoursecategories, allCourseInstructors, allCourseType, allCoursePrice
        } = this.state
        switch(type) {
            case "Course Category": this.handleLoad(allCoursecategories, "slicedCourseCategories")
                                    break;
            case "Course Instructors": this.handleLoad(allCourseInstructors, "slicedCourseInstructors")
                                       break;
            case "Course Type": this.handleLoad(allCourseType, "slicedCourseType")
                                break;
            case "Course Price": this.handleLoad(allCoursePrice, "slicedCoursePrice")
                                break;
            default: return
        }
    }

    handleLoad = (all, state) => {
        let data = all
        if(this.state[state] === all) {
            data = all.slice(0,5)
        } 
        this.setState({
            [state]: data
        })
    }

    handlePaginationOnChange = (page) => {
        this.getCoursesApi(page-1)
    }

    getPriceCategories = (data) => {
        let list = []
        data.filter(item => {
            list.push(`Rs ${item.priceMin}.00 - ${item.priceMax}.00`)
            return 0
        })
        return list
    }

    renderCourseCard = (item) => {
        return (
            <Grid item xs={6} sm={6} md={4}>
                <CourseCard
                    src = {altImage}
                    item = {item}
                    onClick = {this.handleViewEnrollOnClick}
                />
            </Grid>
        )
    }

    renderListHead = () => {
        const {searchValue, searchValueError, searchCourse, filterCourse} = this.state
        return (
            <div className = "courses_list_head">
                <Button variant="contained" onClick = {this.handleFilter}>{ filterCourse ? "cancel": "Filter courses" }</Button>
                <form noValidate autoComplete="off" onSubmit = {this.handleCourseSearch}>
                    <TextField 
                        id = "standard-basic" 
                        label = "course" 
                        onChange = {this.handleInputOnChange}
                        variant = "outlined"
                        error = {searchValueError}
                        value = {searchValue}
                        helperText = {searchValueError && "Incorrect entry"}
                        name = "searchValue"
                        size = "small"
                    />
                    <Button variant="contained" style = {{marginLeft: "5px"}} type = "submit">{searchCourse ? "Cancel": "Search"}</Button>
                </form>
            </div>
        )
    }

    renderCategoryFilters = () => {
        const {
            categoryChecked, tutorChecked, typeChecked, priceChecked,
            slicedCourseCategories, slicedCourseInstructors, slicedCoursePrice, slicedCourseType,
            allCourseInstructors, allCoursePrice, allCourseType, allCoursecategories
        } = this.state
        const filters = [
            {title: "Course Category", options: slicedCourseCategories, checked: categoryChecked, total: allCoursecategories},
            {title: "Course Instructors", options: slicedCourseInstructors, checked: tutorChecked, total: allCourseInstructors },
            {title: "Course Type", options: slicedCourseType, checked: typeChecked, total: allCourseType},
            {title: "Course Price", options: this.getPriceCategories(slicedCoursePrice), checked: priceChecked, total: allCoursePrice},
        ]
        return filters.map(item => {
            return (
                <Grid item xs={6} sm={6} md={12}>
                    <CategoryFilter 
                        title = {item.title}
                        options = {item.options}
                        handleToggle = {this.handleToggle}
                        checked = {item.checked}
                        handleLoadMore = {this.handleLoadMore}
                        total = {item.total.length}
                    />
                </Grid>
            )
        })
    }

    renderCourseList = () =>{
        const {loading, total, current, coursesData} = this.state
        return (
            <div className = "online_course_list_container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={3}>
                        <Grid container spacing={1}>
                            { this.renderCategoryFilters() }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9}>
                        <div maxWidth="md">
                            { this.renderListHead() }
                        </div>
                        <Grid container spacing={2}>
                            { coursesData.map(item => this.renderCourseCard(item)) }
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
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderNoCoursesAvailable = () => {
        return (
            <div className = "no_courses_available_container">
                <span className = "no_courses_available">NO COURSES AVAILABLE</span>
            </div>
        )
    }

    render() {
        const {loading, selectedCourse, openCheckoutModal, searchFilterLoading, snackBarOn, snackBarMessage, severity, coursesData} = this.state
        return (
            <div className = "online_courses_root">
                <Header 
                    title = "BROWSE ONLINE COURSES" 
                    src = {headerImg}
                />
                {
                    loading ? <Loading open = {loading} /> 
                    :
                    searchFilterLoading ? 
                    <div className = "main_loading">
                        <CircularProgress/>
                    </div>
                    :
                    coursesData.length === 0 ? this.renderNoCoursesAvailable()
                    :
                    this.renderCourseList()
                }
                {
                    selectedCourse && 
                    <Checkout
                        open = {openCheckoutModal}
                        course = {selectedCourse}
                        values = {this.state}
                        handleInputOnChange = {this.handleInputOnChange}
                        handleFileOnChange = {this.handleFileOnChange}
                        handleDateOnchange = {this.handleDateOnchange}
                        handleNext = {this.handleNext}
                        handlePrev = {this.handlePrev}
                        handlePaymentTypeOnSelect = {this.handlePaymentTypeOnSelect}
                        handleConfirmAndPay = {this.handleConfirmAndPay}
                    />
                }
                <SnackBar
                    open = {snackBarOn}
                    autoHideDuration = {3000}
                    message = {snackBarMessage}
                    severity = {severity}
                    handleClose = {this.handleSnackBarClose}
                    align = {{ vertical: 'top', horizontal: 'right' }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(OnlineCourses)
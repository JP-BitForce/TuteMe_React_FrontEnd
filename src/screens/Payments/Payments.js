import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import Loading from '../../components/Loading/Loading'
import HeaderCard from '../../components/Header/HeaderCard'
import HeaderTopper from '../../components/Header/HeaderTopper'
import PaymentSummary from './PaymentSummary'
import Checkout from './Checkout'
import UpgradePlanDialog from './UpgradePlan'
import SnackBar from '../../components/SnackBar/SnackBar'

import { getPayments, upgradePlan, getPaymentSummaryFacts, deletePaymentCard } from '../../api/payment'
import { getCourseById, enrollmentByBankPay, enrollmentByPaypalPay  } from '../../api/course'

//Material-UI
import Subject from '@material-ui/icons/Subject';
import CreditCard from '@material-ui/icons/CreditCard';
import paypalSrc from '../../assets/images/Payments/ic_paypal.svg'
import BankSrc from '../../assets/images/Payments/bank.png'

import headerImg from '../../assets/images/Payments/headerImg.jpg'
import './Payments.css'

class Payments extends Component {
    state = {
        loading: false,
        tabValue: 0,
        childNav: ["Payments", "Summary"],
        courseId: "",
        total_payment: "0.00",
        paymentData:[],
        total: 1,
        current: 1,
        fetchError: null,
        openUpgradePlanModal: false,
        subscription: "",
        paymentMethod: "paypal",
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
        file: null,
        snackBarOn: false,
        severity: "success",
        snackBarMessage: "",
        payLoading: false,
        searchEmptyError: null,
        searchLoading: false,
        searchCourseData: null,
        courseSearched: false,
        subscriptionEmptyError: null,
        upgradeSubscriptionLoading: false,
        subscripted: "",
        paymentType: "Premium",
        downloading: false,
        paymentMethodCards: [],
        cardType: "",
        bankAccounts: []
    }
    tab_links = ["Summary", "Checkout"]
    icons = {
        Summary: <Subject/>,
        Checkout: <CreditCard/>,
        Paypal: paypalSrc,
        Bank: BankSrc
    }
    tableHead = ["#", "Type", "Method", "Date", "Amount(LKR)"]

    componentDidMount() {
        this.getPaymentsApi(0)
        this.getPaymentSummaryFactsApi()
    }

    getPaymentsApi = (page) => {
        const auth = this.props.auth
        this.setState({ loading: true })
        getPayments(auth.accessToken, page, auth.userId).then(response => {
            this.setState({ 
                loading: false,
                paymentData: response.payments,
                total: response.total,
                current: response.current,
                fetchError: null
            })
        }).catch(err => {
            this.setState({ 
                loading: false,
                paymentData: [],
                total: 0,
                current: 0,
                fetchError: err.message 
            })
        })
    }

    getPaymentSummaryFactsApi = () => {
        const auth = this.props.auth
        getPaymentSummaryFacts(auth.accessToken, auth.userId).then(response => {
            this.setState({ 
                subscription: response.plan, 
                subscripted: response.plan, 
                paymentType: response.plan,
                bankAccounts: response.bankAccounts,
                paymentMethodCards: response.cards
            })
        }).catch(err => {
            this.setState({ subscription: "" })
        })
    }

    handleUpgrade = () => {
        const auth = this.props.auth
        const {subscription} = this.state
        if (subscription) {
            this.setState({ upgradeSubscriptionLoading: true, subscriptionEmptyError: null })
            upgradePlan(auth.accessToken, auth.userId, subscription).then(response => {
                this.setState({ 
                    subscriptionEmptyError: null,
                    upgradeSubscriptionLoading: false,
                    openUpgradePlanModal: false
                })
                this.setSnackBar("success", response.message)
            }).catch(err => {
                this.setState({ 
                    subscriptionEmptyError: null,
                    upgradeSubscriptionLoading: false
                })
                this.setSnackBar("error", err.message)
            })
        } else {
            this.setState({ subscriptionEmptyError: "subscription cannot be empty"})
        }
    }

    handleCourseSearch = () => {
        const auth = this.props.auth
        const {courseId, courseSearched} = this.state
        if (!courseSearched) {
            if (courseId) {
                this.setState({ searchLoading: true, courseSearched: true })
                getCourseById(auth.accessToken, courseId).then(response => {
                    this.setState({ 
                        searchEmptyError: null,
                        searchLoading: false,
                        searchCourseData: response,
                        total_payment: response.price
                    })
                }).catch(err => {
                    this.setState({ 
                        searchEmptyError: null,
                        searchLoading: false,
                        searchCourseData: null
                    })
                })
            } else {
                this.setState({ searchEmptyError: "Id cannot be empty"})
            }
        } else {
            this.setState({ 
                courseSearched: false,
                courseId: "",
                searchCourseData: null
            })
        }
    }

    handlePayByPaypalApi = (body) => {
        const auth = this.props.auth
        this.setState({ payLoading: true })
        enrollmentByPaypalPay(auth.accessToken, body).then(response => {
            this.setSnackBar("success", response.message)
        }).catch(err => {
            this.setState({ payLoading: false })
            this.setSnackBar("error", err.message)
        })
    }

    handlePayByBankApi = (body, file) => {
        const auth = this.props.auth
        const formData = new FormData()
        const json = JSON.stringify(body)
        const blob = new Blob([json], {
            type: 'application/json'
        })
        formData.append("request", blob)
        formData.append("file", file)
        this.setState({ payLoading: true })
        enrollmentByBankPay(auth.accessToken, formData).then(response => {
            this.setSnackBar("success", response.message)
        }).catch(err => {
            this.setState({ payLoading: false })
            this.setSnackBar("error", err.message)
        })
    }

    handleConfirmAndPay = () => {
        if (this.handleCheckFieldEmpty()) {
            const auth = this.props.auth
            const {
                firstName, lastName, address, city, zip, mobile, email,
                cvv, cardNo, paymentMethod, selectedCourse, subscription, file, cardType
            } = this.state

            if (paymentMethod === "paypal") {
                const body = {
                    firstName, lastName, address, city, zip, mobile, email,
                    cvv, cardNo,
                    userId: auth.userId,
                    courseId: selectedCourse.id,
                    paymentType: subscription,
                    exp: moment(this.state.exp).format('YYYY-MM-DDT00:00:00'),
                    amount: selectedCourse.price,
                    cardType: cardType
                }
                this.handlePayByPaypalApi(body)
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
                    amount: selectedCourse.price
                }
                this.handlePayByBankApi(body, file)
            }
        }
    }

    handleDeleteCardApi = (cardId) => {
        const auth = this.props.auth
        deletePaymentCard(auth.accessToken, auth.userId, cardId).then(response => {
            this.setState({ 
                subscription: response.plan, 
                subscripted: response.plan, 
                paymentType: response.plan,
                bankAccounts: response.bankAccounts,
                paymentMethodCards: response.cards
            })
        }).catch(err => {
            this.setState({ 
                subscription: "", 
                subscripted: "", 
                paymentType: "",
                bankAccounts: [],
                paymentMethodCards: []
            })
        })
    }
    
    handleDeleteCard = (name, value) => {
        console.log(name, value)
        if (name === "Paypal") {
            this.handleDeleteCardApi(value.cardNo)
        }
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

    handleDownloadOnClick = () => {
        this.setState({ downloading: true })
        const excelDate = this.state.paymentData.map(payment => {
            const paymentDetails = {
                'Payment Id': payment.id,
                'Payment Type': payment.paymentType,
                'Payment Method': payment.paymentMethod,
                'Date': moment(payment.paymentAt).format("YYYY-MM-DD hh:mm a"),
                'Amount': payment.amount,
                'Course': payment.course,
                'Course Id': payment.courseId,
                'Tutor': payment.tutorName
            }
            return paymentDetails
        })
        this.exportToCSV(excelDate)
    }

    handleUpgradePlanOnClick = () => {
        this.setState({ openUpgradePlanModal: true })
    }

    handleCancelUpgradePlan = () => {
        this.setState({ 
            openUpgradePlanModal: false,
            subscriptionEmptyError: null,
            subscription: this.state.subscripted 
        })
    }

    handleCalculatePayment = (value) => {
        const { searchCourseData } = this.state
        const price = searchCourseData.price
        let total_payment;
        if(value === "Monthly") {
            if (price <= 5000) {
                total_payment = 1000
            } else if (price <= 10000) {
                total_payment = 2500
            } else if (price <= 20000) {
                total_payment = 5000
            } else {
                total_payment = 8000
            }
        } else {
            total_payment = price
        }
        this.setState({ total_payment })
    }

    handleSnackBarClose = () => {
        this.setState({
            snackBarOn: false,
            severity: "",
            snackBarMessage: "",
        })
    }

    handlePlanOnChange = (val) => {
        this.setState({ subscription: val, subscriptionEmptyError: null })
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

    handleInputOnChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value,
            emptyError: null
        })

        if (name === "paymentType") {
            this.handleCalculatePayment(value)
        }
    }

    handleTabChange = (newValue) => {
        const childNav = ["Payments"]
        if (newValue === 0) {
            childNav.push("Summary")
        } else {
            childNav.push("Checkout")
        }
        this.setState({ tabValue: newValue, childNav })
    }

    setSnackBar = (severity, msg) => {
        this.setState({
            snackBarOn: true,
            severity,
            snackBarMessage: msg,
        })
    }

    exportToCSV = (csvData) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        const ws = XLSX.utils.json_to_sheet(csvData)
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, 'Payments' + fileExtension)
        this.setState({ downloading: false })
    }

    renderSummary = () => {
        const {paymentData, total, current, subscription, paymentMethodCards, bankAccounts} = this.state
        return <PaymentSummary 
                    paymentMethods = {paymentMethodCards} 
                    icons = {this.icons}
                    tableHead = {this.tableHead}
                    rows = {paymentData}
                    handleDownloadOnClick = {this.handleDownloadOnClick}
                    handleDeleteCard = {this.handleDeleteCard}
                    handlePaginationOnChange = {this.handlePaginationOnChange}
                    total = {total}
                    current = {current}
                    handleUpgradePlanOnClick = {this.handleUpgradePlanOnClick}
                    subscription = {subscription}
                    bankAccounts = {bankAccounts}
                />
    }

    renderCheckout = () => {
        return <Checkout
                    handleInputOnChange = {this.handleInputOnChange}
                    values = {this.state}
                    handleCourseSearch = {this.handleCourseSearch}
                    handleDateOnchange = {this.handleDateOnchange}
                    handleFileOnChange = {this.handleFileOnChange}
                    searchCourseData = {this.state.searchCourseData}
                    handleConfirmAndPay = {this.handleConfirmAndPay}
                />
    }

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderSummary()
            case 1: return this.renderCheckout()
            default: return this.renderSummary()
        }
    }

    renderRootContainer = () => {
        return (
            <div className = "payments_root_container">
                <div className = "payment_root_top">
                    <HeaderTopper
                        screen = "Payments"
                        rootNav = "Management"
                        childNav = {this.state.childNav}
                    />
                </div>

                <div className = "payment_root_head">
                    <HeaderCard
                        tabs = {this.tab_links}
                        src = {headerImg}
                        icons = {this.icons}
                        tabValue = {this.state.tabValue}
                        handleTabChange = {this.handleTabChange}
                    />
                </div>

                <div className = "payments_main_container">
                    { this.renderMainContainer() }
                </div>
            </div>
        )
    }

    render() {
        const {
            loading, 
            openUpgradePlanModal, 
            subscription, 
            subscriptionEmptyError,
            snackBarOn, 
            snackBarMessage, 
            severity,
            upgradeSubscriptionLoading
        } = this.state
        return (
            <div className = "payments_root_div">
                {
                    loading ? <Loading open = {loading}/>
                    :
                    this.renderRootContainer()
                }
                <UpgradePlanDialog
                    open = {openUpgradePlanModal}
                    handleCancel = {this.handleCancelUpgradePlan}
                    subscription = {subscription}
                    handlePlanOnChange = {this.handlePlanOnChange}
                    handleUpgrade = {this.handleUpgrade}
                    subscriptionEmptyError = {subscriptionEmptyError}
                    upgradeSubscriptionLoading = {upgradeSubscriptionLoading}
                />
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

export default connect(mapStateToProps)(Payments)
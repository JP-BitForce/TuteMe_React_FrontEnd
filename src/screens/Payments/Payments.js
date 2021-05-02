import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderCard from '../../components/Header/HeaderCard'
import HeaderTopper from '../../components/Header/HeaderTopper'
import PaymentSummary from './PaymentSummary'
import Checkout from './Checkout'
import UpgradePlanDialog from './UpgradePlan'

import { getPayments, upgradePlan } from '../../api/payment'

//Material-UI
import Subject from '@material-ui/icons/Subject';
import CreditCard from '@material-ui/icons/CreditCard';
import masterCard from '../../assets/images/Payments/ic_mastercard.svg'
import visa from '../../assets/images/Payments/ic_visa.svg'

import headerImg from '../../assets/images/Payments/headerImg.jpg'
import './Payments.css'

class Payments extends Component {
    state = {
        loading: false,
        tabValue: 0,
        childNav: ["Payments", "Summary"],
        fullName: "",
        courseId: "",
        tutorId: "",
        email: "",
        city: "",
        postal: "",
        cardNumber: "**** **** **** 1234",
        payment_method: "paypal",
        card_number: "",
        mm_yy: "",
        cvv: "",
        total_payment: "0.00",
        paymentData:[],
        total: 1,
        current: 1,
        fetchError: null,
        openUpgradePlanModal: false,
        subscription: ""
    }
    tab_links = ["Summary", "Checkout"]
    icons = {
        Summary: <Subject/>,
        Checkout: <CreditCard/>,
        Master: masterCard,
        Visa: visa
    }
    paymentMethods = [
        {name: "Master", acc_num: "**** **** **** 1234"},
        {name: "Visa", acc_num: "**** **** **** 1234"},
    ]
    tableHead = ["#", "Type", "Method", "Date", "Amount(LKR)"]

    cardOptions = ["**** **** **** 1234", "**** **** **** 4567", "**** **** **** 8901"]

    componentDidMount() {
        this.getPaymentsApi(0)
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

    handleUpgrade = () => {
        const auth = this.props.auth
        const {subscription} = this.state
        if(subscription) {
            upgradePlan(auth.accessToken, auth.userId, subscription).then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    handleDownloadOnClick = () => {

    }

    handleUpgradePlanOnClick = () => {
        this.setState({ openUpgradePlanModal: true })
    }

    handleCancelUpgradePlan = () => {
        this.setState({ 
            openUpgradePlanModal: false,
            subscription: "Premium" 
        })
    }

    handlePlanOnChange = (val) => {
        this.setState({ subscription: val })
    }

    handleCancelCard = () => {

    }

    handleCreateCard = () => {

    }

    handleDeleteCard = () => {

    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTabChange = (newValue) => {
        const childNav = ["Payments"]
        if (newValue === 0) {
            childNav.push("Summary")
        } else {
            childNav.push("Checkout")
        }
        this.setState({
            tabValue: newValue,
            childNav
        })
    }

    renderSummary = () => {
        const {paymentData, total, current, subscription} = this.state
        return <PaymentSummary 
                    paymentMethods = {this.paymentMethods} 
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
                />
    }

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0: return this.renderSummary()
            case 1: return <Checkout
                                handleInputOnChange = {this.handleInputOnChange}
                                values = {this.state}
                                cardOptions = {this.cardOptions}
                                payment_method = {this.state.payment_method}
                                handleCreateCard = {this.handleCreateCard}
                                handleCancelCard = {this.handleCancelCard}
                            />
            default: return null
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
        const {loading, openUpgradePlanModal, subscription} = this.state
        return (
            <div className = "payments_root_div">
                {
                    loading ?
                    <Loading open = {loading}/>
                    :
                    this.renderRootContainer()
                }
                <UpgradePlanDialog
                    open = {openUpgradePlanModal}
                    handleCancel = {this.handleCancelUpgradePlan}
                    subscription = {subscription}
                    handlePlanOnChange = {this.handlePlanOnChange}
                    handleUpgrade = {this.handleUpgrade}
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
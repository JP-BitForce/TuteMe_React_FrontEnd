import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import HeaderCard from '../../components/Header/HeaderCard'
import HeaderTopper from '../../components/Header/HeaderTopper'
import PaymentSummary from './PaymentSummary'
import Checkout from './Checkout'

//Material-UI
import Subject from '@material-ui/icons/Subject';
import CreditCard from '@material-ui/icons/CreditCard';
import masterCard from '../../assets/images/Payments/ic_mastercard.svg'
import visa from '../../assets/images/Payments/ic_visa.svg'

import headerImg from '../../assets/images/Payments/head.jpg'
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
        total_payment: "0.00"
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
    tableHead = ["#", "Type", "Date", "Amount(LKR)"]
    rows = [
        {id: "1", type: "Online", date: "21 April 2020", amount: "1200.00"},
        {id: "2", type: "Online", date: "18 November 2020", amount: "800.00"},
        {id: "3", type: "Bank", date: "30 October 2020", amount: "750.00"},
        {id: "4", type: "Online", date: "26 April 2020", amount: "1500.00"},
        {id: "5", type: "Online", date: "21 April 2020", amount: "1200.00"},
        {id: "6", type: "Bank", date: "19 October 2020", amount: "1000.00"},
    ]
    cardOptions = ["**** **** **** 1234", "**** **** **** 4567", "**** **** **** 8901"]

    handleDownloadOnClick = () => {

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

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0: return <PaymentSummary 
                                paymentMethods = {this.paymentMethods} 
                                icons = {this.icons}
                                tableHead = {this.tableHead}
                                rows = {this.rows}
                                handleDownloadOnClick = {this.handleDownloadOnClick}
                                handleDeleteCard = {this.handleDeleteCard}
                            />
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
        return (
            <div className = "payments_root_div">
                {
                    this.state.loading ?
                    <Loading/>
                    :
                    this.renderRootContainer()
                }
            </div>
        )
    }
}

export default Payments
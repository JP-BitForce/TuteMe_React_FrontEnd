import React, {useState} from 'react'

import InputField from '../../components/Input/InputField'
import Selector from '../../components/Input/Selector'
import ChipButton from '../../components/Button/ChipButton'

//Boostarp
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Material-UI
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Add from '@material-ui/icons/Add';
import Security from '@material-ui/icons/Security';

import paypal from '../../assets/images/Payments/ic_paypal.svg'
import visa from '../../assets/images/Payments/ic_visa.svg'
import master from '../../assets/images/Payments/ic_mastercard.svg'
import './Payments.css'

const Checkout = ({handleInputOnChange, values, cardOptions, payment_method, handleCreateCard, handleCancelCard}) => {
    const [open, setOpen] = useState(false)

    const handleAddOnClick = () => {
        setOpen(!open)
    }

    const handleCancel = () => {
        setOpen(false)
        handleCancelCard()
    }
 
    const renderInputField = (type, name, max, placeholder) => {
        return (
            <InputField 
                type = {type}
                name = {name}
                value = {values[name]}
                onChange = {handleInputOnChange}
                max = {max}
                placeholder = {placeholder}
            />
        )
    }

    const renderPaymentForm = () => {
        return (
            <div className = "payment_form_container">
                <h6 className = "payment_form_header">Payment Details</h6>
                { renderInputField("text", "fullName", 30, "Full name") }
                { renderInputField("email", "email", 30, "Email") }
                { renderInputField("text", "courseId", 30, "Course ID") }
                { renderInputField("text", "tutorId", 30, "Tutor ID") }
                <Row>
                    <Col>{ renderInputField("text", "city", 30, "City") }</Col>
                    <Col>{ renderInputField("text", "postal", 30, "Zip / Postal code*") }</Col>
                </Row>
            </div>
        )
    }

    const renderAddNewCard = () => {
        return (
            <div className = "new_card_wrapper">
                <p>Add new card</p>
                { renderInputField("text", "card_number", 30, "Card number") }
                <Row>
                    <Col>
                        { renderInputField("text", "mm_yy", 30, "MM/YY") }
                    </Col>
                    <Col>
                        { renderInputField("number", "cvv", 30, "CVV") }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ChipButton label = "Cancel" onClick = {handleCancel}/>
                    </Col>
                    <Col>
                        <ChipButton label = "Create" onClick = {handleCreateCard}/>
                    </Col>
                </Row>
            </div>
        )
    }

    const renderPaypal = () => {
        return (
            <Grid item xs={12} sm={12} md={12}>
                <div className = "payment_method__paper">
                    <RadioGroup 
                        aria-label="payment_method" 
                        name="payment_method" 
                        value = {payment_method} 
                        onChange={handleInputOnChange}
                    >
                        <FormControlLabel value = "paypal" control={<Radio />} label = "Pay with Paypal"/>                               
                    </RadioGroup>
                    <img src = {paypal} alt = "paypal"/>
                </div>
            </Grid>
        )
    }

    const renderBank = () => {
        return (
            <Grid item xs={12} sm={12} md={12}>
                <div className = "payment_method__paper">
                    <RadioGroup 
                        aria-label="payment_method" 
                        name="payment_method" 
                        value = {payment_method} 
                        onChange={handleInputOnChange}
                    >
                        <FormControlLabel value = "bank" control={<Radio />} label = "Pay with Bank"/>                               
                    </RadioGroup>
                    <img src = {paypal} alt = "paypal"/>
                </div>
            </Grid>
        )
    }

    const renderCredit_debit = () => {
        return (
            <Grid item xs={12} sm={12} md={12}>
                <div className = "payment_method__paper_3">
                    <div className = "payment_method__paper_3_top">
                        <RadioGroup 
                            aria-label="payment_method" 
                            name="payment_method" 
                            value = {payment_method} 
                            onChange={handleInputOnChange}
                        >
                            <FormControlLabel value = "credit_debit" control={<Radio />} label = "Credit / Debit Card"/>                               
                        </RadioGroup>
                        <div>
                            <img src = {master} alt = "credit_debit"/>
                            <img src = {visa} alt = "credit_debit"/>
                        </div>
                    </div>
                    <Collapse in={payment_method === "credit_debit"} timeout="auto" unmountOnExit>
                        <div className = "payment_method__paper__bottom">
                            <div className = "payment_method__paper_dropdown">
                                <Selector
                                    value = {values["cardNumber"]}
                                    onChange = {handleInputOnChange}
                                    options = {cardOptions}
                                    label = "card"
                                />
                            </div>
                        </div>
                        <div className = "add_card_block">
                            <span onClick = { handleAddOnClick }>
                                <Add/> Add new card
                            </span>
                        </div>
                    </Collapse>
                </div>
            </Grid>
        )
    }

    const renderPaymentMethod = () => {
        return (
            <div className = "payment_method_container">
                <h6 className = "payment_form_header">Payment Methods</h6>
                <Grid container spacing={2}>
                    { renderPaypal() }
                    { renderBank() }
                    { renderCredit_debit() }
                    <Grid item xs={12} sm={12} md={12}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                { renderAddNewCard() }
                            </Box>
                        </Collapse>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const renderSummarySection2 = (title, value) => {
        return (
            <div className = "payment_summary_section__2_nested">
                <span>{title}</span>
                <span className = "payement_detail_value">{value ? value : "xxxxxxx" }</span>
            </div>
        )
    }

    const renderSummary = () => {
        return (
            <div className = "payment_summary">
                <h6 className = "payment_form_header">Summary</h6>
                <div className = "payment_summary_wrapper">
                    <div className = "payment_summary_section__1">
                        <p className = "payment_summary_section">Subscription</p>
                        <span className = "payment_summary_section__1_special">Premium</span>
                    </div>
                    <div className = "payment_summary_section__2">
                        <p className = "payment_summary_section">Details</p>
                        { renderSummarySection2("Name", values["fullName"]) }
                        { renderSummarySection2("Email", values["email"]) }
                        { renderSummarySection2("Course ID", values["courseId"]) }
                        { renderSummarySection2("Tutor ID", values["tutorId"]) }
                        { renderSummarySection2("Payment Method", values["payment_method"]) }
                    </div>
                    <div className = "payment_summary_section__3">
                        <p>$</p>
                        <h2>{values["total_payment"]}</h2>
                        <span>only</span>
                    </div>
                    <Divider />
                    <div className = "payment_summary_section__4">
                        <p>Total Payment</p>
                        <p>${values["total_payment"]}*</p>
                    </div>
                    <div className = "payment_summary_section__5">
                        <ChipButton label = "Confirm & Pay"/>
                        <span className = "payment_summary_section__5_span">
                            <Security style = {{width: "15px"}}/> Secure encrypted payments
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "checkout_root_div">
            <div className = "checkout_root_top">
                <h3>Let's finish powering you up!</h3>
                <p>Professional plan is right for you.</p>
            </div>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className = "shadow_card">
                        { renderPaymentForm() }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className = "shadow_card">
                        { renderPaymentMethod() }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className = "shadow_card">
                        { renderSummary() }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Checkout

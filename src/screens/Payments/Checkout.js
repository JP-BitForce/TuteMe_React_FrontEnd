import React from 'react'

import InputField from '../../components/Input/InputField'
import ChipButton from '../../components/Button/ChipButton'
import ReadOnlyRating from '../../components/Rating/ReadOnlyRating'
import Paypal from '../../components/PaymentMethods/Paypal'
import Bank from '../../components/PaymentMethods/Bank'

//Boostarp
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from "react-bootstrap/Form";

//Material-UI
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Security from '@material-ui/icons/Security';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import src from '../../assets/images/Course/alt.jpg'
import './Payments.css'

const useStyles = makeStyles((theme) => ({
    btn: {
        backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: "white",
        width: "50px"
    },
    media: {
        height: '35vh',
    },
    content: {
        textAlign: "left",
        paddingLeft: "12px"
    },
    radioGroup: {
        display: "flex",
        flexDirection: "row" 
    },
    paymentType: {
        marginTop: "10px",
        fontSize: "1.2rem"
    },
    paymentTypeValue: {
        fontSize: "1rem",
        color: "white",
        textTransform: "uppercase",
        fontWeight: "bold",
        backgroundColor: "#FF4842",
        padding: '6px',
        borderRadius: '8px',
        marginLeft: "3px"
    },
    paymentTypeValueNone: {
        fontSize: "1rem",
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: "3px"
    }
}))

const Checkout = ({
    handleInputOnChange, 
    values, 
    handleCourseSearch,
    handleDateOnchange,
    handleFileOnChange,
    searchCourseData,
    handleConfirmAndPay
}) => {
    const styles = useStyles()

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
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

    const renderSummarySection2 = (title, value) => {
        return (
            <div className = "payment_summary_section__2_nested">
                <span>{title}</span>
                <span className = "payement_detail_value">{ value ? value : "xxxxxxx" }</span>
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
                        <span className = "payment_summary_section__1_special">{values["subscription"]}</span>
                    </div>
                    <div className = "payment_summary_section__2">
                        <p className = "payment_summary_section">Details</p>
                        { renderSummarySection2("Name", values["fullName"]) }
                        { renderSummarySection2("Email", values["email"]) }
                        { renderSummarySection2("Course ID", values["courseId"]) }
                        { renderSummarySection2("Tutor ID", `${searchCourseData && searchCourseData.tutorId}`) }
                        { renderSummarySection2("Payment Method", values["paymentMethod"]) }
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
                    { values["emptyError"] && <span className = "error">{values["emptyError"]}</span> }
                    <div className = "payment_summary_section__5">
                        <ChipButton label = "Confirm & Pay" handleClick = {handleConfirmAndPay}/>
                        <span className = "payment_summary_section__5_span">
                            <Security style = {{width: "15px"}}/> Secure encrypted payments
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    const renderPaymentMethodForm = () => {
        return (
            <div className = "shadow_card payment_method_form">
                {
                    values["paymentMethod"] === "paypal" ? 
                    <Paypal
                        values = {values}
                        handleInputOnChange = {handleInputOnChange}
                        handleDateOnchange = {handleDateOnchange}   
                    /> 
                    : <Bank
                        values = {values}
                        handleInputOnChange = {handleInputOnChange}
                        handleFileOnChange = {handleFileOnChange}
                        handleDateOnchange = {handleDateOnchange}  
                    />
                }
            </div>
        )
    }

    const renderPaymentMethods = () => {
        return (
            <div className = "shadow_card">
                <div className = "payment_method_container">
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend">Payment Methods</FormLabel>
                        <RadioGroup 
                            aria-label = "paymentMethods" 
                            name = "paymentMethod" 
                            value = {values["paymentMethod"]} 
                            onChange={handleInputOnChange}
                            className = {styles.radioGroup}
                        >
                            <FormControlLabel value="paypal" control={<Radio />} label = "Paypal"/>
                            <FormControlLabel value="bank" control={<Radio />} label = "Bank" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        )
    }

    const renderPaymentType = () => {
        return (
            <div className = "shadow_card">
                <div className = "payment_method_container">
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend">Payment Subscription</FormLabel>
                        <p className = {styles.paymentType}>
                            Your current subscription type: 
                            {
                                values["paymentType"] ? 
                                <span className = {styles.paymentTypeValue}>
                                    {values["paymentType"]}
                                </span>
                                :
                                <span className = {styles.paymentTypeValueNone}>NONE</span>
                            }
                        </p>
                        <RadioGroup 
                            aria-label = "paymentType" 
                            name = "paymentType" 
                            value = {values["paymentType"]} 
                            onChange={handleInputOnChange}
                            className = {styles.radioGroup}
                        >
                            <FormControlLabel value="Premium" control={<Radio />} label = "Premium"/>
                            <FormControlLabel value="Monthly" control={<Radio />} label = "Monthly" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        )
    }

    const renderDetail = (content, value) => {
        return (
            <DialogContentText id="alert-dialog-slide-description">
                <span className = "modal_item_primary"> {content} : </span>
                <span className = "modal_item_secondary">{value ? value : "Unknown"}</span>
            </DialogContentText>
        )
    }

    const renderCourseDetails = () => {
        return (
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <Card>
                        <CardMedia
                            className = {styles.media}
                            image = {searchCourseData && searchCourseData.courseImg ? getImageSource(searchCourseData.courseImg) : src}
                            title = "course"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className = {styles.content}>
                    <Row>
                        <Col> { renderDetail("ID", `${searchCourseData && searchCourseData.id}`) } </Col>
                        <Col> { renderDetail("Name", `${searchCourseData && searchCourseData.title}`) } </Col>
                    </Row>
                    <Row>
                        <Col> { renderDetail("Tutor", `${searchCourseData && searchCourseData.tutorName}`) } </Col>
                        <Col> { renderDetail("Duration", `${searchCourseData && searchCourseData.duration}`) } </Col>
                    </Row>
                    <Row>
                        <Col> { renderDetail("Price", `Rs. ${searchCourseData && searchCourseData.price}`) } </Col>
                        <Col> { renderDetail("Rate", <ReadOnlyRating rate = {searchCourseData && searchCourseData.rating}/>) } </Col>
                    </Row>
                    { renderDetail("Description", `${searchCourseData && searchCourseData.description}`) }
                </Grid>
            </Grid>
        )
    }

    const renderMainContainer = () => {
        return (
            <div>
                <Form.Group as={Row}>
                    <Form.Label column sm={1}>Course ID</Form.Label>
                    <Col sm={10}>
                        { renderInputField("text", "courseId", 30, "ID") }
                    </Col>
                    <Col sm={1}>
                        <Button 
                            onClick = {handleCourseSearch} 
                            className = {styles.btn}
                        >
                        { 
                            values["searchLoading"] ? <CircularProgress style = {{width: "20px", height: "20px"}}/> 
                            :
                            values["courseSearched"] ? "Cancel"
                            :
                            "Search" 
                        }
                        </Button>
                    </Col>
                </Form.Group>
                <Collapse in={searchCourseData} timeout="auto" unmountOnExit>
                    <div className = "shadow_card course_search_div ">
                        { renderCourseDetails() }
                    </div>
                </Collapse>
                { renderPaymentType() }
                { renderPaymentMethods() }
                { renderPaymentMethodForm() }
                <div className = "shadow_card">
                    { renderSummary() }
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
            { renderMainContainer() }
        </div>
    )
}

export default Checkout

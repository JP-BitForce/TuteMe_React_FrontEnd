import React from 'react'

import Paypal from '../../components/PaymentMethods/Paypal'
import Bank from '../../components/PaymentMethods/Bank'

//React-Boostarp
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

//Material-UI
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

import './Courses.css'

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: "flex",
        flexDirection: "row" 
    },
}))

const PaymentMethods = ({handleSubmit, values, handleInputOnChange, handleFileOnChange, handleDateOnchange}) => {
    const styles = useStyles()
    const renderPaymentMethods = () => {
        return (
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
        )
    }

    return (
        <div className = "courses_checkout_payment_methods_root">
            <Card>
                <Card.Body>
                    <Form noValidate validated = {values["paymentValidated"]} onSubmit = {handleSubmit}>
                        { renderPaymentMethods() }
                        <div className = "courses_checkout_payment_methods_method">
                            {
                                values["paymentMethod"] === "paypal" ?
                                <Paypal 
                                    values = {values}
                                    handleInputOnChange = {handleInputOnChange}
                                    handleDateOnchange = {handleDateOnchange}    
                                />
                                :
                                <Bank
                                    values = {values}
                                    handleInputOnChange = {handleInputOnChange}
                                    handleFileOnChange = {handleFileOnChange}
                                    handleDateOnchange = {handleDateOnchange}     
                                />
                            }
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PaymentMethods

import React from 'react'

import ChipButton from '../Button/ChipButton'

import Divider from '@material-ui/core/Divider';
import Security from '@material-ui/icons/Security';

const PaymentSummary = ({values}) => {
    const renderSummarySection2 = (title, value) => {
        return (
            <div className = "payment_summary_section__2_nested">
                <span>{title}</span>
                <span className = "payement_detail_value">{value ? value : "xxxxxxx" }</span>
            </div>
        )
    }

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

export default PaymentSummary

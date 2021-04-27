import React from 'react'

import ChipButton from '../Button/ChipButton'

import Divider from '@material-ui/core/Divider';
import Security from '@material-ui/icons/Security';

const PaymentSummary = ({subscription, fullName, email, courseId, tutorId, paymentMethod, total }) => {
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
                <div className = "payment_summary_wrapper">
                    <div className = "payment_summary_section__1">
                        <p className = "payment_summary_section">Subscription</p>
                        <span className = "payment_summary_section__1_special">{subscription}</span>
                    </div>
                    <div className = "payment_summary_section__2">
                        <p className = "payment_summary_section">Details</p>
                        { renderSummarySection2("Name", fullName) }
                        { renderSummarySection2("Email", email) }
                        { renderSummarySection2("Course ID", courseId) }
                        { renderSummarySection2("Tutor ID", tutorId) }
                        { renderSummarySection2("Payment Method", paymentMethod) }
                    </div>
                    <div className = "payment_summary_section__3">
                        <p>LKR</p>
                        <h2>{total}</h2>
                        <span>only</span>
                    </div>
                    <Divider />
                    <div className = "payment_summary_section__4">
                        <p>Total Payment</p>
                        <p>LKR {total}*</p>
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

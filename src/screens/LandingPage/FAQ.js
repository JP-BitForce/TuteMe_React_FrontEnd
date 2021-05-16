import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
import React from "react";

import './Links.css'
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const FAQ = (props) => {
    const history = props.history
    const faqs = [
        {id:1,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."},
        {id:2,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."},
        {id:3,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."},
        {id:4,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."},
        {id:5,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."},
        {id:6,question:"How do I change my password?",answer:"You can change your password by visiting your profile and go to settings and select changed password."}
        ]



    const renderTopContent = () => {
        return (
            <div className = "public_course_content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4">Explore our FAQs</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderFAQListHead = () => {
        return (
            <div className = "row">
                <div class="col">
                    <div class="section_title text-center">
                        <h1>Popular FAQs</h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar history={history}/>
            {renderTopContent()}
            {renderFAQListHead()}
            <div className="FAQ">
                            {faqs.map(faq=>
                                <Accordion defaultActiveKey={faqs[0].id} >
                                    <Card >
                                        <Accordion.Toggle as={Card.Header} eventKey={faq.id} className="faq-qst">
                                            {faq.question}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={faq.id} className="faq-ans">
                                            <Card.Body >{faq.answer}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            )}
            </div>
            <Footer history={history}/>
        </div>
    )
}
export default FAQ;

import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
import React from "react";

import './Links.css'

const PrivacyPolicy = (props) => {
    const history = props.history

    const renderTopContent = () => {
        return (
            <div className = "privacy_policy_content_top_root">
                <div className = "content_top__container">
                    <div className = "col-lg__1">
                        <div className = "content_top_block">
                            <h1 class="mb-4"> Our Privacy Policy</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderPolicyListHead = () => {
        return (
            <div >
                <div style={{margin: '20px auto', width:'80%'}}>
                    <div class="section_title text-center">
                        <h1> Privacy Policy</h1>
                    </div>
                    <div className= "privacy_policy_content">
                        <ol>
                            <li>
                                We are committed to protecting your privacy. We will only use the information that 
                                we collect about you in accordance will all applicable laws and regulations in force in Sri Lanka.
                            </li>
                            <li>When you enroll as a student on our site, as part of the enrolling process, we collect the
                                 personal information you give us such as your name and email address.
                            </li>
                            <li>
                                We will never collect confidential information about you without your explicit consent.
                            </li>
                            <li>
                                we do not collect unnecessary money, if you have any issues with the payment you can inform us 
                                immediately, we solve them as soon as possible.
                            </li>
                            
                            <li>
                                The personal information we hold will be kept secure in accordance with our internal security policy and the law.
                            </li>
                            <li>
                                If you have any questions/comments about privacy, you should contact us. 
                            </li>
                            <li>
                                We use cookies to recognize your device and provide you with a personalized experience.
                            </li>
                            
                        </ol>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <AppBar history={history}/>
            {renderTopContent()}
            {renderPolicyListHead()}
            <div className="FAQ">
                
            </div>
            <Footer history={history}/>
        </div>
    )
}
export default PrivacyPolicy;

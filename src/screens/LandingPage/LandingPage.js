import React, {Component} from 'react'

import AppBar from '../../components/AppBar/AppBar'
import Footer from '../../components/Footer/Footer'
import LandingContents from './LandingContents'
import Loading from '../../components/Loading/Loading'
import {getLandingPageContents} from '../../api/landing'

import './LandingPage.css'

class LandingPage extends Component {
    state = {
        counts: null,
        feedbacks: null,
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        getLandingPageContents().then(response => {
            this.setState({
                counts: response.counts,
                feedbacks: response.feedbacks,
                loading: false
            })
        }).catch(err => {
            this.setState({
                counts: null,
                feedbacks: null,
                loading: false
            })
        })
    }
    
    render() {
        const history = this.props.history
        const {counts, feedbacks, loading} = this.state
        return (
            <div className = "landing_root_div">
                {
                    loading ? <Loading open = {loading}/> 
                    :
                    <>
                    <AppBar history = {history}/>
                    <LandingContents 
                        history = {history}
                        countsData = {counts}
                        feedbacks = {feedbacks}    
                    />
                    <Footer history = {history}/>
                    </>
                }
            </div>
        )
    }
}

export default LandingPage
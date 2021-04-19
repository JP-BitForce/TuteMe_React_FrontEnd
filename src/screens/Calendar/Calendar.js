import React, { Component } from 'react'

import HeaderTopper from '../../components/Header/HeaderTopper'
import Loading from '../../components/Loading/Loading'
import NewEventModal from './NewEventModal'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import './Calendar.css'

class Calendar extends Component {
    state = {
        loading: false,
        childNav: ["Calendar", "Events"],
        events: [
            { title: 'event 1', start: '2021-04-02', end: '2021-04-02', backgroundColor: '#378006' },
            { title: 'event 1', start: '2021-04-06', end: '2021-04-06' },
            {title: "Software", start: "2021-04-08", end: "2021-04-09", backgroundColor: "rgb(0, 171, 85)"}
        ],
        openNewEventModal: false,
        selectedNewDate: null,
    }

    componentDidMount() {
        console.clear()
    }

    handleAddNewEvent = (event) => {
        let arr =  this.state.events
        arr.push(event)
        console.log(arr)
        this.setState({
            events: arr
        }, console.log(this.state.events))
    }

    handleEvents = (events) => {
        this.setState({
            events: events
        })
    }

    handleNewModalClose = () => {
        this.setState({
            openNewEventModal: false,
            selectedNewDate: null
        })
    }

    handleDateSelect = (date) => {
        this.setState({
            openNewEventModal: true,
            selectedNewDate: date
        })
        console.log("handleDateSelect", date)
    }

    handleEventClick = (eve) => {
        console.log(eve.event.title, eve.event.id)
    }

    renderEventContent = (eventInfo) => {
        return (
          <div style = {{backgroundColor: `${eventInfo.backgroundColor}`, padding: "10px"}}>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </div>
        )   
    }

    renderMainRoot = () => {
        return (
            <div className = "cal_main__root">
                <FullCalendar
                    plugins = {[ dayGridPlugin, timeGridPlugin,  interactionPlugin]}
                    initialView = "dayGridMonth"
                    editable = {true}
                    selectable = {true}
                    selectMirror = {true}
                    dayMaxEvents = {true}
                    weekends={true}
                    eventContent={this.renderEventContent}
                    select={this.handleDateSelect}
                    eventClick={this.handleEventClick}
                    events = {this.state.events}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                />
            </div>
        )
    }

    render() {
        const {childNav, loading, openNewEventModal} = this.state
        return (
            <div className = "calender_sc_root">
                <HeaderTopper
                    screen = "Calendar"
                    rootNav = "App"
                    childNav = {childNav}
                />
                
                {
                    loading ? <Loading open = {loading}/> 
                    :
                    this.renderMainRoot()
                }

                <NewEventModal 
                    open = {openNewEventModal}
                    handleClose = {this.handleNewModalClose}
                    handleAddNewEvent = {this.handleAddNewEvent}
                />
                
            </div>
        )
    }
}


export default Calendar
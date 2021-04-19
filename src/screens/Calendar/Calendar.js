import React, { Component } from 'react'
import moment from 'moment';

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
            { title: 'event 1', start: '2021-04-02', end: '2021-04-03', backgroundColor: '#378006' },
            { title: 'event 1', start: '2021-04-06', end: '2021-04-06' },
            {title: "Software", start: "2021-04-08", end: "2021-04-09", backgroundColor: "rgb(0, 171, 85)"}
        ],
        openNewEventModal: false,
        selectedNewDate: null,
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        selectedColorId: "1",
        checkedAll: true
    }

    colors = [
        {id: "1", backgroundColor: "rgb(0, 171, 85)"},
        {id: "2", backgroundColor: "rgb(24, 144, 255)"},
        {id: "3", backgroundColor: "rgb(255, 193, 7)"},
        {id: "4", backgroundColor: "rgb(255, 72, 66)"},
        {id: "5", backgroundColor: "rgb(4, 41, 122)"},
        {id: "6", backgroundColor: "rgb(122, 12, 46)"},
    ]

    componentDidMount() {
        console.clear()
    }

    handleAddNewEvent = () => {
        const {title, description, start, end, selectedColorId} = this.state
        const event = {
            title,
            description,
            start: moment(start).format("YYYY-MM-DD"),
            end: moment(end).format("YYYY-MM-DD"),
            backgroundColor: this.colors[selectedColorId-1].backgroundColor
        }
        let arr =  [
            ...this.state.events,
            event
        ]
        this.setState({
            events: arr,
            openNewEventModal: false
        })
    }

    handleSwitchChange = (event) => {
        this.setState({
            checkedAll: event.target.checked
        })
    }

    handleDateOnchange = (name, date) => {
        this.setState({
            [name]: date
        })
    }

    handleColorSelection = (id) => {
        this.setState({
            selectedColorId: id
        })
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleNewModalClose = () => {
        this.setState({
            openNewEventModal: false,
            selectedNewDate: null,
            title: "",
            description: "",
            start: new Date(),
            end: new Date()
        })
    }

    handleDateSelect = (date) => {
        this.setState({
            openNewEventModal: true,
            selectedNewDate: date,
            start: date.start,
            end: date.start
        })
    }

    handleEventClick = (eve) => {
        console.log(eve.event.title, eve.event.id)
    }

    renderEventContent = (eventInfo) => {
        return (
          <div style = {{backgroundColor: `${eventInfo.backgroundColor}`, padding: "10px", color: "white"}}>
            <b>{eventInfo.timeText} </b>
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
        const {childNav, loading, openNewEventModal, selectedColorId} = this.state
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
                    values = {this.state}
                    handleInputOnChange = {this.handleInputOnChange}
                    colors = {this.colors}
                    handleColorSelection = {this.handleColorSelection}
                    selected = {selectedColorId}
                    handleDateOnchange = {this.handleDateOnchange}
                    handleSwitchChange = {this.handleSwitchChange}
                />
                
            </div>
        )
    }
}


export default Calendar
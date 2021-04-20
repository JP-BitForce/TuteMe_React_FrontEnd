import React, { Component } from 'react'
import {connect} from 'react-redux'

import HeaderTopper from '../../components/Header/HeaderTopper'
import Loading from '../../components/Loading/Loading'
import NewEventModal from './NewEventModal'
import EventModal from './EventModal'
import { addNewEvent, getEvents } from '../../api/event'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import './Calendar.css'

class Calendar extends Component {
    state = {
        loading: false,
        childNav: ["Calendar", "Events"],
        events: [],
        fetchError: null,
        openNewEventModal: false,
        selectedNewDate: null,
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        selectedColorId: "1",
        checkedAll: true,
        titleError: null,
        descriptionError: null,
        selectedEvent: null,
        openSelectedEventModal: false,
        EditTitle: "",
        EditDescription: "",
        EditStart: new Date(),
        EditEnd: new Date(),
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
        this.getEventsApi()
    }

    getEventsApi = () => {
        const auth  = this.props.auth
        const request = {
            userId: auth.userId,
            month: 1
        }
        this.setState({ loading: true })
        getEvents(auth.accessToken, request).then(response => {
            this.setState({
                event: response.events,
                loading: false
            })
        }).catch(err => {
            this.setState({
                event: [],
                loading: false,
                 fetchError: err.message
            })
        })
    }

    handleAddNewEvent = () => {
        const {title, description, start, end, selectedColorId} = this.state
        if (!title.trim()) {
            this.setState({ titleError: true})
        } 
        if (!description.trim()) {
            this.setState({ descriptionError: true})
        } else {
            const auth  = this.props.auth
            const request = {
                userId: auth.userId,
                title: title,
                description: description,
                start: start,
                end: end,
                backgroundColor: this.colors[selectedColorId-1].backgroundColor
            }
            this.setState({ loading: true })
            addNewEvent(auth.accessToken, request).then(response => {
                this.setState({
                    event: response.events,
                    loading: false,
                    openNewEventModal: false,
                    title: "",
                    description: "",
                    start: new Date(),
                    end: new Date(),
                    checkedAll: false
                })
            }).catch(err => {
                this.setState({
                    loading: false,
                    openNewEventModal: false,
                })
            })
        }
    }

    handleUpdateEvent = (id) => {
        // const {EditTitle, EditDescription, EditStart, EditEnd} = this.state
        let event = this.state.events.filter(item => item.id === id)[0]
        console.log(event)
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
            [event.target.id] : event.target.value,
            titleError: null,
            descriptionError: null
        })
    }

    handleNewModalClose = () => {
        this.setState({
            openNewEventModal: false,
            selectedNewDate: null,
            title: "",
            description: "",
            start: new Date(),
            end: new Date(),
            titleError: null,
            descriptionError: null
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

    handleEventClick = (event) => {
        this.setState({
            selectedEvent: event.event,
            openSelectedEventModal: true,
            EditTitle: event.event.title,
            EditDescription: event.event.extendedProps.description,
            EditStart: event.event.start,
            EditEnd: event.event.end,
        })
    }

    handleEventModalClose = () => {
        this.setState({
            selectedEvent: null,
            openSelectedEventModal: false
        })
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
                    events = {this.state.event}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    eventBorderColor = "white"
                />
            </div>
        )
    }

    render() {
        const {childNav, loading, openNewEventModal, selectedColorId, selectedEvent, openSelectedEventModal} = this.state
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

                {
                    selectedEvent && 
                    <EventModal
                        open = {openSelectedEventModal}
                        handleClose = {this.handleEventModalClose}
                        handleUpdateEvent = {this.handleUpdateEvent}
                        handleInputOnChange = {this.handleInputOnChange}
                        colors = {this.colors}
                        handleColorSelection = {this.handleColorSelection}
                        selected = {selectedColorId}
                        handleDateOnchange = {this.handleDateOnchange}
                        handleSwitchChange = {this.handleSwitchChange}
                        selectedEvent = {selectedEvent}
                        values = {this.state}
                    />
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user
    }
}

export default connect(mapStateToProps)(Calendar)
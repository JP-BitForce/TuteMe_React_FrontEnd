import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment';

import HeaderTopper from '../../components/Header/HeaderTopper'
import Loading from '../../components/Loading/Loading'
import NewEventModal from './NewEventModal'
import EventModal from './EventModal'
import Modal from '../../components/Modal/SignOutModal'
import { addNewEvent, getEvents, updateEvent, deleteEvent } from '../../api/event'

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
        EditBackground: "",
        EditChecked: false,
        openAlertPopUp: false,
        deleteLoading: false,
        updateLoading: false,
        addLoading: false
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
                events: response.events,
                loading: false
            })
        }).catch(err => {
            this.setState({
                events: [],
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
                start: moment(start).format('YYYY-MM-DDT00:00:00'),
                end: moment(end).format('YYYY-MM-DDT23:59:59'),
                backgroundColor: this.colors[selectedColorId-1].backgroundColor
            }
            this.setState({ addLoading: true })
            addNewEvent(auth.accessToken, request).then(response => {
                this.setState({ events: response.events })
                this.setInitialStateForAdd()
            }).catch(err => {
                this.setInitialStateForAdd()
            })
        }
    }

    handleUpdateEvent = (id) => {
        const {EditTitle, EditDescription, EditStart, EditEnd, EditBackground} = this.state
        const auth  = this.props.auth
        const request = {
            userId: auth.userId,
            eventId: id,
            title: EditTitle,
            description: EditDescription,
            start: moment(EditStart).format('YYYY-MM-DDT00:00:00'),
            end: moment(EditEnd).format('YYYY-MM-DDT23:59:59'),
            backgroundColor: this.colors[EditBackground-1].backgroundColor
        }
        this.setState({ updateLoading: true })
        updateEvent(auth.accessToken, request).then(response => {
            this.setState({ events: response.events })
            this.setInitialStateForUpdate()
        }).catch(err => {
            this.setInitialStateForUpdate()
        })
    }

    handleDeleteEvent = () => {
        const selectedEvent = this.state.selectedEvent
        const auth  = this.props.auth
        const request = {
            userId: auth.userId,
            eventId: selectedEvent.id
        }
        this.setState({ deleteLoading: true })
        deleteEvent(auth.accessToken, request).then(response => {
            this.setState({ events: response.events })
            this.setInitialStateForDelete()
        }).catch(err => {
            this.setInitialStateForDelete()
        })
    }

    handleDeleteEventPopUp = () => {
        this.setState({ openAlertPopUp: !this.state.openAlertPopUp })
    }

    setInitialStateForUpdate = () => {
        this.setState({
            updateLoading: false,
            selectedEvent: null,
            openSelectedEventModal: false,
            EditTitle: "",
            EditDescription: "",
            EditStart: "",
            EditEnd: "",
        })
    }

    setInitialStateForAdd = () => {
        this.setState({
            addLoading: false,
            openNewEventModal: false,
            title: "",
            description: "",
            start: new Date(),
            end: new Date(),
            checkedAll: false
        })
    }

    setInitialStateForDelete = () => {
        this.setState({
            loading: false,
            openAlertPopUp: false,
            selectedEvent: null,
            openSelectedEventModal: false,
            EditTitle: "",
            EditDescription: "",
            EditStart: "",
            EditEnd: "",
            deleteLoading: false
        })
    }

    handleSwitchChange = (type, event) => {
        const checked = event.target.checked
        if (type === "new") {
            this.setState({ checkedAll: checked })
        }
        if (type === "update") {
            this.setState({ EditChecked: checked })
        }
    }

    handleDateOnchange = (name, date) => {
        this.setState({
            [name]: date
        })
    }

    handleColorSelection = (type, id) => {
        if (type === "new") {
            this.setState({ selectedColorId: id })
        }
        if (type === "update") {
            this.setState({ EditBackground: id })
        }
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
            EditChecked: event.event.allDay
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
                    events = {this.state.events}
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
        const {
            childNav, 
            loading, 
            openNewEventModal, 
            selectedColorId, 
            selectedEvent, 
            openSelectedEventModal,
            openAlertPopUp
        } = this.state
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
                        handleDeleteEvent = {this.handleDeleteEventPopUp}
                    />
                }

                <Modal
                    open = {openAlertPopUp}
                    handleClose = {this.handleDeleteEventPopUp}
                    title = "Warning!"
                    content = "You will be lost your event data permanently. do you like to continue ? "
                    handleCancel = {this.handleDeleteEventPopUp}
                    handleOk = {this.handleDeleteEvent}
                />
                
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
import React from 'react'
import DatePicker from "react-datepicker";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Done from '@material-ui/icons/Done';
import Delete from '@material-ui/icons/Delete'

import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal = ({
    open, 
    handleClose, 
    handleUpdateEvent, 
    handleInputOnChange, 
    selectedEvent,
    handleSwitchChange,
    handleDateOnchange,
    colors,
    handleColorSelection,
    values
}) => {

    const renderForm = () => {
        return (
            <div>
                <TextField
                    error = {false}
                    label = "Title"
                    helperText = {false && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    id = "EditTitle"
                    value = {values["EditTitle"]}
                    onChange = {handleInputOnChange}
                    defaultValue = {selectedEvent.title}
                />
                <div className = "vertical_seperator"/>
                <TextField
                    error = {false}
                    id = "EditDescription"
                    label = "Description"
                    helperText = {false && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    value = {values["EditDescription"]}
                    onChange = {handleInputOnChange}
                    defaultValue = {selectedEvent.extendedProps.description}
                />
                <div className = "vertical_seperator"/>
                <FormControlLabel
                    control = {
                    <Switch
                        checked = {values["EditChecked"]}
                        onChange = {(eve) => handleSwitchChange("update", eve)}
                        name = "editChecked"
                        color = "primary"
                        defaultChecked = {selectedEvent.allDay}
                    />
                    }
                    label = "All Day"
                />
                <div className = "vertical_seperator"/>
                <div className = "date_picker">
                    <DatePicker
                        className = "date_picker__input"
                        selected={values["EditStart"]}
                        onChange={(date) => handleDateOnchange("EditStart", date)}
                        selectsStart
                        placeholderText='Start date'
                        isClearable
                        defaultValue = {selectedEvent.start}
                    />
                    <DatePicker
                        className = "date_picker__input"
                        selected={values["EditEnd"]}
                        onChange={(date) => handleDateOnchange("EditEnd", date)}
                        placeholderText='End date'
                        isClearable
                        defaultValue = {selectedEvent.end}
                    />
                </div>
                <div className = "vertical_seperator"/>
                <div className = "color_selector">
                    {
                        colors.map(item => {
                            const {id, backgroundColor} = item
                            return (
                                <div 
                                    className =  {[
                                        "color_selector_icon", 
                                        backgroundColor === selectedEvent.backgroundColor && "color_selector_icon__selected"].join(" ")
                                    }
                                    style = {{backgroundColor: backgroundColor}} 
                                    key = {id}
                                    onClick = {() => handleColorSelection("update", id)}
                                >
                                    <div className = "color_selector_icon_label">
                                        {
                                            backgroundColor === selectedEvent.backgroundColor && 
                                            <Done style = {{width: "18px", color: "white"}}/>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className = "vertical_seperator"/>
            </div>
        )
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth = "xs"
        >
            <DialogTitle id="alert-dialog-slide-title">Edit/Update Event</DialogTitle>
            <DialogContent> { renderForm() } </DialogContent>
            <DialogActions>
                <div className = "icon_button"><Delete/></div>
                <Button onClick={handleClose} color="primary" variant="outlined"> Cancel </Button>
                <Button 
                    onClick={() => handleUpdateEvent(selectedEvent.id)} 
                    variant="outlined" 
                    style = {{backgroundColor: "rgb(0, 171, 85)", color: "white"}}
                > 
                Update 
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EventModal

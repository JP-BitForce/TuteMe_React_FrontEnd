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
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress';

import Done from '@material-ui/icons/Done';

import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

const NewEventModal = ({
    open, 
    handleClose, 
    handleAddNewEvent, 
    values, 
    handleInputOnChange, 
    colors, 
    handleColorSelection,
    selected,
    handleDateOnchange,
    handleSwitchChange
}) => {
    
    const renderForm = () => {
        return (
            <div>
                <TextField
                    error = {values["titleError"]}
                    label = "Title"
                    helperText = {values["titleError"] && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    id = "title"
                    value = {values["title"]}
                    onChange = {handleInputOnChange}
                />
                <div className = "vertical_seperator"/>
                <TextField
                    error = {values["descriptionError"]}
                    id = "description"
                    label = "Description"
                    helperText = {values["descriptionError"] && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    value = {values["description"]}
                    onChange = {handleInputOnChange}
                />
                <div className = "vertical_seperator"/>
                <FormControlLabel
                    control = {
                    <Switch
                        checked = {values["checkedAll"]}
                        onChange = {(eve) => handleSwitchChange("new", eve)}
                        name = "checkedAll"
                        color = "primary"
                    />
                    }
                    label = "All Day"
                />
                <div className = "vertical_seperator"/>
                <div className = "date_picker">
                    <DatePicker
                        className = "date_picker__input"
                        selected={values["start"]}
                        onChange={(date) => handleDateOnchange("start", date)}
                        selectsStart
                        placeholderText='Start date'
                        isClearable
                    />
                    <DatePicker
                        className = "date_picker__input"
                        selected={values["end"]}
                        onChange={(date) => handleDateOnchange("end", date)}
                        placeholderText='End date'
                        isClearable
                    />
                </div>
                <div className = "vertical_seperator"/>
                <div className = "color_selector">
                    {
                        colors.map(item => {
                            const {id, backgroundColor} = item
                            return (
                                <div 
                                    className =  {["color_selector_icon", id === selected && "color_selector_icon__selected"].join(" ")}
                                    style = {{backgroundColor: backgroundColor}} 
                                    key = {id}
                                    onClick = {() => handleColorSelection("new", id)}
                                >
                                    <div className = "color_selector_icon_label">
                                        {
                                            id === selected && <Done style = {{width: "18px", color: "white"}}/>
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
            <DialogTitle id="alert-dialog-slide-title" onClose = {handleClose}>Add Event</DialogTitle>
            <DialogContent> { renderForm() } </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="outlined"> Cancel </Button>
                {
                    values["addLoading"] ? <CircularProgress/>
                    :
                    <Button 
                        onClick={handleAddNewEvent} 
                        variant="outlined" 
                        style = {{backgroundColor: "rgb(0, 171, 85)", color: "white"}}
                    > 
                    Add 
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default NewEventModal

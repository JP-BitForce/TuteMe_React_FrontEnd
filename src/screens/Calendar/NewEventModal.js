import React, {useState} from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import Done from '@material-ui/icons/Done';

import './Calendar.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewEventModal = ({open, handleClose, handleAddNewEvent}) => {
    const [selected, setSelected] = useState("1")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const colors = [
        {id: "1", backgroundColor: "rgb(0, 171, 85)"},
        {id: "2", backgroundColor: "rgb(24, 144, 255)"},
        {id: "3", backgroundColor: "rgb(255, 193, 7)"},
        {id: "4", backgroundColor: "rgb(255, 72, 66)"},
        {id: "5", backgroundColor: "rgb(4, 41, 122)"},
        {id: "6", backgroundColor: "rgb(122, 12, 46)"},
    ]

    const handleAddOnClick = () => {
        const event = {
            title,
            start: "2021-04-10",
            end: "2021-04-10",
            backgroundColor: colors[selected].backgroundColor
        }
        handleAddNewEvent(event)
    }

    const handleInputOnChange = (event) => {
        if (event.target.id === "title") {
            setTitle(event.target.value)
        }
        if (event.target.id === "description") {
            setDescription(event.target.value)
        }
    }

    const handleOnClick = (id) => {
        setSelected(id)
    }

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
                    id = "title"
                    value = {title}
                    onChange = {handleInputOnChange}
                />
                <div className = "vertical_seperator"/>
                <TextField
                    error = {false}
                    id = "description"
                    label = "Description"
                    helperText = {false && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    value = {description}
                    onChange = {handleInputOnChange}
                />
                <div className = "vertical_seperator"/>
                <TextField
                    error = {false}
                    id = "startDate"
                    label = "Start Date"
                    helperText = {false && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    defaultValue = {start}
                    value = {start}
                />
                <div className = "vertical_seperator"/>
                <TextField
                    error = {false}
                    id = "End Date"
                    label = "End Date"
                    helperText = {false && "Incorrect entry."}
                    variant = "outlined"
                    fullWidth
                    size = "small"
                    defaultValue = {end}
                    value = {end}
                />
                <div className = "vertical_seperator"/>
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
                                    onClick = {() => handleOnClick(id)}
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
            <DialogTitle id="alert-dialog-slide-title">Add Event</DialogTitle>
            <DialogContent>
                { renderForm() }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="outlined"> Cancel </Button>
                <Button 
                    onClick={handleAddOnClick} 
                    variant="outlined" 
                    style = {{backgroundColor: "rgb(0, 171, 85)", color: "white"}}
                > 
                Add 
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewEventModal

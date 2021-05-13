import React, {useRef, useState} from 'react'

import CustomButton from '../../components/Button/CustomButton'

import Form from "react-bootstrap/Form"

//Material-UI
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import CloudUpload from '@material-ui/icons/CloudUpload'
import CancelPresentation from '@material-ui/icons/CancelPresentation'

import fileSrc from '../../assets/images/shared/file.png'
import videoSrc from '../../assets/images/shared/video.png'
import linkSrc from '../../assets/images/shared/link.png'
import './Lecture.css'

const useStyles = makeStyles({
    resourceAvatar: {
        width: "45px",
        height: '45px',
        marginRight: "5px"
    },
})

const Resources = ({
    handleFileOnSelect, 
    handleFileOnDeSelect, 
    handleInputOnChange, 
    link, 
    handleUpload,
    values
}) => {
    const classes = useStyles()
    const inputFile = useRef(null)
    const inputVideo = useRef(null)

    const [fileName, setFileName] = useState({
        file: "",
        video: ""
    })

    const ICONS = {
        file: fileSrc,
        video: videoSrc,
        link: linkSrc
    }

    const PRIMARY = {
        file: "you can upload files here with extensions like .pdf, .xlsx etc",
        video: "you can upload videos here like extensions like .mp4, .mkv etc",
    }

    const SECONDARY = {
        file: "Your content: Example.pdf",
        video: "Your content: Example.mp4",
        link: "Your content: htttp://www.example.com"
    }

    const REF = {
        file: inputFile,
        video: inputVideo,
    }

    const NAME = {
        file: "fileTitle",
        video: "videoTitle",
        link: "linkTitle"
    }

    const handleCancel = (type) => {
        setFileName({
            ...fileName,
            [type]: ""
        })
        handleFileOnDeSelect(type)
    }

    const coverPicOnChange = (e, type) => {
        const { files } = e.target;
        if (files && files.length) {
            handleFileOnSelect(files[0], type)
        }
        setFileName({
            ...fileName,
            [type]: files[0].name
        })
    }

    const fileOnClick = (type) => {
        if (type === "file") {
            inputFile.current.click()
        } else if (type === "video") {
            inputVideo.current.click()
        }
    }

    const renderListItem = (header, type) => {
        return (
            <div className = "resourse_list_item">
                <input 
                    type = "file" 
                    autocomplete = "off" 
                    tabindex = "-1" 
                    style = {{display: 'none'}} 
                    ref = {REF[type]}
                    onChange = {(e) => coverPicOnChange(e, type)}
                />
                <ListSubheader component="div" id="nested-list-subheader">{header}</ListSubheader>
                <ListItem>
                    <Avatar className = {classes.resourceAvatar} src = {ICONS[type]}/>
                    <ListItemText 
                        primary = {PRIMARY[type]} 
                        secondary = {fileName[type] ? `Your content: ${fileName[type]}` : SECONDARY[type]} 
                    />
                    <ListItemSecondaryAction>
                        <div className = "icon_button" onClick = {() => fileOnClick(type)} >
                            <CloudUpload/>
                        </div>
                        <div className = "icon_button" onClick = {() => {handleCancel(type)}}>
                            <CancelPresentation/>
                        </div>
                    </ListItemSecondaryAction>
                </ListItem>
                { renderUploadBtn(type) }
            </div>
        )
    }

    const renderListItemLink = () => {
        const type = "link"
        return (
            <div className = "resourse_list_item">
                <ListSubheader component="div" id="nested-list-subheader">Upload a reference link here</ListSubheader>
                <ListItem>
                    <Avatar className = {classes.resourceAvatar} src = {ICONS[type]}/>
                    <div className = "nested_list_input">
                        <Form.Control
                            type = "text"
                            name = "link"
                            value = {link}
                            onChange = {handleInputOnChange}
                            max = {420}
                            placeholder = "Reference Link"
                        />
                         <ListItemText secondary = {link ? `Your content: ${link}` : SECONDARY[type]} />
                    </div>
                    <ListItemSecondaryAction>
                        <div className = "icon_button" onClick = {() => {handleCancel(type)}}>
                            <CancelPresentation/>
                        </div>
                    </ListItemSecondaryAction>
                </ListItem>
                { renderUploadBtn(type) }
            </div>
        )
    }

    const renderUploadBtn = (type) => {
        return (
            <div className = "resources_root_footer">
                <Form.Control
                    type = "text"
                    name = {NAME[type]}
                    value = {values[NAME[type]]}
                    onChange = {handleInputOnChange}
                    max = {420}
                    placeholder = "Title"
                    className = "title_from-control"
                />
                <CustomButton label = "upload" onClick = {() => handleUpload(type)}/>
            </div>
        )
    }

    return (
        <div className = "resourse_root">
            <List>
                { renderListItem("Upload a file here", "file") }
                { renderListItem("Upload a video here", "video") }
                { renderListItemLink() }
            </List>
        </div>
    )
}

export default Resources

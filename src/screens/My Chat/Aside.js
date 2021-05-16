import React from 'react'
import moment from 'moment'

//Material-UI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Search from '@material-ui/icons/Search'
import Edit from '@material-ui/icons/Edit'

import avatar from '../../assets/images/shared/avatar.png'
import systemImg from '../../assets/images/shared/system.png'
import './Chat.css'

const Aside = ({
    leftPanelOpen, 
    roomNotification, 
    username, 
    currentPersonnel, 
    handleListItemOnClick,
    search,
    handleLeftPanel,
    userImg,
    handleChatNewOnClick,
    handleSearchOnChange
}) => {

    const SYSTEM_MESSAGE = {
        id: "sys", 
        src: systemImg, 
        sender: "System", 
        message: "Welcome to our chat feature", 
        dateTime: moment(new Date()).format("hh:mm a")
    }

    const renderSearchField = (label) => {
        return (
            <TextField 
                id = {`input-with-icon-adornment_${label}`}
                label= {label}
                variant="outlined" 
                onChange = {handleSearchOnChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
                size="small"
                name = {label.toLowerCase()}
            />
        )
    }

    const renderChatListTop = () => {
        return (
            <div className = "chat_list_top">
                <div className = "own_avatar_div">
                    <Avatar src = {userImg}/>
                    <span/>
                </div>
                <div className = "flex_grow"/>
                <div className = "icon_button" onClick = {handleLeftPanel}>
                    <ChevronLeftIcon />
                </div>
                <div className = "icon_button" onClick = {handleChatNewOnClick}>
                    <Edit style = {{width: "15px", height: "15px"}}/>
                </div> 
            </div>
        )
    }

    const renderChatListTopAlt = () => {
        return (
            <div className = "chat_list_top">
                <div className = "icon_button" onClick = {handleLeftPanel}>
                    <ChevronRight/>
                </div>               
            </div>
        )
    }

    const renderChatListBlockInside = () => {
        return(
            <div className = "chat_list_block_inside">
                { renderChatListTop() }
                { renderSearchField("Search", search) }
            </div>
        )
    }

    const renderChatListBlockInsideAlt = () => {
        return(
            <div className = "chat_list_block_inside">
                { renderChatListTopAlt() }
            </div>
        )
    }

    const renderChatListCard = (item) => {
        const {id, src, sender, message, dateTime} = item
        return (
            <div 
                className = {[
                    "chat_list_card_alt", 
                    currentPersonnel && currentPersonnel === item && "chat_list_card_alt_active"
                ].join(" ")}
                onClick = {() => handleListItemOnClick(item)}
                key = {id}
            >
                <div className = "list_tem_avatar">
                    <Avatar src = {src}/>
                </div>
                <div className = "list_item_text">
                    <span>{sender}</span>
                    <p>{message}</p>
                </div>
                <div className = "list_item_time">
                    <div className = "list_item_time_val">{dateTime}</div>
                    <span/>
                </div>
            </div>
        )
    }

    const renderChatLists = () => {
        return (
            <Grid container direction = "row" justify = "center" alignItems = "center">
            { renderChatListCard(SYSTEM_MESSAGE) }
            {
                roomNotification.map((item, idx) => {
                    if ( username.toLowerCase().trim() !== item.sender.toLowerCase().trim()) {
                        const chatItem = {
                            id: idx, 
                            src: avatar,
                            sender: item.sender,
                            message: item.message,
                            dateTime: moment(item.dateTime).format("hh:mm a"),
                            status: item.status
                        }
                        return renderChatListCard(chatItem)
                    }
                    return null
                })
            }
            </Grid>
        )
    }

    return (
        <div>
            <Box margin={1}>
                { leftPanelOpen ? renderChatListBlockInside() : renderChatListBlockInsideAlt() }
                <div className = "chat_lists_container"> { renderChatLists() } </div>
            </Box>
        </div>
    )
}

export default Aside

import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import Videocam from '@material-ui/icons/Videocam';
import More from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import AttachFile from '@material-ui/icons/AttachFile';
import Mic from '@material-ui/icons/Mic';
import Send from '@material-ui/icons/Send';


import minimal_avatar from '../../assets/images/shared/minimal_avatar.jpg'
import avatar_2 from '../../assets/images/shared/avatar_2.jpg'
import avatar_3 from '../../assets/images/shared/avatar_3.jpg'
import './Chat.css'

class MyChat extends Component {
    state = {
        loading: false,
        leftPanelOpen: true,
        message:"",
        search: "",
        recipients: "",
        currentPersonnel: null
    }

    dummayPeople = ["Alice Walker", "Chris Haris", "Ron Weasley", "Bob Watson"]
    dummyChats = [
        {title: "Zack Zimmer", lastText:"Hi ...", type: "individual", time: "13 minutes", src : avatar_2},
        {title: "Javascript-Team", lastText:"Script....", type: "group", time: "13 minutes", src : avatar_3},
    ]

    handleSearchOnChange = (event) => {
        this.setState({
            [event.target.name]: event.traget.value
        })
    }

    handleMessageOnType = (event) => {
        this.setState({
            message:event.target.value
        })
    }

    handleLeftPanel = () => {
        this.setState({
            leftPanelOpen: !this.state.leftPanelOpen
        })
    }

    handleListItemOnClick = (item) => {
        this.setState({
            currentPersonnel: item
        })
    }

    handleChatNewOnClick = () => {
        this.setState({
            currentPersonnel: null
        })
    }

    handleVideoCamOnClick = () => {

    }

    handleMoreOnClick = () => {

    }

    handleEmojiOnClick = () => {

    }

    handleAttachmentOnClick = () => {

    }

    handleMicOnClick = () => {

    }

    handleSendOnClick = () => {

    }

    renderChatListTop = () => {
        return (
            <div className = "chat_list_top">
                <div className = "own_avatar_div">
                    <Avatar src = {minimal_avatar}/>
                    <span/>
                </div>
                <div className = "flex_grow"/>
                <div className = "icon_button" onClick = {this.handleLeftPanel}>
                    <ChevronLeftIcon />
                </div>
                <div className = "icon_button" onClick = {this.handleChatNewOnClick}>
                    <Edit style = {{width: "15px", height: "15px"}}/>
                </div> 
            </div>
        )
    }

    renderChatListTopAlt = () => {
        return (
            <div className = "chat_list_top">
                <div className = "icon_button" onClick = {this.handleLeftPanel}>
                    <ChevronRight/>
                </div>               
            </div>
        )
    }

    renderSearchField = (label) => {
        return (
            <TextField 
                id="input-with-icon-adornment"
                label= {label}
                variant="outlined" 
                onChange = {this.handleSearchOnChange}
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

    renderChatListCard = (item) => {
        const currentPersonnel = this.state.currentPersonnel
        const {src, title, lastText, time} = item
        return (
            <div 
                className = {[
                    "chat_list_card_alt", 
                    currentPersonnel && currentPersonnel === item && "chat_list_card_alt_active"
                ].join(" ")}
                onClick = {() => this.handleListItemOnClick(item)}
            >
                <div className = "list_tem_avatar">
                    <Avatar src = {src}/>
                </div>
                <div className = "list_item_text">
                    <span>{title}</span>
                    <p>{lastText}</p>
                </div>
                <div className = "list_item_time">
                    <div className = "list_item_time_val">{time}</div>
                    <span/>
                </div>
            </div>
        )
    }

    renderChatLists = () => {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
            {
                this.dummyChats.map((item) => {
                    return this.renderChatListCard(item)
                })
            }
            </Grid>
        )
    }

    renderMessangerTop_search = () => {
        return (
            <div className = "messanger_top_search">
                <h6>To:</h6>
                { this.renderSearchField("Recipients", this.state.recipients) }
            </div>
        )
    }

    renderMessangerTop_item = () => {
        const currentPersonnel = this.state.currentPersonnel
        return (
            <div className = "messanger_top_item">
                <div className = "messanger_top_item_left">
                    <div className = "list_tem_avatar">
                        <Avatar src = {currentPersonnel && currentPersonnel.src}/>
                    </div>
                    <div className = "list_item_text">
                        <span>{currentPersonnel && currentPersonnel.title}</span>
                        <p>less than minute ago</p>
                    </div>
                </div>
                <div className = "messanger_top_item_right">
                    <div className = "icon_button" onClick = {this.handleVideoCamOnClick}>
                        <Videocam/>
                    </div>
                    <div className = "icon_button" onClick = {this.handleMoreOnClick}>
                        <More/>
                    </div>
                </div>
            </div>
        )
    }

    renderMainChatContainer = () => {
        return (
            <div className = "main_chat_container">
                <div className = "main_chat_lists"></div>
                <div className = "main_chat__footer">
                    <div className = "main_input_base">
                        <div className = "icon_button" onClick = {this.handleEmojiOnClick}>
                            <InsertEmoticon/>
                        </div>
                        <TextField
                            id="outlined-margin-normal"
                            placeholder="write something...."
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                            onChange = {this.handleMessageOnType}
                        />
                        <div className = "icon_button" onClick = {this.handleAttachmentOnClick}>
                            <AttachFile/>
                        </div>
                        <div className = "icon_button" onClick = {this.handleMicOnClick}>
                            <Mic/>
                        </div>
                    </div>
                    <div className = "send_base">
                        <div className = "icon_button" onClick = {this.handleSendOnClick}>
                            <Send/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderChat = () => {
        const {leftPanelOpen, currentPersonnel} = this.state
        return (
            <div className = "chat_alt_root">
                <Collapse in={true} timeout="auto" unmountOnExit 
                    style = {{
                        width: leftPanelOpen ? "320px" : "100px", 
                        borderRight: '1px solid rgba(145, 158, 171, 0.24)'
                    }}
                >
                    <Box margin={1}>
                        {
                            leftPanelOpen ? 
                             <div className = "chat_list_block_inside">
                                { this.renderChatListTop() }
                                { this.renderSearchField("Search", this.state.search) }
                            </div>
                            :
                            <div className = "chat_list_block_inside">
                                { this.renderChatListTopAlt() }
                            </div>
                        }
                        <div className = "chat_lists_container">
                            { this.renderChatLists() }
                        </div>
                    </Box>
                </Collapse>
                <div className = "chat_messanger">
                    { 
                        currentPersonnel ?
                        this.renderMessangerTop_item()
                        :
                        this.renderMessangerTop_search() 
                    }
                    <Divider/>
                    { this.renderMainChatContainer() }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className = "my_chat_root">
                <HeaderTopper
                    screen = "Chat"
                    rootNav = "App"
                    childNav = {["Chat"]}
                />
                {
                    this.state.loading ?
                    <Loading/>
                    :
                    this.renderChat()
                }
            </div>
        )
    }
}


export default MyChat
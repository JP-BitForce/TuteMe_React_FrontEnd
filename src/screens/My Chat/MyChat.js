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

var stompClient = null;

class MyChat extends Component {
    state = {
        loading: true,
        leftPanelOpen: true,
        message:"",
        search: "",
        recipients: "",
        currentPersonnel: null,
        broadcastMessages: [],
        username: "spr",
        mobileView: false,
        channelConnected: false,
        chatMessage: '',
        roomNotification: [],
        error: null,
        bottom: false,
        curTime: '',
        openNotifications: false,
        bellRing: false,
    }

    dummayPeople = ["Alice Walker", "Chris Haris", "Ron Weasley", "Bob Watson"]
    dummyChats = [
        {title: "Zack Zimmer", lastText:"Hi ...", type: "individual", time: "13 minutes", src : avatar_2},
        {title: "Javascript-Team", lastText:"Script....", type: "group", time: "13 minutes", src : avatar_3},
    ]
    dummyMessages = [
        {message: "hi", sender: "spr", dateTime: "15:25"},
        {message: "hello there", sender: "someone", dateTime: "15:27"},
        {message: "how are u?", sender: "spr", dateTime: "15:30"},
        {message: "im fine, and u?", sender: "someone", dateTime: "15:31"},
    ]

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this))
        this.resize()

        this.setState({ curTime: new Date().toLocaleString() })
        this.timerID = setInterval(() => this.state.bellRing ? this.setState({ bellRing: false }) : "", 10000)
        this.connect()
    }
    
    resize() {
        let mobileView = (window.innerWidth <= 850)
        this.setState({ mobileView: mobileView })
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this))
    }

    componentDidUpdate() {
        if (!this.state.error) {
            this.scrollToBottom()
        }
    }

    connect = () => {
        const Stomp = require('stompjs')
        var SockJS = require('sockjs-client')
        SockJS = new SockJS('http://localhost:8080/ws')
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.setState({ channelConnected: true, loading: false, error: null })
        // Subscribing to the public topic
        stompClient.subscribe('/topic/pubic', this.onMessageReceived)
        // Registering user to server as a public chat user
        stompClient.send("/ws-app/addUser", {}, JSON.stringify({ sender: this.state.username, type: 'JOIN' }))
    }
    
    sendMessage = (type) => {
        const {message, username} = this.state
        if (stompClient) {
          var chatMessage = {
            sender: username,
            content: message,
            type: type
          }
          // send public message
          stompClient.send("/ws-app/sendMessage", {}, JSON.stringify(chatMessage))
        }
    }

    onMessageReceived = (payload) => {
        const {roomNotification, broadcastMessages} = this.state
        var message = JSON.parse(payload.body)
        if (message.type === 'JOIN') {
            roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime })
            this.setState({
                roomNotification: roomNotification,
                bellRing: true
            })
        }
        else if (message.type === 'LEAVE') {
            roomNotification.map((notification, i) => {
                if (notification.sender === message.sender + " ~ joined") {
                    notification.status = "offline"
                    notification.sender = message.sender + " ~ left"
                    notification.dateTime = message.dateTime
                }
                return 1
            })
            this.setState({
                roomNotification: roomNotification,
                bellRing: true
            })
        }
        else if (message.type === 'TYPING') {
            roomNotification.map((notification, i) => {
                if (notification.sender === message.sender + " ~ joined") {
                    if (message.content)
                        notification.status = "typing..."
                    else
                        notification.status = "online"
                }
                return 1
            })
            this.setState({
                roomNotification: roomNotification
            })
        }
        else if (message.type === 'CHAT') {
            roomNotification.map((notification, i) => {
                if (notification.sender === message.sender + " ~ joined") {
                    notification.status = "online"
                }
                return 1
            })
            broadcastMessages.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            this.setState({
                broadcastMessages: broadcastMessages,
            })
        }
    }

    onError = (error) => {
        this.setState({
          error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!',
          loading: false
        })
    }

    scrollToBottom = () => {
        var object = this.refs.messageBox;
        if (object)
        object.scrollTop = object.scrollHeight;
    }

    handleSearchOnChange = (event) => {
        this.setState({
            [event.target.name]: event.traget.value
        })
    }

    handleMessageOnType = (event) => {
        this.setState({
            message: event.target.value
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
                id = {`input-with-icon-adornment_${label}`}
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

    renderMessangerTopSearch = () => {
        return (
            <div className = "messanger_top_search">
                <h6>To:</h6>
                { this.renderSearchField("Recipients", this.state.recipients) }
            </div>
        )
    }

    renderMessangerTopItem = () => {
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

    renderMainChatFooter = () => {
        return (
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
                    <div className = "icon_button" onClick = {()=> this.sendMessage('CHAT')}>
                        <Send/>
                    </div>
                </div>
            </div>
        )
    }

    renderMyMessage = (msg, i) => {
        return (
            <li className = "chat_list_item_mine" key={i}>
                <div>
                    <div className = "message_box_mine">
                        {msg.message}
                    </div>
                    <div className = "message_dateTime">
                        {msg.dateTime}
                    </div>
                </div>
            </li>
        )
    }

    renderSenderMessage = (msg, i) => {
        return (
            <li className = "chat_list_item_other" key={i}>
                <div className = "chat_list_item_other_box">
                    <div className = "message_box_other">
                        {msg.message}
                    </div>
                    <div className = "message_dateTime">
                        {msg.dateTime}
                    </div>
                </div>
            </li>
        )
    }

    renderMainChatList = () => {
        const {username} = this.state
        return (
            <div className = "main_chat_lists">
                <ul id="chat" ref="messageBox">
                    {
                        this.dummyMessages.map((msg, i) => {
                            if (username === msg.sender) {
                                return this.renderMyMessage(msg, i)
                            } else {
                                return this.renderSenderMessage(msg, i)
                            }
                        })
                    }
                </ul>
            </div>
        )
    }

    renderMainChatContainer = () => {
        return (
            <div className = "main_chat_container">
                { this.renderMainChatList() }
                { this.renderMainChatFooter() }
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
                        this.renderMessangerTopItem()
                        :
                        this.renderMessangerTopSearch() 
                    }
                    <Divider/>
                    { this.renderMainChatContainer() }
                </div>
            </div>
        )
    }

    render() {
        const {loading, channelConnected, error} = this.state
        return (
            <div className = "my_chat_root">
                <HeaderTopper
                    screen = "Chat"
                    rootNav = "App"
                    childNav = {["Chat"]}
                />
                {
                    loading ? <Loading open = {loading}/>
                    :
                    channelConnected ? this.renderChat()
                    :
                    error && <span className = "error">{error}</span>
                }
            </div>
        )
    }
}


export default MyChat
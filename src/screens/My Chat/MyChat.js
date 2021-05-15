import React, { Component } from 'react'
import {connect} from 'react-redux'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'

//Material-UI
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Search from '@material-ui/icons/Search'
import Edit from '@material-ui/icons/Edit'
import Videocam from '@material-ui/icons/Videocam'
import More from '@material-ui/icons/MoreVert'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import AttachFile from '@material-ui/icons/AttachFile'
import Mic from '@material-ui/icons/Mic'
import Send from '@material-ui/icons/Send'

import avatar from '../../assets/images/shared/avatar.png'
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
        privateMessages: [],
        userImg: avatar
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this))
        this.resize()
        
        this.setState({ curTime: new Date().toLocaleString() })
        this.timerID = setInterval(() => this.state.bellRing ? this.setState({ bellRing: false }) : "", 10000)
        this.connect()
        this.setUserImage()
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
        this.setState({ channelConnected: false, loading: true, error: null })
        const Stomp = require('stompjs')
        var SockJS = require('sockjs-client')
        SockJS = new SockJS('http://localhost:8080/ws')
        stompClient = Stomp.over(SockJS)
        stompClient.connect({}, this.onConnected, this.onError)
    }

    onConnected = () => {
        this.setState({ channelConnected: true, loading: false, error: null })
        // Subscribing to the public topic
        stompClient.subscribe('/topic/pubic', this.onMessageReceived)
        // Registering user to server as a public chat user
        stompClient.send("/app/addUser", {}, JSON.stringify({ sender: this.state.username, type: 'JOIN' }))
    }
    
    sendMessage = (type, value) => {
        const {username} = this.state
        if (stompClient) {
          var chatMessage = {
            sender: username,
            content: value,
            type: type
          }
          // send public message
          stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage))
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

    handlePrivateConnection = () => {
        const Stomp = require('stompjs')
        var SockJS = require('sockjs-client')
        SockJS = new SockJS('http://localhost:8080/ws')
        stompClient = Stomp.over(SockJS)
        stompClient.connect({}, this.onPrivateConnected, this.onError)
    }

    onPrivateConnected = () => {
        const name = this.state.currentPersonnel.sender.split('~')[0]
        // Subscribing to the private topic
        stompClient.subscribe('/user/' + name + '/reply', this.onPrivateMessageReceived);

        // Registering user to server as a private chat user
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: name, type: 'JOIN' }))
    }

    sendPrivateMessage = (type, value) => {
        if (stompClient) {
          var chatMessage = {
            sender: this.state.username,
            receiver: this.state.currentPersonnel.sender.split('~')[0],
            content: type === 'TYPING' ? value : value,
            type: type
    
          }
          stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
        }
    }

    onPrivateMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);
        if (message.type === 'CHAT') {
          this.state.privateMessages.push({
            message: message.content,
            sender: message.sender,
            dateTime: message.dateTime
          })
          this.setState({
            privateMessages: this.state.privateMessages,
          })
        }
    }

    handleTypingMessage = (event) => {
        const value = event.target.value
        this.setState({
            message: value,
        })
        this.sendPrivateMessage('TYPING', value)
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
            currentPersonnel: item,
        })
        this.handlePrivateConnection()
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

    setUserImage = () => {
        const auth = this.props.auth
        let src = avatar
        if (auth.imageSrc) {
            src = this.getImageSource(auth.imageSrc)
        }
        this.setState({ userImg: src })
    }
    
    getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    renderChatListTop = () => {
        const {userImg} = this.state
        return (
            <div className = "chat_list_top">
                <div className = "own_avatar_div">
                    <Avatar src = {userImg}/>
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
        return (
            <div 
                className = {[
                    "chat_list_card_alt", 
                    currentPersonnel && currentPersonnel === item && "chat_list_card_alt_active"
                ].join(" ")}
                onClick = {() => this.handleListItemOnClick(item)}
            >
                <div className = "list_tem_avatar">
                    <Avatar src = {avatar}/>
                </div>
                <div className = "list_item_text">
                    <span>{item.sender.split('~')[0]}</span>
                    <p>{item.message}</p>
                </div>
                <div className = "list_item_time">
                    <div className = "list_item_time_val">13 minutes</div>
                    <span/>
                </div>
            </div>
        )
    }

    renderChatLists = () => {
        const {roomNotification, username} = this.state
        return (
            <Grid container direction="row" justify="center" alignItems="center">
            {
                roomNotification.map((item) => {
                    if ( username.toLowerCase().trim() !== item.sender.split('~')[0].toLowerCase().trim()) {
                        return this.renderChatListCard(item)
                    }
                    return null
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
                        <span>{currentPersonnel && currentPersonnel.sender.split('~')[0]}</span>
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
        const {message} = this.state
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
                        onChange = {this.handleTypingMessage}
                        value = {message}
                    />
                    <div className = "icon_button" onClick = {this.handleAttachmentOnClick}>
                        <AttachFile/>
                    </div>
                    <div className = "icon_button" onClick = {this.handleMicOnClick}>
                        <Mic/>
                    </div>
                </div>
                <div className = "send_base">
                    <div className = "icon_button" onClick = {() => this.sendPrivateMessage('CHAT', message)}>
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
        const {username, broadcastMessages, currentPersonnel} = this.state
        return (
            <div className = "main_chat_lists">
                <ul id="chat" ref="messageBox">
                    {
                        currentPersonnel && broadcastMessages.map((msg, i) => {
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
        const {leftPanelOpen, currentPersonnel, search} = this.state
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
                                { this.renderSearchField("Search", search) }
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
                    { currentPersonnel ? this.renderMessangerTopItem() : this.renderMessangerTopSearch() }
                    <Divider/>
                    { this.renderMainChatContainer() }
                </div>
            </div>
        )
    }

    renderError = (error) => {
        return (
            <Backdrop open={true} style = {{backgroundColor:"white"}}>
                <div className = "chat_connection_failed">
                    <span>{error}</span>
                    <Button 
                        onClick = {this.connect} 
                        style = {{
                            backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                            color: "white"
                        }}
                        variant="contained" color="secondary"
                    > Retry </Button>
                </div>
            </Backdrop>
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
                    error && this.renderError(error)
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

export default connect(mapStateToProps)(MyChat)
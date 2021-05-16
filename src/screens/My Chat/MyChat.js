import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import Loading from '../../components/Loading/Loading'
import HeaderTopper from '../../components/Header/HeaderTopper'
import Aside from './Aside'
import Messanger from './Messanger'

//Material-UI
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'

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
        username: "",
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
        userImg: avatar,
        attachemTitle: "",
        cover: null,
        file: null,
        currentPersonnelMessages: []
    }

    componentDidMount() {
        const auth = this.props.auth
        window.addEventListener("resize", this.resize.bind(this))
        this.resize()
        
        this.setState({ 
            curTime: new Date().toLocaleString(),
            username: auth && auth.email.split("@")[0]
        })
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

    handlePrivateConnection = () => {
        const Stomp = require('stompjs')
        var SockJS = require('sockjs-client')
        SockJS = new SockJS('http://localhost:8080/ws')
        stompClient = Stomp.over(SockJS)
        stompClient.connect({}, this.onPrivateConnected, this.onError)
    }

    onPrivateConnected = () => {
        const {currentPersonnel} = this.state
        const name = currentPersonnel && currentPersonnel.sender
        // Subscribing to the private topic
        stompClient.subscribe('/user/' + name + '/reply', this.onPrivateMessageReceived)

        // Registering user to server as a private chat user
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: name, type: 'JOIN' }))
    }

    sendPrivateMessage = (type, value) => {
        const {username, currentPersonnel} = this.state
        if (stompClient) {
          var chatMessage = {
            sender: username,
            receiver: currentPersonnel.sender,
            content: type === 'TYPING' ? value : value,
            type: type
    
          }
          stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage))
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

    handleSendOnClick = (disable) => {
        if (!disable) {
            const {currentPersonnelMessages, message, username} = this.state
            const newMessage = {
                id: currentPersonnelMessages.length + 1, 
                src: avatar, 
                sender: username, 
                message, 
                dateTime: moment(new Date()).format("hh:mm a")
            }
            currentPersonnelMessages.push(newMessage)
            this.setState({ currentPersonnelMessages, message: "" })
            this.sendPrivateMessage('CHAT', message)
        }
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
        }, this.handlePrivateConnection())
    }

    handleChatNewOnClick = () => {
        this.setState({
            currentPersonnel: null
        })
    }

    handleMoreOnClick = () => {

    }

    handleEmojiOnClick = (disable) => {
        if (!disable) {
            
        }
    }

    attachmentOnChange = (e) => {
        const { files } = e.target
        if (files && files.length) {
            let file = files[0]
            let reader = new FileReader()
            reader.onloadend = () => {
                 this.setState({ cover: reader.result, file })
            }
            reader.readAsDataURL(file)
        }
        this.setState({ attachemTitle: files[0].name })
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

    renderChat = () => {
        const {leftPanelOpen, currentPersonnel, roomNotification, username, 
            search, userImg, recipients, broadcastMessages, message
        } = this.state
        return (
            <div className = "chat_alt_root">
                <Collapse in={true} timeout="auto" unmountOnExit 
                    style = {{
                        width: leftPanelOpen ? "320px" : "100px", 
                        borderRight: '1px solid rgba(145, 158, 171, 0.24)'
                    }}
                >
                <Aside
                    leftPanelOpen = {leftPanelOpen}
                    roomNotification = {roomNotification}
                    username = {username}
                    currentPersonnel = {currentPersonnel}
                    handleListItemOnClick = {this.handleListItemOnClick}
                    search = {search}
                    handleLeftPanel = {this.handleLeftPanel}
                    userImg = {userImg}
                    handleChatNewOnClick = {this.handleChatNewOnClick}
                    handleSearchOnChange = {this.handleSearchOnChange}
                />
                </Collapse>
                <Messanger
                    currentPersonnel = {currentPersonnel}
                    handleMoreOnClick = {this.handleMoreOnClick}
                    recipients = {recipients}
                    handleSearchOnChange = {this.handleSearchOnChange}
                    broadcastMessages = {broadcastMessages}
                    username = {username}
                    message = {message}
                    handleEmojiOnClick = {this.handleEmojiOnClick}
                    handleTypingMessage = {this.handleTypingMessage}
                    attachmentOnChange = {this.attachmentOnChange}
                    handleSendOnClick = {this.handleSendOnClick}
                />
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
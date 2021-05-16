import React, {useRef} from 'react'

//Material-UI
import Avatar from '@material-ui/core/Avatar'
import More from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Divider from '@material-ui/core/Divider'

import Search from '@material-ui/icons/Search'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import AttachFile from '@material-ui/icons/AttachFile'
import Send from '@material-ui/icons/Send'

import avatar from '../../assets/images/shared/avatar.png'
import './Chat.css'

const Messanger = ({
    currentPersonnel,
    handleMoreOnClick,
    recipients,
    handleSearchOnChange,
    broadcastMessages,
    username,
    message,
    handleEmojiOnClick,
    handleTypingMessage,
    attachmentOnChange,
    handleSendOnClick
}) => {

    const attachment = useRef()

    const handleAttachmentOnClick = (disable) => {
        if (!disable) {
            attachment.current.click()
        }
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

    const renderMyMessage = (msg, i) => {
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

    const renderSenderMessage = (msg, i) => {
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

    const renderMainChatList = () => {
        return (
            <div className = "main_chat_lists">
                <ul id = "chat">
                    {
                        currentPersonnel ?
                        currentPersonnel.sender === "System" ? renderSenderMessage(currentPersonnel, currentPersonnel.id)
                            :
                            broadcastMessages.map((msg, i) => {
                                if (username === msg.sender) {
                                    return renderMyMessage(msg, i)
                                } else {
                                    return renderSenderMessage(msg, i)
                                }
                            })
                        :
                        null
                    }
                </ul>
            </div>
        )
    }

    const renderMainChatContainer = () => {
        return (
            <div className = "main_chat_container">
                { renderMainChatList() }
                { renderMainChatFooter() }
            </div>
        )
    }

    const renderMainChatFooter = () => {
        let disable = true
        if (currentPersonnel) {
            if (currentPersonnel.sender !== "System") {
                disable = false
            }
        }
        return (
            <div className = "main_chat__footer">
                <div className = "main_input_base">
                    <div className = "icon_button" onClick = {() => handleEmojiOnClick(disable)}>
                        <InsertEmoticon/>
                    </div>
                    <TextField
                        id = "outlined-margin-normal"
                        placeholder = "write something...."
                        fullWidth
                        InputLabelProps = {{ shrink: true }}
                        variant = "outlined"
                        size = "small"
                        onChange = {handleTypingMessage}
                        value = {message}
                        disabled = {disable}
                    />
                    <div className = "icon_button" onClick = {() => handleAttachmentOnClick(disable)}>
                        <input 
                            type = "file" 
                            autocomplete = "off" 
                            tabindex = "-1" 
                            style = {{display: 'none'}} 
                            ref = {attachment}
                            onChange = {attachmentOnChange}
                        />
                        <AttachFile/>
                    </div>
                </div>
                <div className = "send_base">
                    <div className = "icon_button" onClick = {() => handleSendOnClick(disable)}>
                        <Send/>
                    </div>
                </div>
            </div>
        )
    }

    const renderMessangerTopSearch = () => {
        return (
            <div className = "messanger_top_search">
                <h6>To:</h6>
                { renderSearchField("Recipients", recipients) }
            </div>
        )
    }

    const renderMessangerTopItem = () => {
        const {src, sender, dateTime} = currentPersonnel
        return (
            <div className = "messanger_top_item">
                <div className = "messanger_top_item_left">
                    <div className = "list_tem_avatar">
                        <Avatar src = {src ? src : avatar}/>
                    </div>
                    <div className = "list_item_text">
                        <span>{sender}</span>
                        <p>{dateTime}</p>
                    </div>
                </div>
                <div className = "messanger_top_item_right">
                    <div className = "icon_button" onClick = {handleMoreOnClick}>
                        <More/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className = "chat_messanger">
            { currentPersonnel ? renderMessangerTopItem() : renderMessangerTopSearch() }
            <Divider/>
            { renderMainChatContainer() }
        </div>
    )
}

export default Messanger

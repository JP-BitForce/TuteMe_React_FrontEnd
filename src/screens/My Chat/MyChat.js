import React, { Component } from 'react'

import People from './People'
import ChatCard from './ChatCard'
import CustomButton from '../../components/Button/CustomButton'

//Boostarp
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'

//Material-UI
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

import './Chat.css'

class MyChat extends Component {

    state = {
        message:""
    }

    dummayPeople = ["Alice Walker", "Chris Haris", "Ron Weasley", "Bob Watson"]
    dummyChats = [
        {title: "Zack Zimmer", lastText:"Hi ...", type: "individual", time: "17.00"},
        {title: "Javascript-Team", lastText:"Script....", type: "group", time: "04.45"},
        {title: "Brian Waltor", lastText:"No i'm not...", type: "individual", time: "10.05"}
    ]

    handleMessageOnType = (event) => {
        this.setState({
            message:event.target.value
        })
    }

    renderChatContainer = () => {
        return (
            <Paper elevation = {3}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={8}>
                        <div className = "my_chats">
                            <div className = "my_chats_header">
                                <Card className = "dark_background">
                                    <Card.Body className = "header_body">
                                        <Avatar>Z</Avatar>
                                        <span className = "header_text">Zack Zimmer</span>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className = "my_chats_content"></div>
                            <div className = "my_chats_footer">
                                <Card>
                                    <Card.Body className = "footer_body">
                                    <TextField
                                        id="outlined-margin-normal"
                                        placeholder="write something...."
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                        <Divider orientation="vertical" />
                                        <CustomButton label = "send"/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <div className = "search_chats">
                                <TextField id="outlined-search" label="Find" type="search" variant="outlined" size="small"/>
                                <IconButton
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={()=>{}}
                                >
                                <SearchIcon/>
                                </IconButton>
                            </div>
                            <Divider />
                            <div className = "chats_contents">
                                {
                                    this.dummyChats.map(item => {
                                        return (
                                            <div>
                                                <ChatCard item = {item}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    renderPeopleBox = () => {
        return (
            <Card className = "people_card">
                <Card.Body>
                    <Card.Body>
                        <ListItemText primary="PEOPLE YOU MAY KNOW"/>
                        <List
                            aria-labelledby="main"
                        >
                        {
                            this.dummayPeople.map(item => {
                                return (
                                    <People name = {item}/>
                                )
                            })
                        }
                        </List>
                    </Card.Body>
                </Card.Body>
            </Card>
        )
    }

    renderRoot = () => {
        return(
            <div>
                <Row>
                    <Col sm={9}>
                        { this.renderChatContainer() }
                    </Col>
                    <Col sm={3}>
                        { this.renderPeopleBox() }
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <div className = "my_chat_root">
                { this.renderRoot( )}
            </div>
        )
    }
}


export default MyChat
import React, {useState, useEffect} from 'react'

import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

import { getQuestionAnswers } from '../../api/oneStep'

//React-Boostarp
import Card from 'react-bootstrap/Card'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import up from '../../assets/images/shared/all.png'
import upChevron from '../../assets/images/shared/up-chevron.png'
import downChevron from '../../assets/images/shared/down-chevron.png'
import './OneStep.css'


const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: 'rgba(255, 255, 255, .15)', 
      backdropFilter: 'blur(4px)',
      color: "black",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontSize: "0.9rem",
        fontWeight: "bold",
    },
    container: {
        marginTop: "90px"
    },
    icon: {
        width: "30px",
        height: "30px"
    },
    ans_arr: {
        width: "30px",
        height: "30px"
    },
    answerCard: {
        backgroundColor: "rgb(240, 239, 238)",
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionPreview = ({
    open, 
    handleClose, 
    questionItem, 
    auth, 
    handleVote, 
    values, 
    handleAnsContentOnChange,
    handleQuestionAnsCancel,
    handleAnswerPost,
    setWarningSnack
}) => {
    const classes = useStyles()
    const {id, title, tags, content, userImg, userName, createdAt, votes} = questionItem

    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState([])
    const [currentUserVotedForQuestion, setCurrentUserVotedForQuestion] = useState(false)
    const [localVote, setLocalVote] = useState(votes)

    useEffect(() => {
        getAnswersApi()
        // eslint-disable-next-line
    }, [])

    const handlePostLocal = (id) => {
        handleAnswerPost(id)
    }

    const handleVoteLocal = (id) => {
        if(!currentUserVotedForQuestion) {
            handleVote(id)
            setLocalVote(votes + 1)
        } else {
            setWarningSnack("oops! you already voted.....")
        }
    }

    const getAnswersApi = () => {
        setLoading(true)
        getQuestionAnswers(auth.accessToken, id, auth.userId).then(response => {
            setAnswers(response.answers)
            setLoading(false)
            setCurrentUserVotedForQuestion(response.currentUserVotedForQuestion)
        }).catch(err => {
            setAnswers([])
            setLoading(false)
        })
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
     
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const renderAnswerCard = (item) => {
        return (
            <Grid container spacing={4} className = {classes.answerCard}>
                <Grid item xs={12} sm={12} md={2}>
                    <div className = "question_preview_ans__countables">
                        <div className = "icon_button">
                            <Avatar src = {upChevron} className = {classes.ans_arr}/>
                        </div>
                        <span>{item.votes}</span>
                        <span>votes</span>
                        <div className = "icon_button">
                            <Avatar src = {downChevron} className = {classes.ans_arr}/>
                        </div>
                   </div>
                </Grid>
                <Divider orientation="vertical" flexItem style = {{marginTop: "1%", marginBottom: "1%"}}/>
                <Grid item xs={12} sm={12} md={9}>
                    <div dangerouslySetInnerHTML={{__html: item.content}}/>
                    <div className = "question_preview_ans__footer">
                        <div className = "question_card__main_user">
                            <Avatar src = {getImageSource(item.userImg)}/>
                            <div>
                                <span>{item.userName}</span>
                                <span className = "question_card__main_user_created">
                                    created: {moment(item.createdAt).format("DD-MM-YYYY, hh:mm:ss a")}
                                </span>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }

    const renderQuestion = () => {
        return (
            <div className = "question_card__main">
                <div className = "question_card__main_info">
                    <span className = "question_card__main_info_title">{title}</span>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
                <div className = "question_card__main_tags">
                    {
                        tags.map(item => {
                            return <Chip label = {item.title} key = {item.id} style = {{marginRight: "4px"}}/>
                        })
                    }
                </div>
                <div className = "question_card_no_ans">
                    <span>No of answers:  {answers.length}</span>
                </div>
                <div className = "question_card__footer">
                    <div className = "question_card__main_user">
                        <Avatar src = {getImageSource(userImg)}/>
                        <div>
                            <span>{userName}</span>
                            <span className = "question_card__main_user_created">
                                created: {moment(createdAt).format("DD-MM-YYYY, hh:mm:ss a")}
                            </span>
                        </div>
                    </div>
                    <div className = "question_card_provide_vote">
                        <div className = "question_card_provide_vote_child1">
                            <span>{localVote}</span>
                            <Tooltip title = "give a vote">
                                <div className = "icon_button" onClick = {() => handleVoteLocal(id)}>
                                    <Avatar src={up} className = {classes.icon}/>
                                </div>
                            </Tooltip>
                        </div>
                        <span className = "question_card_provide_vote_child2_span">Votes</span>
                    </div>
                </div>
            </div>
        )
    }

    const renderAnswerList = () => {
        return (
            <div className = "question_preview_ans_list">
                <List>
                    {
                        answers.map(item => {
                            return (
                                <ListItem>
                                    { renderAnswerCard(item) }
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    const renderNewAnswerForm = () => {
        return (
            <div>
                <div className = "vertical_seperator"/>
                <div className = "your_answer_div">
                    <span>You can provide an answer</span>
                </div>
                <ReactQuill 
                    value={values["answerContent"]}
                    onChange={handleAnsContentOnChange}
                    modules={modules}
                    formats={formats}
                    placeholder = "provide suitable answer....."
                />
                <div className = "vertical_seperator"/>
                <div className = "button_footer">
                    {
                        values["postAnsLoading"] ? 
                        <div className = "loading_div">
                            <CircularProgress/>
                        </div>
                        :
                        <>
                        <Button variant="outlined" onClick = {handleQuestionAnsCancel}>Cancel</Button>
                        <Button 
                            variant="outlined" 
                            style = {{backgroundColor: "rgb(0, 171, 85)", color: "white", marginLeft: "4px"}}
                            onClick = {() => handlePostLocal(id)}
                        >Post</Button>
                        </>
                    }
                </div>
                <div className = "vertical_seperator"/>
            </div>
        )
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>{title}</Typography>
                </Toolbar>
            </AppBar>
            {
                loading ? <CircularProgress/> 
                :
                <Container className = {classes.container}>
                    <Card>
                        <Card.Body>
                            { renderQuestion() } 
                        </Card.Body>
                    </Card>
                    { renderAnswerList() }
                    { renderNewAnswerForm() }
                </Container>
            }
        </Dialog>
    )
}

export default QuestionPreview

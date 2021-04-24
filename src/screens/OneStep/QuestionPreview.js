import React, {useState, useEffect} from 'react'
import moment from 'moment';

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

import up from '../../assets/images/shared/all.png'
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
        textTransform: "lowercase"
    },
    container: {
        marginTop: "90px"
    },
    icon: {
        width: "30px",
        height: "30px"
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionPreview = ({open, handleClose, questionItem, auth, handleVote}) => {
    const classes = useStyles()
    const {id, title, tags, content, userImg, userName, createdAt, votes} = questionItem

    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        setLoading(true)
        getQuestionAnswers(auth.accessToken, id).then(response => {
            setAnswers(response.answers)
            setLoading(false)
        }).catch(err => {
            setAnswers([])
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
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
                            <span>{votes}</span>
                            <Tooltip title = "give a vote">
                                <div className = "icon_button" onClick = {() => handleVote(id)}>
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
                </Container>
            }
        </Dialog>
    )
}

export default QuestionPreview

import React, {useState, useEffect} from 'react'

import Loading from '../../components/Loading/Loading'
import {getComments, addReply} from '../../api/comment'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import FavoriteIcon from '@material-ui/icons/Favorite';

import avatar1 from '../../assets/images/shared/avatar_2.jpg'
import avatar2 from '../../assets/images/shared/avatar_3.jpg'
import avatar3 from '../../assets/images/shared/minimal_avatar.jpg'
import './Blog.css'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
      marginTop: "20px"
  },
  chipTag: {
      marginRight: "5px"
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlogFullPreview = ({open, handleClose, blog, auth}) => {
    const classes = useStyles();
    const [replyOn, setReplyOn] = useState(false)
    const [replyValue, setReplyValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [replyLoading, setReplyLoading] = useState(false)

    const {date, description, likes, coverImg, authorImg, title, id, content } = blog

    useEffect(()=> {
        getCommentsApi()
        // eslint-disable-next-line
    },[])

    const getCommentsApi = () => {
        setLoading(true)
        getComments(auth.accessToken, id).then(response => {
            setComments(response.commentList)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }

    const handleReply = () => {
        const request = {
            userId: auth.userId,
            blogId: id,
            commentParentId: 1,
            reply: replyValue
        }

        setReplyLoading(true)
        addReply(auth.accessToken, request).then(response => {
            setReplyLoading(false)
        }).catch(err => {
            setReplyLoading(false)
        })
    }

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const handleReplyBtnOnClick = () => {
        setReplyOn(!replyOn)
    }

    const handleInputOnChange = (event) => {
        setReplyValue(event.target.value)
    }

    const renderTop = () => {
        return (
            <div className = "full_preview_top">
                <img src = {getImageSource(coverImg)} alt = "" className = "preview_top_img"/>
                <div className = "preview_top_footer">
                    <div className = "preview_author">
                        <div className = "preview_author_avatar">
                            <Avatar alt="author" src={getImageSource(authorImg)} />
                        </div>
                        <div className = "preview_author_details">
                            <h6>Joyce Bogisich</h6>
                            <p>{date}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderMain = () => {
        return (
            <div className = "full_preview_main">
                <h2 className = "blog_preview_top_title">{title}</h2>
                <h6>{description}</h6>
                <Divider/>
                <div className = "blog_content">
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </div>
                <Divider/>
            </div>
        )
    }

    const renderLikes = () => {
        return (
            <div className = "full_preview_likes">
                <div className = "full_preview_tags">
                    {
                        ["1", "2", "3"].map(item => {
                            return <Chip label = {`Tag item ${item}`} className = {classes.chipTag}/>
                        })
                    }
                </div>
                <div className = "like_container">
                    <p> <FavoriteIcon style = {{color: "red"}}/> {likes} </p>
                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src = {avatar1} />
                        <Avatar alt="Travis Howard" src = {avatar2} />
                        <Avatar alt="Cindy Baker" src = {avatar3} />
                        <Avatar alt="Trevor Henderson">+{likes-3}</Avatar>
                    </AvatarGroup>
                </div>
            </div>
        )
    }

    const renderComments = () => {
        return (
            <div className = "full_preview_comments">
                <Divider/>
                <div className = "preview_comment_head">
                    <h4>Comments</h4>
                    <h6>({comments.length})</h6>
                </div>
                <List>
                    {
                        comments.map(item => {
                            return (
                                <ListItem>
                                    { renderCommentCard(item) }
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    const renderCommentCard = (item) => {
        const {date, author, comment, authorImg, replyList} = item
        console.log(replyList)
        return (
            <div className = "preview_comment_card">
                <Avatar alt="Remy Sharp" src = {getImageSource(authorImg)}/>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={11}>
                        <div className = "comment_details">
                            <span className = "comment_details_span ">{author}</span>
                            <p className = "comment_details_p">
                                <span className = "comment_text">{comment}</span>
                                <span className = "comment_date">{date}</span>
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} style = {{display : "flex", alignItems: "center"}}>
                        <span className = "reply_span" onClick = {handleReplyBtnOnClick}>reply</span>
                    </Grid>
                    {
                        replyOn && 
                        <Grid item xs={12} sm={12} md={12}>
                            <Collapse in={replyOn} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    { renderReplyContainer() }
                                </Box>
                            </Collapse>
                        </Grid>
                    }
                </Grid>
            </div>
        )
    }

    const renderReplyContainer = () => {
        return (
            <div className = "reply_con_root">
                <TextField 
                    id="outlined-basic" 
                    label="write reply...." 
                    variant="outlined" 
                    fullWidth
                    onChange = {handleInputOnChange}
                    value = {replyValue}
                    name = "replyValue"
                    size = "small"
                />
                {
                    replyLoading ? 
                    <div className = "loading_div">
                        <CircularProgress/>
                    </div>
                    :
                    <div className = "reply_con_btns">
                        <Button onClick = {handleReplyBtnOnClick}>cancel</Button>
                        <Button color="primary" onClick = {handleReply}>send</Button>
                    </div>
                }
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
                    <Typography variant="h6" className={classes.title}>Sound</Typography>
                </Toolbar>
            </AppBar>

            {
                loading ? <Loading open = {loading}/>
                :
                <Container className = {classes.container}>
                    <div className = "blog_full_preview_root">
                        { renderTop() }
                        { renderMain() }
                        { renderLikes() }
                        { renderComments() }
                    </div>
                </Container>
            }
        </Dialog>
    )
}

export default BlogFullPreview

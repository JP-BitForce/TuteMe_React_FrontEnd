import React, {useState, useEffect} from 'react'

import Pagination from '../../components/Pagination/Paginator'
import {getComments, addReply, addComment} from '../../api/comment'

import Form from "react-bootstrap/Form";

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
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import './Blog.css'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'rgba(255, 255, 255, .15)', 
    backdropFilter: 'blur(4px)',
    color: "black",
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
  expand: {
      cursor: "pointer"
  },
  like : {
      fontSize: "30px"
  },
  liked: {
    fontSize: "30px",
    color: "red"   
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlogFullPreview = ({open, handleClose, blog, auth}) => {
    const classes = useStyles();
    const [replyOnParent, setReplyOnParent] = useState(null)
    const [replyValue, setReplyValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [replyLoading, setReplyLoading] = useState(false)
    const [expand, setExpand] = useState(null)
    const [addFormValidated, setValidated] = useState(false)
    const [email, setEmail] = useState("")
    const [newComment, setNewComment] = useState("")
    const [emailError, setEmailError] = useState(null)
    const [commentError, setcommentError] = useState(null)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const [commentPage, setCommentPage] = useState(1)
    const [current, setCurrent] = useState(1)

    const {date, description, coverImg, authorImg, title, id, content, author } = blog

    useEffect(()=> {
        getCommentsApi()
        // eslint-disable-next-line
    },[])

    const getCommentsApi = () => {
        setLoading(true)
        getComments(auth.accessToken, id).then(response => {
            setComments(response.commentList)
            setLoading(false)
            calculatePagination(response.commentList)
        }).catch(err => {
            setComments([])
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
            getCommentsApi()
            setReplyLoading(false)
            setReplyValue("")
        }).catch(err => {
            setReplyLoading(false)
        })
    }

    const handleAddNewComment = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(!form.checkValidity())
        if (!email) {
            setEmailError(true)
        } 
        if(!newComment) {
            setcommentError(true)
        } 
        if(email && newComment) {
            setEmailError(null)
            setcommentError(null)
            const request = {
                userId: auth.userId,
                blogId: blog.id,
                comment: newComment
            }
            addComment(auth.accessToken, request).then(response => {
                getCommentsApi()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleLike = () => {
        if(liked) {
            setLikes(likes-1)
        } else {
            setLikes(likes+1)
        }
        setLiked(!liked)
    }

    const calculatePagination = (data) => {
        var commentPage = 1;
        var mod = data.length % 10;
        if (mod > 0) {
            commentPage = data.length / 10 - mod / 10 + 1;
        } else {
            commentPage = data.length / 10;
        }
        setCommentPage(commentPage)
    }

    const handleCommentpagination = (page) => {
        if (page > 0) {
          const sliceStart = page * 10;
          const sliceEnd = (page + 1) * 10;
          setComments(comments.slice(sliceStart, sliceEnd))
        } else {
          const sliceStart = 0;
          const sliceEnd = 10;
          setComments(comments.slice(sliceStart, sliceEnd))
        }
        setCurrent(page+1)
    };

    const getImageSource = (blob) => {
        return `data:image/jpeg;base64,${blob}`
    }

    const handleExpand = (id) => {
       if (expand) {
            if(expand.id === id){
                setExpand({ open: !expand.open, id})
            } else {
                setExpand({ open: true, id})
            }
        } else {
            setExpand(({ open: true, id }))
        }
    }

    const handleReplyBtnOnClick = (id) => {
        if (replyOnParent) {
            if(replyOnParent.id === id){
                setReplyOnParent({ open: !replyOnParent.open, id})
            } else {
                setReplyOnParent({ open: true, id})
            }
        } else {
            setReplyOnParent(({ open: true, id }))
        }
    }

    const handleInputOnChange = (event) => {
        setEmailError(null)
        setcommentError(null)
        const val = event.target.value
        switch(event.target.name) {
            case "replyValue": setReplyValue(val)
                               break;
            case "email" : setEmail(val)
                           break;
            case "newComment" : setNewComment(val)
                                break;
            default: return;
        }
        
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
                            <h6>{author}</h6>
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
            </div>
        )
    }

    const renderLikes = () => {
        return (
            <div className = "full_preview_likes">
                <div className = "preview_comment_head">
                    <h4>Likes</h4>
                    <h6>({<> <FavoriteIcon style = {{color: "red", fontSize: "15px"}}/> {likes} </>})</h6>
                </div>
                <div className = "like_container">
                    <div className = "icon_button" onClick = {handleLike}>
                        <FavoriteIcon className = { liked ? classes.liked : classes.like}/>
                    </div>
                </div>
            </div>
        )
    }

    const renderComments = () => {
        return (
            <div className = "full_preview_comments">
                <Divider/>
                { renderLikes() }
                <div className = "preview_comment_head">
                    <h4>Comments</h4>
                    <h6>({comments.length})</h6>
                </div>
                <List>
                    {
                        comments.map(item => {
                            return (
                                <ListItem>
                                    { renderCommentContainer(item) }
                                </ListItem>
                            )
                        })
                    }
                </List>
                <div className = "pagination_div">
                    <Pagination
                        total = {commentPage}
                        current = {current}
                        handleOnChange = {handleCommentpagination}
                    />
                </div>
            </div>
        )
    }

    const renderListItem = (item) => {
        const {date, author, comment, authorImg, id} = item
        return (
            <div style = {{display: "flex", flexDirection: "column"}}>
                <div className = "comment_item_root">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src = {getImageSource(authorImg)}/>
                    </ListItemAvatar>
                    <div className = "item__details">
                        <span className = "MuiTypography-root">{author}</span>
                        <p className = "MuiListItemText-secondary">
                            <span className = "MuiTypography-gutterBottom">{date}</span>
                            <span className = "MuiTypography-root_comment">{comment}</span>
                        </p>
                        <div className = "item_reply_btn">
                            <span className ="MuiButton-label" onClick = {() => handleReplyBtnOnClick(id)}>Reply</span>              
                        </div>
                    </div>
                    <div className = "expand_icon">
                    {  
                        expand && expand.open && expand.id === id ? <ExpandLess 
                            className = {classes.expand}
                            onClick = {() => handleExpand(id)}
                        /> : 
                        <ExpandMore
                            className = {classes.expand}
                            onClick = {() => handleExpand(id)}
                        />  
                    }
                    </div>
                </div>
                <Collapse 
                    in={replyOnParent && replyOnParent.open && replyOnParent.id === id} 
                    timeout="auto" 
                    unmountOnExit 
                >
                    <Box margin={1}>
                        { renderReplyContainer() }
                    </Box>
                </Collapse>
                <Collapse in={expand && expand.open && expand.id === id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <List>
                            {
                                item.replyList.map(item => {
                                    return (
                                        <ListItem>
                                            { renderReplyComments(item) }
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>
                </Collapse>
            </div>
        )
    }

    const renderReplyComments = (item) => {
        const {date, author, reply, authorImg} = item
        return (
            <div style = {{display: "flex", flexDirection: "column", width: "100%"}}>
                <div className = "comment_item_root">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src = {getImageSource(authorImg)}/>
                    </ListItemAvatar>
                    <div className = "item__details">
                        <span className = "MuiTypography-root">{author}</span>
                        <p className = "MuiListItemText-secondary">
                            <span className = "MuiTypography-gutterBottom">{date}</span>
                            <span className = "MuiTypography-root_comment">{reply}</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const renderCommentContainer = (item) => {
        return (
            <div className = "preview_comment_card">
                <div className = "preview__container" style ={{width: "100%"}}>
                    { renderListItem(item) }
                </div>
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

    const renderNewComment = () => {
        return (
            <div className = "new_comment_root">
                <h6 className = "new_comment_h6">Add comment</h6>
                <Form
                    onSubmit={handleAddNewComment}
                    noValidate
                    validated={addFormValidated}
                    className = "edit_card_body_form"
                >
                    <TextField 
                        id = "outlined-basic" 
                        label = "Email" 
                        variant = "outlined" 
                        fullWidth
                        onChange = {handleInputOnChange}
                        value = {email}
                        name = "email"
                        size = "small"
                        error = {emailError}
                        helperText = {emailError && "Incorrect entry."}
                    />
                    <div className = "vertical_seperator"/>
                    <TextField
                        id = "outlined-multiline-static"
                        label = "comment"
                        multiline
                        rows={4}
                        variant = "outlined"
                        value = {newComment}
                        fullWidth
                        name = "newComment"
                        onChange = {handleInputOnChange}
                        error = {commentError}
                        helperText ={ commentError && "Incorrect entry." }
                    />
                    <div className = "vertical_seperator"/>
                    <div className = "reply_con_btns">
                        <Button 
                            color="primary" 
                            variant = "outlined" 
                            type = "submit"
                        >
                        Post Comment
                        </Button>
                    </div>
                </Form>
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
                    <Typography variant="h6" className={classes.title}>Preview</Typography>
                </Toolbar>
            </AppBar>

            {
                loading ? 
                <div className = "main_loading">
                    <CircularProgress/>
                </div>
                :
                <Container className = {classes.container}>
                    <div className = "blog_full_preview_root">
                        { renderTop() }
                        { renderMain() }
                        { renderComments() }
                        { renderNewComment() }
                    </div>
                </Container>
            }
        </Dialog>
    )
}

export default BlogFullPreview

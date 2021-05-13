import React from 'react'
import moment from 'moment'

//Material-UI
import Avatar from '@material-ui/core/Avatar';
import Comment from '@material-ui/icons/Comment';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import { makeStyles } from '@material-ui/core/styles';

import './InfoCard.css'

const useStyles = makeStyles({
    blog_card_top: props => ({
        position: 'relative',
        paddingTop: 'calc(100% * 3 / 4)',
        backgroundImage: `url(${props.img})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }),
})

const BlogCard = ({src, avatar, date, description, comments, likes, title, handleBlogOnClick, id}) => {
    const styles = useStyles({img: src})
    return (
        <div className = "blog_card" onClick = {() => handleBlogOnClick(id)}>
            <div className = {styles.blog_card_top}>
                <div className = "blog_avatar_block2">
                    <Avatar src = {avatar}/>
                </div>
            </div>
            <div className = "blog_card_content">
                <span className = "blog_card_content_date">{moment(date).format("YYYY MM DD hh:mm a")}</span>
                <p className = "blog_card_content_title">{title}</p>
                <p className = "blog_card_content_des">{description}</p>
                <div className = "blog_card_footer">
                    <div className = "blog_footer__content">
                        <Comment/>
                        <span>{comments}</span>
                    </div>
                    <div className = "blog_footer__content">
                        <ThumbUpAlt/>
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
